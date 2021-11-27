import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  getOutcomesOnly(degree: string): Observable<OutDesc> {
    return this.http.get<OutDesc>(`${this.endPoint}/get_outs_only/${degree}`)
  }

  getsuboutcomesOnly(out_id: number, degree: string): Observable<SuboutDesc> {
    return this.http.get<SuboutDesc>(`${this.endPoint}/get_sub_by_outcome/${out_id}/${degree}`)
  }

}
