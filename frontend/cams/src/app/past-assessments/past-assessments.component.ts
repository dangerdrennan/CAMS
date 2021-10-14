import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-past-assessments',
  templateUrl: './past-assessments.component.html',
  styleUrls: ['./past-assessments.component.css']
})
export class PastAssessmentsComponent implements OnInit {
  form!: FormGroup;
  constructor(private router: Router, private builder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      term: ['', Validators.required],
      year: ['', Validators.required],
      degree: ['', Validators.required]
    })
  }

  goBack() {
    this.router.navigateByUrl('/home');
  }

  find() {
    this.router.navigateByUrl('/past-assessments/semester/year')
  }
}
