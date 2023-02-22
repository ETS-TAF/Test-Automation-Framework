import { Component, OnInit } from '@angular/core';
import { MicroService } from '../_services/micro.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {

  value: String | undefined = undefined;

  constructor(private microService: MicroService) { }

  ngOnInit(): void {
  }

  execute() {
    this.microService.executeTest().subscribe(data => {
      this.value=data;
    });
  }
}
