import { Component, Input, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { SemesterReqs } from '../SemesterReqs';
import { ResultsService } from '../services/results.service';
import { take } from 'rxjs/operators';
import { SuboutcomeDescription } from '../SuboutcomeDescription';
@Component({
  selector: 'app-outcome-trends',
  templateUrl: './outcome-trends.component.html',
  styleUrls: ['./outcome-trends.component.css']
})
export class OutcomeTrendsComponent implements OnInit {
  @Input()
  outcomeList: Observable<SemesterReqs>
  @Input()
  degree:string
  scores: {
    score_description: string,
    total: number
    poor: number,
    developing: number,
    satisfactory: number,
    excellent: number,
  }
  runninTotal: number
  result: any
  suboutcomeDescriptions: SuboutcomeDescription


  constructor(private resultsService: ResultsService) {
      console.log('in outcome trends constructor ',this.outcomeList)
      //getSubDescriptions(o)
      
    
   }

  ngOnInit(): void {
    console.log('in outcome trends ngOnInit',this.outcomeList)
  }

  getSubDescriptions(cat_name: string){
    const cat_id = parseInt(cat_name)
    return this.resultsService.getSuboutcomesByCategory(cat_id, this.degree).pipe(take(1))
  }

  getSingleScore(score_id: string): Observable<number[]>{
    return of([1,2,3,4])
  }

}
