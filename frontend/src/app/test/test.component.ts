import { Component, OnInit } from '@angular/core';
import { MicroService } from '../_services/micro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  constructor(private microService: MicroService, private router: Router) {}

  ngOnInit(): void {}

  goToUiTestPage(): void {
    this.router.navigate(['/testCases']);
  }
}
