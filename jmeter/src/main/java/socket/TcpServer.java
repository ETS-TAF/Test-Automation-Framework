package socket;

import jmeter.JMeterController;

import java.net.*;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TcpServer {

    private final int serverPort;

    public TcpServer() {
        this.serverPort = 4020;
    }

    public TcpServer(int serverPort) {
        this.serverPort = serverPort;
    }

    public void run() {
        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd 'at' HH:mm:ss z");
        Date date = new Date(System.currentTimeMillis());
        try {
            ServerSocket serverSocket = new ServerSocket(serverPort);
            System.out.println("Server started on port " + serverPort);
            //serverSocket.setSoTimeout(10000);
            while (true) {
                Socket socket = null;
                InputStream in = null;
                OutputStream out = null;

                try {
                    socket = serverSocket.accept();
                    date = new Date(System.currentTimeMillis());
                    System.out.println(formatter.format(date) + " : New client connected from " + socket.getInetAddress().getHostAddress());
                } catch (IOException ex) {
                    System.out.println("Can't accept client connection. ");
                }

                try {
                    in = socket.getInputStream();
                } catch (IOException ex) {
                    System.out.println("Can't get socket input stream. ");
                }

                try {
                    out = new FileOutputStream("./jmeter/test_plan.xml");

                    byte[] bytes = new byte[16*1024];

                    int count;
                    while ((count = in.read(bytes)) > 0) {
                        out.write(bytes, 0, count);
                    }
                    date = new Date(System.currentTimeMillis());
                    System.out.println(formatter.format(date) + " : File received from " + socket.getInetAddress().getHostAddress());

                    // Lancement du test JMeter
                    JMeterController jMeterController = new JMeterController();
                    jMeterController.runTest("./jmeter/test_plan.xml");

                } catch (FileNotFoundException ex) {
                    System.out.println("File not found. ");
                } catch (IOException ex) {
                    System.out.println("Can't get socket input stream. ");
                }
            }
        } catch(IOException ex) {
            ex.printStackTrace();
        }
    }

    public static void main(String[] args) {
        TcpServer srv = new TcpServer();
        srv.run();
    }
}