package ca.etsmtl.taf.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class SeleniumCaseResponse implements Serializable {
    int case_id;
    String caseName;
    public List<SeleniumActionRequest> seleniumActions;
    public boolean success;
    public long timestamp;
    public long duration;
    public String output;
}
