import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateOutcomesService } from '../services/update-outcomes.service';
import { Suboutcome } from '../Suboutcome';

@Component({
  selector: 'app-suboutcome-update-display',
  templateUrl: './suboutcome-update-display.component.html',
  styleUrls: ['./suboutcome-update-display.component.css']  
})
export class SuboutcomeUpdateDisplayComponent implements OnInit {

  @Input() outcome_cat: number
  @Input() degree: string
  suboutcomes:Suboutcome[]
  suboutcomes$:Observable<Suboutcome[]>

  constructor(private updateService: UpdateOutcomesService) { 
    // console.log(`in the new child componente degree is ${this.degree} and outcome_cat is at ${this.outcome_cat}`)
    // this.updateService
    //         .subsByCatID(this.outcome_cat, this.degree)
    //         .subscribe((res: any) => {
    //           console.log("in get_degree_outcomes-- cat_id=", res)
    //           console.log("in get_degree_outcomes-- res=", res)
    //           this.suboutcomes = res
    //         });
  }

  ngOnInit(): void {

    console.log(`in the new child componente degree is ${this.degree} and outcome_cat is at ${this.outcome_cat}`)
    this.suboutcomes$ = this.updateService.subsByCatID(this.outcome_cat, this.degree)
    this.updateService.subsByCatID(this.outcome_cat, this.degree).subscribe(x=>
      console.log(x))

  }


}
