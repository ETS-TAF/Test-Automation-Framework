package ca.etsmtl.taf.controller;

import ca.etsmtl.taf.dto.SeleniumCaseDto;
import ca.etsmtl.taf.entity.SeleniumCaseResponse;
import ca.etsmtl.taf.service.SeleniumService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class TestSeleniumController {
    private final SeleniumService seleniumService;

    public TestSeleniumController(SeleniumService seleniumService) {
        this.seleniumService = seleniumService;
    }

    @PostMapping("/testselenium")
    public ResponseEntity<List<SeleniumCaseResponse>> runTests(@RequestBody List<SeleniumCaseDto> seleniumCases) throws URISyntaxException, IOException, InterruptedException {
        List<SeleniumCaseResponse> response = seleniumService.sendTestCases(seleniumCases);
        return ResponseEntity.ok(response);
    }
}
