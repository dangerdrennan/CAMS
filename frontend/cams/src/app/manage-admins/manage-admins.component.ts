import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Accessor } from '../Accessor';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-manage-admins',
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.css']
})
export class ManageAdminsComponent implements OnInit {

  adminService: AdminService
  accessor: Accessor

  constructor(private router: Router, aS: AdminService) { 
    this.adminService = aS
    this.accessor = {
      prof_email: 'test@gmail.com',
      f_name: 'Dexter',
      l_name: 'McPherson',
      department: 'Science'
    }
    this.addProf(this.accessor)
    //this.updateProfName(this.accessor, 'C.S.', 'Lewis', 'Philology')
    //this.makeProfAdmin(this.accessor)
    //this.revokePermissions(this.accessor)
    //this.makeProfNongrader(this.accessor)
    //this.updateTerm('Spring', 2023)
    // this.adminService.getCurrentTerm().subscribe(res=>{
    //   console.log(`${res[0].semester} ${res[0].year}`)
    // })
    this.getCurrentAssessors()
    this.populateCurrentSemester()
  }

  getCurrentAssessors(){
    this.adminService.showCurrentGraders().subscribe(res =>{
      console.log(res)
    })
  }

  updateProfName(accessor:Accessor, f_name:string, l_name:string, department:string){
    accessor.f_name = f_name
    accessor.l_name = l_name
    accessor.department = department
    console.log('new accessor object is set at ', accessor)
    this.adminService.updateProf(accessor).subscribe()
  }

  makeProfAdmin(accessor:Accessor){
    this.adminService.giveAdminPrivileges(accessor).subscribe()
  }

  revokePermissions(accessor:Accessor){
    this.adminService.revokeAdminPrivileges(accessor).subscribe()
  }

  addProf(accessor:Accessor){
    this.adminService.addGraderAndAssessments(accessor)
  }

  makeProfNongrader(accessor:Accessor){
    this.adminService.setProfAsNongrader(accessor)
  }

  updateTerm(semester:string, year:number){
    this.adminService.updateTerm(semester,year).subscribe()
  }

  populateCurrentSemester(){
    this.adminService.populateSemester().subscribe()
  }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigateByUrl('/home');
  }
}
