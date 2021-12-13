import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Accessor } from '../Accessor';
import { environment as env } from 'src/environments/environment';

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
  endPoint = env.API
  notifier= new Subject()

  constructor(private http: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // grabs all profs for display
  getAllProfs(): Observable<Accessor[]>{
    return this.http.get<Accessor[]>(this.endPoint + '/all_profs')
  }

  // sets a prof as the current capstone professor, just for 'Projects' display
  setCurrentCapstoneProfessor(accessor:Accessor): Observable<Accessor[]>{
    const url = `${this.endPoint}/set_capstone_prof`;
    return this.http.post<Accessor[]>(url, accessor, httpOptions)
  }

  // grabs professors who are 'graders'. This means that it shows everyone who can
  // be admitted into CAMS
  showCurrentGraders(): Observable<Accessor[]>{
    return this.http.get<Accessor[]>(this.endPoint + '/all_graders')
  }

  // sets is_grader = true, (allows them into the system)
  updateProf(accessor: Accessor): Observable<Accessor[]>{
    const url = `${this.endPoint}/add_prof`;
    return this.http.post<Accessor[]>(url, accessor, httpOptions)
  }

  // sets 'is_admin' to true
  giveAdminPrivileges(accessor: Accessor): Observable<Accessor[]>{
    const url = `${this.endPoint}/make_admin`;
    return this.http.post<Accessor[]>(url, accessor, httpOptions)
  }

  // sets 'is_admin' to false
  revokeAdminPrivileges(accessor: Accessor): Observable<Accessor[]>{
    const url = `${this.endPoint}/take_away_admin`;
    return this.http.post<Accessor[]>(url, accessor, httpOptions)
  }

  // this function organizes the logic to add assessments for this term
  // after adding a grading professor
  addGraderAndAssessments(accessor:Accessor){
    this.updateProf(accessor).pipe(take(1)).subscribe()
    this.setProfAsCurrentGrader(accessor).pipe(take(1)).subscribe()
    this.addAssessmentsForNewGrader(accessor).pipe(takeUntil(this.notifier)).subscribe()
  }
  
  // sets prof as a grader
  setProfAsCurrentGrader(accessor: Accessor): Observable<Accessor[]>{
    const url = `${this.endPoint}/make_grader`;
    return this.http.post<Accessor[]>(url, accessor, httpOptions)
  }

  // creates an assessment for each of the students with the new prof_email
  addAssessmentsForNewGrader(accessor:Accessor): Observable<string[]>{
    const url = `${this.endPoint}/add_assessments_by_prof`;
    return this.http.post<string[]>(url, accessor, httpOptions)
  }

  // take away a prof as a grader. Does not remove them from the database,
  // only removes them as a current grader. If they are added as a grader again,
  // we check if their email is in the database first and update their 'is_grader' field
  // else, we add a new row.
  setProfAsNongrader(accessor: Accessor){
    this.revokeGraderStatus(accessor).pipe(takeUntil(this.notifier)).subscribe()
  }

  // revokes grader status
  revokeGraderStatus(accessor: Accessor): Observable<Accessor[]>{
    const url = `${this.endPoint}/make_nongrader`;
    return this.http.post<Accessor[]>(url, accessor, httpOptions)
  }

  // grabs this current term
  getCurrentTerm(): Observable<number>{
    return this.http.get<number>(this.endPoint + '/current_term')
  }

  // ends subscriptions on leaving the displayed component
  ngOnDestory(){
    this.notifier.next()
    this.notifier.complete()
  }

}
