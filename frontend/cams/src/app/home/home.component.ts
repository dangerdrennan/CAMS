import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Professor } from '../prof';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  msg = "didn't work"
  prof: Professor[] = [];

  constructor(public loginService: LoginService) {
    if( this.loginService.isLoggedIn$.value){
      this.msg = "worked"
    }
    this.loginService.getAll().subscribe(res => {
      this.prof = res
    })   

    console.log(this.prof)
  }

  ngOnInit(): void {
    if( this.loginService.isLoggedIn$.value){
      this.msg = "worked"
    }

    
  }

  onClick(){
    console.log('in on click, this.prof = ', this.prof)
    console.log('in on click, this.prof = ', this.prof[1].email)
    console.log('in on click, this.prof type = ', typeof(this.prof))
    //console.log('behavior subject test2: ',this.loginService.email$.value)
    //console.log('grabbing first prof = ', this.loginService.prof.filter( x=> (x.prof_id == 1)))
  }

}
