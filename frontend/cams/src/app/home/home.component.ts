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
  isLoggedIn?: boolean
  
  
  constructor(public loginService: LoginService) {
  }
  
  ngOnInit(){
    this.user = this.loginService.user
    this.isLoggedIn = this.loginService.isLoggedIn
    console.log('in home: ', this.user + ' is logged in?: ' + this.isLoggedIn)
  }
    

}
