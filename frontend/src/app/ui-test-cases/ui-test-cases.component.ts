import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-test-cases',
  templateUrl: './ui-test-cases.component.html',
  styleUrls: ['./ui-test-cases.component.css'],
})
export class UiTestCasesComponent implements OnInit {
  actions: string[] = ['Open in Browser', 'Navigate to url', 'Click'];
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

  isInputEditable(action: string): boolean {
    return action === 'Navigate to url';
  }

  isOutputEditable(action: string): boolean {
    //Les conditions vont changer lorsque d'autre action seront implementees.
    return false;
  }
  isObjectEditable(action: string): boolean {
    return action === 'Open in Browser' || action === 'Click';
  }
  getLabelsForAction(action: string) {
    switch (action) {
      case 'Open in Browser':
        return {
          objectLabel: 'Enter a browser',
          inputLabel: '',
          outputLabel: '',
        };
      case 'Navigate to url':
        return {
          objectLabel: '',
          inputLabel: 'www.a-url.com',
          outputLabel: '',
        };
      case 'Click':
        return {
          objectLabel: 'X Path',
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
  }
}
