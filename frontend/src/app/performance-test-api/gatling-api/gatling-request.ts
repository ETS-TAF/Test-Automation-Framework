export class GatlingRequest {
  baseUrl: string;
  scenarioName: string;
  requestName: string;
  uri: string;
  requestBody: string;
  methodType: string;
  usersNumber: Number;

  constructor() {
    this.baseUrl = '';
    this.scenarioName = '';
    this.requestName = '';
    this.uri = '';
    this.requestBody = '';
    this.methodType = '';
    this.usersNumber = 1;
  }
}
