import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CSSuboutcome } from '../CSSuboutcome';
import { AssessmentService } from '../services/assessment.service';

@Component({
  selector: 'app-suboutcome',
  templateUrl: './suboutcome.component.html',
  styleUrls: ['./suboutcome.component.css']
})
export class SuboutcomeComponent implements OnInit {

  @Input() outcome_cat: string
  @Input() outcome_description: string
  @Input() assID: number
  @Output() newGrade = new EventEmitter<[string, number]>();
  suboutcomeDetails: CSSuboutcome[]
  subOutcomeNames: string[] = []
  subDeets$: Observable<CSSuboutcome[]>
  subDeets: CSSuboutcome[] = []
  suboutcome_grade: { score_id: number}[] = []


  constructor(public assessmentService: AssessmentService) {
    this.subDeets$ = this.assessmentService.getCSSuboutcomes(this.outcome_cat)
    
   }

   recordGrade(score_id: string, grade: number){
    console.log('in record grade score id is ', score_id, ' and grade is ',grade)
    const poor_box = document.getElementById(score_id+'_'+'poor');
    const developing_box = document.getElementById(score_id+'_'+'developing');
    const satisfactory_box = document.getElementById(score_id+'_'+'satisfactory');
    const excellent_box = document.getElementById(score_id+'_'+'excellent');
    this.assessmentService.suboutcome_grade[score_id] = grade
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
    //console.log("should not be undefined: " + this.outcome_cat)
    this.assessmentService.getCSSuboutcomes(this.outcome_cat).subscribe(res => {
      this.suboutcomeDetails = res
      //console.log('suboutcomeDetails is at ', this.suboutcomeDetails)
      this.setHighlights(res)
    })
  }

  setHighlights(outcome_arr: CSSuboutcome[]){
    for (let i = 0; i < outcome_arr.length; i++){
      const grade$ = this.assessmentService.getSuboutcomeGrades(this.assID,outcome_arr[i].score_id)
      grade$.pipe(take(1)).subscribe(res=>{
        
        if (res != null){
          console.log('in setHighlight score id is ', outcome_arr[i].score_id, 'and grade is ',res)
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

}
