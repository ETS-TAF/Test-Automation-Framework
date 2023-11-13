package ca.etsmtl.taf.controller;

import ca.etsmtl.taf.entity.GatlingRequest;
import ca.etsmtl.taf.provider.GatlingJarPathProvider;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/gatling")
public class GatlingApiController {

    @PostMapping("/runSimulation")
    public String runSimulation(@RequestBody GatlingRequest gatlingRequest) {
        try {
            String gatlingJarPath = new GatlingJarPathProvider().getGatlingJarPath();

            String testRequest = "{\\\"baseUrl\\\":\\\""+gatlingRequest.getTestBaseUrl()+"\\\",\\\"scenarioName\\\":\\\""+gatlingRequest.getTestScenarioName()+"\\\",\\\"requestName\\\":\\\""+gatlingRequest.getTestRequestName()+"\\\",\\\"uri\\\":\\\""+gatlingRequest.getTestUri()+"\\\",\\\"requestBody\\\":\\\""+gatlingRequest.getTestRequestBody()+"\\\",\\\"methodType\\\":\\\""+gatlingRequest.getTestMethodType()+"\\\",\\\"usersNumber\\\":\\\""+gatlingRequest.getTestUsersNumber()+"\\\"}";
            //Construire une liste d'arguments de ligne de commande à transmettre à Gatling
            List<String> commandArgs = new ArrayList<>();
            commandArgs.add("java");
            commandArgs.add("-jar");
            commandArgs.add(gatlingJarPath);
            commandArgs.add("-DrequestJson=" + testRequest);

            // Exécuter la simulation Gatling en tant que processus distinct
            ProcessBuilder processBuilder = new ProcessBuilder(commandArgs);
            Process process = processBuilder.start();
            // Lire le résultat du processus
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            StringBuilder output = new StringBuilder();
            while ((line = reader.readLine()) != null) {
                output.append(line).append('\n');
            }

            int exitCode = process.waitFor();
            return "Exit Code: " + exitCode + "\nOutput:\n" + output.toString();
        } catch (IOException e) {
            return "Error: " + e.getMessage();
        } catch (URISyntaxException e) {
            return "Error: " + e.getMessage();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return "Error: " + e.getMessage();
        }
    }
}
