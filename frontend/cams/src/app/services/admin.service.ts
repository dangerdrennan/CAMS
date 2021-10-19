import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accessor } from '../Accessor';
import { isEmpty } from 'rxjs/operators';

const httpOptions =
{
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}



// 1. add prof --Done
// 2. make admin --Done
// 3. take away admin --Done
// 4. set as current grader --Done
// 5. take away as current grader --Done
// 6. update assessments for new current grader --Done
// 7. delete assessments for new non_grader
// 8. update term (make new assessments where assessments aren't already created)

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  //accessors$: Observable<Accessor[]>
  accessors$!: Observable<Accessor[]>
  accessors: Accessor[] = []
  endPoint = "http://localhost:4201"

  constructor(private http: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getAllProfs(): Observable<Accessor[]>{
    return this.http.get<Accessor[]>(this.endPoint + '/all_profs')
  }

  showCurrentGraders(): Observable<Accessor[]>{
    return this.http.get<Accessor[]>(this.endPoint + '/all_graders')
  }

  //currently updateProf sets is_grader = true
  updateProf(accessor: Accessor): Observable<Accessor[]>{
    const url = `${this.endPoint}/add_prof`;
    return this.http.post<Accessor[]>(url, accessor, httpOptions)
  }

  giveAdminPrivileges(accessor: Accessor): Observable<Accessor[]>{
    const url = `${this.endPoint}/make_admin`;
    return this.http.post<Accessor[]>(url, accessor, httpOptions)
  }

  revokeAdminPrivileges(accessor: Accessor): Observable<Accessor[]>{
    const url = `${this.endPoint}/take_away_admin`;
    return this.http.post<Accessor[]>(url, accessor, httpOptions)
  }

  addGraderAndAssessments(accessor:Accessor){
    this.updateProf(accessor).subscribe()
    this.setProfAsCurrentGrader(accessor).subscribe()
    this.addAssessmentsForNewGrader(accessor).subscribe()
  }
  
  setProfAsCurrentGrader(accessor: Accessor): Observable<Accessor[]>{
    const url = `${this.endPoint}/make_grader`;
    return this.http.post<Accessor[]>(url, accessor, httpOptions)
  }

  addAssessmentsForNewGrader(accessor:Accessor): Observable<Accessor[]>{
    const url = `${this.endPoint}/add_assessments_by_prof`;
    return this.http.post<Accessor[]>(url, accessor, httpOptions)
  }

  setProfAsNongrader(accessor: Accessor){
    this.revokeGraderStatus(accessor).subscribe()
    this.deleteNongraderAssessments(accessor).subscribe()
  }

  revokeGraderStatus(accessor: Accessor): Observable<Accessor[]>{
    const url = `${this.endPoint}/make_nongrader`;
    return this.http.post<Accessor[]>(url, accessor, httpOptions)
  }

  deleteNongraderAssessments(accessor: Accessor): Observable<any>{
    const url = `${this.endPoint}/delete_assessments_by_prof/${accessor.prof_email}`;
    return this.http.delete<any>(url)
  }

  updateTerm(semester:string, year:number){

  }
}
