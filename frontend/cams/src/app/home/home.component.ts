import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent {

  // public userAdmin: boolean = true
  user?: string
  
  
  constructor(public loginService: LoginService) {
  }
  
  ngOnInit(){
    this.user = this.loginService.user
    console.log('is', this.user + ' logged in?: ' + this.loginService.isLoggedIn)
  }
    

}
