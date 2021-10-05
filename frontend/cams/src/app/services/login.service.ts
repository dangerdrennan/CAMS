import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { Professor } from '../prof';
import { BehaviorSubject } from 'rxjs';

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
  
  public userAdmin: boolean = true
  public user?: string
  private apiURL = 'http://localhost:4200/'


  constructor(auth:AuthService) { 
    auth.user$.subscribe(res => {
      this.user = res!.email
      console.log(res)
    })
  }


}
