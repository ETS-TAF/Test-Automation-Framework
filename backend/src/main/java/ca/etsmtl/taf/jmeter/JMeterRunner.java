package ca.etsmtl.taf.jmeter;

import com.fasterxml.jackson.databind.MappingIterator;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.*;
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

  public static String runJMeter( String testType) {
    String jmxFilePath="";
    if (testType=="http")
      jmxFilePath=  "backend/src/main/resources/jmeter/TestPlan.jmx";
    else if (testType=="ftp")
      jmxFilePath=  "backend/src/main/resources/jmeter/FTPTestPlan.jmx";

    // Generate a timestamp for uniqueness
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd_HHmmss");
    String timestamp = dateFormat.format(new Date());

    // Add the timestamp to the file name as the salt
    String resultsFilePath = "backend/src/main/resources/jmeter/results/result_"+timestamp +".csv";
    //Please change to your JMETER Executable local path
    String osName = System.getProperty("os.name");

    String jmeterExecutable="";
    // Check if it's Windows
    if (osName.toLowerCase().contains("win")) {
      jmeterExecutable = "\"C:\\Users\\safou\\Downloads\\apache-jmeter-5.5\\bin\\jmeter.bat\"";
    } else {
      jmeterExecutable = "\"C:\\Users\\safou\\Downloads\\apache-jmeter-5.5\\bin\\jmeter.sh\"";
    }
    //String htmlReportPath="\"C:\\Users\\safou\\OneDrive\\Desktop\\result\"";
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

      // Assuming the first row contains headers
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
