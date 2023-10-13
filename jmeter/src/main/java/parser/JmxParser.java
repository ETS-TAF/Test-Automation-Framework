package parser;

import jmeter.ThreadGroup;
import jmeter.sampler.HttpRequest;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;

import java.io.FileWriter;
import java.io.IOException;

public class JmxParser {

    public static void generateJmxFile(ThreadGroup threadGroupClass) {
        System.out.println("Generating JMX file...");
        try {
            Document doc = new Document();
            Element root = new Element("jmeterTestPlan");
            root.setAttribute("version", "1.2");
            root.setAttribute("properties", "5.0");
            root.setAttribute("jmeter", "5.5");
            root.addContent(createMainHashTreeXMLElement(threadGroupClass));
            doc.setRootElement(root);

            XMLOutputter xmlOutput = new XMLOutputter();
            xmlOutput.setFormat(Format.getPrettyFormat());
            xmlOutput.output(doc, new FileWriter("./jmeter/test_plan.jmx"));
            System.out.println("File Saved!");
        } catch (IOException io) {
            System.out.println(io.getMessage());
        }
        System.out.println("JMX file generated!");
    }

    private static Element createMainHashTreeXMLElement(ThreadGroup threadGroupClass) {
        Element hashTree = new Element("hashTree");
        hashTree.addContent(createTestPlanXMLElement());
        hashTree.addContent(createSecondHashTreeXMLElement(threadGroupClass));

        return hashTree;
    }

    private static Element createTestPlanXMLElement() {
        Element testPlan = new Element("TestPlan");
        testPlan.setAttribute("guiclass", "TestPlanGui");
        testPlan.setAttribute("testclass", "TestPlan");
        testPlan.setAttribute("testname", "Test Plan");
        testPlan.setAttribute("enabled", "true");
        testPlan.addContent(new Element("stringProp").setAttribute("name", "TestPlan.comments").setText(""));
        testPlan.addContent(new Element("boolProp").setAttribute("name", "TestPlan.functional_mode").setText("false"));
        testPlan.addContent(new Element("boolProp").setAttribute("name", "TestPlan.tearDown_on_shutdown").setText("true"));
        testPlan.addContent(new Element("boolProp").setAttribute("name", "TestPlan.serialize_threadgroups").setText("false"));
        testPlan.addContent(new Element("elementProp").setAttribute("name", "TestPlan.user_defined_variables").setAttribute("elementType", "Arguments").setAttribute("guiclass", "ArgumentsPanel").setAttribute("testclass", "Arguments").setAttribute("testname", "User Defined Variables").setAttribute("enabled", "true"));
        testPlan.addContent(new Element("stringProp").setAttribute("name", "TestPlan.user_define_classpath").setText(""));
        return testPlan;
    }

    private static Element createSecondHashTreeXMLElement(ThreadGroup threadGroupClass) {
        Element hashTree = new Element("hashTree");
        hashTree.addContent(createThreadGroupXMLElement(threadGroupClass));
        hashTree.addContent(creatThirdHashTreeXMLElement(threadGroupClass));
        return hashTree;
    }

    private static Element createThreadGroupXMLElement(ThreadGroup threadGroupClass) {
        Element threadGroup = new Element("ThreadGroup");
        threadGroup.setAttribute("guiclass", "ThreadGroupGui");
        threadGroup.setAttribute("testclass", "ThreadGroup");
        threadGroup.setAttribute("testname", "Thread Group");
        threadGroup.setAttribute("enabled", "true");
        threadGroup.addContent(new Element("stringProp").setAttribute("name", "ThreadGroup.on_sample_error").setText("continue"));
        threadGroup.addContent(new Element("elementProp").setAttribute("name", "ThreadGroup.main_controller").setAttribute("elementType", "LoopController").setAttribute("guiclass", "LoopControlPanel").setAttribute("testclass", "LoopController").setAttribute("testname", "Loop Controller").setAttribute("enabled", "true").addContent(new Element("boolProp").setAttribute("name", "LoopController.continue_forever").setText("false")).addContent(new Element("stringProp").setAttribute("name", "LoopController.loops").setText(threadGroupClass.getLoopCount())));
        threadGroup.addContent(new Element("stringProp").setAttribute("name", "ThreadGroup.num_threads").setText(threadGroupClass.getNbUsers()));
        threadGroup.addContent(new Element("stringProp").setAttribute("name", "ThreadGroup.ramp_time").setText(threadGroupClass.getRampUpPeriod()));
        threadGroup.addContent(new Element("boolProp").setAttribute("name", "ThreadGroup.scheduler").setText("false"));
        threadGroup.addContent(new Element("stringProp").setAttribute("name", "ThreadGroup.duration").setText(""));
        threadGroup.addContent(new Element("stringProp").setAttribute("name", "ThreadGroup.delay").setText(""));
        threadGroup.addContent(new Element("boolProp").setAttribute("name", "ThreadGroup.same_user_on_next_iteration").setText("true"));
        return threadGroup;
    }

