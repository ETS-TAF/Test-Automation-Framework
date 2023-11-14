import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { JMeterHttpRequest } from './jmeter-http-request';
import { JMeterFTPRequest } from './jmeter-ftp-request';

import { PerformanceTestApiService } from 'src/app/_services/performance-test-api.service';

@Component({
  selector: 'app-jmeter-api',
  templateUrl: './jmeter-api.component.html',
  styleUrls: ['../gatling-api/gatling-api.component.css'],
})
export class JmeterApiComponent implements OnInit {
  modal = document.getElementById('myModal');
  span = document.getElementsByClassName('close')[0];
  testResult: any;
  testLog: String = '';
  reportFilePath: String = '';

  http_request: JMeterHttpRequest = new JMeterHttpRequest();
  ftp_request: JMeterFTPRequest = new JMeterFTPRequest();

  testResults: any[] = [];
  result_table = document.getElementById('result_table');

  constructor(private performanceTestApiService: PerformanceTestApiService) {}

  ngOnInit(): void {
    this.modal = document.getElementById('myModal');
    this.span = document.getElementsByClassName('close')[0];
    this.result_table = document.getElementById('result_table');
  }

  onHttpSubmit() {
    this.performanceTestApiService
      .sendHttpJMeterRequest(this.http_request)
      .subscribe((response: any[]) => {
        this.testResults = response.map((result) => ({
          allThreads: result.allThreads,
          grpThreads: result.grpThreads,
          idleTime: result.IdleTime,
          dataType: result.dataType,
          connect: result.Connect,
          label: result.label,
          threadName: result.threadName,
          url: result.URL,
          responseCode: result.responseCode,
          latency: result.Latency,
          timestamp: result.timeStamp,
          elapsed: result.elapsed,
          success: result.success,
          bytes: result.bytes,
          responseMessage: result.responseMessage,
          failureMessage: result.failureMessage,
          sentBytes: result.sentBytes,
        }));
        this.modal!.style.display = 'block';
      });
  }

  onFtpSubmit() {
    this.performanceTestApiService
      .sendFtpJMeterRequest(this.ftp_request)
      .subscribe((response: any[]) => {
        this.testResults = response.map((result) => ({
          allThreads: result.allThreads,
          grpThreads: result.grpThreads,
          idleTime: result.IdleTime,
          dataType: result.dataType,
          connect: result.Connect,
          label: result.label,
          threadName: result.threadName,
          url: result.URL,
          responseCode: result.responseCode,
          latency: result.Latency,
          timestamp: result.timeStamp,
          elapsed: result.elapsed,
          success: result.success,
          bytes: result.bytes,
          responseMessage: result.responseMessage,
          failureMessage: result.failureMessage,
          sentBytes: result.sentBytes,
        }));
        this.modal!.style.display = 'block';
      });
  }
  closeModal() {
    this.modal!.style.display = 'none';
  }
}
