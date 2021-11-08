import { Component, Inject, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { ProfDashboardService } from 'src/app/services/prof-dashboard.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  constructor(public profDashService: ProfDashboardService, public loginService: LoginService,
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document) { }

  logout(){
    this.auth.logout({returnTo: this.doc.location.origin})
    this.profDashService.professor = []
  }
}
