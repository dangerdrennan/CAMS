import { HttpClient, HttpHeaders } from '@angular/common/http';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from '../prof';
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

}

// This is the temporary home for these component calls.
// They need to be placed in some component used by the admin.
// I tested them by putting them into a component and checking the
// backend/database, and it all looks good.
// Since we're added projects with the students at the same time, I put
// the call to add students in the addProject function.

// This first code here is starter code to test it out. You can put this
// in any componenet

// import { ProjectService } from 'src/app/services/project.service';
// import { Student } from 'src/app/Student';
// projectService: ProjectService
// students: Student[] = [
//   {degree: 'cs', f_name:'Phillip', l_name: 'Drennan'},
//   {degree: 'cse', f_name:'Dave', l_name: 'Kapinsky'},
//   {degree: 'cse', f_name:'Naomi', l_name: 'Craven'},
// ]

// You can just add the ProjectService injection to whatever other services are in the component's constructor
// constructor(private router: Router, public profDashService: ProfDashboardService, public pS: ProjectService) { 
//   this.user = profDashService.userEmail
//   this.projectService = pS
  // this.projects$ = this.projectService.getAllProjects()
  // this.projects$.subscribe(res => {
  //   console.log(res)
  // })
  //this.addProject("c", this.students)
  //this.deleteProject("c")
  //this.deleteStudent(10)
// }



// This data should come from a form. It takes the project name and
// some student objects, so you need to make sure you're taking form input
// data and putting the variables into student objects. Then you pass in the
// project name from the form and the student objects.
// addProject(name:string, students: Student[]){
//   console.log(name)
//   this.project$ = this.projectService.addProject(name)
//   console.log(this.project$)
//   this.project$.subscribe(res => {
//     for(let i = 0; i < this.students.length; i++){
//       this.students[i].project = res[0].title!
//       this.addStudent(this.students[i])
//     }
//   })
  
// }

// deleteProject(name:string){
//   console.log(name)
//   this.projectService.deleteProject(name).subscribe()
// }


// not positive if this will be used in the same component that uses
// project service, but it works and we have it now, so we can
// put it whereever it belongs. Takes in a student_id and deletes it from
// the database.
// deleteStudent(id: number){
//   this.projectService.deleteStudent(id).subscribe()
// }

// addStudent(student: Student){
//   this.projectService.assignStudentToProject(student).subscribe()
// }


