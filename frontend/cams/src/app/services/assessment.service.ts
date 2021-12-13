import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OutcomeDescriptions } from '../OutcomeDescriptions';
import { SemesterReqs } from '../SemesterReqs';
import { Suboutcome } from '../Suboutcome'
import { AssessmentDisplay } from '../AssessmentDisplay';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ScoreComment } from '../ScoreComment';
import { environment as env } from 'src/environments/environment';

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
  endPoint = env.API
  currentCSOutcomes: string[] = []
  cs_categories: string[] = []
  currentCSOutcomeDesc: OutcomeDescriptions[] = []
  suboutcome_grade: { score_id: number}[] = []
  assID!: number
  assessment!: AssessmentDisplay
  outcomeDescriptions$!: Observable<OutcomeDescriptions[]>
  submissionStatus: boolean = false
  
  constructor(private http: HttpClient, private router: Router) {
  }

  // gets current assessments for logged in professor
  getCurrentAssessmentsbyProf(email:string): any{
    const url = `${this.endPoint}/current_assessments_by_prof/${email}`
    return this.http.get<any[]>(url)
  }

  getPastAssessmentsbyProf(email:string): any{
    const url = `${this.endPoint}/past_assessments_by_prof/${email}`
    return this.http.get<any[]>(url)
  }
  // seems fine under new schema
  getCurrentSemesterRequirements(): Observable<SemesterReqs>{
    return this.http.get<SemesterReqs>(`${this.endPoint}/current_outcome_reqs`)
  }

  getPastSemesterRequirements(sem:string,year:number): Observable<SemesterReqs>{
    console.log(' in getPastSemesterRequirements', sem, year)
    return this.http.get<SemesterReqs>(`${this.endPoint}/past_outcome_reqs/${sem}/${year}`)
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

  getOutcomeDescription(): Observable<OutcomeDescriptions[]>{
    return this.http.get<OutcomeDescriptions[]>(`${this.endPoint}/get_outcome_desc/${this.assessment.degree}/${this.assessment.semester}/${this.assessment.year}`)
  }

  getSuboutcomes(outcome_name: number): Observable<Suboutcome[]>{
    return this.http.get<Suboutcome[]>(`${this.endPoint}/get_suboutcomes/${this.assessment.degree}/${outcome_name}/${this.assessment.assessment_id}`)
  }

}
