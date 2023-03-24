import { Component, OnInit } from '@angular/core';
import { MicroService } from '../_services/micro.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  constructor(private microService: MicroService) {}

  ngOnInit(): void {}
}
