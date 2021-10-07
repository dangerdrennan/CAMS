import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  public userAdmin: boolean = false;
  public user?: string
  public isLoggedIn?: boolean

  constructor(auth:AuthService) { 
    auth.user$.subscribe(res => {
      this.user = res!.email
      console.log(res)
    })
    auth.isAuthenticated$.subscribe(res => {
      this.isLoggedIn = res!
    })
  }


}
