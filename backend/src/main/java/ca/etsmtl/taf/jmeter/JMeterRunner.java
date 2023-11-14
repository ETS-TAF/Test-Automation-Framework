package ca.etsmtl.taf.jmeter;

import ca.etsmtl.taf.jmeter.provider.JmeterPathProvider;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public  class JMeterRunner {

  private static final Logger logger = LoggerFactory.getLogger(JMeterRunner.class);



  private static Properties loadProperties() {
    try (InputStream input = JMeterRunner.class.getClassLoader().getResourceAsStream("application.properties")) {
      Properties properties = new Properties();
      properties.load(input);
      return properties;
    } catch (IOException e) {
      logger.error("Error loading properties.", e);
      return null;
    }
  }

  public static String runJMeter( String testType) throws URISyntaxException {
    String jmxFilePath="";
    if (testType.equals("http"))
      jmxFilePath=  "backend/src/main/resources/jmeter/TestPlan.jmx";
    else if (testType.equals("ftp"))
      jmxFilePath=  "backend/src/main/resources/jmeter/FTPTestPlan.jmx";

    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd_HHmmss");
    String timestamp = dateFormat.format(new Date());

    String resultsFilePath = "backend/src/main/resources/jmeter/results/result_"+timestamp +".csv";
    String osName = System.getProperty("os.name");

    String jmeterExecutable= new JmeterPathProvider().getJmeterJarPath();
    try {
      String jmeterCommand = jmeterExecutable + " -n -t " + jmxFilePath + " -l " + resultsFilePath /*+" -e -o " + htmlReportPath */;
      // Run the command
      Runtime runtime = Runtime.getRuntime();
      Process process = runtime.exec(jmeterCommand);
      int exitCode = process.waitFor();

      // Check the exit code
      if (exitCode == 0) {
        System.out.println("JMeter test executed successfully.");
        return resultsFilePath;
      } else {
        System.err.println("JMeter test execution failed. Exit code: " + exitCode);
        return null;
      }

    } catch (IOException | InterruptedException e) {
      e.printStackTrace();
    }
    return resultsFilePath;
  }


  public static List<Map<String, String>> convertCSVtoJSON(String csvFilePath) throws IOException, CsvException, CsvException {
    try (CSVReader reader = new CSVReader(new FileReader(csvFilePath))) {
      List<String[]> csvData = reader.readAll();

      String[] headers = csvData.get(0);

      return csvData.stream()
              .skip(1) // Skip the header row
              .map(row -> {
                Map<String, String> jsonMap = createJsonMap(headers, row);
                return jsonMap;
              })
              .collect(Collectors.toList());
    }
  }

  private static Map<String, String> createJsonMap(String[] headers, String[] values) {
    return IntStream.range(0, headers.length)
            .boxed()
            .collect(Collectors.toMap(i -> headers[i], i -> values[i]));
  }

}
