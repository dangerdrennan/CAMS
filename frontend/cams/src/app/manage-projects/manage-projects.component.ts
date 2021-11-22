import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Project } from '../Project';
import { ProjectService } from '../services/project.service';
import { Student } from '../Student';

@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.css']
})
export class ManageProjectsComponent implements OnInit {
  allProj:Project[] = []
  allStud: Student[] = []
  addProjForm!: FormGroup;
  addStudForm!: FormGroup;

  project!: Project
  student!: Student

  regTxtPattern = /^[a-zA-Z ]{2,30}$/
  submitted: boolean = false

  projIndex: number = 0;
  termId!: number
  projId:number | undefined
  semYear!: {semester:string, year:number}[]
  constructor(private builder: FormBuilder, private projectService: ProjectService) { }

  ngOnInit(): void {
    // initialize project form
    this.addProjForm = this.builder.group({
      projectName: ['', [Validators.required, Validators.pattern(this.regTxtPattern)]],
    })

    // initialize student form
    this.addStudForm = this.builder.group({
      studentFirst: ['', [Validators.required, Validators.pattern(this.regTxtPattern)]],
      studentLast: ['', [Validators.required, Validators.pattern(this.regTxtPattern)]],
      degree: ['', [Validators.required]],
      status: ['Not Graded'] // by default we'll mark as not graded
    })

    // // initially display all projects
    // this.allProjects()
    // new code to display only current projects
    this.currentProjects()


    // console.log("all students", this.allStud)

    this.projectService.getSemYear().pipe(first()).subscribe(res =>{
      this.semYear = res
      // console.log(this.semYear)
    })


  }

  // easy access for validating project inputs
  get p() {
    return this.addProjForm.controls
  }

  // easy access for validating student inputs
  get s() {
    return this.addStudForm.controls
  }

  resetStudentForm() {
    this.addStudForm.reset()
  }

  // display all projects
  allProjects() {
    this.projectService.getAllProjects().subscribe((res) => {
      res.filter((item: Project) => {
        this.projectService.getProjectStudents(item).subscribe((res) => {
          res.filter((stud: Student) => {

            this.allStud.push(stud)
          })
        })
         this.allProj.push(item)
      })
    })
  }
  // new stuff I added, kept your same code
  currentProjects() {
    this.projectService.getCurrentProjects().subscribe((res) => {
      res.filter((item: Project) => {
        this.projectService.getProjectStudents(item).subscribe((res) => {
          res.filter((stud: Student) => {

            this.allStud.push(stud)
          })
        })
         this.allProj.push(item)
      })
    })
  }

  // add new project
  submitAddNewProj(projectName: string) {
    this.project = {
      title: this.addProjForm.get("title")?.value
    }

    this.projectService.addProject(projectName).subscribe((res) => {
      res.filter((item: Project) => {
        this.allProj.push(item)
        this.addStudToProj(item.proj_id!, item.term_id!)
      })
    })
  }

  // link student to project
  addStudToProj(projId: number, termId: number) {
    // populate student object with form input from user
    this.student = {
      f_name: this.addStudForm.get("studentFirst")?.value,
      l_name: this.addStudForm.get("studentLast")?.value,
      degree: this.addStudForm.get("degree")?.value,
      proj_id: projId,
      term_id: termId
    }

    this.projectService.assignStudentToProject(this.student).subscribe(res => {
      this.allStud.push(this.student)
      this.generateAssessments(res[0])
    })

  }

  // delete an entire project
  deleteProject(project: Project) {

    this.projectService.deleteProject(project.title).subscribe(() => {
      location.reload()
    })
  }


  // get the project id when edit button clicked to trigger modal
  editButton(project: Project) {
    return this.projIndex = project.proj_id!
  }

  // trigger to add another student to a project in the modal
  addStudInModal(project: Project) {
    this.addStudToProj(project.proj_id!, project.term_id!)
  }

  // trigger to delete a student from a project in the modal
  deleteStudFromProjInModal(student: Student) {
    this.projectService.deleteStudent(student.student_id!).subscribe(() => {
      //location.reload()
    })
  }

  // add assessments for each student
  generateAssessments(stud: Student) {
    this.projectService.addAssessment(stud).subscribe(() => {
    })
    //location.reload()
  }

  getSemYear(){
  }


  // when you get the component to display only the current term's projects, just be aware that in the current term in the database, there's no projects for that current term, so if you see blanks, there's a chance it's working. And obviously you can play around with the files in the db to test it. I think the easiest way to do that is to go to the student csv and replace some of the term values for a specific project id

}
