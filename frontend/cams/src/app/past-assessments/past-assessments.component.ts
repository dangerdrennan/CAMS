import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concat, Observable, Subscription } from 'rxjs';
import { last, take, takeLast, map, takeUntil, first } from 'rxjs/operators';
import { PastAssessmentDisplay } from '../PastAssessmentDisplay';
import { SemesterReqs } from '../SemesterReqs';
import { ResultsService } from '../services/results.service';
import { OutcomeDescriptions } from '../OutcomeDescriptions';
import { OutcomeTrends } from '../OutcomeTrends';
import { Total } from '../Total';
@Component({
  selector: 'app-past-assessments',
  templateUrl: './past-assessments.component.html',
  styleUrls: ['./past-assessments.component.css']
})
export class PastAssessmentsComponent implements OnInit {
  public displayPast: boolean = false;
  public displayOutcome: boolean = false;
  public defaultOutcome: number = 1;
  // outcomeIdCS:any
  // outcomeIdCSE:any[] = []
  displayTitle: any[] = []
  outcomeTitle:any[] = []
  subInfo: any[] = []
  outcomeForm!: FormGroup;
  pastForm!: FormGroup;
  ready = false
  test$: Observable<any>
  num1:number
  num2:number
  test: PastAssessmentDisplay[] = []
  degree = 'CS'
  outcomeTrends: OutcomeTrends[] = []
  outcomeTrends$: Observable<OutcomeTrends[]>
  cs_subs = []
  outDescriptions: Observable<OutcomeDescriptions>
  outcome_cats_cs: number[]
  outcome_cats_cse: number[]
  suboutcomes_cs: string[]
  suboutcomes_cse:string[]
  allInfo: PastAssessmentDisplay[]

  allCSInfo: PastAssessmentDisplay[]
  allCSEInfo: PastAssessmentDisplay[]

  totals: any[] = []
  percents: any[] = []
  // get all assessments by term

  constructor(private router: Router, private builder: FormBuilder, private resultsService: ResultsService) {

  }

  ngOnInit(): void {
    this.displayPast = false;
    this.displayOutcome = false;
    this.outcomeForm = this.builder.group({
      term: ['', Validators.required],
      year: ['', Validators.required],
      degree: ['', Validators.required]
    })

    this.pastForm = this.builder.group({
      term: ['', Validators.required],
      year: ['', Validators.required],
      degree: ['', Validators.required]
    })
  }

  // trigger to find past assessment
  findPast() {
    this.outcomeForm.reset({
      term: '',
      year: ''
    })
    this.displayOutcome = false;
    this.displayPast = true;
    this.changeOutcomes(this.defaultOutcome)
  }

  // trigger to find outcome trends
  findTrends() {
    this.pastForm.reset({
      term: '',
      year: ''
    })

    let degree = this.outcomeForm.get('degree').value
    let term = this.outcomeForm.get('term').value
    let year = this.outcomeForm.get('year').value

    this.displayPast = false;
    //this.displayOutcome = true;
    // give the subscription time to finish before using its returned value
    setTimeout(() => {
      this.getOutcomePercents()
    },200)

    this.resultsService.getAllPast(term, Number(year), degree).subscribe( res=> {
      this.allInfo = res

    })
    this.outcomeTitle = []

  }

  // updates the outcome titles and sub descriptions being viewed
  changeOutcomes(id: number) {
    this.getTitles(id)
    this.getDescription(id)
    this.calculateTotals()
    this.calculatePercents()
  }


   // store the past assessment outcome titles
  getTitles(id: number) {
    // reset arrays
    this.displayTitle = []
    this.outcomeTitle = []
    let degree = this.pastForm.get('degree').value
    let term = this.pastForm.get('term').value
    let year = this.pastForm.get('year').value

    // cs past assessment outcome title
    if(degree === 'CS') {
      this.resultsService.getPastSemesterRequirements(term, Number(year)).pipe(first()).subscribe(
        res => {
          console.log("res ", res)
          this.outcome_cats_cs = res.outcome_cats_cs
          this.outcome_cats_cse = res.outcome_cats_cse
          this.suboutcomes_cs = res.suboutcomes_cs
          this.suboutcomes_cse = res.suboutcomes_cse

          this.resultsService
          .getPastOutcomeDescription(degree, this.outcome_cats_cs)
          .pipe(first()).subscribe((res) => {
            return this.outcomeTitle.push(res);
          });

          // give the subscription time to finish before using its returned value
          setTimeout(() => {
            // filter out just the outcome title for easy access
            this.outcomeTitle.forEach((item) => {
              item.filter((i) => {
                if(i.cat_id == id) {
                  this.displayTitle.push(i.outcome_description)
                }
              })
            })
          }, 200)
        }
      )
    }
    // cse past assessment outcome title
    else if(degree === 'CSE') {
      this.resultsService.getPastSemesterRequirements(term, Number(year)).pipe(last()).subscribe(
        res => {
          this.outcome_cats_cs = res.outcome_cats_cs
          this.outcome_cats_cse = res.outcome_cats_cse
          this.suboutcomes_cs = res.suboutcomes_cs
          this.suboutcomes_cse = res.suboutcomes_cse

          this.resultsService
          .getPastOutcomeDescription(degree, this.outcome_cats_cse)
          .subscribe((res) => {
            return this.outcomeTitle.push(res);
          });

          // give the subscription time to finish before using its returned value
          setTimeout(() => {
            this.outcomeTitle.forEach((item) => {
              item.filter((i) => {
                if(i.cat_id == id) {
                  this.displayTitle.push(i.outcome_description)
                }
              })
            })
          }, 200)
        }
      )
    }
    return this.displayTitle
  }

