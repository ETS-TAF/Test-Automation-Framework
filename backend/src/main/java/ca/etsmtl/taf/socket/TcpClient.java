package ca.etsmtl.taf.socket;

import java.io.*;
import java.net.*;

public class TcpClient {

    private final int serverPort;
    private final String serverName;

    public TcpClient() {
        this.serverPort = 4020;
        this.serverName = "localhost";
    }

    public TcpClient(int serverPort, String serverName) {
        this.serverPort = serverPort;
        this.serverName = serverName;
    }

    public void sendFile(File file) {
        try {
            // Détection de l'IP serveur
            InetAddress host = InetAddress.getByName(serverName);
            System.out.println("Connecting to server on port " + serverPort);

            // Connection au serveur TCP
            Socket socket = new Socket(host, serverPort);
            System.out.println("Connected to " + socket.getRemoteSocketAddress());

            byte[] bytes = new byte[16 * 1024];
            InputStream in = new FileInputStream(file);
            OutputStream out = socket.getOutputStream();

            // Envoi du fichier au serveur
            int count;
            while ((count = in.read(bytes)) > 0) {
                out.write(bytes, 0, count);
            }

            // Attente de la réponse du serveur


            // Fermeture de la connection
            out.close();
            in.close();
            socket.close();
        } catch(IOException ex) {
            ex.printStackTrace();
        }
    }
}
