package org.requests.payload.request;

import java.io.Serializable;

public class Answer implements Serializable {
    public int expectedStatusCode;
    public int statusCode;
    public String expectedOutput;
    public String output;
    public boolean answer;
}
