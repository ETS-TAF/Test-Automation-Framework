import { Component, OnInit } from '@angular/core';
import { MicroService } from '../_services/micro.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  value: String | undefined = undefined;
  userUrl : string|undefined;

  constructor(private microService: MicroService) { }

  ngOnInit(): void {
  }

  execute() {
  if(this.userUrl){
    this.microService.executeTest(this.userUrl).subscribe(data => {
      this.value=data;
    });
    }


  }
}
