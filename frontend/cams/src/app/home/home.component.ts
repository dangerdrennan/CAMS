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
  email = 'rowling@potter.co.uk'

  constructor(public loginService: LoginService) {
    if( this.loginService.isLoggedIn$.value){
      this.msg = "worked"
    }
    
    console.log("what this.prof = in constructor", this.prof)
   }

  ngOnInit(): void {
    if( this.loginService.isLoggedIn$.value){
      this.msg = "worked"
    }
    this.loginService.getAll().subscribe(res => {
      this.prof = res
    })
  }

  onClick(){
    console.log('in on click, this.prof = ', this.prof)
    console.log('in on click, this.prof = ', this.prof[0].email)
    console.log('in on click, this.prof type = ', typeof(this.prof))
    //console.log('grabbing first prof = ', this.loginService.prof.filter( x=> (x.prof_id == 1)))
  }

}
