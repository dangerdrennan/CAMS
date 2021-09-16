import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Professor } from '../prof';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = this.formBuilder.group({
    email: '',
    password: ''
  });
  prof$!: Observable<Professor>;
  prof!: Professor[];


  constructor(
    private loginService: LoginService,
    private formBuilder:FormBuilder,
    public router:Router
    )
    {

    }

  ngOnInit(): void {
    //console.log('in login init' + this.prof)
  }


  onSubmit(){
    //console.log(typeof(this.form.value.email))
    //console.log(this.form.value.password)
    const email = this.form.value.email
    const password = this.form.value.password
    this.loginService.setAuth(email, password)
    //console.log(a)
    //console.log('behavior subject test: ',this.loginService.email$.value)
  }

  navToHome(){
    this.router.navigate(['/home'])
  }
}
