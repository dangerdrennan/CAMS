import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Accessor } from '../Accessor';

const httpOptions =
{
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  endPoint = "http://localhost:4201"
  notifier= new Subject()

  constructor(private http: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getAllProfs(): Observable<Accessor[]>{
    return this.http.get<Accessor[]>(this.endPoint + '/all_profs')
  }

  setCurrentCapstoneProfessor(accessor:Accessor): Observable<Accessor[]>{
    const url = `${this.endPoint}/set_capstone_prof`;
    return this.http.post<Accessor[]>(url, accessor, httpOptions)
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
    this.updateProf(accessor).pipe(take(1)).subscribe()
    this.setProfAsCurrentGrader(accessor).pipe(take(1)).subscribe()
    this.addAssessmentsForNewGrader(accessor).pipe(takeUntil(this.notifier)).subscribe()
  }
  
  setProfAsCurrentGrader(accessor: Accessor): Observable<Accessor[]>{
    const url = `${this.endPoint}/make_grader`;
    return this.http.post<Accessor[]>(url, accessor, httpOptions)
  }

  addAssessmentsForNewGrader(accessor:Accessor): Observable<any[]>{
    const url = `${this.endPoint}/add_assessments_by_prof`;
    return this.http.post<any[]>(url, accessor, httpOptions)
  }

  setProfAsNongrader(accessor: Accessor){
    this.revokeGraderStatus(accessor).pipe(takeUntil(this.notifier)).subscribe()
    this.deleteNongraderAssessments(accessor).pipe(takeUntil(this.notifier)).subscribe()
  }

  revokeGraderStatus(accessor: Accessor): Observable<Accessor[]>{
    const url = `${this.endPoint}/make_nongrader`;
    return this.http.post<Accessor[]>(url, accessor, httpOptions)
  }

  deleteNongraderAssessments(accessor: Accessor): Observable<any>{
    const url = `${this.endPoint}/delete_assessments_by_prof/${accessor.prof_email}`;
    return this.http.delete<any>(url)
  }

  updateTerm(semester:string, year:number): Observable<any>{
    const url = `${this.endPoint}/update_term`;
    return this.http.post<any[]>(url, {semester, year}, httpOptions)
  }

  getCurrentTerm(): Observable<any>{
    return this.http.get<any>(this.endPoint + '/current_term')
  }

  // not sure if we want this or not, but we have it
  // populates the assessment table with every grader and
  // every student
  populateSemester(): Observable<any>{
    const url = `${this.endPoint}/populate_semester`;
    return this.http.post<any[]>(url, {'empty': 'object'}, httpOptions)
  }

  ngOnDestory(){
    this.notifier.next()
    this.notifier.complete()
  }

}