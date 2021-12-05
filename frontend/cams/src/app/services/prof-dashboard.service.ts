import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from '../prof';

@Injectable({
  providedIn: 'root'
})
export class ProfDashboardService {
  public isAssessing: boolean = false;
  public userEmail: string = '';
  public userFirstName: string = '';
  public userLastName: string = '';
  public department: string = '';
  public isAdmin: boolean = false;
  public isGrader: boolean = false;

  public allProfs = [];
  public profByEmail = [];

  professor: any = []


  endPoint = "https://capstone-management.herokuapp.com"

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


  getAllProfs(): Observable<Professor> {
    return this.http.get<Professor>(this.endPoint + '/all_profs')
  }

  newTermCheck(): Observable<any> {
    console.log('hit in prof_dash')
    return this.http.get<any>(this.endPoint + '/term_check')
  }




}
