package ca.etsmtl.taf.jmeter.model;

public class FTPTestPlan extends TestPlanBase {
  private String remotefile;
  private String localfile;
  private String username;
  private String password;

  public String getRemotefile() {
    return remotefile;
  }

  public void setRemotefile(String remotefile) {
    this.remotefile = remotefile;
  }

  public String getLocalfile() {
    return localfile;
  }

  public void setLocalfile(String localfile) {
    this.localfile = localfile;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public FTPTestPlan() {
  }

  public FTPTestPlan(String nbThreads, String rampTime, String duration,
                     String domain, String port, String remotefile, String localfile,
                     String method, String username, String password) {
    this.nbThreads = nbThreads;
    this.rampTime = rampTime;
    this.duration = duration;
    this.domain = domain;
    this.port = port;
    this.remotefile = remotefile;
    this.localfile = localfile;
    this.method = method;
    this.username = username;
    this.password = password;
  }

  @Override
  public String getLoop() {
    return loop;
  }

  @Override
  public void setLoop(String loop) {
    this.loop = loop;
  }

  @Override
  public String getNbThreads() {
    return nbThreads;
  }

  @Override
  public void setNbThreads(String nbThreads) {
    this.nbThreads = nbThreads;
  }

  @Override
  public String getMethod() {
    return this.method;
  }
  @Override
  public void generateTestPlan() {
    replaceAndSaveVariables("backend/src/main/resources/jmeter/FTPSamplerTemplate.jmx",
            "backend/src/main/resources/jmeter/FTPTestPlan.jmx",
            "FTPSamplerTemplate");
  }

  @Override
  protected String replaceVariables(String xmlContent, String templateKey) {
    xmlContent = xmlContent.replace("$NB_THREADS$", nbThreads)
            .replace("$RAMP_TIME$", rampTime)
            .replace("$DURATION$", duration)
            .replace("$DOMAIN$", domain)
            .replace("$PORT$", port)
            .replace("$REMOTEFILE$", remotefile)
            .replace("$LOCALFILE$", localfile)
            .replace("$METHOD$", getFtpMethod())
            .replace("$USERNAME$", username)
            .replace("$PASSWORD$", password)
            .replace("$LOOP_COUNTER$", loop);

    return xmlContent;
  }

  @Override
  public String toString() {
    return "FTPTestPlan{" +
            "remotefile='" + remotefile + '\'' +
            ", localfile='" + localfile + '\'' +
            ", username='" + username + '\'' +
            ", password='" + password + '\'' +
            ", nbThreads='" + nbThreads + '\'' +
            ", rampTime='" + rampTime + '\'' +
            ", duration='" + duration + '\'' +
            ", domain='" + domain + '\'' +
            ", port='" + port + '\'' +
            ", method='" + method + '\'' +
            ", loop='" + loop + '\'' +
            '}';
  }

  private  String getFtpMethod(){

    return getMethod().equals("Retrive") ?  "false" : "true";
  }

}
