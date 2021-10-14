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
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    AssessmentComponent,
    ProjectsComponent,
    LogoutButtonComponent
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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
