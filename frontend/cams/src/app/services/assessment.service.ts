import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OutcomeDescriptions } from '../OutcomeDescriptions';
import { SemesterReqs } from '../SemesterReqs';
import { CSSuboutcome } from '../CSSuboutcome'
import { AssessmentDisplay } from '../AssessmentDisplay';
import { take } from 'rxjs/operators';

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
  suboutcome_grade: { score_id: number}[] = []
  assID: number
  assessment: AssessmentDisplay
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

  recordAllSuboutcomeScores(grades: { score_id: string, grade:number}[]){
    console.log('recordAll :', grades)
    grades.forEach(grade => {
      console.log('grade in foreach is at ', grade)
      this.recordSingleGrade(grade).pipe(take(1)).subscribe()
    })
    
  }

  // getCSOutcomeDescription(id:number): Observable<string[]>{
  //   console.log('what is this id type? ', typeof(id))
  //   return this.http.get<string[]>(`${this.endPoint}/get_cs_outcome_desc/${id}`)
  // }

  testIDUpdate(){
    //console.log(this.assID)
    console.log('in ass Service: ' ,this.suboutcome_grade)
  }

  recordSingleGrade(grade: { score_id: string, grade:number}){
    console.log('in testOCReording:', grade)
    const url = `${this.endPoint}/record_scores/${this.assID}`
    return this.http.post<{ score_id: number}>(url, grade, httpOptions);
  }

  getCSOutcomeDescription(ids: number[]): Observable<OutcomeDescriptions[]>{
    console.log('what is this id type? ', typeof(ids))
    return this.http.get<OutcomeDescriptions[]>(`${this.endPoint}/get_cs_outcome_desc/${ids}`)
  }

  getCSSuboutcomes(outcome_name: string): Observable<CSSuboutcome[]>{
    return this.http.get<CSSuboutcome[]>(`${this.endPoint}/get_cs_suboutcomes/${outcome_name}`)
  }

  // getCSEOutcomeDescription(ids: number[]): Observable<OutcomeDescriptions[]>{
  //   console.log('what is this id type? ', typeof(ids))
  //   return this.http.get<OutcomeDescriptions[]>(`${this.endPoint}/get_cse_outcome_desc/${ids}`)
  // }

  // getCSESuboutcomes(outcome_name: string): Observable<CSSuboutcome[]>{
  //   return this.http.get<CSSuboutcome[]>(`${this.endPoint}/get_cse_suboutcomes/${outcome_name}`)
  // }

}
