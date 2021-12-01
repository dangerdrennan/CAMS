import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { take } from 'rxjs/operators';
import { OutcomeDescriptions } from '../OutcomeDescriptions';
import { AssessmentService } from '../services/assessment.service';
import { AssessmentDisplay } from '../AssessmentDisplay';
import { ScoreComment } from '../ScoreComment';
import { SemesterReqs } from '../SemesterReqs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {
  grades: { score_id: string, grade: number}[] = []
  outcome_des: OutcomeDescriptions[] = []
  outcome_des$: Observable<OutcomeDescriptions[]>
  outcome_names: number[] = []
  outcome_cats?: number[]
  assessmentInfo: AssessmentDisplay
  submissionStatus: boolean
  comments:ScoreComment[] = []
  requirements$!: Observable<SemesterReqs[]>



  constructor(private router: Router, public auth:AuthService, public assessmentService: AssessmentService) {
    this.submissionStatus= this.assessmentService.submissionStatus
    this.assessmentInfo = this.assessmentService.assessment
   }

  ngOnInit(): void {
    this.setDescriptions()
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


  setDescriptions(){

    this.outcome_des$ = this.assessmentService.getOutcomeDescription()
    this.assessmentService.getOutcomeDescription().subscribe(res =>{
      console.log('this are the outcomes we are getting back: ', res)
    })
  }

  goBack() {
    this.router.navigateByUrl('/projects');
  }
}
