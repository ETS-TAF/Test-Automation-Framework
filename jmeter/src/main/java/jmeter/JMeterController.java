package jmeter;

import parser.JmxParser;
import parser.XmlParser;

import java.io.IOException;

public class JMeterController {

    public void runTest(String filename) {
        ThreadGroup threadGroup = XmlParser.readXmlFile(filename);
        JmxParser.generateJmxFile(threadGroup);
        executeTest();
    }

    private void executeTest(){
        Runtime rt = Runtime.getRuntime();
        try {
            rt.exec("./jmeter/apache-jmeter-5.5/bin/jmeter.bat -n -t ./jmeter/test_plan.jmx -l ./jmeter/test_result.jtl -e -o ./jmeter/report");
            System.out.println("Test executed");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
