import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test';

@Injectable({
  providedIn: 'root'
})
export class MicroService {

  constructor(private http: HttpClient) { }

    executeTest(userUrl: string): Observable<any> {
      return this.http.get(API_URL + '/executeTest',{params: {userUrl}, responseType:'text'});
    }
    executeTestCasButton(userUrl: string, buttonName: string, selectedText: string): Observable<any> {
      const params = { userUrl, buttonName, selectedText };
      return this.http.get(API_URL + '/executeTestCasButton', { params: {userUrl,buttonName,selectedText}, responseType: 'text' });
    }
}
