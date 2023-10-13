package gatling.test.java.simulations.templates;

// required for Gatling core structure DSL
import gatling.ThreadGroup;
import gatling.sampler.HttpRequest;
import io.gatling.javaapi.core.*;
import static io.gatling.javaapi.core.CoreDsl.*;

// required for Gatling HTTP DSL
import io.gatling.javaapi.http.*;
import parser.XmlParser;

import static io.gatling.javaapi.http.HttpDsl.*;

public class BasicGetSimulation extends Simulation {

    ThreadGroup threadGroup = XmlParser.readXmlFile(System.getProperty("xmlFile"));
    private final String nbUsers = threadGroup.getNbUsers();
    private final String rampUpPeriod = threadGroup.getRampUpPeriod();
    private final String loopCount = threadGroup.getLoopCount();

    private final HttpRequest httpRequest = threadGroup.getHttpRequest();
    private final String protocol = httpRequest.getProtocol();
    private final String serverName = httpRequest.getServerName();
    private final String port = httpRequest.getPort();
    private final String method = httpRequest.getMethod();
    private final String path = httpRequest.getPath();

    // Protocol
    HttpProtocolBuilder httpProtocol = http.baseUrl(serverName + ":" + port);

    // Scenario
    ScenarioBuilder scn = scenario("Get request")
            .repeat(Integer.parseInt(loopCount)).on(
                exec(http(method).get(path))
                        .pause(1)
            );

    // Simulation
    public BasicGetSimulation() {
        setUp(
                scn.injectOpen(rampUsers(Integer.parseInt(nbUsers)).during(Integer.parseInt(rampUpPeriod)))
                        .protocols(httpProtocol)
        );
    }
}
