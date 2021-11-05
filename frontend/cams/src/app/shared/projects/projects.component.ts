import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AssessmentService } from 'src/app/services/assessment.service';
import { LoginService } from 'src/app/services/login.service';
import { ProfDashboardService } from 'src/app/services/prof-dashboard.service';
import { AssessmentDisplay } from 'src/app/AssessmentDisplay';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  
  user: string
  currentAssessments: AssessmentDisplay[] = []

  
  constructor(private router: Router, public profDashService: ProfDashboardService, public assessmentService:AssessmentService, loginService:LoginService , public auth:AuthService) { 
    this.user = loginService.email
    this.auth.user$.subscribe(res => {
      this.user = res!.email
    })
    
  }

  ngOnInit(): void {
    console.log('what is this? ', this.user)
    this.assessmentService.getCurrentAssessmentsbyProf(this.user).subscribe((res: any)=>{
      console.log('hit: ', res)
      this.currentAssessments = res
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
    this.assessmentService.testIDUpdate()
    
    this.router.navigateByUrl("/assessment");
  }

  Projectss = [
    {
      p_name: "Achieving The Singularity",
      s_name: "Bobby",
      term: 'Fall 2021',
      status: 'Not Graded'
    },
    {
      p_name: "Roko's Basilisk",
      s_name: "Bobby Jr",
      term: 'Fall 2021',
      status: 'Not Graded'
    },
    {
      p_name: "Can an AI Fill the Void Vanessa Left?",
      s_name: "Bobby jr III",
      term: 'Fall 2021',
      status: 'Graded'
    },
    {
      p_name: "Building a Robot to Play Backgammon with my Pee Paw",
      s_name: "Bobby jr III",
      term: 'Fall 2021',
      status: 'Graded'
    }
  ]

}
