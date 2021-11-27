import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, observable, Observable, of } from 'rxjs';
import { last, take } from 'rxjs/operators';
import { NewRequirement } from '../NewRequirement';
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

  out:OutcomeDescriptions = {
    cat_id:111,
    outcome_description:'newest description'
  }
  out2:OutcomeDescriptions = {
    cat_id:111,
    outcome_description:'newest description'
  }
  sub:Suboutcome = {
    score_id: 's1',
    outcome_cat_id: 111,
    suboutcome_name: 'name sub 1',
    suboutcome_description: 'desc sub 1',
    poor_description: 'poor sub 1',
    developing_description: 'dev sub 1',
    satisfactory_description: 'sat sub 1',
    excellent_description: 'ex sub 1',
  }
  sub2:Suboutcome = {
    score_id: 's2',
    outcome_cat_id: 111,
    suboutcome_name: '1',
    suboutcome_description: 'newes2',
    poor_description: 'newes2',
    developing_description: 'newes2',
    satisfactory_description: 'newest2',
    excellent_description: 'newest2',
  }

  sub3:Suboutcome = {
    score_id: 's3',
    outcome_cat_id: 111,
    suboutcome_name: 'name sub 3',
    suboutcome_description: 'desc sub 3',
    poor_description: 'poor sub 3',
    developing_description: 'dev sub 3',
    satisfactory_description: 'sat sub 3',
    excellent_description: 'ex sub 3',
  }
  sub4:Suboutcome = {
    score_id: 's4',
    outcome_cat_id: 111,
    suboutcome_name: '1',
    suboutcome_description: 'newest4',
    poor_description: 'newest4',
    developing_description: 'newest4',
    satisfactory_description: 'newest4',
    excellent_description: 'newest4',
  }

  constructor(private http: HttpClient) { 
    const new_req1 = {
      new_outcome: this.out,
      new_subs: [this.sub,this.sub2]
    }
    const new_req2 = {
      new_outcome: this.out,
      new_subs: [this.sub3,this.sub4]
    }


    //this.updateReqsTest([sub,sub2],'CS').subscribe()
    //this.updateOutsTest(out,'CS').subscribe()
    //this.updateReqsAndOutsTest(out,[sub,sub2],'CS')
    //this.sampleUpdate([1,2,3,4],'CS',[new_req1,new_req2])
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

  sampleUpdate(toKeep: number[], degree:string, newRequirements:NewRequirement){
    try{
      console.log('toKeep is at: ', toKeep)
      //this.startNew(toKeep,degree).pipe().subscribe()
      this.updateReqsAndOutsTest(newRequirements,degree)
    
  }
    catch(e){

    }

  }


  startNew(toKeep:number[], degree:String){
    const url = `${this.endPoint}/start_new/${degree}`
    const hm = {
      dummy: 'dummy',
      toKeep: toKeep
    }
    return this.http.post<number[]>(url, hm, httpOptions);
  }

  updateReqsTest(sub:Suboutcome[], degree:string){
    console.log('in update_req_test:', sub)
    console.log('what is idTracker at?: ')
    const url = `${this.endPoint}/add_subs/${degree}`
    return this.http.post<Suboutcome[]>(url, sub, httpOptions);
  }

  updateReqsAndOutsTest(reqs:NewRequirement, degree:string){
    console.log('in update reqs and outs test:', reqs)
    let allSubs = reqs.new_subs
    let allOuts = reqs.new_outcome
    let task1 = this.updateOutsTest(allOuts, degree)
    let task2 = this.updateReqsTest(allSubs, degree)
    concat(task1,task2).subscribe()
    //task1.subscribe()
    
    
  }

  updateOutsTest(out:OutcomeDescriptions[], degree:string): Observable<any>{
    console.log('in update_out_test:', out)
    const url = `${this.endPoint}/add_outs/${degree}`
    return this.http.post<any>(url, out, httpOptions);
  }
  ss(sub:Suboutcome[]){
    console.log('in ss:', sub)
    const url = `${this.endPoint}/ss/`
    return this.http.post<Suboutcome[]>(url, sub, httpOptions);
  }
  
}
