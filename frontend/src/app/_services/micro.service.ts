import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MicroService {

  constructor(private http: HttpClient) { }

    executeTest(): Observable<any> {
      return this.http.get(API_URL + 'executeTest', { responseType: 'text' });
    }
}