  // get the evaluation criteria from each past assessment sub outcome
  getDescription(id: number) {
    this.subInfo = []
    let degree = this.pastForm.get('degree').value
    let term = this.pastForm.get('term').value
    let year = this.pastForm.get('year').value

    if(degree === 'CS') {
      this.resultsService.getAllPast(term, Number(year), degree).pipe(first())
      .subscribe(res=> {
        console.log("all cs info", res)
        return this.allCSInfo = res
      })

      // give the subscription time to finish before using its returned value
      setTimeout(() => {
        this.allCSInfo.filter((item) => {
          if(Number(item.cat_id) == id) {
            this.subInfo.push(item)
          }
        })
      }, 200)
    }
    // cse sub outcome descriptions(evaluation criteria)
    else if(degree === 'CSE') {
      this.resultsService.getAllPast(term, Number(year), degree).pipe(first()).subscribe( res=> {
        return this.allCSEInfo = res
      })

      // give the subscription time to finish before using its returned value
      setTimeout(() => {
        this.allCSEInfo.filter((item) => {
          if(Number(item.cat_id) == id) {
            this.subInfo.push(item)
          }
        })
      }, 200)
    }
    return this.subInfo
  }


  // calculate the column totals of each possible grade i.e poor, developing, satisfactory, excellent
  calculateTotals() {
    // reset totals array at each new outcome
    this.totals = []
    let poorTot = 0
    let developTot = 0
    let satisTot = 0
    let excelTot = 0
    let tot: Total = {
      poor_total: [],
      developing_total: [],
      satisfactory_total: [],
      excellent_total: [],
    }

    // give the subscription time to finish before using its returned value to fill column values
    setTimeout(() => {
      this.subInfo.forEach((item) => {
        tot.poor_total.push(Number(item.poor_count))
        tot.developing_total.push(Number(item.developing_count))
        tot.satisfactory_total.push(Number(item.satisfactory_count))
        tot.excellent_total.push(Number(item.excellent_count))
      })

      // add up column totals of each possible grade
      for (let i in tot.poor_total) {
        poorTot += Number(tot.poor_total[i])
      }

      for (let i in tot.developing_total) {
        developTot += Number(tot.developing_total[i])
      }

      for(let i in tot.satisfactory_total) {
        satisTot += Number(tot.satisfactory_total[i])
      }

      for(let i in tot.excellent_total) {
        excelTot += Number(tot.excellent_total[i])
      }

      // append the results to array for easy access
      this.totals.push(poorTot, developTot, satisTot, excelTot)
    }, 200)

  }

  // calculate the column percents of each possible grade i.e poor, developing, satisfactory, excellent
  calculatePercents() {
    // reset percents array at each new outcome
    this.percents = []
    let poorPercent = 0.0
    let developPercent = 0.0
    let satisPercent = 0.0
    let excelPercent = 0.0

    setTimeout(() => {
      // calculate the percents of each column
      poorPercent = +(this.totals[0]/(this.totals[0] + this.totals[1] + this.totals[2] + this.totals[3]) * 100).toFixed(1)


      developPercent = +(this.totals[1]/(this.totals[0] + this.totals[1] + this.totals[2] + this.totals[3]) * 100).toFixed(1)

      satisPercent = +(this.totals[2]/(this.totals[0] + this.totals[1] + this.totals[2] + this.totals[3]) * 100).toFixed(1)

      excelPercent = +(this.totals[3]/(this.totals[0] + this.totals[1] + this.totals[2] + this.totals[3]) * 100).toFixed(1)

      this.percents.push(poorPercent, developPercent, satisPercent, excelPercent)

    }, 200)

  }

  getOutcomePercents(): any{
    console.log('get outcome percents')
    const degree = this.outcomeForm.get('degree').value
    const sem = this.outcomeForm.get('term').value
    const year = this.outcomeForm.get('year').value
    this.outcomeTrends$ = this.resultsService.getOutcomeTrends(sem,year,degree)
    this.resultsService.getOutcomeTrends(sem,year,degree).pipe(last()).subscribe(res =>{
      console.log('in sub', res)
      this.outcomeTrends = res

    })
    this.displayOutcome = true
  }

  ngDestroy() {
    this.outcomeForm.reset({
      term: '',
      year: ''
    })

    this.pastForm.reset({
      term: '',
      year: ''
    })
  }

}
