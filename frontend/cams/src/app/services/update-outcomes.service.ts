import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, Observable } from 'rxjs';
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

  endPoint = "http://localhost:4201"

  constructor(private http: HttpClient) {  }

  getOutcomesOnly(degree: string): Observable<OutDesc[]> {
    return this.http.get<OutDesc[]>(`${this.endPoint}/get_outs_only/${degree}`)
  }
  

  getsuboutcomesOnly(out_id: number, degree: string): Observable<SuboutDesc> {
    return this.http.get<SuboutDesc>(`${this.endPoint}/get_sub_by_outcome/${out_id}/${degree}`)
  }

  update(toKeep: number[], degree:string, newRequirements:NewRequirement){
    try{
      console.log('toKeep is at: ', toKeep)
      const task1 = this.startNew(toKeep,degree)
    
  }
    catch(e){
      throw Error('Semester data was not updated. Please double check the current requirements and resubmit.q')
    }
    const task2 = this.updateReqsAndOutsTest(newRequirements,degree)
  }


  startNew(toKeep:number[], degree:String){
    const url = `${this.endPoint}/start_new/${degree}`
    const hm = {
      dummy: 'dummy',
      toKeep: toKeep
    }
    console.log(toKeep, ' is toKeep in service')
    return this.http.post<number[]>(url, hm, httpOptions);
  }

  updateReqs(sub:Suboutcome[], degree:string){
    console.log('in update_req_test:', sub)
    console.log('what is idTracker at?: ')
    const url = `${this.endPoint}/add_subs/${degree}`
    return this.http.post<Suboutcome[]>(url, sub, httpOptions);
  }

  updateReqsAndOutsTest(reqs:NewRequirement, degree:string){
    console.log('in update reqs and outs test:', reqs)
    let allSubs = reqs.new_subs
    let allOuts = reqs.new_outcome
    let task1 = this.updateOuts(allOuts, degree)
    let task2 = this.updateReqs(allSubs, degree)
    console.log(`Description in service is at ${reqs.new_outcome[0].outcome_description}`)
    concat(task1,task2).subscribe()
    //task1.subscribe()
    
    
  }

  updateOuts(out:OutcomeDescriptions[], degree:string): Observable<any>{
    console.log('in update_out_test:', out)
    console.log(`Description in service is at ${out[0].outcome_description}`)
    const url = `${this.endPoint}/add_outs/${degree}`
    return this.http.post<any>(url, out, httpOptions);
  }

}
