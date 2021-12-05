import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { NewRequirement } from '../NewRequirement';
import { OutcomeDescriptions } from '../OutcomeDescriptions';
import { OutDesc } from '../outDesc';
import { Suboutcome } from '../Suboutcome';
import { SuboutcomeDescription } from '../SuboutcomeDescription';
import { SuboutDesc } from '../suboutDesc';

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

  endPoint = "https://capstone-management.herokuapp.com"

  constructor(private http: HttpClient) {  }

  getOutcomesOnly(degree: string): Observable<OutDesc[]> {
    return this.http.get<OutDesc[]>(`${this.endPoint}/get_outs_only/${degree}`)
  }
  
  
  testOutcomesOnly(degree: string): Observable<OutcomeDescriptions[]> {
    return this.http.get<OutcomeDescriptions[]>(`${this.endPoint}/get_outs_only/${degree}`)
  }

  getsuboutcomesOnly(out_id: number, degree: string): Observable<SuboutDesc[]> {
    return this.http.get<SuboutDesc[]>(`${this.endPoint}/get_sub_by_outcome/${out_id}/${degree}`)
  }

  subsByCatID(cat_id: number, degree: string): Observable<Suboutcome[]> {
    return this.http.get<Suboutcome[]>(`${this.endPoint}/get_sub_by_cat_id/${cat_id}/${degree}`)
  }

  getAllCurrentSuboutcomes(degree:string): Observable<Suboutcome[]>{
    return this.http.get<Suboutcome[]>(`${this.endPoint}/get_current_subs/${degree}`)
  }

  update(toKeep: number[], degree:string, newRequirements:NewRequirement){
    try{
      console.log('toKeep is at: ', toKeep)
      this.startNew(toKeep,degree).pipe(take(1)).subscribe(x=>{
          console.log ('what is the res at ', x)
          this.updateReqsAndOutsTest(newRequirements,degree, x)
          
        
      })
    
  }
    catch(e){
      throw Error('Semester data was not updated. Please double check the current requirements and resubmit.')
    }
    
  }


  startNew(toKeep:number[], degree:String){
    const url = `${this.endPoint}/start_new/${degree}`
    const hm = {
      dummy: 'dummy',
      toKeep: toKeep
    }
    console.log(toKeep, ' is toKeep in service')
    return this.http.post<number>(url, hm, httpOptions);
  }

  updateReqs(sub:Suboutcome[], degree:string,term_id:number){
    console.log('in update_req_test:', sub)
    const url = `${this.endPoint}/add_subs/${degree}/${term_id}`
    return this.http.post<Suboutcome[]>(url, sub, httpOptions);
  }

  updateReqsAndOutsTest(reqs:NewRequirement, degree:string, term_id:number){
    console.log('in update reqs and outs test:', reqs)
    let allSubs = reqs.new_subs
    let allOuts = reqs.new_outcome
    let task1 = this.updateOuts(allOuts, degree, term_id)
    let task2 = this.updateReqs(allSubs, degree,term_id)
    // console.log(`Description in service is at ${reqs.new_outcome[0].outcome_description}`)
    concat(task1,task2).subscribe()
    //task1.subscribe()
    
    
  }

  updateOuts(out:OutcomeDescriptions[], degree:string, term_id:number): Observable<any>{
    console.log('in update_out_test:', out)
    const url = `${this.endPoint}/add_outs/${degree}/${term_id}`
    return this.http.post<any>(url, out, httpOptions);
  }

}
