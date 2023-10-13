package org.requests;

import org.requests.payload.request.Answer;
import org.requests.payload.request.TestApiRequest;
import io.restassured.specification.RequestSpecification;
import io.restassured.response.Response;

import static io.restassured.RestAssured.given;

public class RequestController {
    private TestApiRequest request;
    private RequestSpecification httpRequest;
    private Response response;

    public RequestController(TestApiRequest request) {
        this.request = request;
        this.httpRequest = given()
                .header("Content-Type", "application/json")
                .body(this.request.getInput());
    }

    public Answer getAnswer() {
        this.execute();
        Answer answer = new Answer();
        answer.expectedStatusCode = this.request.getStatusCode();
        answer.statusCode = this.response.getStatusCode();
        answer.expectedOutput = this.request.getExpectedOutput();
        answer.output = this.response.getBody().asPrettyString();
        answer.answer = this.checkStatusCode() && this.checkOutput();
        return answer;
    }

    private void execute() {
        this.response = this.request.getMethod().execute(this.httpRequest, this.request.getApiUrl());
    }

    private boolean checkStatusCode() {
        return this.request.getStatusCode() == this.response.getStatusCode();
    }

    private boolean checkOutput() {
        if(!this.request.getExpectedOutput().isEmpty()){
            return this.request.getExpectedOutput().equals(this.response.getBody().asPrettyString());
        }
        return true;
    }
}