    private static Element creatThirdHashTreeXMLElement(ThreadGroup threadGroupClass) {
        Element hashTree = new Element("hashTree");
        hashTree.addContent(createHttpSamplerProxyXMLElement(threadGroupClass.getHttpRequest()));
        hashTree.addContent(new Element("hashTree"));
        return hashTree;
    }

    private static Element createHttpSamplerProxyXMLElement(HttpRequest httpRequestClass) {
        Element httpSamplerProxy = new Element("HTTPSamplerProxy");
        httpSamplerProxy.setAttribute("guiclass", "HttpTestSampleGui");
        httpSamplerProxy.setAttribute("testclass", "HTTPSamplerProxy");
        httpSamplerProxy.setAttribute("testname", "HTTP Request");
        httpSamplerProxy.setAttribute("enabled", "true");
        httpSamplerProxy.addContent(new Element("elementProp").setAttribute("name", "HTTPsampler.Arguments").setAttribute("elementType", "Arguments").setAttribute("guiclass", "HTTPArgumentsPanel").setAttribute("testclass", "Arguments").setAttribute("testname", "User Defined Variables").setAttribute("enabled", "true").addContent(new Element("collectionProp").setAttribute("name", "Arguments.arguments")));
        httpSamplerProxy.addContent(new Element("stringProp").setAttribute("name", "HTTPSampler.domain").setText(httpRequestClass.getServerName()));
        httpSamplerProxy.addContent(new Element("stringProp").setAttribute("name", "HTTPSampler.port").setText(httpRequestClass.getPort()));
        httpSamplerProxy.addContent(new Element("stringProp").setAttribute("name", "HTTPSampler.protocol").setText(httpRequestClass.getProtocol()));
        httpSamplerProxy.addContent(new Element("stringProp").setAttribute("name", "HTTPSampler.contentEncoding").setText(""));
        httpSamplerProxy.addContent(new Element("stringProp").setAttribute("name", "HTTPSampler.path").setText(httpRequestClass.getPath()));
        httpSamplerProxy.addContent(new Element("stringProp").setAttribute("name", "HTTPSampler.method").setText(httpRequestClass.getMethod()));
        httpSamplerProxy.addContent(new Element("boolProp").setAttribute("name", "HTTPSampler.follow_redirects").setText("true"));
        httpSamplerProxy.addContent(new Element("boolProp").setAttribute("name", "HTTPSampler.auto_redirects").setText("false"));
        httpSamplerProxy.addContent(new Element("boolProp").setAttribute("name", "HTTPSampler.use_keepalive").setText("true"));
        httpSamplerProxy.addContent(new Element("boolProp").setAttribute("name", "HTTPSampler.DO_MULTIPART_POST").setText("false"));
        httpSamplerProxy.addContent(new Element("stringProp").setAttribute("name", "HTTPSampler.embedded_url_re").setText(""));
        httpSamplerProxy.addContent(new Element("stringProp").setAttribute("name", "HTTPSampler.connect_timeout").setText(""));
        httpSamplerProxy.addContent(new Element("stringProp").setAttribute("name", "HTTPSampler.response_timeout").setText(""));
        return httpSamplerProxy;
    }

}
