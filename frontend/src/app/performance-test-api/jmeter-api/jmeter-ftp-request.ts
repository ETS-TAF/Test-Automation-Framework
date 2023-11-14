export class JMeterFTPRequest {
  constructor(
    public nbThreads: string = '',
    public rampTime: string = '',
    public duration: string = '',
    public domain: string = '',
    public port: string = '',
    public method: string = '',
    public remotefile: string = '',
    public localfile: string = '',
    public username: string = '',
    public password: string = '',
    public loop: string = ''
  ) {}
}
