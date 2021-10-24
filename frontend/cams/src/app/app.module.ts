import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { ProjectsComponent } from './shared/projects/projects.component';
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env} from 'src/environments/environment';
import { LogoutButtonComponent } from './shared/logout-button/logout-button.component';
import { CommonModule } from '@angular/common';
import { PastAssessmentsComponent } from './past-assessments/past-assessments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageAdminsComponent } from './manage-admins/manage-admins.component';
import { ManageProjectsComponent } from './manage-projects/manage-projects.component';
import { ManageAssessorsComponent } from './manage-assessors/manage-assessors.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    AssessmentComponent,
    ProjectsComponent,
    LogoutButtonComponent,
PastAssessmentsComponent,
    LogoutButtonComponent,
    ManageAdminsComponent,
    ManageProjectsComponent,
    ManageAssessorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot(
      {
        ...env.auth
      }
    ),
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
