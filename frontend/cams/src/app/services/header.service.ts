
import { Injectable } from '@angular/core';
import { Title } from '../Title';

/**
 * Header service that keeps track of sidebar tab choice.
 * Keeps track of app state.
 */

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
