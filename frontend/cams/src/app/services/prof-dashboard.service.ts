import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from '../prof';
import { environment as env } from 'src/environments/environment';

/**
 * Service mainly responsible for grabbing professor information.
 * All professors entered into the system stay in the database even after removal
 * but their status 'isGrader' is set to false. No functions that trigger new assessments 
 * will be triggered for them and they will no longer be recognized by the database and will
 * not be allowed into the system by login service. However, if for any reason
 * there's an immediate reason a former professor should no longer have access to the
 * application, remove them from the allowed Auth0 users immediately.
 * To access your Auth0 User Management settings, please refer to the official CAMS user manual ->>
 * https://docs.google.com/document/d/1349ghwB87jCgqbtXg-8pQQx5EqI6P7QMIcsNknzSTo8/edit
 */

@Injectable({
  providedIn: 'root'
})
export class ProfDashboardService {
  public isAssessing: boolean = false; // boolean set to false that triggers true when prof clicks on an assessment container
  public userEmail: string = ''; // professor email, also the primary key in the database and essentially how auth0 recognizes them
  public userFirstName: string = ''; // first name for display
  public userLastName: string = ''; // last name for display
  public department: string = ''; // department for display
  public isAdmin: boolean = false; // important boolean that determines the permissions displayed
  public isGrader: boolean = false; // boolean that, if false, doesn't allow a professor access to any features of cams. See block comment above
  public allProfs = [];
  public profByEmail = [];

  professor: any = []


  endPoint = env.API

  constructor(public http: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // api call to get prof info
  getProfInfoByEmail(prof_email: string):Observable<Professor> {
    return this.http.get<Professor>(this.endPoint + '/get_prof/' + prof_email)
  }

  // returns all professors. Used in 'Manage Admins' tab
  getAllProfs(): Observable<Professor> {
    return this.http.get<Professor>(this.endPoint + '/all_profs')
  }

  // NOTE: this any is fine, but double check 
  // the behavior of this function after
  // changing the return type to void
  newTermCheck(): Observable<any> {
    return this.http.get<any>(this.endPoint + '/term_check')
  }




}
