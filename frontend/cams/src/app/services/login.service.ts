import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from '../Auth'

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

  public userAdmin: boolean = false;

  private apiURL = 'http://localhost:4200/'
  auth:Auth ={
    email: '',
    password: ''
  };

  constructor() {

  }





  // Auth(): Observable<Auth[]>{
  //   return this.http.get<Auth[]>(this.apiURL +'login');
  // }



}
