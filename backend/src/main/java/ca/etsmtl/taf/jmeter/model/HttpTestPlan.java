package ca.etsmtl.taf.jmeter.model;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

public class HttpTestPlan {


    private String nbThreads ;
    private String rampTime ;
    private String duration ;
    private String domain ;
    private String port ;
    private String protocol ;
    private String path ;
    private String method;
  private String loop;

  private String data;

  public String getLoop() {
    return loop;
  }

  public void setLoop(String loop) {
    this.loop = loop;
  }

  public String getData() {
    return data;
  }

  public void setData(String data) {
    this.data = data;
  }

  public HttpTestPlan() {

  }

  public HttpTestPlan(String nbThreads, String rampTime,
                      String duration, String domain, String port,
                      String protocol, String path, String method) {
    this.nbThreads = nbThreads;
    this.rampTime = rampTime;
    this.duration = duration;
    this.domain = domain;
    this.port = port;
    this.protocol = protocol;
    this.path = path;
    this.method = method;
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

  public String getProtocol() {
    return protocol;
  }

  public void setProtocol(String protocol) {
    this.protocol = protocol;
  }

  public String getPath() {
    return path;
  }

  public void setPath(String path) {
    this.path = path;
  }

  public String getMethod() {
    return method;
  }


  public void setMethod(String method) {
    this.method = method;
  }

  public void generateTestPlan() {
      replaceAndSaveVariables();
    }
    private void replaceAndSaveVariables() {
      try {
        // Read the XML content from the file
        String filePath = "backend/src/main/resources/jmeter/HttpSamplerTemplate.jmx";
        String xmlContent = new String(Files.readAllBytes(Paths.get(filePath)), StandardCharsets.UTF_8);
        String target = "backend/src/main/resources/jmeter/TestPlan.jmx";

        // Replace variables with Java variables (using default values if not found)
        xmlContent = replaceVariables(xmlContent);

        // Save the modified content back to the file
        Files.write(Paths.get(target), xmlContent.getBytes(StandardCharsets.UTF_8));

      } catch (IOException e) {
        e.printStackTrace();
      }
    }

    private String replaceVariables(String xmlContent) throws JsonProcessingException {
      // Replace variables in the XML content using instance fields
      xmlContent = xmlContent.replace("$NB_THREADS$", nbThreads)
              .replace("$RAMP_TIME$", rampTime)
              .replace("$DURATION$", duration)
              .replace("$DOMAIN$", domain)
              .replace("$PORT$", port)
              .replace("$PROTOCOL$", protocol)
              .replace("$PATH$", path)
              .replace("$METHOD$", method)
              .replace("$LOOP_COUNTER$", loop);
      ;
      if (!data.equals(null) && !data.equals("")){
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
        Object jsonMap = objectMapper.readValue(data, Object.class);

        // Serialize the Map to a formatted JSON string
        String formattedJsonString = objectMapper.writeValueAsString(jsonMap);
        String xmlString = " <elementProp name=\"\" elementType=\"HTTPArgument\">\n" +
                "                <boolProp name=\"HTTPArgument.always_encode\">false</boolProp>\n" +
                "                <stringProp name=\"Argument.value\"><stringProp name=\"Argument.value\">" + formattedJsonString + "</stringProp></stringProp>\n" +
                "                <stringProp name=\"Argument.metadata\">=</stringProp>\n" +
                "              </elementProp>";



        xmlContent=xmlContent.replace("$DATA$",xmlString);
      } else{
        xmlContent=xmlContent.replace("$DATA$","");

      }
return xmlContent;
    }

  @Override
  public String toString() {
    return "JmeterTestPlan{" +
            "nbThreads='" + nbThreads + '\'' +
            ", rampTime='" + rampTime + '\'' +
            ", duration='" + duration + '\'' +
            ", domain='" + domain + '\'' +
            ", port='" + port + '\'' +
            ", protocol='" + protocol + '\'' +
            ", path='" + path + '\'' +
            ", method='" + method + '\'' +
            '}';
  }
}