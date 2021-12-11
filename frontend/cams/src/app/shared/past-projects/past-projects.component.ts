import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AssessmentService } from 'src/app/services/assessment.service';
import { LoginService } from 'src/app/services/login.service';
import { ProfDashboardService } from 'src/app/services/prof-dashboard.service';
import { AssessmentDisplay } from 'src/app/AssessmentDisplay';
import { ProjectService } from 'src/app/services/project.service';

/**
 * This component holds previous semesters projects and statuses to see whether or not the project was graded. If not, you still have the ability to take an assessment for that project.
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


  constructor(private router: Router, public profDashService: ProfDashboardService, public assessmentService:AssessmentService, loginService:LoginService , public auth:AuthService, public projectService: ProjectService) {
    this.pS = projectService
    this.user = loginService.email
    this.auth.user$.subscribe(res => {
      this.user = res!.email
    })
  }

  ngOnInit(): void {
    this.assessmentService.getPastAssessmentsbyProf(this.user!).subscribe((res: any)=>{
      this.pastAssessments = res
      this.pastAssessments.sort((a, b) => a.assessment_id - b.assessment_id)
    }
    )

  }

  // grabs the assessments from previous semesters
  assessments(project:AssessmentDisplay) {
    this.profDashService.isAssessing = true;
    this.assessmentService.assID = project.assessment_id
    this.assessmentService.assessment = project

    this.router.navigateByUrl("/assessment");
  }

}
