import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Professor } from '../prof';
import { LoginService } from '../services/login.service';
import { ProfDashboardService } from '../services/prof-dashboard.service';

/**
 * NOTE: dont think this was used
 */

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  user?: string;
  professor!: Professor


  constructor(public loginService: LoginService, private builder: FormBuilder, public profService: ProfDashboardService, private router: Router) {

  }

  ngOnInit() {
    // this.user = this.loginService.user
    // this.grabAllProfs();
    // this.grabProfByEmail(this.user!) // this.user!
    // this.profService.isAssessing=false

  }

  goToAdmins() {
    this.router.navigateByUrl('/admins');
  }

  goToManProj() {
    this.router.navigateByUrl('/manage-projects');
  }

  goToManAssessor() {
    this.router.navigateByUrl('/manage-assessors');
  }

//   setAll(email: string, fname: string, lname: string, department: string, isAdmin: boolean, isGrader: boolean) {
//     this.profService.userEmail = email;
//     this.profService.userFirstName = fname;
//     this.profService.userLastName = lname;
//     this.profService.department = department;
//     this.profService.isAdmin = isAdmin;
//     this.profService.isGrader = isGrader;
//     console.log(this.profService.userEmail)
//   }

//   getAll() {
//     return this.profService.userEmail, this.profService.userFirstName, this.profService.userLastName, this.profService.department, this.profService.isAdmin, this.profService.isGrader
//  }

//   grabProfByEmail(email: string) {
//     console.log("made it***")
//     return this.profService.getProfInfoByEmail(email).subscribe((data: any) => {

//       this.professor = data;
//       console.log("prof data ", this.professor)
//       this.storeProfData();
//     })
//   }

//   storeProfData() {
//     this.profService.profByEmail.filter((item: Professor) => {
//       this.setAll(item.prof_email, item.f_name, item.l_name, item.department, item.is_admin, item.is_grader);
//       return this.getAll();
//     })
//   }

//   // not sure if needed but stored it profService anyways
//   grabAllProfs() {
//     return this.profService.getAllProfs().subscribe((data: any) => {
//       this.profService.allProfs = data;
//     })
//   }
}



