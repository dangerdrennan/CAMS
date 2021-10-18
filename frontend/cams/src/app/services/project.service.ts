import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../Project'
import { Student } from '../Student';


const httpOptions =
{
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  
  projects: Project[] = []
  endPoint = "http://localhost:4201"

  constructor(private http: HttpClient) { 
    
  }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getAllProjects() : Observable<Project[]>{
    return this.http.get<Project[]>(this.endPoint + '/all_proj')
  }

  addProject(name:string): Observable<Project[]>{
    console.log('in project service', name)
    const url = `${this.endPoint}/add_project/${name}`;
    return this.http.post<Project[]>(url, {name}, httpOptions) 
  }

  assignStudentToProject(student: Student): Observable<Student[]> {
    console.log('in project service', student)
    const url = `${this.endPoint}/add_student/`;
    return this.http.post<Student[]>(url, student, httpOptions) 
  }

  deleteProject(project: string){
    const url = `${this.endPoint}/delete_project/${project}`;
    return this.http.delete<Project>(url);
  }

  deleteStudent(id: number) : Observable<Student[]> {
    const url = `${this.endPoint}/delete_student/${id}`;
    return this.http.delete<Student[]>(url);
  }

  addAssessment(student: Student): Observable<any>{
    console.log(student)
    const url = `${this.endPoint}/add_assessments/${student.student_id}`
    return this.http.post<any[]>(url, student, httpOptions);
  }

  getProjectStudents(project:Project): Observable<Student[]>{
    const url = `${this.endPoint}/students_by_project/${project.proj_id}`
    return this.http.get<Student[]>(url)
  }

}

// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { ProfDashboardService } from 'src/app/services/prof-dashboard.service';
// import { Observable } from 'rxjs';
// import { Project } from 'src/app/Project';
// import { ProjectService } from 'src/app/services/project.service';
// import { Student } from 'src/app/Student';

// @Component({
//   selector: 'app-projects',
//   templateUrl: './projects.component.html',
//   styleUrls: ['./projects.component.css']
// })
// export class ProjectsComponent implements OnInit {
  
//   user: string
//   projectService: ProjectService
//   project$!: Observable<Project[]>
//   projects$: Observable<Project[]>
//   students: Student[] = [
//   {degree: 'cs', f_name:'Phillip', l_name: 'Drennan'},
//   {degree: 'cse', f_name:'Dave', l_name: 'Kapinsky'},
//   {degree: 'cse', f_name:'Naomi', l_name: 'Craven'},
// ]

// // You can just add the ProjectService injection to whatever other services are in the component's constructor
// constructor(private router: Router, public profDashService: ProfDashboardService, public pS: ProjectService) { 
//   this.user = profDashService.userEmail
//   this.projectService = pS
//   this.projects$ = this.projectService.getAllProjects()
//   this.projects$.subscribe(res => {
//     console.log(res)
//   })
//   this.addProject("test_project", this.students)
//   this.deleteProject("test_project")
//   this.deleteStudent(1)
// }



// // This data should come from a form. It takes the project name and
// // some student objects, so you need to make sure you're taking form input
// // data and putting the variables into student objects. Then you pass in the
// // project name from the form and the student objects.
// addProject(name:string, students: Student[]){
//   console.log(name)
//   this.project$ = this.projectService.addProject(name)
//   console.log(this.project$)
//   this.project$.subscribe(res => {
//     for(let i = 0; i < this.students.length; i++){
//       this.students[i].proj_id = res[0].proj_id!
//       this.addStudent(this.students[i])
//       this.projectService.getProjectStudents(res[0]!).subscribe(res2 => {
//         console.log('student in project: ', res2)
//       })
//     }
//   })
// }

// deleteProject(name:string){
//   console.log(name)
//   this.projectService.deleteProject(name).subscribe()
// }

// getProjectStudents(project:Project){
//   console.log(project)
//   this.projectService.getProjectStudents(project).subscribe(res =>{
//     console.log(res)
//   })
// }


// // not positive if this will be used in the same component that uses
// // project service, but it works and we have it now, so we can
// // put it whereever it belongs. Takes in a student_id and deletes it from
// // the database.
// deleteStudent(id: number){
//   this.projectService.deleteStudent(id).subscribe()
// }

// addStudent(student: Student){
//   this.projectService.assignStudentToProject(student).subscribe(
//     res => {
//       console.log(res[0])
//       this.addStudentAssessment(res[0]!)
//     }
//   )
// }

// addStudentAssessment(student: Student){
//   console.log('hit')
//   this.projectService.addAssessment(student).subscribe()
// }



//   ngOnInit(): void {

//   }

//   assessments() {
//     this.profDashService.isAssessing = true;
//     this.router.navigateByUrl("/assessment");
//   }

//   Projectss = [
//     {
//       p_name: "Achieving The Singularity",
//       s_name: "Bobby",
//       term: 'Fall 2021',
//       status: 'Not Graded'
//     },
//     {
//       p_name: "Roko's Basilisk",
//       s_name: "Bobby Jr",
//       term: 'Fall 2021',
//       status: 'Not Graded'
//     },
//     {
//       p_name: "Can an AI Fill the Void Vanessa Left?",
//       s_name: "Bobby jr III",
//       term: 'Fall 2021',
//       status: 'Graded'
//     },
//     {
//       p_name: "Building a Robot to Play Backgammon with my Pee Paw",
//       s_name: "Bobby jr III",
//       term: 'Fall 2021',
//       status: 'Graded'
//     }
//   ]

// }
