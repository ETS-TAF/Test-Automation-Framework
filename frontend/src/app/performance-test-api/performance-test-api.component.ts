import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-performance-test-api',
  templateUrl: './performance-test-api.component.html',
  styleUrls: ['./performance-test-api.component.css']
})
export class PerformanceTestApiComponent implements OnInit {

  constructor(private router: Router) {}

  runGatlingTest() {
    // Navigate to Gatling test component
    this.router.navigate(['/gatling-test']);
  }

  runJMeterTest() {
    // Navigate to JMeter test component
    this.router.navigate(['/jmeter-test']);
  }

  ngOnInit(): void {
  }

}
