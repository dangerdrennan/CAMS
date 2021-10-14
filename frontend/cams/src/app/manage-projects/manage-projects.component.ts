import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.css']
})
export class ManageProjectsComponent implements OnInit {
  form!: FormGroup;
  form2!: FormGroup;
  constructor(private router: Router, private builder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      projectName: ['', Validators.required],
      studentName: ['', Validators.required],
      term: ['', Validators.required],
      year: ['', Validators.required],
      degree: ['', Validators.required],
      status: ['Not Graded'] // by default we'll mark as not graded
    })
    this.form2 = this.builder.group({
      profName: ['', Validators.required]
    })
  }

  goBack() {
    this.router.navigateByUrl('/home');
  }

  submit() {
    this.form.reset({
      term: '',
      year: ''
    });
  }

  secondSubmit() {
    this.form2.reset();
  }

}
