import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const AUTH_API = `${environment.apiUrl}/api/testapi/`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class TestApiService {
  constructor(private http: HttpClient) { }

  execute(method:string, apiUrl:string, statusCode:number, input:string, expectedOutput:string): Observable<any> {
    return this.http.post(AUTH_API + 'checkApi', {
         method: method,
         apiUrl: apiUrl,
         statusCode: statusCode,
         expectedOutput: expectedOutput,
         input: input,
    }, httpOptions);
  }
}
