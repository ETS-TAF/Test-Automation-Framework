package ca.etsmtl.taf.jmeter.provider;

import java.io.File;
import java.net.URISyntaxException;
import java.nio.file.Path;
import java.nio.file.Paths;

public class JmeterPathProvider {
    public  String getJmeterJarPath() throws URISyntaxException {

        Path parentDirectory = Paths.get(getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParent().getParent().getParent();

        String osName = System.getProperty("os.name");
        File jmeterExecutable;

        if (osName.toLowerCase().contains("win")) {
            jmeterExecutable = parentDirectory.resolve("apache-jmeter").resolve("bin").resolve("jmeter.bat").toFile();
        } else {
            jmeterExecutable = parentDirectory.resolve("apache-jmeter").resolve("bin").resolve("jmeter.sh").toFile();        }


        if (jmeterExecutable.exists()) {
            return jmeterExecutable.getAbsolutePath();
        } else {
            return "JMETER JAR not found!";
        }
    }
}