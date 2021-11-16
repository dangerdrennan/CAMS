import { ValueConverter } from '@angular/compiler/src/render3/view/template';
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

  accessor!: Accessor;
  updateAccessor!: Accessor
  newCapProf!: Accessor
  newSysAdmin!: Accessor

  addGraderform!: FormGroup;
  editGraderForm!: FormGroup
  setTermForm!: FormGroup

  graders:Accessor[] = []
  semester!: string
  year!: number
  editGrader: boolean = false
  deleteGrader: boolean = false
  graderIndex!: number

  regTxtPattern = /^[a-zA-Z ]{2,30}$/
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
  yearPattern = /^\d+$/
  submitted: boolean = false

  constructor(public adminService: AdminService, private builder: FormBuilder) {  }

  ngOnInit() {
    this.addGraderform = this.builder.group({
      f_name: ['', [Validators.required, Validators.pattern(this.regTxtPattern)]],
      l_name: ['', [Validators.required, Validators.pattern(this.regTxtPattern)]],
      prof_email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      department: ['', [Validators.required, Validators.pattern(this.regTxtPattern)]]
    })

    // update grader name modal
    this.editGraderForm = this.builder.group({
      f_name: ['', [Validators.pattern(this.regTxtPattern)]],
      l_name: ['', [Validators.pattern(this.regTxtPattern)]]
    })

    this.setTermForm = this.builder.group({
      semester: ['', [Validators.required, Validators.pattern(this.regTxtPattern)]],
      year: ['', [Validators.required, Validators.pattern(this.yearPattern)]]
    })


    this.submitted = false
    this.getCurrentAssessors()
    this.getCurrentTerm()
  }

  get f() {
    return this.addGraderform.controls
  }

  get getEdit() {
    return this.editGraderForm.controls
  }

  resetEditForms() {
    this.editGraderForm.reset()
  }


  // trigger to add a current grader
  submitAddGrader() {
    this.submitted = true

    if(!this.addGraderform.valid) {
      console.log("nope ):")
      this.addGraderform.reset()
      this.submitted = false
    }
    else {
      this.accessor = {
        prof_email: this.addGraderform.get('prof_email')?.value,
        f_name : this.addGraderform.get('f_name')?.value,
        l_name: this.addGraderform.get('l_name')?.value,
        department: this.addGraderform.get('department')?.value,
      }
      this.graders.push(this.accessor)
      this.addProf(this.accessor)

    }



  }

  // trigger to update grader first name or last name or department
  submitGraderUpdate() {
    this.submitted = true

    if(!this.editGraderForm.valid) {
      console.log("nope ):")
      this.editGraderForm.reset()
      this.submitted = false
    }
    else {
      // populate Accessor object with user input changes
      // update if only first name was changed
      if(this.getEdit['l_name'].pristine) {
        this.updateAccessor = {
          prof_email: this.graders[this.graderIndex].prof_email,
          f_name: this.editGraderForm.get("f_name")?.value,
          l_name: this.graders[this.graderIndex].l_name,
          department: this.graders[this.graderIndex].department
        }
        this.graders[this.graderIndex].f_name = this.editGraderForm.get("f_name")?.value

      }
      // update if only last name was changed
      else if(this.getEdit['f_name'].pristine) {
        this.updateAccessor = {
          prof_email: this.graders[this.graderIndex].prof_email,
          f_name: this.graders[this.graderIndex].f_name,
          l_name: this.editGraderForm.get("l_name")?.value,
          department: this.graders[this.graderIndex].department
        }
        this.graders[this.graderIndex].l_name = this.editGraderForm.get("l_name")?.value
      }
      // update both first and last name
      else {
        this.updateAccessor = {
          prof_email: this.graders[this.graderIndex].prof_email,
          f_name: this.editGraderForm.get("f_name")?.value,
          l_name: this.editGraderForm.get("l_name")?.value,
          department: this.graders[this.graderIndex].department
        }
        this.graders[this.graderIndex].f_name = this.editGraderForm.get("f_name")?.value
        this.graders[this.graderIndex].l_name = this.editGraderForm.get("l_name")?.value
      }

      this.updateProfName(this.updateAccessor)
      this.submitted = false

    }

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
  submitCapProf(accessor: Accessor) {
    this.newCapProf = {
      prof_email: accessor.prof_email,
      f_name: accessor.f_name,
      l_name: accessor.l_name,
      department: accessor.department,
      curr_cap_prof: accessor.curr_cap_prof
    }

    this.setCurrentCapstoneProf(this.newCapProf)
  }

  // trigger to add a professor as a system administrator
  submitAdmin(accessor: Accessor) {
    this.newSysAdmin = {
      prof_email: accessor.prof_email,
      f_name: accessor.f_name,
      l_name: accessor.l_name,
      department: accessor.department,
      is_admin: accessor.is_admin
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
    this.adminService.updateProf(accessor).pipe(first()).subscribe(() => {
      this.editGraderForm.reset()
    })
    //
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
    this.addGraderform.reset()

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
