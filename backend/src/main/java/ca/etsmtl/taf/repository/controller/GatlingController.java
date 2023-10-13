package ca.etsmtl.taf.repository.controller;

import ca.etsmtl.taf.payload.request.gatling.HttpSampler;
import ca.etsmtl.taf.payload.request.gatling.parser.XmlWriter;
import ca.etsmtl.taf.socket.TcpClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.File;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(method = RequestMethod.POST)
public class GatlingController {
    @Value("${taf.app.gatling_url}")
    String Gatling_microservice_url;

    @Value("${taf.app.gatling_port}")
    Integer Gatling_microservice_port;

    // POST mapping sur la route /api/gatling pour lancer un test Gatling avec un sampler HTTP Request
    @PostMapping(path = "/gatling/http-request", consumes = "application/x-www-form-urlencoded")
    public ResponseEntity<?> gatlingHttpRequest(@Valid HttpSampler httpSampler) {
        // Création du fichier XML du plan de test Gatling
        File xmlTestPlan = XmlWriter.createXMLFile(httpSampler.getNbUsers(), httpSampler.getRampUpPeriod(), httpSampler.getLoopCount(), XmlWriter.createHttpRequestXMLElement(httpSampler.getProtocol(), httpSampler.getServerName(), httpSampler.getPort(), httpSampler.getMethod(), httpSampler.getPath()));
        assert xmlTestPlan != null;
        System.out.println(xmlTestPlan.getAbsolutePath());

        // Envoi du fichier XML au serveur TCP
        TcpClient socket = new TcpClient(Gatling_microservice_port, Gatling_microservice_url);
        socket.sendFile(xmlTestPlan);

        return ResponseEntity.ok(HttpStatus.NO_CONTENT);
    }
}
