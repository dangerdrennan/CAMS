import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { shareReplay, take } from 'rxjs/operators';
import { OutcomeDescriptions } from '../OutcomeDescriptions';
import { AssessmentService } from '../services/assessment.service';
import { AssessmentDisplay } from '../AssessmentDisplay';
import { ScoreComment } from '../ScoreComment';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {
  grades: { score_id: string, grade: number}[] = []
  outcome_des: OutcomeDescriptions[] = []
  outcome_cats?: string[]
  assessmentInfo: AssessmentDisplay
  submissionStatus: boolean
  comments:ScoreComment[] = []
  


  constructor(private router: Router, public auth:AuthService, public assessmentService: AssessmentService) {
    this.submissionStatus= this.assessmentService.submissionStatus
    this.assessmentInfo = this.assessmentService.assessment
   }

  ngOnInit(): void {
    this.assessmentService.getCurrentSemesterRequirements().pipe(take(1)).subscribe(res=> {
      if (this.assessmentInfo.degree =='CS'){
      this.outcome_cats = res.outcome_cats_cs
      this.setDescriptions(this.outcome_cats, 'CS')

    }
    else if (this.assessmentInfo.degree =='CSE'){
      this.outcome_cats = res.outcome_cats_cse
      this.setDescriptions(this.outcome_cats, 'CSE')
    }
    })
    if (this.assessmentService.assID == undefined){
      this.router.navigateByUrl('/projects');
    }
    }

    addScore(grade: [string, number]){
      this.grades.push({
        score_id: grade[0],
        grade: grade[1]
      })
    }
    addComment(comment:ScoreComment){
      this.comments.push(comment)
      console.log(this.comments)
    }


    submitScores(){
      this.submissionStatus = this.assessmentService.submitAssessment(this.grades,this.comments)
      
    }
    

  setDescriptions(arr : string[], degree: 'CS' | 'CSE'){
    const num_array:number[] = []
    console.log(arr)
    arr.forEach(val => {
      num_array.push(parseInt(val))
    })
    this.assessmentService.getOutcomeDescription(num_array).pipe(take(1)).subscribe(res =>{
      this.outcome_des = res
    })
  }

  goBack() {
    this.router.navigateByUrl('/projects');
  }
}
