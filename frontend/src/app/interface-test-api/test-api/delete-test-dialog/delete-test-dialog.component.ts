import {Component, Inject, OnInit} from '@angular/core';
import {TestApiService} from "../../../_services/test-api.service";
import { FormBuilder, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {testModel2} from "../../../models/testmodel2";

@Component({
  selector: 'app-delete-test-dialog',
  templateUrl: './delete-test-dialog.component.html',
  styleUrls: ['./delete-test-dialog.component.less']
})
export class DeleteTestDialogComponent implements OnInit {
  errorMessage: any;
  test: any;

  constructor(private testApiService : TestApiService,
              public dialogRef: MatDialogRef<DeleteTestDialogComponent >,
              @Inject(MAT_DIALOG_DATA) public id: any,) { }

  ngOnInit(): void {
   this.test= this.testApiService.getTest(this.id)

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(id : number){
    this.testApiService.deleteTest(this.id)

  }


}
