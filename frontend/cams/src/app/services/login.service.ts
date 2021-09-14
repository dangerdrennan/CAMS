import { Injectable } from '@angular/core';
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
  private apiURL = 'http://localhost:4201/'
  auth:Auth ={
    email: '',
    password: ''
  };

  constructor(private http:HttpClient) { }


  // Auth(): Observable<Auth[]>{
  //   return this.http.get<Auth[]>(this.apiURL +'login');
  // }



}
