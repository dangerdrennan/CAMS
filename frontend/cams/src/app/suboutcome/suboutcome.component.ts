import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CSSuboutcome } from '../CSSuboutcome';
import { AssessmentService } from '../services/assessment.service';

@Component({
  selector: 'app-suboutcome',
  templateUrl: './suboutcome.component.html',
  styleUrls: ['./suboutcome.component.css']
})
export class SuboutcomeComponent implements OnInit {

  @Input() outcome_cat: string
  suboutcomeDetails: CSSuboutcome[]
  subOutcomeNames: string[] = []
  subDeets$: Observable<CSSuboutcome[]>


  constructor(public assessmentService: AssessmentService) {
    this.subDeets$ = this.assessmentService.getCSSuboutcomes(this.outcome_cat)
    
   }

   recordGrade(score_id: string, grade: number){
    console.log(score_id, grade)
    const poor_box = document.getElementById(score_id+'_'+'poor');
    const developing_box = document.getElementById(score_id+'_'+'developing');
    const satisfactory_box = document.getElementById(score_id+'_'+'satisfactory');
    const excellent_box = document.getElementById(score_id+'_'+'excellent');
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
        // code block
    }
   }
  
  ngOnInit(): void {
    console.log("should not be undefined: " + this.outcome_cat)
    this.assessmentService.getCSSuboutcomes(this.outcome_cat).subscribe(res => {
      this.suboutcomeDetails = res
      console.log('suboutcomeDetails is at ', this.suboutcomeDetails)
    })
  }

}
