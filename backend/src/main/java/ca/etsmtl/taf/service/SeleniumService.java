package ca.etsmtl.taf.service;

import ca.etsmtl.taf.apiCommunication.SeleniumServiceRequester;
import ca.etsmtl.taf.dto.SeleniumCaseDto;
import ca.etsmtl.taf.entity.SeleniumActionRequest;
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

    public List<String> sendTestCases(List<SeleniumCaseDto> seleniumCases) throws URISyntaxException, IOException, InterruptedException {
        List<String> testResults = new ArrayList<>();
        for(SeleniumCaseDto seleniumCaseDto : seleniumCases) {
            List<SeleniumActionRequest> seleniumActions = seleniumCaseDto.getActions();
            String testCaseResult = seleniumServiceRequester.sendTestCase(seleniumActions).block();
            testResults.add(testCaseResult);
        }
        return testResults;
    }
}
