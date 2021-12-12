import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Project } from '../Project'
import { Student } from '../Student';
import { environment as env } from 'src/environments/environment';

/**
 * This service is solely responsible for managing the logic in the 
 * 'Manage Projects' tab. In our design, students need to have projects
 * to exist. However, projects don't need students to exist. This is 
 * a mistake and needs to be rectified at some point in the future. 
 * However, for right now it's pretty great. The error is strictly 
 * cosmetic and doesn't affect outcome aggregate data.
 */


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
  semYear!: {semester:string, year:number}[]
  endPoint = env.API

  // NOTE: missed "any" case
  constructor(private http: HttpClient) {
    this.getSemYear().pipe(first()).subscribe(res =>{
      this.semYear = res
    })
  }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // grabs all projects and populates the frontend
  // through a filter function
  // NOTE: holdover from earlier design: see if
  //        this can be deleted and the same logic 
  //        accomplished with getCurrentProjects
  getAllProjects() : Observable<Project[]>{
    return this.http.get<Project[]>(this.endPoint + '/all_proj')
  }

  // grabs all projects and populates the frontend
  // through a filter function
  getCurrentProjects() : Observable<Project[]>{
    return this.http.get<Project[]>(this.endPoint + '/current_proj')
  }

  // simple function that adds a project to the
  // current term
  addProject(name:string): Observable<Project[]>{
    const url = `${this.endPoint}/add_project/${name}`;
    return this.http.post<Project[]>(url, {name}, httpOptions)
  }

  // assigns a student to a project
  assignStudentToProject(student: Student): Observable<Student[]> {
    const url = `${this.endPoint}/add_student/`;
    return this.http.post<Student[]>(url, student, httpOptions)
  }

  // deletes a project. Triggers deletion of students attached
  // to project
  deleteProject(project: string){
    const url = `${this.endPoint}/delete_project/${project}`;
    return this.http.delete<Project>(url);
  }

  // deletes an individual student. Triggers deleting their assessments.
  deleteStudent(id: number) : Observable<Student[]> {
    const url = `${this.endPoint}/delete_student/${id}`;
    return this.http.delete<Student[]>(url);
  }

  // For every student added, assessments are added for the student
  // with this function.
  addAssessment(student: Student): Observable<any>{
    const url = `${this.endPoint}/add_assessments/${student.student_id}`
    return this.http.post<any[]>(url, student, httpOptions);
  }

  // grabs students attached to a project for display and editing
  getProjectStudents(project:Project): Observable<Student[]>{
    const url = `${this.endPoint}/students_by_project/${project.proj_id}`
    return this.http.get<Student[]>(url)
  }

  // grabs the current semester from the database
  getSemYear(): Observable<{semester:string, year:number}[]>{
    const url = `${this.endPoint}/current_term`
    return this.http.get<{semester:string, year:number}[]>(url)
  }

}
