import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../Project'



@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  
  projects: Project[] = []
  endPoint = "http://localhost:4201"

  constructor(public http: HttpClient) { 
    
  }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getAllProjects() : Observable<Project[]>{
    return this.http.get<Project[]>(this.endPoint + '/all_projects')
  }


}
