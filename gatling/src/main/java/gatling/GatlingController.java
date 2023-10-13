package gatling;

import parser.XmlParser;

import java.io.IOException;

public class GatlingController {

    public void runTest(String filename) {
        executeTest(filename);
    }

    private void executeTest(String filename){
        Runtime rt = Runtime.getRuntime();
        try {
            rt.exec("cd ./gatling && mvn gatling:test '-DclassName=gatling.test.java.simulations.templates.BasicGetSimulation' '-DxmlFile=./" + filename + "'");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
}
