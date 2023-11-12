package ca.etsmtl.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class GatlingRequest {
    private String baseUrl;
    private String scenarioName;
    private String requestName;
    private String uri;
    private String requestBody;
    private String methodType;
    private int usersNumber;

    @JsonCreator
    public GatlingRequest(
            @JsonProperty("baseUrl") String baseUrl,
            @JsonProperty("scenarioName") String scenarioName,
            @JsonProperty("requestName") String requestName,
            @JsonProperty("uri") String uri,
            @JsonProperty("requestBody") String requestBody,
            @JsonProperty("methodType") String methodType,
            @JsonProperty("usersNumber") int usersNumber
    ) {
        this.baseUrl = baseUrl;
        this.scenarioName = scenarioName;
        this.requestName = requestName;
        this.uri = uri;
        this.requestBody = requestBody;
        this.methodType = methodType;
        this.usersNumber = usersNumber;
    }


    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public String getScenarioName() {
        return scenarioName;
    }

    public void setScenarioName(String scenarioName) {
        this.scenarioName = scenarioName;
    }

    public String getRequestName() {
        return requestName;
    }

    public void setRequestName(String requestName) {
        this.requestName = requestName;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public String getRequestBody() {
        return requestBody;
    }

    public void setRequestBody(String requestBody) {
        this.requestBody = requestBody;
    }

    public String getMethodType() {
        return methodType;
    }

    public void setMethodType(String methodType) {
        this.methodType = methodType;
    }

    public int getUsersNumber() {
        return usersNumber;
    }

    public void setUsersNumber(int usersNumber) {
        this.usersNumber = usersNumber;
    }
}