import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfDashboardService } from 'src/app/services/prof-dashboard.service';
import { Observable } from 'rxjs';
import { Project } from 'src/app/Project';
import { ProjectService } from 'src/app/services/project.service';
import { Student } from 'src/app/Student';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  
  user: string
    projectService: ProjectService
    project$!: Observable<Project[]>
    projects$: Observable<Project[]>
    students: Student[] = [
    {degree: 'cs', f_name:'Phillip', l_name: 'Drennan'},
    {degree: 'cse', f_name:'Dave', l_name: 'Kapinsky'},
    {degree: 'cse', f_name:'Naomi', l_name: 'Craven'},
  ]


    constructor(private router: Router, public profDashService: ProfDashboardService, public pS: ProjectService) { 
    this.user = profDashService.userEmail
    this.projectService = pS
    this.projects$ = this.projectService.getAllProjects()
    this.projects$.subscribe(res => {
      console.log(res)
    })
    this.addProject("c", this.students)
    this.deleteProject("c")
    this.deleteStudent(10)
  }



  // This data should come from a form. It takes the project name and
  // some student objects, so you need to make sure you're taking form input
  // data and putting the variables into student objects. Then you pass in the
  // project name from the form and the student objects.
  addProject(name:string, students: Student[]){
    console.log(name)
    this.project$ = this.projectService.addProject(name)
    console.log(this.project$)
    this.project$.subscribe(res => {
      for(let i = 0; i < this.students.length; i++){
        this.students[i].project = res[0].title!
        this.addStudent(this.students[i])
      }
    })
    
  }

  deleteProject(name:string){
    console.log(name)
    this.projectService.deleteProject(name).subscribe()
  }


  // not positive if this will be used in the same component that uses
  // project service, but it works and we have it now, so we can
  // put it whereever it belongs. Takes in a student_id and deletes it from
  // the database.
  deleteStudent(id: number){
    this.projectService.deleteStudent(id).subscribe()
  }

  addStudent(student: Student){
    this.projectService.assignStudentToProject(student).subscribe()
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
