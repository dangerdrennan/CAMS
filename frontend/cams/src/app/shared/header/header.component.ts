import { Component, OnInit } from '@angular/core';
import { Professor } from 'src/app/prof';
import { LoginService } from 'src/app/services/login.service';
import { ProfDashboardService } from 'src/app/services/prof-dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public loginService: LoginService, public profDashService: ProfDashboardService) { }

  ngOnInit() {

  }





}