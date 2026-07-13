package com.coderunner;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CodeRunnerApplication {

    private static final int PORT = 8080;

    public static void main(String[] args) {
        killPort(PORT);
        SpringApplication.run(CodeRunnerApplication.class, args);
    }

    private static void killPort(int port) {
        try {
            boolean isWindows = System.getProperty("os.name").toLowerCase().contains("win");

            if (isWindows) {
                Process process = new ProcessBuilder(
                    "cmd", "/c", "netstat -ano | findstr :" + port
                ).redirectErrorStream(true).start();

                String line;
                try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                    while ((line = reader.readLine()) != null) {
                        line = line.trim();
                        if (line.contains("LISTENING")) {
                            String[] parts = line.split("\\s+");
                            String pid = parts[parts.length - 1];
                            new ProcessBuilder("taskkill", "/F", "/PID", pid)
                                .redirectErrorStream(true).start();
                            System.out.println("Killed PID " + pid + " on port " + port);
                        }
                    }
                }
            } else {
                Process process = new ProcessBuilder(
                    "sh", "-c", "lsof -ti :" + port + " | xargs kill -9 2>/dev/null"
                ).redirectErrorStream(true).start();
                process.waitFor();
            }
        } catch (Exception e) {
            System.err.println("Could not kill port " + port + ": " + e.getMessage());
        }
    }
}
