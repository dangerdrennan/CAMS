import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { NewRequirement } from '../NewRequirement';
import { OutcomeDescriptions } from '../OutcomeDescriptions';
import { OutDesc } from '../outDesc';
import { Suboutcome } from '../Suboutcome';
import { SuboutDesc } from '../suboutDesc';
import { environment as env } from 'src/environments/environment';


/**
 *This service calls backend functions that enable updating outcomes logic.
 * Functional but needs refactoring. Duplicated functions make development
 * and logic confused.
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
export class UpdateOutcomesService {

  endPoint = env.API

  constructor(private http: HttpClient) {  }


  // NOTE: figure out which of these is used
  // grabs outcomes specific to a degree
  getOutcomesOnly(degree: string): Observable<OutDesc[]> {
    return this.http.get<OutDesc[]>(`${this.endPoint}/get_outs_only/${degree}`)
  }
  
  // NOTE: figure out which of these is used
  // grabs outcomes specific to a degree
  testOutcomesOnly(degree: string): Observable<OutcomeDescriptions[]> {
    return this.http.get<OutcomeDescriptions[]>(`${this.endPoint}/get_outs_only/${degree}`)
  }

  // NOTE: repeat function? find if this is being called or if it can be combined with bottom function
  // grabs suboutcomes specific to a degree and an outcome
  getsuboutcomesOnly(out_id: number, degree: string): Observable<SuboutDesc[]> {
    return this.http.get<SuboutDesc[]>(`${this.endPoint}/get_sub_by_outcome/${out_id}/${degree}`)
  }

  // NOTE: repeat function? find if this is being called or if it can be combined with bottom function
  // grabs suboutcomes specific to a degree and an outcome
  subsByCatID(cat_id: number, degree: string): Observable<Suboutcome[]> {
    return this.http.get<Suboutcome[]>(`${this.endPoint}/get_sub_by_cat_id/${cat_id}/${degree}`)
  }

  // NOTE: repeat function? This function only grabs suboutcomes by degree
  getAllCurrentSuboutcomes(degree:string): Observable<Suboutcome[]>{
    return this.http.get<Suboutcome[]>(`${this.endPoint}/get_current_subs/${degree}`)
  }

  // begins the updating process from the from the change outcomes component
  // this is a try/catch wrapper so if updateReqsAndOutsTest fails, a new 
  // row isn't added to the sem_req table
  update(toKeep: number[], degree:string, newRequirements:NewRequirement){
    try{
      this.startNew(toKeep,degree).pipe(take(1)).subscribe(x=>{
          this.updateReqsAndOutsTest(newRequirements,degree, x)
      })
  }
    catch(e){
      throw Error('Semester data was not updated. Please double check the current requirements and resubmit.')
    }
    
  }

  // sends the array of the outcomes that weren't deleted to the database
  // so they can be duplicated but with a new reqs_id
  startNew(toKeep:number[], degree:String){
    const url = `${this.endPoint}/start_new/${degree}`
    const hm = {
      dummy: 'dummy', // not positive what the protocol is when you need to make a post but don't send information to the database
      toKeep: toKeep
    }
    return this.http.post<number>(url, hm, httpOptions);
  }

  // Adds the suboutes, only triggers after suboutcomes have been successfully
  // updated
  updateReqs(sub:Suboutcome[], degree:string,term_id:number){
    const url = `${this.endPoint}/add_subs/${degree}/${term_id}`
    return this.http.post<Suboutcome[]>(url, sub, httpOptions);
  }

  // 'Test' because this is inside a try catch block, which will inform the user
  // requirements haven't been updated. Takes in New Requirements object and 
  // first updates the outcomes tables, then moves on to update the suboutcome tables
  updateReqsAndOutsTest(reqs:NewRequirement, degree:string, term_id:number){
    const allSubs = reqs.new_subs
    const allOuts = reqs.new_outcome
    const task1 = this.updateOuts(allOuts, degree, term_id)
    const task2 = this.updateReqs(allSubs, degree,term_id)
    concat(task1,task2).subscribe()
  }

  // NOTE: didn't catch all the anys. Add interface and test
  // updates the suboutcome tables
  updateOuts(out:OutcomeDescriptions[], degree:string, term_id:number): Observable<any>{
    const url = `${this.endPoint}/add_outs/${degree}/${term_id}`
    return this.http.post<any>(url, out, httpOptions);
  }

}
