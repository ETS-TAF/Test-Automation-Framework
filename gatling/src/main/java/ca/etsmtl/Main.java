package ca.etsmtl;

import ca.etsmtl.simulation.LoadTestSimulation;
import io.gatling.app.Gatling;
import io.gatling.core.config.GatlingPropertiesBuilder;

public class Main {
    public static void main(String[] args) {
        String requestJson = args[0].replace("-DrequestJson=", "").replace("\\", "\"");
        System.setProperty("requestJson", requestJson);
        GatlingPropertiesBuilder props = new GatlingPropertiesBuilder();
        props.simulationClass(LoadTestSimulation.class.getName());

        Gatling.fromMap(props.build());
    }
}