package ca.etsmtl.taf.controller;

        import ca.etsmtl.taf.entity.GatlingRequest;
        import ca.etsmtl.taf.payload.response.MessageResponse;
        import ca.etsmtl.taf.provider.GatlingJarPathProvider;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
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
    @PostMapping(value = "/runSimulation")
    public ResponseEntity<MessageResponse> runSimulation(@RequestBody GatlingRequest gatlingRequest) {
        try {
            String gatlingJarPath = new GatlingJarPathProvider().getGatlingJarPath();
            String testRequest = "{\\\"baseUrl\\\":\\\""+gatlingRequest.getTestBaseUrl()+"\\\",\\\"scenarioName\\\":\\\""+gatlingRequest.getTestScenarioName()+"\\\",\\\"requestName\\\":\\\""+gatlingRequest.getTestRequestName()+"\\\",\\\"uri\\\":\\\""+gatlingRequest.getTestUri()+"\\\",\\\"requestBody\\\":\\\""+gatlingRequest.getTestRequestBody()+"\\\",\\\"methodType\\\":\\\""+gatlingRequest.getTestMethodType()+"\\\",\\\"usersNumber\\\":\\\""+gatlingRequest.getTestUsersNumber()+"\\\"}";
            // Construct a list of command-line arguments to pass to Gatling
            List<String> commandArgs = new ArrayList<>();
            commandArgs.add("java");
            commandArgs.add("-jar");
            commandArgs.add(gatlingJarPath);
            commandArgs.add("-DrequestJson=" + testRequest);

            // Execute Gatling simulation as a separate process
            ProcessBuilder processBuilder = new ProcessBuilder(commandArgs);
            Process process = processBuilder.start();
            // Read the process output
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            StringBuilder output = new StringBuilder();
            while ((line = reader.readLine()) != null) {
                output.append(line).append('\n');
            }

            int exitCode = process.waitFor();
            if(exitCode == 0){
                return new ResponseEntity<>(new MessageResponse(output.toString()), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(new MessageResponse(output.toString()), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (IOException e) {
            return new ResponseEntity<>(new MessageResponse(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e){
            Thread.currentThread().interrupt();
            throw new RuntimeException(e);
        }
    }
}
