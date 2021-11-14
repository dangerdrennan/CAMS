import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OutcomeDescriptions } from '../OutcomeDescriptions';
import { OutcomeTrends } from '../OutcomeTrends';
import { PastAssessmentsComponent } from '../past-assessments/past-assessments.component';
import { PastAssessmentDisplay } from '../PastAssessmentDisplay';
import { SemesterReqs } from '../SemesterReqs';
import { Suboutcome } from '../Suboutcome';
import { SuboutcomeDescription } from '../SuboutcomeDescription';

const httpOptions =
{
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
// steps of result service
// return 
@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  endPoint = "http://localhost:4201"
  assessment: any // change
  pastSemReq: any

  constructor(private http: HttpClient) { 

    this.arrayTest([1,2,3,4,5])
    this.getPastSemesterRequirements('Fall',2021).subscribe(
      res=>
      {
        this.pastSemReq = res
      }
    )
    
    
  }

  getTermId(sem:string, year:number){ }

  getPastSemesterRequirements(sem:string,year:number): Observable<SemesterReqs>{
    console.log(' in getPastSemesterRequirements', sem, year)
    return this.http.get<SemesterReqs>(`${this.endPoint}/past_outcome_reqs/${sem}/${year}`)
  }

  getPastOutcomeDescription(degree:string, ids: number[]): Observable<OutcomeDescriptions[]>{
    console.log('what is this id type? ', typeof(ids), ' what is this')
    return this.http.get<OutcomeDescriptions[]>(`${this.endPoint}/get_outcome_desc/${degree}/${ids}`)
  }

  getSuboutcomes(outcome_name: string): Observable<Suboutcome[]>{
    return this.http.get<Suboutcome[]>(`${this.endPoint}/get_past_suboutcomes/${this.assessment.degree}/${outcome_name}`)
  }
//all_past_info/:sem/:year/:degree
  getAllPast(sem:string,year:number,degree:string): Observable<PastAssessmentDisplay[]>{
    return this.http.get<PastAssessmentDisplay[]>(`${this.endPoint}/all_past_info/${sem}/${year}/${degree}`)
  }

  // getPastSemesterAssessments(outcome_names:string[],degree:string): Observable<SuboutcomeDescription[]>{

  //   return this.http.get<SuboutcomeDescription[]>(`${this.endPoint}/get_past_suboutcomes/${degree}/${outcome_names}`)
  // }

  getSuboutcomesByCategory(cat_id: number, degree:string): Observable<SuboutcomeDescription>{
    return this.http.get<SuboutcomeDescription>(`${this.endPoint}/sub_descriptions/${degree}/${cat_id}`)
  }

  getOutcomeTrends(sem:string, year:number, degree:string): Observable<OutcomeTrends[]>{
    return this.http.get<OutcomeTrends[]>(`${this.endPoint}/outcome_trends/${sem}/${year}/${degree}`)
  }

  outcomeCatsTest(arr: any[]) {
    console.log('in a add assessment the arr is at', arr)
    const url = `${this.endPoint}/add_assessments/${arr}`
    return this.http.post<any[]>(url, arr, httpOptions);
  }

  arrayTest(arr: any[]) {
    console.log('in a add assessment the arr is at', arr)
    const url = `${this.endPoint}/add_assessments/${arr}`
    return this.http.post<any[]>(url, arr, httpOptions);
  }
}
