export class GatlingRequest {
  testBaseUrl: string;
  testScenarioName: string;
  testRequestName: string;
  testUri: string;
  testRequestBody: string;
  testMethodType: string;
  testUsersNumber: Number;

  constructor() {
    this.testBaseUrl = '';
    this.testScenarioName = '';
    this.testRequestName = '';
    this.testUri = '';
    this.testRequestBody = '';
    this.testMethodType = '';
    this.testUsersNumber = 1;
  }
}
