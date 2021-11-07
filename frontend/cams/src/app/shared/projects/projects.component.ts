import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AssessmentService } from 'src/app/services/assessment.service';
import { LoginService } from 'src/app/services/login.service';
import { ProfDashboardService } from 'src/app/services/prof-dashboard.service';
import { AssessmentDisplay } from 'src/app/AssessmentDisplay';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  user: string | undefined
  currentAssessments: AssessmentDisplay[] = []


  constructor(private router: Router, public profDashService: ProfDashboardService, public assessmentService:AssessmentService, loginService:LoginService , public auth:AuthService) {
    this.user = loginService.email
    this.auth.user$.subscribe(res => {
      this.user = res!.email
    })

  }

  ngOnInit(): void {
    // console.log('what is this? ', this.user)
    this.assessmentService.getCurrentAssessmentsbyProf(this.user!).subscribe((res: any)=>{
      console.log('hit: ', res)
      this.currentAssessments = res
      this.currentAssessments.sort((a, b) => a.assessment_id - b.assessment_id)
    }
    )
    this.getDisplayInfo()
  }

  getDisplayInfo(){
    console.log(this.currentAssessments)
  }

  assessments(project:AssessmentDisplay) {
    this.profDashService.isAssessing = true;
    this.assessmentService.assID = project.assessment_id
    this.assessmentService.assessment = project

    this.router.navigateByUrl("/assessment");
  }

}
