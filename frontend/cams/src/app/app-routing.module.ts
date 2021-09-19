import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'; // change this to see login-component branch additions to the same path, sans 'components/'
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'logout_button', component: LogoutButtonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
