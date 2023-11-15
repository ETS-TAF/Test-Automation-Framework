import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GatlingRequest } from '../performance-test-api/gatling-api/gatling-request';


const GATLING_API = `${environment.apiUrl}/api/gatling/runSimulation`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PerformanceTestApiService {


  constructor(private http: HttpClient) { }

  sendGatlingRequest(request: GatlingRequest): Observable<any> {
    const url = `${GATLING_API}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, request, httpOptions);
  }

}
