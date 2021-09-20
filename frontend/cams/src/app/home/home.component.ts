import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent {

  // public userAdmin: boolean = true
  
  constructor(public loginService: LoginService) {}
  

    

}
