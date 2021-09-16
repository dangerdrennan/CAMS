import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from '../Auth'
import { Professor } from '../prof'
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { filter, pluck, shareReplay } from "rxjs/operators";



const httpOptions =
{
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiURL = 'http://localhost:4201/'
  auth:Auth ={
    email: '',
    password: ''
  };

  public prof$: Observable<Professor>[] = [];
  public prof: Professor[] = []
  public isLoggedIn$ = new BehaviorSubject<boolean>(false)
  public email!: string;

  constructor(private http:HttpClient) { 
    this.getAll().subscribe(res => {
      this.prof = res;
      })
    
  }

  getAll(): Observable<Professor[]>{
    return this.http.get<Professor[]>(this.apiURL +'all_profs');
  }

  checkDatabase(auth: Observable<Auth>): Observable<Professor[]>{
    return this.http.get<Professor[]>(this.apiURL +'login');
  }

  setAuth(login_email:string, login_password:string){
    this.auth.email = 'rowling@potter.co.uk';
    this.auth.password = '454349E422F05297191EAD13E21D3DB520E5ABEF52055E4964B82FB213F593A1';
    // this.auth.email = login_email;
    // this.auth.password = login_password
    const a = this.checkDatabase(of(this.auth))
    //console.log(this.prof$)
    this.isLoggedIn$.next(true)
  }

}


