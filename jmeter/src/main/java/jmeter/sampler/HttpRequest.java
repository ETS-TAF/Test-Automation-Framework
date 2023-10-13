package jmeter.sampler;

public class HttpRequest {

    private String protocol;
    private String serverName;
    private String port;
    private String method;
    private String path;

    public void setProtocol(String protocol) {
        this.protocol = protocol;
    }

    public String getProtocol() {
        return this.protocol;
    }

    public void setServerName(String serverName) {
        this.serverName = serverName;
    }

    public String getServerName() {
        return this.serverName;
    }

    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    @Override
    public String toString() {
        return "HttpRequest [protocol=" + protocol + ", serverName=" + serverName + ", port=" + port + ", method=" + method
                + ", path=" + path + "]";
    }

}
