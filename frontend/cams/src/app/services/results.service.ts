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
import { environment as env } from 'src/environments/environment';

/**
 * Handles logic for results, i.e., the displays on 'Past-Assessments' tab
 */

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

  endPoint = env.API
  assessment: any // change
  pastSemReq: any

  constructor(private http: HttpClient) {  }

  // This is a call to a superfunction that calls Semester Reqs objects
  // Basically grabs all outcomes and suboutcomes based on their reqs_id
  getPastSemesterRequirements(sem:string,year:number): Observable<SemesterReqs>{
    return this.http.get<SemesterReqs>(`${this.endPoint}/past_outcome_reqs/${sem}/${year}`)
  }

  // Limited function that only grabs outcome descriptions from specific to degree, semester, and year
  getPastOutcomeDescription(degree:string, sem:string, year:number): Observable<OutcomeDescriptions[]>{
    return this.http.get<OutcomeDescriptions[]>(`${this.endPoint}/get_outcome_desc/${degree}/${sem}/${year}`)
  }

  // grabs suboutcomes by assessment ID and the outcome_cat_id
  getSuboutcomes(outcome_name: string): Observable<Suboutcome[]>{
    return this.http.get<Suboutcome[]>(`${this.endPoint}/get_past_suboutcomes/${this.assessment.degree}/${outcome_name}`)
  }

  // This calls a huge function that aggregates all the data for the past outcomes
  // option on 'Past Assessments' tab. Database function is called 'super_cs_grader'
  getAllPast(sem:string,year:number,degree:string): Observable<PastAssessmentDisplay[]>{
    return this.http.get<PastAssessmentDisplay[]>(`${this.endPoint}/all_past_info/${sem}/${year}/${degree}`)
  }

  // Calls a huge SQL function that allows populates the outcome trends component
  // (percents only). SQL function is called 'get_outcome_percents'
  getOutcomeTrends(sem:string, year:number, degree:string): Observable<OutcomeTrends[]>{
    return this.http.get<OutcomeTrends[]>(`${this.endPoint}/outcome_trends/${sem}/${year}/${degree}`)
  }

  // returns totals and percents based on recorded scores. I.e., Counts and percents, but
  // only for each outcome. E.g., Fall, 2021, CS major has two suboutcomes for Outcome 1,
  // then this function will return the total number of each poor, developing, and excellent score,
  // and their relative percents. If there were five excellent scores and for outcome 1.1 and 6
  // excellent scores for 1.2, and 33 assessments total, this outcome will return 11, 33% for it's
  // excellent count, and excellent percent, as well as 33 for a general total.
  // database function is 'get_totes_pers'
  getTotalsAndPercents(sem:string, year:number, degree:string): Observable<TotesPers[]>{
    return this.http.get<TotesPers[]>(`${this.endPoint}/totals_and_percents/${sem}/${year}/${degree}`)

  }

  // gets past comments by term and degree, sorted by which suboutcome order. Displayed separately in
  // frontend based on user selection of Outcome dropbox
  getPastComments(sem:string,year:number,degree:string): Observable<ShowComment[]>{
    return this.http.get<ShowComment[]>(`${this.endPoint}/show_comments/${sem}/${year}/${degree}`)
  }
}
