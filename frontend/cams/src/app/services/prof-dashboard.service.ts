import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { Professor } from '../prof';

@Injectable({
  providedIn: 'root'
})
export class ProfDashboardService {
  public userEmail: string = '';
  public userFirstName: string = '';
  public userLastName: string = '';
  public department: string = '';
  public isAdmin: boolean = false;
  public isGrader: boolean = false;

  public allProfs = [];
  public profByEmail = [];

  endPoint = "http://localhost:4201"

  constructor(public http: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // api call to get prof info
  getProfInfoByEmail(prof_email: string):Observable<any> {
    return this.http.get<any>(this.endPoint + '/get_prof/' + prof_email)
  }


  getAllProfs(): Observable<Professor> {
    return this.http.get<Professor>(this.endPoint + '/all_profs')
  }


}
