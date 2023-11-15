import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { JMeterHttpRequest } from './jmeter-http-request';
import { JMeterFTPRequest } from './jmeter-ftp-request';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { PerformanceTestApiService } from 'src/app/_services/performance-test-api.service';

@Component({
  selector: 'app-jmeter-api',
  templateUrl: './jmeter-api.component.html',
  styleUrls: [
    '../gatling-api/gatling-api.component.css',
    './jmeter-api.component.css',
  ],
})
export class JmeterApiComponent implements OnInit {
  modal: HTMLElement | null = document.getElementById('myModal');
  span: Element | null = document.getElementsByClassName('close')[0];
  testResult: any;
  testLog: String = '';
  reportFilePath: String = '';
  busy: Subscription | undefined;

  http_request: JMeterHttpRequest = new JMeterHttpRequest();
  ftp_request: JMeterFTPRequest = new JMeterFTPRequest();
  http_description = document.getElementById(' http-description');
  ftp_description = document.getElementById(' ftp-description');

  testResults: any[] = [];
  result_table: HTMLElement | null = document.getElementById('result_table');
  httpForm: HTMLElement | null = document.getElementById('http-form');
  ftpForm: HTMLElement | null = document.getElementById('ftp-form');
  switchLabel: HTMLElement | null = document.getElementById('switchLabel');
  switchCheckbox: HTMLInputElement | null = document.getElementById(
    'formSwitch'
  ) as HTMLInputElement;

  constructor(private performanceTestApiService: PerformanceTestApiService) {}

  ngOnInit(): void {
    this.modal = document.getElementById('myModal');
    this.span = document.getElementsByClassName('close')[0];
    this.result_table = document.getElementById('result_table');
    this.httpForm = document.getElementById('http-form');
    this.ftpForm = document.getElementById('ftp-form');
    this.switchLabel = document.getElementById('switchLabel');
    this.http_description = document.getElementById('http-description');
    this.ftp_description = document.getElementById('ftp-description');

    this.switchCheckbox = document.getElementById(
      'formSwitch'
    ) as HTMLInputElement;
  }

  onHttpSubmit() {
    this.busy = this.performanceTestApiService
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
        if(response.length != 0){
          this.modal!.style.display = 'block';
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: "Le test a échoué, révisez votre configuration de test",
          })
        }
      }, (error: any) =>{
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: "Le test a échoué, révisez votre configuration de test",
        })
      });
  }

  onFtpSubmit() {
    this.busy = this.performanceTestApiService
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
        if(response.length != 0){
          this.modal!.style.display = 'block';
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: "Le test a échoué, révisez votre configuration de test",
          })
        }

      }, (error: any) =>{
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: "Le test a échoué, révisez votre configuration de test",
        })
      });
  }

  closeModal() {
    this.modal!.style.display = 'none';
  }

  toggleForms() {
    if (
      this.switchCheckbox?.checked &&
      this.httpForm &&
      this.ftpForm &&
      this.switchLabel &&
      this.ftp_description &&
      this.http_description
    ) {
      // Show FTP form
      this.httpForm.style.display = 'none';
      this.ftpForm.style.display = 'block';
      this.ftp_description.style.display = 'block';
      this.http_description.style.display = 'none';
      this.switchLabel.innerText = 'FTP';
    } else if (
      !this.switchCheckbox?.checked &&
      this.httpForm &&
      this.ftpForm &&
      this.switchLabel &&
      this.ftp_description &&
      this.http_description
    ) {
      // Show HTTP form
      this.httpForm.style.display = 'block';
      this.ftpForm.style.display = 'none';
      this.ftp_description.style.display = 'none';
      this.http_description.style.display = 'block';
      this.switchLabel.innerText = 'HTTP';
    }
  }
}
