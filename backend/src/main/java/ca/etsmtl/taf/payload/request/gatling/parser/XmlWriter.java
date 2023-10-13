package ca.etsmtl.taf.payload.request.gatling.parser;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;

public class XmlWriter {

    public static File createXMLFile(int nbUsers, int rampUpPeriod, int loopCount, Element sampler) {
        try {
            Document doc = new Document();
            doc.setRootElement(createTestPlanXMLElement(nbUsers, rampUpPeriod, loopCount, sampler));

            XMLOutputter xmlOutput = new XMLOutputter();
            xmlOutput.setFormat(Format.getPrettyFormat());
            xmlOutput.output(doc, new FileWriter("./backend/test_plan_gatling.xml"));
            File file = new File("./backend/test_plan_gatling.xml");
            System.out.println("File Saved!");
            return file;
        } catch (IOException io) {
            System.out.println(io.getMessage());
        }
        return null;
    }

    private static Element createTestPlanXMLElement(int nbUsers, int rampUpPeriod, int loopCount, Element sampler) {
        Element testPlan = new Element("TestPlan");
        testPlan.addContent(new Element("nbUsers").setText(String.valueOf(nbUsers)));
        testPlan.addContent(new Element("rampUpPeriod").setText(String.valueOf(rampUpPeriod)));
        testPlan.addContent(new Element("loopCount").setText(String.valueOf(loopCount)));
        testPlan.addContent(sampler);
        return testPlan;
    }

    public static Element createHttpRequestXMLElement(String protocol, String serverName, int port, String method, String path) {
        Element httpRequest = new Element("HttpRequest");
        httpRequest.addContent(new Element("protocol").setText(protocol));
        httpRequest.addContent(new Element("serverName").setText(serverName));
        httpRequest.addContent(new Element("port").setText(String.valueOf(port)));
        httpRequest.addContent(new Element("method").setText(method));
        httpRequest.addContent(new Element("path").setText(path));
        return httpRequest;
    }

}
