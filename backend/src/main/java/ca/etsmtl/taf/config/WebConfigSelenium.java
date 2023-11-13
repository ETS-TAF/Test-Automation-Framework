package ca.etsmtl.taf.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebConfigSelenium {

    @Value("${taf.app.selenium_container_url}")
    String SELENIUM_CONTAINER_URL;

    @Value("${taf.app.selenium_container_port}")
    String SELENIUM_CONTAINER_PORT;

    @Bean
    public WebClient webClient() {
        return WebClient.builder()
                .baseUrl(SELENIUM_CONTAINER_URL + ":" + SELENIUM_CONTAINER_PORT)
                .defaultCookie("cookie-name", "cookie-value")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }
}