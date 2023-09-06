import { Component, OnInit } from '@angular/core';
import { UiTestCasesComponent } from '../ui-test-cases/ui-test-cases.component';
import { MicroService } from '../_services/micro.service';

@Component({
  selector: 'app-ui-test-cases-page',
  templateUrl: './ui-test-cases-page.component.html',
  styleUrls: ['./ui-test-cases-page.component.css'],
})
export class UiTestCasesPageComponent implements OnInit {
  testCases: UiTestCasesComponent[] = [];
  constructor(private microService: MicroService) {}

  ngOnInit(): void {}
  addTestCase() {
    this.testCases.push(new UiTestCasesComponent(this.microService));
  }
}
