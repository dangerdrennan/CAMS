import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * NOTE: dont think this was used
 */

@Component({
  selector: 'app-manage-assessors',
  templateUrl: './manage-assessors.component.html',
  styleUrls: ['./manage-assessors.component.css']
})
export class ManageAssessorsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigateByUrl('/home');
  }

}
