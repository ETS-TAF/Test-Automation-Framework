package ca.etsmtl.simulation;

import ca.etsmtl.entity.GatlingRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.gatling.javaapi.core.*;
import io.gatling.javaapi.core.Simulation;
import io.gatling.javaapi.http.*;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;

public class LoadTestSimulation extends Simulation {

    private String requestJson = System.getProperty("requestJson");


    private GatlingRequest gatlingRequest = parseRequestDetails(requestJson);


    private GatlingRequest parseRequestDetails(String requestJson) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(requestJson, GatlingRequest.class);
        } catch (Exception e) {
            return null; 
        }
    }
    private HttpProtocolBuilder httpProtocol = http.baseUrl(gatlingRequest.getBaseUrl())
            .acceptHeader("application/json")
            .contentTypeHeader("application/json");

    private ChainBuilder createHttpRequest() {
        String methodType = gatlingRequest.getMethodType();
        HttpRequestActionBuilder httpRequestBuilder;

        switch (methodType.toUpperCase()) {
            case "GET":
                httpRequestBuilder =http(gatlingRequest.getRequestName())
                        .get(gatlingRequest.getUri());
                break;
            case "POST":
                httpRequestBuilder = http(gatlingRequest.getRequestName())
                        .post(gatlingRequest.getUri())
                        .body(StringBody(gatlingRequest.getRequestBody()));
                break;
            case "PUT":
                httpRequestBuilder = http(gatlingRequest.getRequestName())
                        .put(gatlingRequest.getUri())
                        .body(StringBody(gatlingRequest.getRequestBody()));
                break;
            case "DELETE":
                httpRequestBuilder = http(gatlingRequest.getRequestName())
                        .delete(gatlingRequest.getUri());
                break;
            default:
                throw new IllegalArgumentException("Invalid HttpRequestMethod: " + methodType.toUpperCase());
        }

        return exec(httpRequestBuilder
                .check(status().not(404), status().not(500)));
    }

    private ScenarioBuilder scn = scenario(gatlingRequest.getScenarioName())
                .exec(createHttpRequest());

    {
        setUp(
                scn.injectOpen(rampUsers(gatlingRequest.getUsersNumber()).during(gatlingRequest.getUsersNumber()))
        ).protocols(httpProtocol);
    }
}
