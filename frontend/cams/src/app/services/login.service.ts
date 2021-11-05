import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})

export class LoginService{


  public userAdmin: boolean = true;
  public user: string
  public isLoggedIn?: boolean
  public auth: AuthService
  public email: string

  constructor(auth0:AuthService) {
    this.auth = auth0
    this.auth.user$.subscribe(res => {
      this.user = res!.email
    })
    this.auth.isAuthenticated$.subscribe(res => {
      this.isLoggedIn = res!
    })
  }




}
