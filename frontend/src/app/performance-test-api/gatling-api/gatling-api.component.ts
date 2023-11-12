import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GatlingRequest } from './gatling-request';
import { PerformanceTestApiService } from 'src/app/_services/performance-test-api.service';


@Component({
  selector: 'app-gatling-api',
  templateUrl: './gatling-api.component.html',
  styleUrls: ['./gatling-api.component.css']
})
export class GatlingApiComponent implements OnInit {

  modal = document.getElementById("myModal");
  span = document.getElementsByClassName("close")[0];
  testResult: any;
  testLog: String = "";
  reportFilePath: String = "";

  request: GatlingRequest = new GatlingRequest();

  constructor(private performanceTestApiService: PerformanceTestApiService) { }

  ngOnInit(): void {
    this.modal = document.getElementById("myModal");
    this.span = document.getElementsByClassName("close")[0];
  }

  onSubmit(){
    this.performanceTestApiService.sendGatlingRequest(this.request)
      .subscribe(response => {
        this.modal!.style.display = "block";
        this.testLog = response.message;

        const excludedValues: string[] = [
          "> ECDHE-ECDSA-AES128-GCM-SHA256",
          "> ECDHE-RSA-AES128-GCM-SHA256",
          "> ECDHE-ECDSA-AES256-GCM-SHA384",
          "> ECDHE-RSA-AES256-GCM-SHA384",
          "> ECDHE-ECDSA-CHACHA20-POLY1305",
          "> ECDHE-RSA-CHACHA20-POLY1305",
          "> ECDHE-PSK-CHACHA20-POLY1305",
          "> ECDHE-ECDSA-AES128-SHA",
          "> ECDHE-RSA-AES128-SHA",
          "> ECDHE-PSK-AES128-CBC-SHA",
          "> ECDHE-ECDSA-AES256-SHA",
          "> ECDHE-RSA-AES256-SHA",
          "> ECDHE-PSK-AES256-CBC-SHA",
          "> AES128-GCM-SHA256",
          "> AES256-GCM-SHA384",
          "> AES128-SHA",
          "> PSK-AES128-CBC-SHA",
          "> AES256-SHA",
          "> PSK-AES256-CBC-SHA",
          "> DES-CBC3-SHA"
        ];

        const pattern = /> (.+)/g;
        const matches = Array.from(this.testLog.matchAll(pattern));
        const arrayOfStrings = matches.map(matches => matches[0]);
        this.testResult = arrayOfStrings.filter(line => !excludedValues.includes(line));

      });
  }

  closeModal(){
    this.modal!.style.display = "none";
  }


}
