package ca.etsmtl.taf.payload.request.jmeter;

import javax.validation.constraints.NotBlank;

public class JMeterRequest {
    private int nbUsers;

    private int rampUpPeriod;

    private int loopCount;

    private String sampler;

    public int getNbUsers() {
        return nbUsers;
    }

    public void setNbUsers(int nbUsers) {
        this.nbUsers = nbUsers;
    }

    public int getRampUpPeriod() {
        return rampUpPeriod;
    }

    public void setRampUpPeriod(int rampUpPeriod) {
        this.rampUpPeriod = rampUpPeriod;
    }

    public int getLoopCount() {
        return loopCount;
    }

    public void setLoopCount(int loopCount) {
        this.loopCount = loopCount;
    }

    public String getSampler() {
        return sampler;
    }

    public void setSampler(String sampler) {
        this.sampler = sampler;
    }
}
