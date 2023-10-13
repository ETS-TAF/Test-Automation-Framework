import { Component, OnInit } from '@angular/core';
import { TestApiService } from 'src/app/_services/test-api.service';

@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.less']
})
export class TestApiComponent implements OnInit {

  form: any = {
    method: "get",
    apiUrl: "",
    input: "",
    exceptedOutput: "",
    statusCode:200
  };

  methods: any [] = [
    { id: "get", name: 'Get' },
    { id: "head", name: 'Head' },
    { id: "post", name: 'Post' },
    { id: "put", name: 'Put' },
    { id: "delete", name: 'Delete' },
    { id: "options", name: 'Options' },
    { id: "patch", name: 'Patch' },
  ];

  answer ="";
  isResponse =false;
  statusCode = "";


  constructor(
    private testApiService: TestApiService
  ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    const { method, apiUrl, statusCode, input, exceptedOutput } = this.form;
    this.testApiService.execute(method, apiUrl, statusCode, input, exceptedOutput).subscribe({
      next: data => {
        console.log(data.statusCode);
        this.isResponse = true;
        this.answer = data.answer;
        this.statusCode = JSON.stringify(data.statusCode);
        console.log(this.statusCode);
      },
      error: err => {
      }
    });
  }
}
