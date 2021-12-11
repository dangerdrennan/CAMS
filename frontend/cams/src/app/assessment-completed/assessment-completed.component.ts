import { Component, OnInit } from '@angular/core';

/**
 * This component presents the user with a successful submission message and the option to reroute back to the projects component
 */

@Component({
  selector: 'app-assessment-completed',
  templateUrl: './assessment-completed.component.html',
  styleUrls: ['./assessment-completed.component.css']
})
export class AssessmentCompletedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
}
