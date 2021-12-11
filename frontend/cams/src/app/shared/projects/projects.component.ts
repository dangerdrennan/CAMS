import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AssessmentService } from 'src/app/services/assessment.service';
import { LoginService } from 'src/app/services/login.service';
import { ProfDashboardService } from 'src/app/services/prof-dashboard.service';
import { AssessmentDisplay } from 'src/app/AssessmentDisplay';
import { ProjectService } from 'src/app/services/project.service';
import { ResultsService } from 'src/app/services/results.service';

/**
 * This component holds the current semesters projects along with its respective assessments depending if the students in the project were CS or CSE
 */

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  user: string | undefined
  currentAssessments: AssessmentDisplay[] = []


  constructor(private router: Router,
    public profDashService: ProfDashboardService,
    public assessmentService:AssessmentService,
    public loginService:LoginService,
    public auth:AuthService,
    public projectService: ProjectService,
    public rS:ResultsService)

    {
    this.user = loginService.email
    this.auth.user$.subscribe(res => {
      this.user = res!.email
    })


  }

  ngOnInit(): void {
    this.assessmentService.getCurrentAssessmentsbyProf(this.user!).subscribe((res: any)=>{
      this.currentAssessments = res
      this.currentAssessments.sort((a, b) => a.assessment_id - b.assessment_id)
    }
    )

  }

  // grab the assessments that belong to a project
  assessments(project:AssessmentDisplay) {
    this.profDashService.isAssessing = true;
    this.assessmentService.assID = project.assessment_id
    this.assessmentService.assessment = project

    this.router.navigateByUrl("/assessment");
  }

}
