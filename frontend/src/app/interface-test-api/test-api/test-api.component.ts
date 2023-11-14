import {Component, OnInit} from '@angular/core';
import { TestApiService } from 'src/app/_services/test-api.service';
import {testModel} from "../../models/test-model";
import {MatDialog} from "@angular/material/dialog";
import {AddTestDialogComponent} from "./add-test-dialog/add-test-dialog.component";
import {DeleteTestDialogComponent} from "./delete-test-dialog/delete-test-dialog.component";
import {testModel2} from "../../models/testmodel2";
import {TestResponseModel} from "../../models/testResponseModel";


@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.css']
})
export class TestApiComponent implements OnInit {
  isPopupOpened =true;
 // colomn's list
  displayedColumns: string[] = ['id', 'method', 'apiUrl', 'responseTime', 'statusCode', 'responseStatus', 'action'];
  dataTests : testModel2[]  = [];

  constructor(
    private testApiService: TestApiService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    //loade list of tests
    this.getTestList()
  }

//get list of tests after evry test adde
  getTestList  () : void {
    this.testApiService.tests$.subscribe((tests : testModel2 [])=>{this.dataTests=tests});
   }

   //oppen a dialog when user click on add icon
  addTest() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(AddTestDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;

       this.ngOnInit() //refresh list of tests automaticly after to show the new test

    });

  }

  //oppen a dialog when user click
  deleteTest(id: string) {
    this.isPopupOpened = true;
    console.log("list ===>0",id)
    const dialogRef = this.dialog.open(DeleteTestDialogComponent, { data: id});
    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
      this.ngOnInit()
    });

    this.getTestList()
  }

  // download the test list with csv format after they was executed
  exportCSV(): void {
    if (this.dataTests.length === 0) {
      return;
    }
    const separator = ',';
    const keys = Object.keys(this.dataTests[0]) as (keyof testModel)[];
    const csvContent =
      keys.join(separator) +
      '\n' +
      this.dataTests.map(item => {
        return keys.map(key => {
          return (item as any)[key];
        }).join(separator);
      }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'dataTests.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  // lunch tests execution
  lunchTests() {
    this.testApiService.executeTests(this.dataTests).subscribe((listTestsReponses: TestResponseModel[]) => {
      this.updateTestsStatusExecution(listTestsReponses);
    });
  }

 //updates list of tests after the test swas executed
  updateTestsStatusExecution(listTestsReponses: TestResponseModel[]) {
    console.log("========>", listTestsReponses);
    this.testApiService.updateTestsStatusExecution(listTestsReponses);
    this.getTestList()
  }

}
