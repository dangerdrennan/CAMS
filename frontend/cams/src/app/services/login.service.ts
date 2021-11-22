import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { filter, take } from 'rxjs/operators';
import { Professor } from '../prof';
import { ProfDashboardService } from './prof-dashboard.service'

@Injectable({
  providedIn: 'root'
})

export class LoginService{


  public userAdmin: boolean = true;
  public user: string = ''
  public isLoggedIn?: boolean
  // public auth: AuthService
  public email!: string

  constructor(public auth:AuthService, private profDashService: ProfDashboardService) {
    // this.auth = auth0
    this.auth.user$.subscribe((res:any) => {
      // this.profDashService.professor = res
      console.log("user  ", res.email)
      this.user = res.email



      profDashService.getProfInfoByEmail(this.user).subscribe((response: Professor) => {
        // console.log("res!!* ", response)
        this.profDashService.professor = response

        if(response === null) {
          // console.log("exiting")
          this.auth.logout()
        }
      })
    })

    this.profDashService.newTermCheck().pipe(take(1)).subscribe()

    this.auth.isAuthenticated$.subscribe(res => {
      this.isLoggedIn = res!
    })
  }

  

}
