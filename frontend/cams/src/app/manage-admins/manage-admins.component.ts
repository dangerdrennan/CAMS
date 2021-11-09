import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { first, take, takeUntil } from 'rxjs/operators';
import { Accessor } from '../Accessor';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-manage-admins',
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.css']
})
export class ManageAdminsComponent implements OnInit {
  notifier = new Subject()
  accessors$: Observable<Accessor[]>
  adminService: AdminService
  accessor: Accessor

  constructor(private router: Router, aS: AdminService) { 
    this.adminService = aS
    this.accessor = {
      prof_email: 'lovecraftlover@karta.solutions',
      f_name: 'Dexter',
      l_name: 'McPherson',
      department: 'Science'
    }
    this.accessors$ = this.getCurrentAssessors()
    this.accessors$.pipe(takeUntil(this.notifier)).subscribe()
    //this.addProf(this.accessor)
    //this.updateProfName(this.accessor, 'C.S.', 'Lewis', 'Philology')
    //this.makeProfAdmin(this.accessor)
    //this.revokePermissions(this.accessor)
    //this.makeProfNongrader(this.accessor)
    //this.updateTerm('Spring', 2023)
    //this.updateTerm('Fall', 2021)
    // this.adminService.getCurrentTerm().pipe(first()).subscribe(res=>{
    //   console.log(`${res[0].semester} ${res[0].year}`)
    // })
    //this.populateCurrentSemester()
    //this.setCurrentCapstoneProf(this.accessor)
    
  }

  getCurrentAssessors(){
    return this.adminService.showCurrentGraders()
  }

  setCurrentCapstoneProf(accessor:Accessor){
    this.adminService.setCurrentCapstoneProfessor(this.accessor).pipe(first()).subscribe()
  }

  updateProfName(accessor:Accessor, f_name:string, l_name:string, department:string){
    accessor.f_name = f_name
    accessor.l_name = l_name
    accessor.department = department
    this.adminService.updateProf(accessor).pipe(first()).subscribe()
  }

  makeProfAdmin(accessor:Accessor){
    this.adminService.giveAdminPrivileges(accessor).pipe(first()).subscribe()
  }

  revokePermissions(accessor:Accessor){
    this.adminService.revokeAdminPrivileges(accessor).pipe(first()).subscribe()
  }

  addProf(accessor:Accessor){
    this.adminService.addGraderAndAssessments(accessor)
  }

  makeProfNongrader(accessor:Accessor){
    this.adminService.setProfAsNongrader(accessor)
  }

  updateTerm(semester:string, year:number){
    this.adminService.updateTerm(semester,year).pipe(first()).subscribe()
  }

  populateCurrentSemester(){
    this.adminService.populateSemester().pipe(first()).subscribe()
  }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigateByUrl('/home');
  }

  ngOnDestroy(){
    this.notifier.next()
    this.notifier.complete()
  }
}
