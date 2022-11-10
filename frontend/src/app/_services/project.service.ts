import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/op/projects/';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) { }

  saveProject(project: any): Observable<any> {
    return this.http.post(API_URL, project, { responseType: 'text' });
  }
}
