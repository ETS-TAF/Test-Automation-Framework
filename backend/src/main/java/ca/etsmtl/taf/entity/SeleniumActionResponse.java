package ca.etsmtl.taf.entity;

import lombok.Getter;

@Getter
public class SeleniumActionResponse {
    int case_id;
    String caseName;
    int time_taken;
    boolean isSuccessfull;
    String additionalMessage;
}
