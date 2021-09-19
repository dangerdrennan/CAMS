import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document) {
    
  }

  ngOnInit(): void {
    this.auth.loginWithRedirect({appState: { target: 'localhost:4200/logout_button' }}) // we will replace this with the dashboard url
  }
  
}
