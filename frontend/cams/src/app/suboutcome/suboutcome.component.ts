import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AssessmentDisplay } from '../AssessmentDisplay';
import { Suboutcome } from '../Suboutcome';
import { AssessmentService } from '../services/assessment.service';
import { ScoreComment } from '../ScoreComment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OutcomeDescriptions } from '../OutcomeDescriptions';

/**
 * This is the suboutcome component called for populating assessments.
 * It takes in outcome categories, gets which suboutcomes are are applicable
 * based on information from the assessment ID and the outcome category
 */


@Component({
  selector: 'app-suboutcome',
  templateUrl: './suboutcome.component.html',
  styleUrls: ['./suboutcome.component.css']
})
export class SuboutcomeComponent implements OnInit {

  @Input() outcome_cat!: number
  @Input() outcome_description: OutcomeDescriptions
  @Input() assID!: number
  @Input() assessmentInfo!: AssessmentDisplay
  @Output() newGrade = new EventEmitter<[string, number]>();
  @Output() newComment = new EventEmitter<ScoreComment>();

  suboutcomeDetails!: Suboutcome[]
  subOutcomeNames: string[] = []
  subDeets$: Observable<Suboutcome[]>
  subDeets: Suboutcome[] = []
  suboutcome_grade: { score_id: number}[] = []
  comment!: ScoreComment
  commentSubmitted=false
  setCommentForm:FormGroup
  twoCents!:string

  constructor(public assessmentService: AssessmentService, private fB: FormBuilder) {
    // initialize this comment form to blank
    this.setCommentForm = this.fB.group({
      comment: ['']
    })

   }

   // record grad is a massive, important function that takes the suboutcomes id
   // and dynamically uses it to tell which box is highlighted.
   // It uses a switch case to use radio button logic for suboutcome scores on the frontend
   // 
   recordGrade(score_id: string, grade: number){
    const poor_box = document.getElementById(score_id+'_'+'poor');
    const developing_box = document.getElementById(score_id+'_'+'developing');
    const satisfactory_box = document.getElementById(score_id+'_'+'satisfactory');
    const excellent_box = document.getElementById(score_id+'_'+'excellent');
    switch(grade) {
      case 1:
        poor_box!.className = "scoreable selected"
        developing_box!.className = "scoreable"
        satisfactory_box!.className = "scoreable"
        excellent_box!.className = "scoreable"
        break;
      case 2:
        poor_box!.className = "scoreable"
        developing_box!.className = "scoreable selected"
        satisfactory_box!.className = "scoreable"
        excellent_box!.className = "scoreable"
        break;
      case 3:
        poor_box!.className = "scoreable"
        developing_box!.className = "scoreable"
        satisfactory_box!.className = "scoreable selected"
        excellent_box!.className = "scoreable"
      break;
      case 4:
        poor_box!.className = "scoreable"
        developing_box!.className = "scoreable"
        satisfactory_box!.className = "scoreable"
        excellent_box!.className = "scoreable selected"
      break;
      default:
    }
   }

   // populates the suboutcomes based on outcome category.
   // NOTE: should review in the future if we need to grab suboutcome
   // twice in both observable and array form
  ngOnInit(): void {
    this.subDeets$ = this.assessmentService.getSuboutcomes(this.outcome_cat)
    this.assessmentService.getSuboutcomes(this.outcome_cat).subscribe(res => {
      this.suboutcomeDetails = res
      this.setHighlights(res)
    })
  }

  // this function is used for setting highlights of a previously graded assessment
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

// emits the grade back to the parent component
  giveGradeToParent(score_id: string, grade: number){
    this.newGrade.emit([score_id, grade])
  }

  // this function cleans up the suboutcome name for html display
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

  // this function creates a comment object based on a submitted comment,
  // and provides feedback to the user that their comment has been recorded.
  addComment(score_id:string, twoCents:string){

    this.comment = {
      cat_id: this.outcome_cat,
      assessment_id: this.assID,
      comment: twoCents,
      score_id: score_id
    }
    console.log(this.comment)
    this.newComment.emit(this.comment)
    const show = document.getElementById(score_id+'_'+'commentSubmit');
    show!.innerHTML += 'Comment Submitted!'

    this.commentSubmitted = true
    this.setCommentForm.reset()
  }
}
