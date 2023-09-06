import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test';

@Injectable({
  providedIn: 'root',
})
export class MicroService {
  constructor(private http: HttpClient) {}

  executeTest(browser: string, body: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post(API_URL + '/executeTest', body, {
      params: { browser },
      headers: headers,
      responseType: 'text',
    });
  }
}
