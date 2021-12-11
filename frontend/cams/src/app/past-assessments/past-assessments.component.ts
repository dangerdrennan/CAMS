import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, } from 'rxjs';
import { last, first } from 'rxjs/operators';
import { PastAssessmentDisplay } from '../PastAssessmentDisplay';
import { ResultsService } from '../services/results.service';
import { OutcomeDescriptions } from '../OutcomeDescriptions';
import { OutcomeTrends } from '../OutcomeTrends';
import { TotesPers } from '../TotesPers';
import { ShowComment } from '../ShowComments';
import { ExportService } from '../services/export.service';

/**
 * This component is what holds the information to view past assessments. An adminsistrator selects either CS or CSE and a specified year and semester to view their outcomes.
 */

@Component({
  selector: 'app-past-assessments',
  templateUrl: './past-assessments.component.html',
  styleUrls: ['./past-assessments.component.css']
})
export class PastAssessmentsComponent implements OnInit {

  public displayPast: boolean = false;
  public displayOutcome: boolean = false;
  public defaultOutcome: number = 1;
  displayTitle: string[] = []
  outcomeTitle:any[] = []
  subInfo: any[] = []
  outcomeForm!: FormGroup;
  pastForm!: FormGroup;
  categoryForm!: FormGroup;
  outcomeTrends: OutcomeTrends[] = []
  outcomeTrends$: Observable<OutcomeTrends[]>
  cs_subs = []
  outDescriptions: Observable<OutcomeDescriptions>
  outcome_cats_cs: number[]
  outcome_cats_cse: number[]
  suboutcomes_cs: string[]
  suboutcomes_cse:string[]
  out_names_cs: number[]
  out_names_cse: number[]
  allInfo: PastAssessmentDisplay[]
  unique: number[]
  num: number
  id: number
  oldDegree: 'CS' | 'CSE'
  allCSInfo: PastAssessmentDisplay[]
  allCSEInfo: PastAssessmentDisplay[]
  totes: TotesPers[] = []
  totals: number[] = []
  percents: number[] = []
  switchDegree: boolean = true
  degree: string
  sem:string
  year:number
  comments:ShowComment[]
  comments$:Observable<ShowComment[]>
  outDescriptions$:Observable<OutcomeDescriptions[]>


  constructor(private router: Router, private builder: FormBuilder, private resultsService: ResultsService, private exportService: ExportService) {

  }

  ngOnInit(): void {
    this.num = 0
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
    this.categoryForm = this.builder.group({
      selected: [1, Validators.required]
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

    this.categoryForm.setValue({
      selected: 1
    })

    let degree = this.pastForm.get('degree').value
    let sem = this.pastForm.get('term').value
    let year = this.pastForm.get('year').value
    this.resultsService.getPastComments(sem,year,degree).subscribe(res=>{
      this.comments = res
    })

    this.changeOutcomes(this.defaultOutcome)
  }

  silenceForm(){
    this.displayPast = false
    this.switchDegree = true
    this.displayOutcome = false
  }

  changeDegree(){
    this.displayPast = false
    this.switchDegree = true
    this.displayOutcome = false
    this.num = 0
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
    this.getOutcomePercents()

    this.resultsService.getAllPast(term, Number(year), degree).subscribe( res=> {
      this.allInfo = res
    })
    this.outcomeTitle = []

  }

  // updates the outcome titles and sub descriptions being viewed
  dataChange(id: number) {
    this.id = id
    this.getDescription(id)
    this.calculateTotals()
    this.switchDegree = false
  }

  // check if data is current or if we need new service calls
  changeOutcomes(e) {
    let id = this.categoryForm.get('selected').value
    const eventToNum = parseInt(id)
    this.id = eventToNum

    if (this.switchDegree == true){
      this.dataChange(id)
    }
    else{
      this.subInfo = this.allInfo.filter(x => x.cat_id == eventToNum)
      this.num = this.unique.indexOf(eventToNum)
    }
  }

  // get the evaluation criteria from each past assessment sub outcome
  getDescription(id: number) {
    this.subInfo = []
    let degree = this.pastForm.get('degree').value
    let term = this.pastForm.get('term').value
    let year = this.pastForm.get('year').value

    this.outDescriptions$ = this.resultsService.getPastOutcomeDescription(degree, term, year)

    if(degree === 'CS') {
      this.resultsService.getAllPast(term, Number(year), degree).pipe(first())
      .subscribe(res=> {
        this.allInfo = res
        this.unique = [...new Set(res.map(item => item.cat_id))]
        this.subInfo = res.filter(x=>x.cat_id == id)

      })
      this.resultsService.getPastOutcomeDescription(degree, term, year).pipe(first())
      .subscribe(res=> {
        this.displayTitle = [...new Set(res.map(item => item.outcome_description))];
      })

    }
    // cse sub outcome descriptions(evaluation criteria)
    if(degree === 'CSE') {
      this.resultsService.getAllPast(term, Number(year), degree).pipe(first())
      .subscribe(res=> {
        this.allInfo = res
        this.unique = [...new Set(res.map(item => Number(item.cat_id)))]
        for(let i = 0; i < this.allInfo.length; i++) {
          if(this.allInfo[i].cat_id == id) {
            this.subInfo.push(this.allInfo[i])
          }
        }
      })
      this.resultsService.getPastOutcomeDescription(degree, term, year).pipe(first())
      .subscribe(res=> {
        this.displayTitle = [...new Set(res.map(item => item.outcome_description))];
      })
    }
    return this.subInfo
  }


  // calculate the column totals of each possible grade i.e poor, developing, satisfactory, excellent
  calculateTotals() {
    let degree = this.pastForm.get('degree').value
    let term = this.pastForm.get('term').value
    let year = this.pastForm.get('year').value
    this.resultsService.getTotalsAndPercents(term, year, degree).subscribe(res=>{
      this.totes = res
    })
  }

  // request to grab the percents and totals for the outcome trends
  getOutcomePercents(): any{
    const degree = this.outcomeForm.get('degree').value
    const sem = this.outcomeForm.get('term').value
    const year = this.outcomeForm.get('year').value
    this.outcomeTrends$ = this.resultsService.getOutcomeTrends(sem,year,degree)
    this.resultsService.getOutcomeTrends(sem,year,degree).pipe(last()).subscribe(res =>{
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
