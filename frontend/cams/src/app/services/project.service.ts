import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
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
  semYear!: {semester:string, year:number}[]
  endPoint = "http://localhost:4201"

  constructor(private http: HttpClient) {
    this.getSemYear().pipe(first()).subscribe(res =>{
      this.semYear = res
      // console.log(this.semYear)
    })
  }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getAllProjects() : Observable<Project[]>{
    return this.http.get<Project[]>(this.endPoint + '/all_proj')
  }

  getCurrentProjects() : Observable<Project[]>{
    return this.http.get<Project[]>(this.endPoint + '/current_proj')
  }

  addProject(name:string): Observable<Project[]>{
    const url = `${this.endPoint}/add_project/${name}`;
    return this.http.post<Project[]>(url, {name}, httpOptions)
  }

  assignStudentToProject(student: Student): Observable<Student[]> {
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
    const url = `${this.endPoint}/add_assessments/${student.student_id}`
    return this.http.post<any[]>(url, student, httpOptions);
  }

  getProjectStudents(project:Project): Observable<Student[]>{
    const url = `${this.endPoint}/students_by_project/${project.proj_id}`
    return this.http.get<Student[]>(url)
  }

  getSemYear(): Observable<{semester:string, year:number}[]>{
    const url = `${this.endPoint}/current_term`
    return this.http.get<{semester:string, year:number}[]>(url)
  }

}
