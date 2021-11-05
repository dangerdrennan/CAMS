import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OutcomeDescriptions } from '../OutcomeDescriptions';
import { SemesterReqs } from '../SemesterReqs';
import { CSSuboutcome } from '../CSSuboutcome'
import { AssessmentDisplay } from '../AssessmentDisplay';
import { take } from 'rxjs/operators';
import { Project } from '../Project';
import { Router } from '@angular/router';

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
  outcomeDescriptions$: Observable<OutcomeDescriptions[]>
  submissionStatus: boolean = false
  


  constructor(private http: HttpClient, private router: Router) { 
    this.getCurrentSemesterRequirements().subscribe(res=>{
      this.currentCSOutcomes = res.outcome_cats_cs
    })
  }

  getCurrentAssessmentsbyProf(email:string): any{
    const url = `${this.endPoint}/current_assessments_by_prof/${email}`
    return this.http.get<any[]>(url)
  }

  getCurrentSemesterRequirements(): Observable<SemesterReqs>{
    return this.http.get<SemesterReqs>(`${this.endPoint}/current_outcome_reqs`)
  }

  recordAllSuboutcomeScores(grades: { score_id: string, grade:number}[]): boolean{
    console.log('recordAll :', grades)
    if (grades.length == 0){
      alert('At least one outcome needs to be marked for this to be submitted.')
      return false
    }
    try{
      grades.forEach(grade => {
        console.log('grade in foreach is at ', grade)
        this.recordSingleGrade(grade).pipe(take(1)).subscribe()
      })
      this.markAsGraded().pipe(take(1)).subscribe()
      return  true
    }
    catch(err){
      alert('An error has occured while submitted your grades. This assessment has not been marked as graded and needs to be resubmitted.')
      return false
      //this.router.navigateByUrl('/projects');
    }
  }

  markAsGraded(){
    const url = `${this.endPoint}/mark_as_graded/${this.assID}`
    return this.http.post<{ score_id: number}>(url, {'empty': 'object'}, httpOptions);
  }

  getSuboutcomeGrades(ass_id:number, score_id: string){
    return this.http.get<any>(`${this.endPoint}/get_suboutcome_grade/${ass_id}/${score_id}`)
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

}
