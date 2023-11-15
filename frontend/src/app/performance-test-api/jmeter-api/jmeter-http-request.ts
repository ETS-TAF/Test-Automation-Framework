export class JMeterHttpRequest {
  constructor(
    public nbThreads: string = '',
    public rampTime: string = '',
    public duration: string = '',
    public domain: string = '',
    public port: string = '',
    public protocol: string = '',
    public path: string = '',
    public method: string = '',
    public loop: string = '',
    public data: string = ''
  ) {}
}
