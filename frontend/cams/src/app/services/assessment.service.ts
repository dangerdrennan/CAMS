import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OutcomeDescriptions } from '../OutcomeDescriptions';
import { SemesterReqs } from '../SemesterReqs';

const httpOptions =
{
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  endPoint = "http://localhost:4201"
  currentCSOutcomes: string[] = []
  cs_categories: string[] = []
  currentCSOutcomeDesc: OutcomeDescriptions[] = []
  //outcomeDescriptions$: Observable<OutcomeDescriptions[]>
  


  constructor(private http: HttpClient) { 
    this.getCurrentSemesterRequirements().subscribe(res=>{
      this.currentCSOutcomes = res.outcome_cats_cs
    })
    //this.outcomeDescriptions$ = this.getCSOutcomeDescription()
    // this.getCSOutcomeDescription().subscribe(res=> {
    //   console.log('in service at getCSOutcomeDescription()', res)
    // })
  }

  getCurrentAssessmentsbyProf(email:string): any{
    const url = `${this.endPoint}/current_assessments_by_prof/${email}`
    return this.http.get<any[]>(url)
  }

  getCurrentSemesterRequirements(): Observable<SemesterReqs>{
    return this.http.get<SemesterReqs>(`${this.endPoint}/current_outcome_reqs`)
  }

  // getCSOutcomeDescription(id:number): Observable<string[]>{
  //   console.log('what is this id type? ', typeof(id))
  //   return this.http.get<string[]>(`${this.endPoint}/get_cs_outcome_desc/${id}`)
  // }

  getCSOutcomeDescription(ids: number[]): Observable<OutcomeDescriptions[]>{
    console.log('what is this id type? ', typeof(ids))
    return this.http.get<OutcomeDescriptions[]>(`${this.endPoint}/get_cs_outcome_desc/${ids}`)
  }

}
