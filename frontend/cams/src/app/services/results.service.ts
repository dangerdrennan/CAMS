import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OutcomeDescriptions } from '../OutcomeDescriptions';
import { SemesterReqs } from '../SemesterReqs';
import { Suboutcome } from '../Suboutcome';

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

  constructor(private http: HttpClient) { 

    this.arrayTest([1,2,3,4,5])
    this.getPastSemesterRequirements('Fall',2021).subscribe(
      res=>
      {
        console.log(res)
      }
    )
    
    
  }

  getTermId(sem:string, year:number){ }

  getPastSemesterRequirements(sem:string,year:number): Observable<SemesterReqs>{
    console.log(' in getPastSemesterRequirements', sem, year)
    return this.http.get<SemesterReqs>(`${this.endPoint}/past_outcome_reqs/${sem}/${year}`)
  }

  getPastOutcomeDescription(ids: number[]): Observable<OutcomeDescriptions[]>{
    console.log('what is this id type? ', typeof(ids), ' what is this')
    return this.http.get<OutcomeDescriptions[]>(`${this.endPoint}/get_past_outcome_desc/${this.assessment.degree}/${ids}`)
  }

  getSuboutcomes(outcome_name: string): Observable<Suboutcome[]>{
    return this.http.get<Suboutcome[]>(`${this.endPoint}/get_past_suboutcomes/${this.assessment.degree}/${outcome_name}`)
  }

  getPastSemesterAssessments(outcome_names:string[]){
    
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
