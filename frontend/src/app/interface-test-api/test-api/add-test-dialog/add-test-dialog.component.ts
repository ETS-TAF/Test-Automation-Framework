import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {testModel} from "../../../models/test-model";
import {TestApiService} from "../../../_services/test-api.service";
import {testModel2}  from "../../../models/testmodel2";


@Component({
  selector: 'app-add-test-dialog',
  templateUrl: './add-test-dialog.component.html',
  styleUrls: ['./add-test-dialog.component.css']
})
export class AddTestDialogComponent implements OnInit {
  headerRequest = [{ key: '', value: '' }];
  expectedHeaderRequest = [{ key: '', value: '' }];
  method: any;
  apiUrl: any;
  responseTime: any;
  statusCode: any;
  expectedOutput: any;

  hide = true;
  errorMessage: string |undefined;
  constructor(public dialogRef: MatDialogRef<AddTestDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: testModel,


              private formBuilder : FormBuilder,
              private testApiService : TestApiService,) { }

  ngOnInit(): void {}


  addnewHeader() {
    this.headerRequest.push({ key: '', value: '' });
  }
  deleteHeader(index: number) {
    this.headerRequest.splice(index, 1);
  }

  addnewExpectedHeader() {
    this.expectedHeaderRequest.push({ key: '', value: '' });
  }
  deleteExpectedHeader(index: number) {
    this.expectedHeaderRequest.splice(index, 1);
  }

  //function qui teste est ce que expectedoutput commence par { et termine avec }
  isValidJsonFormat(value: string): boolean {
    if (!value) {
      return false;
    }
    return true;
  }

  // verfiier le format de apiurl avec regexp
  isValidApiUrl(apiUrl: string): boolean {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
      'i'
    );
    return !!pattern.test(apiUrl);
  }

  // when user click on "save" this function is to save all tests informations with the right format
  saveForm() {
    if (!this.isValidApiUrl(this.apiUrl)) {
      console.error("L'URL fournie n'est pas valide.");
      return;
    }

    const jsonData: testModel2 = {
      id: 0,
      method: this.method,
      apiUrl: this.apiUrl,
      responseTime: this.responseTime,
      expectedOutput: "",
      input:"",
      statusCode: this.statusCode,
      headers: {},
      expectedHeaders: {}
    };

    this.headerRequest.forEach((pair) => {
      jsonData.headers[pair.key] = pair.value;
    });

    this.expectedHeaderRequest.forEach((pair) => {
      jsonData.expectedHeaders[pair.key] = pair.value;
    });

    this.testApiService.addTestOnList(jsonData);
    console.log('Formatted JSON Data:', JSON.stringify(jsonData, null, 2));

    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();


  }


}
