import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Professor } from '../prof';
import { LoginService } from '../services/login.service';
import { ProfDashboardService } from '../services/prof-dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  constructor(public loginService: LoginService, public profService: ProfDashboardService) {}
  
  ngOnInit() {
    this.grabAllProfs();
    this.grabProfByEmail('rowling@potter.co.uk') // this would be set with loginService
  }

  setAll(email: string, fname: string, lname: string, department: string, isAdmin: boolean, isGrader: boolean) {
    this.profService.userEmail = email;
    this.profService.userFirstName = fname;
    this.profService.userLastName = lname;
    this.profService.department = department;
    this.profService.isAdmin = isAdmin;
    this.profService.isGrader = isGrader;
  }

  getAll() {
    return this.profService.userEmail, this.profService.userFirstName, this.profService.userLastName, this.profService.department, this.profService.isAdmin, this.profService.isGrader
 }

  grabProfByEmail(email: string) {
    return this.profService.getProfInfoByEmail(email).subscribe((data: any) => {
      this.profService.profByEmail = data;
      this.storeProfData();
    })
  }

  storeProfData() {
    this.profService.profByEmail.filter((item: Professor) => {
      this.setAll(item.prof_email, item.f_name, item.l_name, item.department, item.is_admin, item.is_grader);
      return this.getAll();
    })
  }

  // not sure if needed but stored it profService anyways
  grabAllProfs() {
    return this.profService.getAllProfs().subscribe((data: any) => {
      this.profService.allProfs = data;
    })
  }

}


