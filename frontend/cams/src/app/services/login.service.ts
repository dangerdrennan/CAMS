import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { take } from 'rxjs/operators';
import { Professor } from '../prof';
import { ProfDashboardService } from './prof-dashboard.service'

/**
 * Our login service is mostly governed by Auth0
 * We check if a user email that was allowed in by Auth0 is recognized
 * by our database as a grader or an administrator of CAMS
 */

@Injectable({
  providedIn: 'root'
})

export class LoginService{

  public userAdmin: boolean
  public user: string = ''
  public isLoggedIn?: boolean
  public email!: string

  // logging in has already been successful if this constructor is triggered
  constructor(public auth:AuthService, private profDashService: ProfDashboardService) {
    this.auth.user$.subscribe((res:any) => {
      this.user = res.email // grabs the email from the Auth0 database
      profDashService.getProfInfoByEmail(this.user).subscribe((response: Professor) => {
        this.profDashService.professor = response // checks if a professor exists in the database with this email
        if(response === null) { // if no professor exits, proceed to logout NOTE: should we change this to !is_grader? Old professors still have access now.
          this.auth.logout()
        }
        else {
          this.userAdmin = response[0].is_admin // if professor exists, check for admin priveleges to trigger specific display
        }
      })
    })

    this.profDashService.newTermCheck().pipe(take(1)).subscribe() // function in backend that triggers new semester based on datetime of login if no term already exists.

    this.auth.isAuthenticated$.subscribe(res => {
      this.isLoggedIn = res! // sets 'isLoggedIn' var NOTE: we can almost certainly delete this.
    })
  }



}
