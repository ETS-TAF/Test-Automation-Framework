package ca.etsmtl.taf;

import ca.etsmtl.taf.payload.request.gatling.HttpSampler;
import ca.etsmtl.taf.repository.controller.GatlingController;

public class ClientTestGatling {
    public static void main(String[] args) {
        // Instanciation du controller de requête Gatling
        GatlingController gatlingController = new GatlingController();

        // Instanciation d'une simulation de requête de test de type HTTP Request
        HttpSampler httpSampler = new HttpSampler();
        initHttpSampler(httpSampler);

        // Envoi de la simulation de requête Gatling au controller
        gatlingController.gatlingHttpRequest(httpSampler);
    }

    private static void initHttpSampler(HttpSampler httpSampler) {
        httpSampler.setNbUsers(6);
        httpSampler.setRampUpPeriod(1);
        httpSampler.setLoopCount(100);
        httpSampler.setProtocol("https");
        httpSampler.setServerName("localhost");
        httpSampler.setPort(8080);
        httpSampler.setMethod("GET");
        httpSampler.setPath("/api/gatling/http-request");
    }
}
