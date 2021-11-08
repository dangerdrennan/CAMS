import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfDashboardService } from 'src/app/services/prof-dashboard.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  
  user: string
  constructor(private router: Router, public profDashService: ProfDashboardService, public projectService: ProjectService) { 
    this.user = profDashService.userEmail
  }

  ngOnInit(): void {

  }

  assessments() {
    this.profDashService.isAssessing = true;
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
