import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

/**
 * This component is the logout button to let auth0 know that a user is logging out and redirects them to the auth0 login page.
 */

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent implements OnInit {

  constructor(public auth:AuthService,
    @Inject(DOCUMENT) private doc: Document) { }

  ngOnInit(): void {
  }

  logout(){
    this.auth.logout({returnTo: this.doc.location.origin})
  }

}
