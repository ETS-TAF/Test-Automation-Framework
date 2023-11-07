package ca.etsmtl.selenium.requests.payload.request;

import java.io.Serializable;

public class Response implements Serializable {
    public int expectedStatusCode;
    public int statusCode;
    public String expectedOutput;
    public String output;
}
