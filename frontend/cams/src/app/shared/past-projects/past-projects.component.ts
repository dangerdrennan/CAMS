import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AssessmentService } from 'src/app/services/assessment.service';
import { LoginService } from 'src/app/services/login.service';
import { ProfDashboardService } from 'src/app/services/prof-dashboard.service';
import { AssessmentDisplay } from 'src/app/AssessmentDisplay';
import { ProjectService } from 'src/app/services/project.service';

/**
 * This component is in charge of populating the frontend past projects tab.
 * Grabs assessments based on the term and professor logged in.
 * This is a sibling component to assessment. When a container populated by this
 * component is clicked, information is set in assessment service that will
 * inform what variables are set in assessment component
 */

@Component({
  selector: 'app-past-projects',
  templateUrl: './past-projects.component.html',
  styleUrls: ['./past-projects.component.css']
})
export class PastProjectsComponent implements OnInit {
  user: string | undefined
  pastAssessments: AssessmentDisplay[] = []
  pS:ProjectService



  // Constructor initializes our services and makes a call to auth service to grab user email
  // calling auth service again 

  constructor(private router: Router, public profDashService: ProfDashboardService, public assessmentService:AssessmentService, loginService:LoginService , public auth:AuthService, public projectService: ProjectService) {
    this.pS = projectService
    this.user = loginService.email
    this.auth.user$.subscribe(res => {
      this.user = res!.email
    })
  }

  // grab assessments by the prof email and sort them for display
  ngOnInit(): void {
    this.assessmentService.getPastAssessmentsbyProf(this.user!).subscribe((res: any)=>{
      this.pastAssessments = res
      this.pastAssessments.sort((a, b) => a.assessment_id - b.assessment_id)
    }
    )
  }

  // function that keeps track of state, triggered when a professor clicks an
  // assessment container. Sets variables in assessment service that will be 
  // used by assessment component and suboutcome component
  assessments(project:AssessmentDisplay) {
    this.profDashService.isAssessing = true;
    this.assessmentService.assID = project.assessment_id
    this.assessmentService.assessment = project

    this.router.navigateByUrl("/assessment");
  }

}
