import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Professor } from '../prof';
import { Title } from '../Title';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  titles: Title[] = [{
    past_results: 'Past Results',
    manage_admins: 'Manage Admins',
    manage_projects: 'Manage Projects',
    projects: 'Projects',
    past_projects: 'Past Projects',
    logout: 'Logout',
    assessment: 'Assessment',
    change_outcomes: 'Update Outcomes'
  }]

  constructor() {}


}
