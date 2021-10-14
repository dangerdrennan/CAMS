import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-past-results',
  templateUrl: './past-results.component.html',
  styleUrls: ['./past-results.component.css']
})
export class PastResultsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigateByUrl('/past-assessments');
  }
}
