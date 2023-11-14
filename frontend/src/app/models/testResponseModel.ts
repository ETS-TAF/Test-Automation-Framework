export interface TestResponseModel {
  id: number;
  stutsCode : number;
  output : string;
  fieldAnswer: string | null;
  answer: boolean;
  messages: any[];
}
