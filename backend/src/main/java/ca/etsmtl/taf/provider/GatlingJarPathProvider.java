package ca.etsmtl.taf.provider;

import java.io.File;
import java.net.URISyntaxException;
import java.nio.file.Path;
import java.nio.file.Paths;

public class GatlingJarPathProvider {
    public String getGatlingJarPath() throws URISyntaxException {

        Path backendDirectory = Paths.get(getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParent().getParent();
        Path parentDirectory = backendDirectory.getParent();

        //Construire le chemin vers le Gatling JAR
        File gatlingJar = parentDirectory.resolve("gatling").resolve("target").resolve("gatling-1.0-SNAPSHOT-jar-with-dependencies.jar").toFile();
        if (gatlingJar.exists()) {
            return gatlingJar.getAbsolutePath();
        } else {
            return "Gatling JAR not found!";
        }
    }
}
