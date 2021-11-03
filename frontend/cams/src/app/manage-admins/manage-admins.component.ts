import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  termUpdated: boolean = false;
  notifier = new Subject()
  // accessors$: Observable<Accessor[]>
  // adminService: AdminService
  accessor!: Accessor;
  updateAccessor!: Accessor
  newCapProf!: Accessor
  newSysAdmin!: Accessor

  addGraderform!: FormGroup
  editGraderForm!: FormGroup
  setCurrProfForm!: FormGroup
  setAdminForm!: FormGroup
  setTermForm!: FormGroup

  graders:Accessor[] = []
  semester!: string
  year!: number
  editGrader: boolean = false
  deleteGrader: boolean = false
  graderIndex!: number

  constructor(public adminService: AdminService, private builder: FormBuilder) {
    // this.adminService = aS
    this.addGraderform = this.builder.group({
      prof_email: ['', Validators.required],
      f_name: ['', Validators.required],
      l_name: ['', Validators.required],
      department: ['', Validators.required]
    })

    // update grader name modal
    this.editGraderForm = this.builder.group({
      f_name: [''],
      l_name: ['']
    })

    this.setCurrProfForm = this.builder.group({
      prof_email: ['', Validators.required],
      f_name: ['', Validators.required],
      l_name: ['', Validators.required],
      department: ['', Validators.required],
      curr_cap_prof: [true]
    })

    this.setAdminForm = this.builder.group({
      prof_email: ['', Validators.required],
      f_name: ['', Validators.required],
      l_name: ['', Validators.required],
      department: ['', Validators.required],
      is_admin: [true]
    })

    this.setTermForm = this.builder.group({
      semester: ['', Validators.required],
      year: ['', Validators.required]
    })

    // this.accessors$ = this.getCurrentAssessors()
    // this.accessors$.pipe(takeUntil(this.notifier)).subscribe()
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
    // this.populateCurrentSemester()
    // this.setCurrentCapstoneProf(this.accessor)

  }

  ngOnInit() {

   this.getCurrentAssessors()
   this.submitUpdateTerm()
   this.getCurrentTerm()
  }

  // trigger to add a current grader
  submitAddGrader() {
    this.accessor = {
      prof_email: this.addGraderform.get('prof_email')?.value,
      f_name : this.addGraderform.get('f_name')?.value,
      l_name: this.addGraderform.get('l_name')?.value,
      department: this.addGraderform.get('department')?.value,
    }
    this.addProf(this.accessor)
    this.graders.push(this.accessor)
    this.addGraderform.reset()
  }

  // trigger to update grader first name or last name or department
  submitGraderUpdate() {

    // populate Accessor object with user input changes
    this.updateAccessor = {
      prof_email: this.graders[this.graderIndex].prof_email,
      f_name: this.editGraderForm.get("f_name")?.value,
      l_name: this.editGraderForm.get("l_name")?.value,
      department: this.graders[this.graderIndex].department
    }
    this.updateProfName(this.updateAccessor)
    // update ui
    this.graders[this.graderIndex].f_name = this.editGraderForm.get("f_name")?.value
    this.graders[this.graderIndex].l_name = this.editGraderForm.get("l_name")?.value

  }

  // trigger to remove a current grader
  submitRemoveGrader(index: number) {
    for(let i = 0; i < this.graders.length; i+=1) {
      if(i === index) {
        this.makeProfNongrader(this.graders[index])
        this.graders.splice(index, 1)
      }
    }
  }

  // trigger to update current capstone professor
  submitCapProf() {
    this.newCapProf = {
      prof_email: this.setCurrProfForm.get("prof_email")?.value,
      f_name: this.setCurrProfForm.get("f_name")?.value,
      l_name: this.setCurrProfForm.get("l_name")?.value,
      department: this.setCurrProfForm.get("department")?.value,
      curr_cap_prof: this.setCurrProfForm.get("curr_cap_prof")?.value
    }
    this.setCurrentCapstoneProf(this.newCapProf)
  }

  // trigger to add a professor as a system administrator
  submitAdmin() {
    this.newSysAdmin = {
      prof_email: this.setAdminForm.get("prof_email")?.value,
      f_name: this.setAdminForm.get("f_name")?.value,
      l_name: this.setAdminForm.get("l_name")?.value,
      department: this.setAdminForm.get("department")?.value,
      is_admin: this.setAdminForm.get("is_admin")?.value
    }
    this.makeProfAdmin(this.newSysAdmin)
  }

  // trigger to remove professor as a system administrator
  submitRemoveAdmin(index: number) {
    this.revokePermissions(this.graders[index])
  }

  // trigger to update the current term
  submitUpdateTerm() {
    let term = this.setTermForm.get("semester")?.value
    let year = Number(this.setTermForm.get("year")?.value)
    this.updateTerm(term, year)

    this.semester = term
    this.year = year
  }

  // get all current graders
  getCurrentAssessors(){
    return this.adminService.showCurrentGraders().subscribe((res) => {
      res.filter((item: Accessor) => {
        this.graders.push(item)
      })

    })
  }

  setCurrentCapstoneProf(accessor:Accessor){
    this.adminService.setCurrentCapstoneProfessor(accessor).pipe(first()).subscribe(() => {
      location.reload()
    })
  }

  updateProfName(accessor:Accessor){
    //, f_name:string, l_name:string, department:string
    // accessor.f_name = f_name
    // accessor.l_name = l_name
    // accessor.department = department
    this.adminService.updateProf(accessor).pipe(first()).subscribe()
  }

  makeProfAdmin(accessor:Accessor){
    this.adminService.giveAdminPrivileges(accessor).pipe(first()).subscribe(() => {
      location.reload()
    })
  }

  revokePermissions(accessor:Accessor){
    this.adminService.revokeAdminPrivileges(accessor).pipe(first()).subscribe(() => {
      location.reload()
    })
  }

  addProf(accessor:Accessor){

    this.adminService.addGraderAndAssessments(accessor)
  }

  makeProfNongrader(accessor:Accessor){
    this.adminService.setProfAsNongrader(accessor)
  }

  getCurrentTerm() {
    this.adminService.getCurrentTerm().subscribe((res) => {
      this.semester = res[0].semester
      this.year = res[0].year
    })
  }

  updateTerm(semester:string, year:number){
    this.adminService.updateTerm(semester,year).pipe(first()).subscribe()
  }

  populateCurrentSemester(){
    this.adminService.populateSemester().pipe(first()).subscribe()
  }


  ngOnDestroy(){
    this.notifier.next()
    this.notifier.complete()
  }
}
