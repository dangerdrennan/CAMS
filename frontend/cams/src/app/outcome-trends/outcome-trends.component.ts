import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SemesterReqs } from '../SemesterReqs';
import { ResultsService } from '../services/results.service';
import { SuboutcomeDescription } from '../SuboutcomeDescription';

/**
 * NOTE: not sure if this was used?
 */

@Component({
  selector: 'app-outcome-trends',
  templateUrl: './outcome-trends.component.html',
  styleUrls: ['./outcome-trends.component.css']
})
export class OutcomeTrendsComponent implements OnInit {
  @Input() outcomeList: Observable<SemesterReqs>
  @Input() degree:string
  @Input() semester:string
  @Input() year:number
  @Input() allPastInfo: any
  @Input() cats: any
  result: any
  @Input() percentsArray: {poor: number, developing: number, satisfactory: number, excellent: number} []
  suboutcomeDescriptions: SuboutcomeDescription


  constructor(private resultsService: ResultsService) {
      console.log(this.cats)



   }

  ngOnInit(): void {
    // console.log('in outcome trends ngOnInit',this.outcomeList)
    // console.log(this.allPastInfo)
    // for (let i = 0; i < this.cats.length; i++){
    //   const checkStr = this.cats[i].toString()
    //   let categoryAvg = this.allPastInfo.filter( el =>
    //     el.cat_id == checkStr)
    //   let p = 0
    //   let d = 0
    //   let s = 0
    //   let e = 0
    //   let t = 0
    //   categoryAvg.forEach(element => {
    //     p += parseInt(element.poor_count)
    //     d += parseInt(element.developing_count)
    //     s += parseInt(element.satisfactory_count)
    //     e += parseInt(element.excellent_count)
    //     t += parseFloat(element.total_count)
    //   });
    //   this.percentsArray.push(
    //     {
    //       poor: p/t,
    //       developing: d/t,
    //       satisfactory: s/t,
    //       excellent: s/t,
    //     }
    //   )
    // }
    //console.log(this.percentsArray)
  }




  // getSubDescriptions(cat_name: string){
  //   const cat_id = parseInt(cat_name)
  //   return this.resultsService.getSuboutcomesByCategory(cat_id, this.degree).pipe(take(1))
  // }

  getSingleScore(cat: number | string, score:string) {
    return 0
    // console.log( 'in single score ---')
    // let categoryAvg = this.allPastInfo.filter( el =>
    //   el.cat_id == cat.toString)
    //   let count = 0
    //   let total = 0
    //   categoryAvg.forEach(element => {
    //     switch(score) {
    //       case 'poor':
    //         count += parseInt(categoryAvg.poor_count)
    //         total += parseFloat(categoryAvg.total)
    //         break;
    //       case 'developing':
    //         count += parseInt(categoryAvg.developing_count)
    //         total += parseFloat(categoryAvg.total)
    //         break;
    //       case 'satisfactory':
    //         count += parseInt(categoryAvg.satisfactory_count)
    //         total += parseFloat(categoryAvg.total)
    //       break;
    //       case 'excellent':
    //         count += parseInt(categoryAvg.excellent_count)
    //         total += parseFloat(categoryAvg.total)
    //       break;

    //     }
    //     console.log('count, total at ', count,' ', total)
    //     return (count/total)
    //   });

  }
}
