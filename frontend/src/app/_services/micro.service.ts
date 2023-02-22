import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test';

@Injectable({
  providedIn: 'root'
})
export class MicroService {

  constructor(private http: HttpClient) { }

    executeTest(): Observable<any> {
      return this.http.get(API_URL + '/executeTest', { responseType: 'text' });
    }
}
