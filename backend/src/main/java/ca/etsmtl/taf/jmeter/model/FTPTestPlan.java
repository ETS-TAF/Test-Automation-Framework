package ca.etsmtl.taf.jmeter.model;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

public class FTPTestPlan {


    private String nbThreads ;
    private String rampTime ;
    private String duration ;
    private String domain ;
    private String port ;
    private String method;
    private String remotefile;
    private String localfile;
    private String username;
    private String password;
    private  String loop;
  public FTPTestPlan() {

  }

  public FTPTestPlan(String nbThreads, String rampTime,
                     String duration, String domain, String port,
                     String remotefile, String localfile, String method, String username, String password) {
    this.nbThreads = nbThreads;
    this.rampTime = rampTime;
    this.duration = duration;
    this.domain = domain;
    this.port = port;
    this.method = method;
    this.remotefile = remotefile;
    this.localfile = localfile;
    this.username = username;
    this.password = password;
  }

  public String getLoop() {

    return loop;
  }

  public void setLoop(String loop) {
    this.loop = loop;
  }

  public String getNbThreads() {
    return nbThreads;
  }

  public void setNbThreads(String nbThreads) {
    this.nbThreads = nbThreads;
  }

  public String getRampTime() {
    return rampTime;
  }

  public void setRampTime(String rampTime) {
    this.rampTime = rampTime;
  }

  public String getDuration() {
    return duration;
  }

  public void setDuration(String duration) {
    this.duration = duration;
  }

  public String getDomain() {
    return domain;
  }

  public void setDomain(String domain) {
    this.domain = domain;
  }

  public String getPort() {
    return port;
  }

  public void setPort(String port) {
    this.port = port;
  }

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

  public String getMethod() {
    return method=="Retrive"? "false" : "true";

  }

  public void setMethod(String method) {
    this.method = method;
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


  public void generateTestPlan() {
      replaceAndSaveVariables();
    }
    private void replaceAndSaveVariables() {
      try {
        // Read the XML content from the file
        String filePath = "backend/src/main/resources/jmeter/FTPSamplerTemplate.jmx";
        String xmlContent = new String(Files.readAllBytes(Paths.get(filePath)), StandardCharsets.UTF_8);
        String target = "backend/src/main/resources/jmeter/FTPTestPlan.jmx";

        // Replace variables with Java variables (using default values if not found)
        xmlContent = replaceVariables(xmlContent);

        // Save the modified content back to the file
        Files.write(Paths.get(target), xmlContent.getBytes(StandardCharsets.UTF_8));

        System.out.println("Variables replaced successfully.");
      } catch (IOException e) {
        e.printStackTrace();
      }
    }

    private String replaceVariables(String xmlContent) {
      // Replace variables in the XML content using instance fields
      xmlContent = xmlContent.replace("$NB_THREADS$", nbThreads)
              .replace("$RAMP_TIME$", rampTime)
              .replace("$DURATION$", duration)
              .replace("$DOMAIN$", domain)
              .replace("$PORT$", port)
              .replace("$REMOTEFILE$", remotefile)
              .replace("$LOCALFILE$", localfile)
              .replace("$METHOD$", getMethod())
              .replace("$USERNAME$", username)
              .replace("$PASSWORD$", password)
              .replace("$LOOP_COUNTER$", loop);


      return xmlContent;
    }

  @Override
  public String toString() {
    return "JmeterFTPTestPlan{" +
            "nbThreads='" + nbThreads + '\'' +
            ", rampTime='" + rampTime + '\'' +
            ", duration='" + duration + '\'' +
            ", domain='" + domain + '\'' +
            ", port='" + port + '\'' +
            ", remotefile='" + remotefile + '\'' +
            ", localfile='" + localfile + "\'" +
            ", method='" + method + '\'' +
            ", username='" + username + '\'' +
            ", password='" + password + '\''+
            '}';
  }
}