package com.coderunner.service;

import java.io.*;
import java.nio.file.*;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;

@Service
public class ExecutionService {

    private static final long TIMEOUT_SECONDS = 10;

    public String execute(String code, String stdin) {
        Path tmpDir = null;
        try {
            tmpDir = Files.createTempDirectory("java-exec-");
            Path javaFile = tmpDir.resolve("Main.java");
            Files.writeString(javaFile, code);

            ProcessBuilder pb = new ProcessBuilder("javac", "Main.java");
            pb.directory(tmpDir.toFile());
            Process compile = pb.start();
            boolean compiled = compile.waitFor(TIMEOUT_SECONDS, TimeUnit.SECONDS);

            if (!compiled) {
                compile.destroyForcibly();
                return "Error: Compilation timed out";
            }

            if (compile.exitValue() != 0) {
                String err = readStream(compile.getErrorStream());
                return err;
            }

            pb = new ProcessBuilder("java", "-cp", ".", "Main");
            pb.directory(tmpDir.toFile());

            if (stdin != null && !stdin.isEmpty()) {
                pb.redirectInput(ProcessBuilder.Redirect.PIPE);
            }

            Process run = pb.start();

            if (stdin != null && !stdin.isEmpty()) {
                try (OutputStream os = run.getOutputStream()) {
                    os.write(stdin.getBytes());
                    os.flush();
                }
            }

            boolean finished = run.waitFor(TIMEOUT_SECONDS, TimeUnit.SECONDS);

            if (!finished) {
                run.destroyForcibly();
                return "Error: Execution timed out (limit: " + TIMEOUT_SECONDS + "s)";
            }

            String stdout = readStream(run.getInputStream());
            String stderr = readStream(run.getErrorStream());

            if (!stderr.isEmpty()) {
                return stderr;
            }

            return stdout.isEmpty() ? "(no output)" : stdout;

        } catch (IOException e) {
            return "Error: " + e.getMessage();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return "Error: Execution interrupted";
        } finally {
            if (tmpDir != null) {
                deleteDir(tmpDir.toFile());
            }
        }
    }

    private String readStream(InputStream stream) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(stream));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            if (sb.length() > 0) sb.append("\n");
            sb.append(line);
        }
        return sb.toString();
    }

    private void deleteDir(File dir) {
        File[] files = dir.listFiles();
        if (files != null) {
            for (File f : files) {
                if (f.isDirectory()) deleteDir(f);
                else f.delete();
            }
        }
        dir.delete();
    }
}
