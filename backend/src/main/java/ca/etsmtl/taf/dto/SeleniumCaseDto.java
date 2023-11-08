package ca.etsmtl.taf.dto;

import ca.etsmtl.taf.entity.SeleniumActionRequest;
import lombok.Getter;

import java.util.List;

@Getter
public class SeleniumCaseDto {
    int case_id;
    String caseName;
    List<SeleniumActionRequest> actions;
}
