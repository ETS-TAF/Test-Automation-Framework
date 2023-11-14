package ca.etsmtl.taf.service;

import ca.etsmtl.taf.apiCommunication.SeleniumServiceRequester;
import ca.etsmtl.taf.dto.SeleniumCaseDto;
import ca.etsmtl.taf.entity.SeleniumActionRequest;
import ca.etsmtl.taf.entity.SeleniumCaseResponse;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

@Service
public class SeleniumService {
    private final SeleniumServiceRequester seleniumServiceRequester;

    public SeleniumService(SeleniumServiceRequester seleniumServiceRequester) {
        this.seleniumServiceRequester = seleniumServiceRequester;
    }

    public List<SeleniumCaseResponse> sendTestCases(List<SeleniumCaseDto> seleniumCases) throws URISyntaxException, IOException, InterruptedException {
        List<SeleniumCaseResponse> testResults = new ArrayList<>();
        for(SeleniumCaseDto seleniumCaseDto : seleniumCases) {

            SeleniumCaseResponse testCaseResult = seleniumServiceRequester.sendTestCase(seleniumCaseDto).block();
            testResults.add(testCaseResult);
        }
        return testResults;
    }
}
