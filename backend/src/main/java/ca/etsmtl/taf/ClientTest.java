package ca.etsmtl.taf;

import ca.etsmtl.taf.payload.request.jmeter.HttpSampler;
import ca.etsmtl.taf.repository.controller.JMeterController;

public class ClientTest {

    public static void main(String[] args) {
        // Instanciation du controller de requête JMeter
        JMeterController jMeterController = new JMeterController();

        // Instanciation d'une simulation de requête de test de type HTTP Request
        HttpSampler httpSampler = new HttpSampler();
        initHttpSampler(httpSampler);

        // Envoi de la simulation de requête JMeter au controller
        jMeterController.jmeterHttpRequest(httpSampler);
    }

    private static void initHttpSampler(HttpSampler httpSampler) {
        httpSampler.setNbUsers(6);
        httpSampler.setRampUpPeriod(1);
        httpSampler.setLoopCount(100);
        httpSampler.setProtocol("https");
        httpSampler.setServerName("localhost");
        httpSampler.setPort(8080);
        httpSampler.setMethod("GET");
        httpSampler.setPath("/api/jmeter/http-request");
    }
}