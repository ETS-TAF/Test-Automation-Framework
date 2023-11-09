package ca.etsmtl.taf.apiCommunication;

import ca.etsmtl.taf.dto.SeleniumCaseDto;
import ca.etsmtl.taf.entity.SeleniumActionRequest;
import ca.etsmtl.taf.entity.SeleniumCaseResponse;
import ca.etsmtl.taf.entity.SeleniumTestCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
public class SeleniumServiceRequester {
    private final WebClient webClient;

    @Autowired
    public SeleniumServiceRequester(WebClient webClient) {
        this.webClient = webClient;
    }

    public Mono<SeleniumCaseResponse> sendTestCase(SeleniumCaseDto testCase) {
        return webClient.post()
                .uri("/microservice/selenium/test")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .body(Mono.just(testCase), SeleniumCaseDto.class)
                .retrieve()
                .bodyToMono(SeleniumCaseResponse.class);
    }
}
