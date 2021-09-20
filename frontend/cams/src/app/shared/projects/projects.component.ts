import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  Projectss = [
    {
      p_name: "Achieving The Singularity",
      s_name: "Bobby",
      term: 'Fall 2021',
      status: 'not graded'
    },
    {
      p_name: "Roko's Basilisk",
      s_name: "Bobby Jr",
      term: 'Spring 2021',
      status: 'in progress'
    },
    {
      p_name: "Can an AI Fill the Void Vanessa Left?",
      s_name: "Bobby jr III",
      term: 'Summer 2021',
      status: 'graded'
    },
    {
      p_name: "Building a Robot to Play Backgammon with my Pee Paw",
      s_name: "Bobby jr III",
      term: 'Summer 2021',
      status: 'graded'
    }
  ]

  constructor() { }

  ngOnInit(): void {
    console.log(this.Projectss)
  }

}
