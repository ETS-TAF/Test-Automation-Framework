import { Component, OnInit } from '@angular/core';

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
      output: '',
    },
  ];
  displayedColumns: string[] = ['action', 'object', 'input', 'output'];
  cardTitle = '';

  constructor() {}

  ngOnInit(): void {}

  addRow() {
    const newRow = {
      action: '',
      object: '',
      input: '',
      output: '',
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

  isOutputEditable(action: string): boolean {
    //Les conditions vont changer lorsque d'autre action seront implementees.
    return false;
  }

  isObjectEditable(action: string): boolean {
    return action === 'Clear' || action === 'Click' || action === 'FillField' || action === 'IsDisplayed' || action === 'IsSelected' || action === 'IsEnabled';
  }

  getLabelsForAction(action: string) {
    switch (action) {
      case 'Clear':
        return {
          objectLabel: 'Enter a browser',
          inputLabel: '',
          outputLabel: '',
        };
      case 'Click':
        return {
          objectLabel: 'Enter a browser',
          inputLabel: '',
          outputLabel: '',
        };
      case 'GetAttribute':
        return {
          objectLabel: '',
          inputLabel: 'Input',
          outputLabel: '',
        };
      case 'GetPageTitle':
        return {
          objectLabel: '',
          inputLabel: '',
          outputLabel: 'Output',
        };
      case 'GoToUrl':
        return {
          objectLabel: '',
          inputLabel: 'Input',
          outputLabel: '',
        };
      case 'Quit':
        return {
          objectLabel: '',
          inputLabel: '',
          outputLabel: '',
        };
      case 'Submit':
        return {
          objectLabel: '',
          inputLabel: '',
          outputLabel: '',
        };
      default:
        return {
          objectLabel: 'Object',
          inputLabel: 'Input',
          outputLabel: 'Output',
        };
    }
  }

  run() {
    console.log(this.dataSource);
    this.createJson()
  }
}
