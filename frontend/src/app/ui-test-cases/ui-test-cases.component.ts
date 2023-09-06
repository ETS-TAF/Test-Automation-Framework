import { Component, OnInit } from '@angular/core';
import { MicroService } from '../_services/micro.service';

@Component({
  selector: 'app-ui-test-cases',
  templateUrl: './ui-test-cases.component.html',
  styleUrls: ['./ui-test-cases.component.css'],
})

export class UiTestCasesComponent implements OnInit {
  actions: string[] = ['Clear', 'Click', 'GoToUrl', 'FillField', 'GetAttribute', 'GetPageTitle', 'IsDisplayed', 'IsEnabled', 'IsSelected', 'Quit'];
  dataSource: any[] = [
    {
      action: '',
      object: '',
      input: '',
      target: '',
    },
  ];
  displayedColumns: string[] = ['action', 'object', 'input', 'target'];
  cardTitle = '';

  constructor(private microService: MicroService) {}

  ngOnInit(): void {}

  addRow() {
    const newRow = {
      action: '',
      object: '',
      input: '',
      target: '',
    };
    this.dataSource.push(newRow);
    this.dataSource = [...this.dataSource];
  }

  createJson() {
    console.log({name:this.cardTitle, actions:this.dataSource})
    return {name:this.cardTitle, actions:this.dataSource}
  }

  isInputEditable(action: string): boolean {
    return action === 'GoToUrl' || action === 'FillField';
  }

  isTargetEditable(action: string): boolean {
    //Les conditions vont changer lorsque d'autre action seront implementees.
    return action === 'GetAttribute' || action === 'GetPageTitle';
  }

  isObjectEditable(action: string): boolean {
    return action === 'Clear' || action === 'Click' || action === 'FillField' || action === 'IsDisplayed' || action === 'IsSelected' || action === 'IsEnabled' || action === 'GetAttribute';
  }

  getLabelsForAction(action: string) {
    switch (action) {
      case 'Clear':
        return {
          objectLabel: 'Enter a browser',
          inputLabel: '',
          targetLabel: '',
        };
      case 'Click':
        return {
          objectLabel: 'Enter a browser',
          inputLabel: '',
          targetLabel: '',
        };
      case 'GetAttribute':
        return {
          objectLabel: '',
          inputLabel: 'Input',
          targetLabel: '',
        };
      case 'GetPageTitle':
        return {
          objectLabel: '',
          inputLabel: '',
          targetLabel: 'Target',
        };
      case 'GoToUrl':
        return {
          objectLabel: '',
          inputLabel: 'Input',
          targetLabel: '',
        };
      case 'Quit':
        return {
          objectLabel: '',
          inputLabel: '',
          targetLabel: '',
        };
      case 'Submit':
        return {
          objectLabel: '',
          inputLabel: '',
          targetLabel: '',
        };
      default:
        return {
          objectLabel: 'Object',
          inputLabel: 'Input',
          targetLabel: 'Target',
        };
    }
  }

  run() {
    let browser = 'chrome';

    this.dataSource.forEach((data: any) => {
      if (data.actions == 'Open in Browser') {
        browser = data.object;
      }
    });

    this.microService.executeTest(browser, this.createJson()).subscribe();
  }
}
