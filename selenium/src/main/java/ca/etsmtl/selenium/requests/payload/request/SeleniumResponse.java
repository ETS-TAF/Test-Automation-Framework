package ca.etsmtl.selenium.requests.payload.request;

import java.io.Serializable;
import java.util.List;

import lombok.Data;

@Data
public class SeleniumResponse implements Serializable {
    public int case_id;
    public String caseName;
    public List<SeleniumAction> seleniumActions;
    public boolean success;
    public long timestamp;
    public long duration;
    public String output;
}
