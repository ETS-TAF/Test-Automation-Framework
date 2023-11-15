package ca.etsmtl.taf.jmeter.model;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

public abstract class TestPlanBase {
    protected String nbThreads;
    protected String rampTime;
    protected String duration;
    protected String domain;
    protected String port;
    protected String method;
    protected String loop;

    protected TestPlanBase() {
    }

    protected TestPlanBase(String nbThreads, String rampTime, String duration, String domain, String port, String method, String loop) {
        this.nbThreads = nbThreads;
        this.rampTime = rampTime;
        this.duration = duration;
        this.domain = domain;
        this.port = port;
        this.method = method;
        this.loop = loop;
    }

    public abstract String getLoop();

    public abstract void setLoop(String loop);

    public abstract String getNbThreads();

    public abstract void setNbThreads(String nbThreads);

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

    public void setMethod(String method) {
        this.method = method;
    }

    // Other getters and setters for common fields

    public abstract String getMethod();

    public abstract void generateTestPlan();

    protected void replaceAndSaveVariables(String filePath, String target, String templateKey) {
        try {
            String xmlContent = new String(Files.readAllBytes(Paths.get(filePath)), StandardCharsets.UTF_8);
            xmlContent = replaceVariables(xmlContent, templateKey);
            Files.write(Paths.get(target), xmlContent.getBytes(StandardCharsets.UTF_8));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    protected abstract String replaceVariables(String xmlContent, String templateKey);
}