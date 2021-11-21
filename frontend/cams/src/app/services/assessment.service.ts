import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { OutcomeDescriptions } from '../OutcomeDescriptions';
import { SemesterReqs } from '../SemesterReqs';
import { Suboutcome } from '../Suboutcome'
import { AssessmentDisplay } from '../AssessmentDisplay';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ScoreComment } from '../ScoreComment';

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
  assID!: number
  assessment!: AssessmentDisplay
  outcomeDescriptions$!: Observable<OutcomeDescriptions[]>
  submissionStatus: boolean = false
  requirements$!: Observable<SemesterReqs[]>



  constructor(private http: HttpClient, private router: Router) {

  }

  getCurrentAssessmentsbyProf(email:string): any{
    const url = `${this.endPoint}/current_assessments_by_prof/${email}`
    return this.http.get<any[]>(url)
  }

  getCurrentSemesterRequirements(): Observable<SemesterReqs>{
    return this.http.get<SemesterReqs>(`${this.endPoint}/current_outcome_reqs`)
  }

  submitAssessment(grades: { score_id: string, grade:number}[],comments:ScoreComment[]): boolean{
    try{
      this.recordAllSuboutcomeScores(grades)
      this.recordAllComments(comments)
    }catch(err){
      console.log(err)
      alert(err)
      return false
    }
    return true
  }

  recordAllSuboutcomeScores(grades: { score_id: string, grade:number}[]){
    if (grades.length == 0){
      alert('At least one outcome needs to be updated for this to be submitted.')
      return
    }
    try{
      grades.forEach(grade => {
        console.log('grade in foreach is at ', grade)
        this.recordSingleGrade(grade).pipe(take(1)).subscribe()
      })
      this.markAsGraded().pipe(take(1)).subscribe()
    }
    catch(err){
      throw Error('An error has occured while submitting your grades. This assessment has not been marked as graded and needs to be resubmitted.')
    }


  }

  recordAllComments(comments:ScoreComment[]){
    try{
    comments.forEach(comment => {
      console.log('comment in foreach is at ', comment)
      this.recordSingleComment(comment).pipe(take(1)).subscribe()
    })}
    catch(err){
      throw Error('An error has occured while submitting your comments. Your assessment has been submitted but comments may not have updated.')
    }
  }

  recordSingleComment(comment:ScoreComment){
    console.log('in record comment:', comment)
    const url = `${this.endPoint}/record_comment`
    return this.http.post<{ score_id: number}>(url, comment, httpOptions);
  }

  markAsGraded(){
    const url = `${this.endPoint}/mark_as_graded/${this.assID}`
    return this.http.post<{ score_id: number}>(url, {'empty': 'object'}, httpOptions);
  }

  getSuboutcomeGrades(ass_id:number, score_id: string){
    return this.http.get<any>(`${this.endPoint}/get_suboutcome_grade/${ass_id}/${score_id}`)
  }

  recordSingleGrade(grade: { score_id: string, grade:number}){
    const url = `${this.endPoint}/record_scores/${this.assID}`
    return this.http.post<{ score_id: number}>(url, grade, httpOptions);
  }

  getOutcomeDescription(ids: number[]): Observable<OutcomeDescriptions[]>{
    console.log('what is this id type? ', typeof(ids), ' what is this')
    return this.http.get<OutcomeDescriptions[]>(`${this.endPoint}/get_outcome_desc/${this.assessment.degree}/${ids}`)
  }

  getSuboutcomes(outcome_name: number): Observable<Suboutcome[]>{
    return this.http.get<Suboutcome[]>(`${this.endPoint}/get_suboutcomes/${this.assessment.degree}/${outcome_name}`)
  }

}
