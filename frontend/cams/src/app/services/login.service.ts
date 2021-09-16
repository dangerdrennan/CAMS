import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from '../Auth'
import { Professor } from '../prof'
import { BehaviorSubject, Observable, Observer, of, Subject } from 'rxjs';
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

  public prof$!: Observable<Professor[]>;
  public prof: Professor[] = []
  public isLoggedIn$ = new BehaviorSubject<boolean>(false)
  public email$ = new BehaviorSubject<string>('')
  public email!: string;

  constructor(private http:HttpClient) {
    
  }

  getAll(): Observable<Professor[]>{
    return this.http.get<Professor[]>(this.apiURL +'all_profs');
  }

  checkDatabase(auth: Auth ): Observable<Professor[]>{
    return this.http.get<Professor[]>(`${this.apiURL}login/${auth.email}`);
  }
  
  setAuth(login_email:string, login_password:string){
    this.auth.email = 'rowling@potter.co.uk';
    this.auth.password = '454349E422F05297191EAD13E21D3DB520E5ABEF52055E4964B82FB213F593A1';
    console.log('set auth to ' , this.auth)
    //this.auth.email = login_email;
    //this.auth.password = login_password
    this.prof$ = this.checkDatabase(this.auth)
    this.prof$.subscribe(res => {
      console.log(res)
    })
    
  }

}
// For copy/paste quick tests
// this.auth.email = 'rowling@potter.co.uk';
// this.auth.password = '454349E422F05297191EAD13E21D3DB520E5ABEF52055E4964B82FB213F593A1';
