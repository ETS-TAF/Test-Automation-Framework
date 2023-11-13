import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject,  Observable, Subject, forkJoin, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {testModel} from "../models/test-model";
import {testModel2} from "../models/testmodel2";
import {TestResponseModel} from "../models/testResponseModel";

@Injectable({
  providedIn: 'root'
})

export class TestApiService {
  REST_API: string = environment.apiUrl
  constructor(private http: HttpClient) { }

  //execute tests one by one
  executeTests(dataTests: testModel2[]): Observable<TestResponseModel[]> {
    return forkJoin(
      dataTests.map(test =>
        this.http.post<TestResponseModel>(`${this.REST_API}/microservice/testapi/checkApi`, test)
      )
    );
  }

//to refresh automatically the tests's  list
  private testsSubject: BehaviorSubject<testModel2[]> = new BehaviorSubject<testModel2[]>([]);
  tests$ : Observable<testModel2[]> = this.testsSubject.asObservable();
  listTests : testModel2 []=[];

  //ajouter un test a la liste
  addTestOnList(newTest: testModel2){
    newTest.id= this.listTests.length+1;
    this.listTests.push(newTest);
    this.testsSubject.next([...this.listTests]);

  }

// delete a test from the liste when user confirm the remove
  deleteTest(id: number){
    let indiceASupprimer = id-1;
    this.listTests.splice(indiceASupprimer, 1);
    this.testsSubject.next([...this.listTests]);

  }

  // get test information to show it to the user, so he can conform that he wants delete the right test on the list
  getTest(id: number) {
    const rowTest = this.listTests.find(row => row.id === id);
    return rowTest;
  }

  // Update the status of test executions using index
  updateTestsStatusExecution(listTestsResponses: TestResponseModel[]) {
    // Ensure the response list length is equal to the test list length
    if (listTestsResponses.length !== this.listTests.length) {
      console.error('The number of responses does not match the number of tests.');
      return;
    }

    // Iterate over the responses and update the corresponding test by index
    listTestsResponses.forEach((response, index) => {
      // Directly using the index to update the status
      if (this.listTests[index]) { // Check if the test exists at this index
        this.listTests[index].responseStatus = response.answer;
      } else {
        console.error(`No test found at index ${index}`);
      }
    });

    // Emit the updated test list
    this.testsSubject.next([...this.listTests]);
  }

}
