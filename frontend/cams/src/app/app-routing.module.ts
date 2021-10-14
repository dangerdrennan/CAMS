import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentComponent } from './assessment/assessment.component';
import { HomeComponent } from './home/home.component';
import { PastAssessmentsComponent } from './past-assessments/past-assessments.component'
import { ProjectsComponent } from './shared/projects/projects.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { ManageAdminsComponent } from './manage-admins/manage-admins.component';
import { ManageProjectsComponent } from './manage-projects/manage-projects.component';
import { PastResultsComponent } from './past-results/past-results.component';
import { ManageAssessorsComponent } from './manage-assessors/manage-assessors.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'assessment', component: AssessmentComponent, canActivate: [AuthGuard]},
  {path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard]},
  {path: 'past-assessments', component: PastAssessmentsComponent, canActivate: [AuthGuard]},
  {path: 'past-assessments/semester/year', component: PastResultsComponent, canActivate: [AuthGuard]},
  {path: 'admins', component: ManageAdminsComponent, canActivate: [AuthGuard]},
  {path: 'manage-projects', component: ManageProjectsComponent, canActivate: [AuthGuard]},
  {path: 'manage-assessors', component: ManageAssessorsComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
