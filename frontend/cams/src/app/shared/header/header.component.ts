import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header.service';
import { LoginService } from 'src/app/services/login.service';
import { ProfDashboardService } from 'src/app/services/prof-dashboard.service';

/**
 * This component is what holds the headers that appear on the page when you select a tab on the left hand sidebar. The header titles update dynamically from the sidebar tabs.
 */

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title: string = ''

  constructor(public route: Router, public loginService: LoginService, public profService: ProfDashboardService, public headerService: HeaderService) {}


  ngOnInit() {

  }



}
