import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateOutcomesService } from '../services/update-outcomes.service';
import { Suboutcome } from '../Suboutcome';


/*
This component grabs suboutcomes from the backend in the form of an
observable. This observable is fed to the html and populates the update
outcomes table.
*/

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
  }

  ngOnInit(): void {

    this.suboutcomes$ = this.updateService.subsByCatID(this.outcome_cat, this.degree)

  }


}
