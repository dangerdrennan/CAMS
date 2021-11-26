import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OutcomeDescriptions } from '../OutcomeDescriptions';
import { OutcomeTrends } from '../OutcomeTrends';
import { PastAssessmentDisplay } from '../PastAssessmentDisplay';
import { SemesterReqs } from '../SemesterReqs';
import { ShowComment } from '../ShowComments';
import { Suboutcome } from '../Suboutcome';
import { TotesPers } from '../TotesPers';

const httpOptions =
{
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  endPoint = "http://localhost:4201"
  assessment: any // change
  pastSemReq: any

  constructor(private http: HttpClient) { 
    const out:OutcomeDescriptions = {
      cat_id:1,
      outcome_description:'newest description'
    }
    const sub:Suboutcome = {
      score_id: 'newest',
      outcome_cat_id: 2,
      suboutcome_name: '3',
      suboutcome_description: 'newest',
      poor_description: 'newest',
      developing_description: 'newest',
      satisfactory_description: 'newest',
      excellent_description: 'newest',
    }
    const sub2:Suboutcome = {
      score_id: 'c',
      outcome_cat_id: 3,
      suboutcome_name: '1',
      suboutcome_description: 'newest',
      poor_description: 'newest',
      developing_description: 'newest',
      satisfactory_description: 'newest',
      excellent_description: 'newest',
    }
    this.ss([sub,sub2]).subscribe()
    //this.updateOutsTest([out,out],'CS').subscribe()
   }

  getPastSemesterRequirements(sem:string,year:number): Observable<SemesterReqs>{
    console.log(' in getPastSemesterRequirements', sem, year)
    return this.http.get<SemesterReqs>(`${this.endPoint}/past_outcome_reqs/${sem}/${year}`)
  }

  getPastOutcomeDescription(degree:string, sem:string, year:number): Observable<OutcomeDescriptions[]>{
    return this.http.get<OutcomeDescriptions[]>(`${this.endPoint}/get_outcome_desc/${degree}/${sem}/${year}`)
  }

  getSuboutcomes(outcome_name: string): Observable<Suboutcome[]>{
    return this.http.get<Suboutcome[]>(`${this.endPoint}/get_past_suboutcomes/${this.assessment.degree}/${outcome_name}`)
  }

  getAllPast(sem:string,year:number,degree:string): Observable<PastAssessmentDisplay[]>{
    console.log("in service")
    return this.http.get<PastAssessmentDisplay[]>(`${this.endPoint}/all_past_info/${sem}/${year}/${degree}`)
  }

  getOutcomeTrends(sem:string, year:number, degree:string): Observable<OutcomeTrends[]>{
    return this.http.get<OutcomeTrends[]>(`${this.endPoint}/outcome_trends/${sem}/${year}/${degree}`)
  }

  getTotalsAndPercents(sem:string, year:number, degree:string): Observable<TotesPers[]>{
    return this.http.get<TotesPers[]>(`${this.endPoint}/totals_and_percents/${sem}/${year}/${degree}`)

  }

  getPastComments(sem:string,year:number,degree:string): Observable<ShowComment[]>{
    console.log("in service")
    return this.http.get<ShowComment[]>(`${this.endPoint}/show_comments/${sem}/${year}/${degree}`)
  }


  updateReqsTest(sub:Suboutcome[], degree:string){
    console.log('in update_req_test:', sub)
    const url = `${this.endPoint}/add_subs/${degree}`
    return this.http.post<Suboutcome[]>(url, sub, httpOptions);
  }

  updateOutsTest(sub:OutcomeDescriptions[], degree:string){
    console.log('in update_out_test:', sub)
    const url = `${this.endPoint}/add_outs/${degree}`
    return this.http.post<OutcomeDescriptions[]>(url, sub, httpOptions);
  }
  ss(sub:Suboutcome[]){
    console.log('in ss:', sub)
    const url = `${this.endPoint}/ss/`
    return this.http.post<Suboutcome[]>(url, sub, httpOptions);
  }
  
}
