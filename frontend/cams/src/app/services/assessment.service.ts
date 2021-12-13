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

/**
 * This service takes care of passing data from the database to the UI through observable requests. Any added projects will automatically have an assessment generated for that student depending on which major they are.
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

  // grab assessments information like student name, project title, semester, and year for a specified professor in the current semester

  
  constructor(private http: HttpClient, private router: Router) {
  }

  getCurrentAssessmentsbyProf(email:string): any{
    const url = `${this.endPoint}/current_assessments_by_prof/${email}`
    return this.http.get<any[]>(url)
  }

  // grab assessments information like student name, project title, semester, and year for a specified professor in a past semester
  // we will take care of returning 'any' in our refactor
  getPastAssessmentsbyProf(email:string): any{
    const url = `${this.endPoint}/past_assessments_by_prof/${email}`
    return this.http.get<any[]>(url)
  }

  // grab the outcome and suboutcome descriptions for each major in the current semester like the
  getCurrentSemesterRequirements(): Observable<SemesterReqs>{
    return this.http.get<SemesterReqs>(`${this.endPoint}/current_outcome_reqs`)
  }

  // grab the outcome and suboutcome descriptions for each major from a past semester
  getPastSemesterRequirements(sem:string,year:number): Observable<SemesterReqs>{
    return this.http.get<SemesterReqs>(`${this.endPoint}/past_outcome_reqs/${sem}/${year}`)
  }

  // send a request to submit the assessment and store any comments that were given in their assessment
  submitAssessment(grades: { score_id: string, grade:number}[],comments:ScoreComment[]): boolean{
    try{
      this.recordAllSuboutcomeScores(grades)
      this.recordAllComments(comments)
    }catch(err){
      alert(err)
      return false
    }
    return true
  }

  // make a request to store individual scores for each suboutcome that is submitted, if not all suboutcomes are grades, an alert box will appear
  recordAllSuboutcomeScores(grades: { score_id: string, grade:number}[]){
    if (grades.length == 0){
      alert('At least one outcome needs to be updated for this to be submitted.')
      return
    }
    try{
      grades.forEach(grade => {
        this.recordSingleGrade(grade).pipe(take(1)).subscribe()
      })
      this.markAsGraded().pipe(take(1)).subscribe()
    }
    catch(err){
      throw Error('An error has occured while submitting your grades. This assessment has not been marked as graded and needs to be resubmitted.')
    }

  }

  // store each comment in the database
  recordAllComments(comments:ScoreComment[]){
    try{
    comments.forEach(comment => {
      this.recordSingleComment(comment).pipe(take(1)).subscribe()
    })}
    catch(err){
      throw Error('An error has occured while submitting your comments. Your assessment has been submitted but comments may not have updated.')
    }
  }

  // request to store individual comment
  recordSingleComment(comment:ScoreComment){
    const url = `${this.endPoint}/record_comment`
    return this.http.post<{ score_id: number}>(url, comment, httpOptions);
  }

  // when a assessment is graded, update the status button to 'graded' from 'not graded'
  markAsGraded(){
    const url = `${this.endPoint}/mark_as_graded/${this.assID}`
    return this.http.post<{ score_id: number}>(url, {'empty': 'object'}, httpOptions);
  }

  // get score for a specifed assessment
  // we will take care of returing 'any' in our refactor
  getSuboutcomeGrades(ass_id:number, score_id: string){
    return this.http.get<any>(`${this.endPoint}/get_suboutcome_grade/${ass_id}/${score_id}`)
  }

  // get a specific score based off of an assessment
  recordSingleGrade(grade: { score_id: string, grade:number}){
    const url = `${this.endPoint}/record_scores/${this.assID}`
    return this.http.post<{ score_id: number}>(url, grade, httpOptions);
  }

  // grab the outcome descriptions by major, semester and year
  getOutcomeDescription(): Observable<OutcomeDescriptions[]>{
    return this.http.get<OutcomeDescriptions[]>(`${this.endPoint}/get_outcome_desc/${this.assessment.degree}/${this.assessment.semester}/${this.assessment.year}`)
  }

  // grab the sub outcome descriptions by major, semester and year
  getSuboutcomes(outcome_name: number): Observable<Suboutcome[]>{
    return this.http.get<Suboutcome[]>(`${this.endPoint}/get_suboutcomes/${this.assessment.degree}/${outcome_name}/${this.assessment.assessment_id}`)
  }

}
