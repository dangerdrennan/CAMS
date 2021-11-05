import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { first, shareReplay, take } from 'rxjs/operators';
import { Accessor } from '../Accessor';
import { OutcomeDescriptions } from '../OutcomeDescriptions';
import { SemesterReqs } from '../SemesterReqs';
import { AssessmentService } from '../services/assessment.service';
import { LoginService } from '../services/login.service';
import { ProfDashboardService } from '../services/prof-dashboard.service';
import { Student } from '../Student';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {
  grades: { score_id: string, grade: number}[] = []
  requirements$: Observable<SemesterReqs>
  cs_outcome_des: OutcomeDescriptions[] = []
  requirement_suboutcomes:string[] = []
  reqs: SemesterReqs
  outcome_cats_cs?: string[]
  prof: Accessor = {
    prof_email: 'ginandjuice@fbi.gov',
    f_name: 'Snoop',
    l_name: 'Dogg',
    department: 'Botany'
  }

//   export interface AssessmentDisplay {
//     title: string,
//     f_name: string,
//     l_name: string,
//     semester: string,
//     year: number,
//     graded: boolean,
//     assessment_id: number
// }
  student: Student = {student_id: 1, degree: 'cs', f_name:'Anne', l_name: 'Archy'}
  


  constructor(private router: Router, public auth:AuthService, public assessmentService: AssessmentService) {
    //this.requirements$ = this.assessmentService.getCurrentSemesterRequirements()
    this.requirements$ = this.assessmentService.getCurrentSemesterRequirements().pipe(shareReplay())
    this.assessmentService.getCurrentSemesterRequirements().pipe(take(1)).subscribe(res=> {
      this.outcome_cats_cs = res.outcome_cats_cs
      this.setDescriptions(this.outcome_cats_cs)
    })
   }

  ngOnInit(): void {
    this.requirements$.subscribe()
    if (this.assessmentService.assID == undefined){
      console.log('whoops')
      this.router.navigateByUrl('/projects');
    }
    }

    addScore(grade: [string, number]){
      this.grades.push({
        score_id: grade[0],
        grade: grade[1]
      })
    }

    submitScores(){
      this.assessmentService.recordAllSuboutcomeScores(this.grades)
    }
    

    showServiceGrades(){
      console.log('in parent component: ', this.assessmentService.suboutcome_grade)
    }

    // haven't gotten this to work yet
  setDescriptions(arr : string[]){
    const num_array:number[] = []
    console.log(arr)
    arr.forEach(val => {
      num_array.push(parseInt(val))
    })
    this.assessmentService.getCSOutcomeDescription(num_array).pipe(take(1)).subscribe(res =>{
      this.cs_outcome_des = res
      console.log(this.cs_outcome_des)
    }
    )
  }

  setOutcomeReqs(outcomes: string){
    return this.outcome_cats_cs
  }

  // getCSOutcomeDescription(cat_id: string){
  //   var x = this.assessmentService.getCSOutcomeDescription(parseInt(cat_id)).pipe(take(1)).subscribe()
  //   console.log(x)
  //   return x
  // }

  goBack() {
    this.router.navigateByUrl('/projects');
  }
}
