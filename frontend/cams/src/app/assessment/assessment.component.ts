import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { OutcomeDescriptions } from '../OutcomeDescriptions';
import { AssessmentService } from '../services/assessment.service';
import { AssessmentDisplay } from '../AssessmentDisplay';
import { ScoreComment } from '../ScoreComment';
import { SemesterReqs } from '../SemesterReqs';
import { Observable } from 'rxjs';

/**
 * This component takes care of grabbing outcome titles and giving the information to the suboutcome component to create the assessment page for professors to take the assessment
 */

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

  // load the outcome desctiptions on load or reroute back to the projects page
  ngOnInit(): void {
    this.setDescriptions()
    if (this.assessmentService.assID == undefined){
      this.router.navigateByUrl('/projects');
    }
  }

  // keep a record of the score id and grades given at that score
  addScore(grade: [string, number]){
    this.grades.push({
      score_id: grade[0],
      grade: grade[1]
    })
  }

  // save the comments that were left for a suboutcome
  addComment(comment:ScoreComment){
    this.comments.push(comment)
  }

  // make a request to store the assessment scored to the database
  submitScores(){
    this.submissionStatus = this.assessmentService.submitAssessment(this.grades,this.comments)
  }

  // grab the indivdual outcome descriptions
  setDescriptions(){
    this.outcome_des$ = this.assessmentService.getOutcomeDescription()
    this.assessmentService.getOutcomeDescription().subscribe(res =>{
    })
  }

  goBack() {
    this.router.navigateByUrl('/projects');
  }
}
