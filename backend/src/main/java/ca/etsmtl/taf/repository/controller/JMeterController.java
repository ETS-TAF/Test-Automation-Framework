package ca.etsmtl.taf.repository.controller;

import ca.etsmtl.taf.payload.request.jmeter.HttpSampler;
import ca.etsmtl.taf.payload.request.jmeter.parser.XmlWriter;
import ca.etsmtl.taf.socket.TcpClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.File;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(method = RequestMethod.POST)
public class JMeterController {
    @Value("${taf.app.jmeter_url}")
    String jmeter_microservice_url;

    @Value("${taf.app.jmeter_port}")
    Integer jmeter_microservice_port;

    // POST mapping sur la route /api/jmeter pour lancer un test JMeter avec un sampler HTTP Request
    @PostMapping(path = "/jmeter/http-request", consumes = "application/x-www-form-urlencoded")
    public ResponseEntity<?> jmeterHttpRequest(@Valid HttpSampler httpSampler) {
        // Création du fichier XML du plan de test JMeter
        File xmlTestPlan = XmlWriter.createXMLFile(httpSampler.getNbUsers(), httpSampler.getRampUpPeriod(), httpSampler.getLoopCount(), XmlWriter.createHttpRequestXMLElement(httpSampler.getProtocol(), httpSampler.getServerName(), httpSampler.getPort(), httpSampler.getMethod(), httpSampler.getPath()));
        assert xmlTestPlan != null;
        System.out.println(xmlTestPlan.getAbsolutePath());

        // Envoi du fichier XML au serveur TCP
        TcpClient socket = new TcpClient(jmeter_microservice_port, jmeter_microservice_url);
        socket.sendFile(xmlTestPlan);

        return ResponseEntity.ok(HttpStatus.NO_CONTENT);
    }
}
