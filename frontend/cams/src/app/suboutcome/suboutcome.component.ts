import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, take } from 'rxjs/operators';
import { AssessmentDisplay } from '../AssessmentDisplay';
import { Suboutcome } from '../Suboutcome';
import { AssessmentService } from '../services/assessment.service';
import { ScoreComment } from '../ScoreComment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-suboutcome',
  templateUrl: './suboutcome.component.html',
  styleUrls: ['./suboutcome.component.css']
})
export class SuboutcomeComponent implements OnInit {

  @Input() outcome_cat: string
  @Input() outcome_description: string
  @Input() assID: number
  @Input() assessmentInfo: AssessmentDisplay
  @Output() newGrade = new EventEmitter<[string, number]>();
  @Output() newComment = new EventEmitter<ScoreComment>();

  suboutcomeDetails: Suboutcome[]
  subOutcomeNames: string[] = []
  subDeets$: Observable<Suboutcome[]>
  subDeets: Suboutcome[] = []
  suboutcome_grade: { score_id: number}[] = []
  comment: ScoreComment
  commentSubmitted=false
  setCommentForm:FormGroup
  formBuilder: FormBuilder
  twoCents:string

  constructor(public assessmentService: AssessmentService, fB: FormBuilder) {
    this.formBuilder = fB
    this.setCommentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    })
    
   }

   recordGrade(score_id: string, grade: number){
    const poor_box = document.getElementById(score_id+'_'+'poor');
    const developing_box = document.getElementById(score_id+'_'+'developing');
    const satisfactory_box = document.getElementById(score_id+'_'+'satisfactory');
    const excellent_box = document.getElementById(score_id+'_'+'excellent');
    //console.log('in suboutcome component: ', this.assessmentService.suboutcome_grade)
    switch(grade) {
      case 1:
        poor_box.className = "scoreable selected"
        developing_box.className = "scoreable"
        satisfactory_box.className = "scoreable"
        excellent_box.className = "scoreable"
        break;
      case 2:
        poor_box.className = "scoreable"
        developing_box.className = "scoreable selected"
        satisfactory_box.className = "scoreable"
        excellent_box.className = "scoreable"
        break;
      case 3:
        poor_box.className = "scoreable"
        developing_box.className = "scoreable"
        satisfactory_box.className = "scoreable selected"
        excellent_box.className = "scoreable"
      break;
      case 4:
        poor_box.className = "scoreable"
        developing_box.className = "scoreable"
        satisfactory_box.className = "scoreable"
        excellent_box.className = "scoreable selected"
      break;
      default:
    }
   }
  
  ngOnInit(): void {
    this.subDeets$ = this.assessmentService.getSuboutcomes(this.outcome_cat).pipe(shareReplay())
    this.assessmentService.getSuboutcomes(this.outcome_cat).subscribe(res => {
      this.suboutcomeDetails = res
      this.setHighlights(res)
    })
  }

  setHighlights(outcome_arr: Suboutcome[]){
    for (let i = 0; i < outcome_arr.length; i++){
      const grade$ = this.assessmentService.getSuboutcomeGrades(this.assID,outcome_arr[i].score_id)
      grade$.pipe(take(1)).subscribe(res=>{
        if (res != null){
        this.recordGrade(outcome_arr[i].score_id, res[0].get_grade)
      }
      })
  }
}

  giveGradeToParent(score_id: string, grade: number){
    this.newGrade.emit([score_id, grade])
  }

  prettyCat(req:string){
    let newStr = req.slice(6,7) + '.'
    for (let i = 8; i < req.length; i++){
      if (req.slice(i,i+1) == '_'){

      }
      else{
        newStr += req.slice(i)
      }
    }
    return newStr
  }
  addComment(score_id:string, twoCents:string){
    
    this.comment = {
      assessment_id: this.assID,
      comment: twoCents,
      score_id: score_id
    }
    console.log(this.comment)
    this.newComment.emit(this.comment)
    this.commentSubmitted = true
  }
}
