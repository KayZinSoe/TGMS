import java.io.IOException;
import java.net.ServerSocket;

public class TestPortServer {
    public static void main(String[] args) {
        int port = 5432;

        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println("Test server is listening on port " + port);
            System.out.println("Press Ctrl+C to stop.");

            while (true) {
                serverSocket.accept();
                System.out.println("Connection received.");
            }
        } catch (IOException e) {
            System.err.println("Could not start server: " + e.getMessage());
        }
    }
}
