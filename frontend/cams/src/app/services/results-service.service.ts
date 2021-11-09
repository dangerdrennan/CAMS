import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions =
{
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ResultsServiceService {

  endPoint = "http://localhost:4201"

  constructor(private http: HttpClient) { 
    this.arrayTest([1,2,3,4,5])
  }

  arrayTest(arr: any[]) {
    console.log('in a add assessment the arr is at', arr)
    const url = `${this.endPoint}/add_assessments/${arr}`
    return this.http.post<any[]>(url, arr, httpOptions);
  }
}
