package parser;

import gatling.ThreadGroup;
import gatling.sampler.HttpRequest;
import org.jdom2.Document;
import org.jdom2.input.DOMBuilder;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;

public class XmlParser {

    private static Document getDOMParsedDocument(String filename) {
        Document document = null;
        try
        {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder documentBuilder = factory.newDocumentBuilder();
            org.w3c.dom.Document w3cDocument = documentBuilder.parse(filename);
            document = new DOMBuilder().build(w3cDocument);
        }
        catch (IOException | SAXException | ParserConfigurationException e)
        {
            e.printStackTrace();
        }
        return document;
    }

    public static ThreadGroup readXmlFile(String filename) {
        ThreadGroup threadGroup = null;
        HttpRequest httpRequest = null;
        Document document = getDOMParsedDocument(filename);
        if (document != null) {
            threadGroup = new ThreadGroup();
            threadGroup.setNbUsers(document.getRootElement().getChild("nbUsers").getText());
            threadGroup.setRampUpPeriod(document.getRootElement().getChild("rampUpPeriod").getText());
            threadGroup.setLoopCount(document.getRootElement().getChild("loopCount").getText());
            httpRequest = new HttpRequest();
            httpRequest.setProtocol(document.getRootElement().getChild("HttpRequest").getChild("protocol").getText());
            httpRequest.setServerName(document.getRootElement().getChild("HttpRequest").getChild("serverName").getText());
            httpRequest.setPort(document.getRootElement().getChild("HttpRequest").getChild("port").getText());
            httpRequest.setMethod(document.getRootElement().getChild("HttpRequest").getChild("method").getText());
            httpRequest.setPath(document.getRootElement().getChild("HttpRequest").getChild("path").getText());
            threadGroup.setHttpRequest(httpRequest);
        }
        System.out.println(threadGroup.toString());
        return threadGroup;
    }
}
