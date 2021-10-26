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
  
  ngOnInit(): void {
    console.log("should not be undefined: " + this.outcome_cat)
    this.assessmentService.getCSSuboutcomes(this.outcome_cat).subscribe(res => {
      this.suboutcomeDetails = res
      console.log('suboutcomeDetails is at ', this.suboutcomeDetails)
    })
  }

}
