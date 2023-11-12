package ca.etsmtl.taf.entity;

public class GatlingRequest {
    private String testBaseUrl;
    private String testScenarioName;
    private String testRequestName;
    private String testUri;
    private String testRequestBody;
    private String testMethodType;
    private int testUsersNumber;

    public String getTestBaseUrl() {
        return testBaseUrl;
    }

    public void setTestBaseUrl(String testBaseUrl) {
        this.testBaseUrl = testBaseUrl;
    }

    public String getTestScenarioName() {
        return testScenarioName;
    }

    public void setTestScenarioName(String testScenarioName) {
        this.testScenarioName = testScenarioName;
    }

    public String getTestRequestName() {
        return testRequestName;
    }

    public void setTestRequestName(String testRequestName) {
        this.testRequestName = testRequestName;
    }

    public String getTestUri() {
        return testUri;
    }

    public void setTestUri(String testUri) {
        this.testUri = testUri;
    }

    public String getTestRequestBody() {
        return testRequestBody;
    }

    public void setTestRequestBody(String testRequestBody) {
        this.testRequestBody = testRequestBody;
    }

    public String getTestMethodType() {
        return testMethodType;
    }

    public void setTestMethodType(String testMethodType) {
        this.testMethodType = testMethodType;
    }

    public int getTestUsersNumber() {
        return testUsersNumber;
    }

    public void setTestUsersNumber(int testUsersNumber) {
        this.testUsersNumber = testUsersNumber;
    }
}