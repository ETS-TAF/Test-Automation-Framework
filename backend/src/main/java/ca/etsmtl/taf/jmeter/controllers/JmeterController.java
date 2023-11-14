package ca.etsmtl.taf.jmeter.controllers;


import ca.etsmtl.taf.jmeter.JMeterRunner;
import ca.etsmtl.taf.jmeter.model.FTPTestPlan;
import ca.etsmtl.taf.jmeter.model.HttpTestPlan;
import ca.etsmtl.taf.provider.GatlingJarPathProvider;
import com.opencsv.exceptions.CsvException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.atomic.AtomicReference;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/jmeter")
public class JmeterController {

  @PostMapping("/http")
  public ResponseEntity<?> getJmeterTestPlan(@RequestBody HttpTestPlan jmeterTestPlan) throws IOException, CsvException, URISyntaxException {


    jmeterTestPlan.generateTestPlan();
    ExecutorService executorService = Executors.newSingleThreadExecutor();

    // Submit the task to the ExecutorService
    AtomicReference<String> resultPathRef = new AtomicReference<>();
    Future<?> future = executorService.submit(() -> {
      String result = null;
      try {
        result = JMeterRunner.runJMeter("http");
      } catch (URISyntaxException e) {
        throw new RuntimeException(e);
      }
      resultPathRef.set(result);
    });
    try {
      // Wait for the task to finish
      future.get();
    } catch (InterruptedException | ExecutionException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred during task execution.");
    } finally {
      // Shutdown the ExecutorService to release resources
      executorService.shutdown();
    }
    List<Map<String, String>> result=null;
    String resultPath = resultPathRef.get();
    if (resultPath !="" && resultPath!=null){
      try {
        result =JMeterRunner.convertCSVtoJSON(resultPath);
      } catch (IOException e) {
        throw new RuntimeException(e);
      } catch (CsvException e) {
        throw new RuntimeException(e);
      }

    }
       return (ResponseEntity<?>) ResponseEntity.ok(result);
  }

  @PostMapping("/ftp")
  public ResponseEntity<?> getFtpTestplan(@RequestBody FTPTestPlan ftpTestPlan) throws IOException, CsvException {


    ftpTestPlan.generateTestPlan();
    ExecutorService executorService = Executors.newSingleThreadExecutor();

    // Submit the task to the ExecutorService
    AtomicReference<String> resultPathRef = new AtomicReference<>();
    Future<?> future = executorService.submit(() -> {
      String result = null;
      try {
        result = JMeterRunner.runJMeter("ftp");
      } catch (URISyntaxException e) {
        throw new RuntimeException(e);
      }
      resultPathRef.set(result);
    });
    try {
      future.get();
    } catch (InterruptedException | ExecutionException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred during task execution.");
    } finally {
      // Shutdown the ExecutorService to release resources
      executorService.shutdown();
    }
    List<Map<String, String>> result=null;
    String resultPath = resultPathRef.get();
    if (!resultPath.equals("") && !resultPath.equals(null)){
      try {
        result =JMeterRunner.convertCSVtoJSON(resultPath);
      } catch (IOException e) {
        throw new RuntimeException(e);
      } catch (CsvException e) {
        throw new RuntimeException(e);
      }

    }

    return (ResponseEntity<?>) ResponseEntity.ok(result);
  }


}
