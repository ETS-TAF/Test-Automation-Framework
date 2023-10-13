package jmeter;

import jmeter.sampler.HttpRequest;

public class ThreadGroup {

    private String nbUsers;
    private String rampUpPeriod;
    private String loopCount;
    private HttpRequest httpRequest;

    public String getNbUsers() {
        return nbUsers;
    }

    public void setNbUsers(String nbUsers) {
        this.nbUsers = nbUsers;
    }

    public String getRampUpPeriod() {
        return rampUpPeriod;
    }

    public void setRampUpPeriod(String rampUpPeriod) {
        this.rampUpPeriod = rampUpPeriod;
    }

    public String getLoopCount() {
        return loopCount;
    }

    public void setLoopCount(String loopCount) {
        this.loopCount = loopCount;
    }

    public HttpRequest getHttpRequest() {
        return httpRequest;
    }

    public void setHttpRequest(HttpRequest httpRequest) {
        this.httpRequest = httpRequest;
    }

    @Override
    public String toString() {
        return "ThreadGroup [nbUsers=" + nbUsers + ", rampUpPeriod=" + rampUpPeriod + ", loopCount=" + loopCount
                + ", httpRequest=" + httpRequest.toString() + "]";
    }
}
