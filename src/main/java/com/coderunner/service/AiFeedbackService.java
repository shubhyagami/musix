package com.coderunner.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class AiFeedbackService {

    @Value("${nvidia.api.key}")
    private String apiKey;

    @Value("${nvidia.api.url}")
    private String apiUrl;

    @Value("${nvidia.api.model}")
    private String model;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getFeedback(String code, String output, String stdin, String error) {
        String prompt = buildPrompt(code, output, stdin, error);
        Map<String, Object> requestBody = buildRequestBody(prompt);
        HttpEntity<Map<String, Object>> request = buildRequest(requestBody);

        String lastError = null;
        int[] delays = { 1000, 2000, 4000 };

        for (int attempt = 0; attempt <= 3; attempt++) {
            try {
                String result = doRequest(request);
                if (result != null) return result;
            } catch (Exception e) {
                lastError = extractErrorMessage(e);
                if (attempt < 3 && isRetryable(lastError)) {
                    try { Thread.sleep(delays[attempt]); } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        break;
                    }
                } else {
                    break;
                }
            }
        }

        return lastError != null ? lastError : "AI service unavailable. Try again later.";
    }

    public String chat(List<com.coderunner.model.AiChatMessage> messages) {
        // Build messages with system prompt + conversation history
        List<Map<String, String>> apiMessages = new ArrayList<>();
        apiMessages.add(Map.of("role", "system", "content",
            "You are an expert programming assistant. Help the user with code, debugging, explanations, and best practices. Be concise and clear."));
        for (var msg : messages) {
            apiMessages.add(Map.of("role", msg.getRole(), "content", msg.getContent()));
        }

        Map<String, Object> requestBody = Map.of(
            "model", model,
            "messages", apiMessages,
            "temperature", 0.7,
            "top_p", 0.95,
            "max_tokens", 16384,
            "stream", false
        );
        HttpEntity<Map<String, Object>> request = buildRequest(requestBody);

        String lastError = null;
        int[] delays = { 1000, 2000, 4000 };

        for (int attempt = 0; attempt <= 3; attempt++) {
            try {
                String result = doRequest(request);
                if (result != null) return result;
            } catch (Exception e) {
                lastError = extractErrorMessage(e);
                if (attempt < 3 && isRetryable(lastError)) {
                    try { Thread.sleep(delays[attempt]); } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        break;
                    }
                } else {
                    break;
                }
            }
        }
        return lastError != null ? lastError : "AI service unavailable. Try again later.";
    }

    @SuppressWarnings("unchecked")
    private String doRequest(HttpEntity<Map<String, Object>> request) {
        ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, request, Map.class);
        Map<String, Object> body = response.getBody();
        if (body != null && body.containsKey("choices")) {
            List<Map<String, Object>> choices = (List<Map<String, Object>>) body.get("choices");
            if (!choices.isEmpty()) {
                Map<String, Object> choice = choices.get(0);
                Map<String, Object> msg = (Map<String, Object>) choice.get("message");
                if (msg != null && msg.containsKey("content")) {
                    return (String) msg.get("content");
                }
            }
        }
        return null;
    }

    private Map<String, Object> buildRequestBody(String prompt) {
        Map<String, Object> message = Map.of("role", "user", "content", prompt);
        return Map.of(
            "model", model,
            "messages", List.of(message),
            "temperature", 1,
            "top_p", 0.95,
            "max_tokens", 16384,
            "stream", false
        );
    }

    private HttpEntity<Map<String, Object>> buildRequest(Map<String, Object> body) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);
        return new HttpEntity<>(body, headers);
    }

    private boolean isRetryable(String error) {
        return error.contains("503") || error.contains("ResourceExhausted")
            || error.contains("429") || error.contains("retry")
            || error.contains("timeout") || error.contains("Timeout");
    }

    private String extractErrorMessage(Exception e) {
        String msg = e.getMessage();
        if (msg == null) return "Unknown AI service error";
        // Try to extract a clean JSON error message from the response body
        int bodyStart = msg.indexOf("\"message\":\"");
        if (bodyStart != -1) {
            bodyStart += 11;
            int bodyEnd = msg.indexOf("\"", bodyStart);
            if (bodyEnd != -1 && bodyEnd - bodyStart < 200) {
                return msg.substring(bodyStart, bodyEnd);
            }
        }
        // Fallback: truncate verbose HTTP response
        int cutoff = msg.indexOf("on POST request");
        if (cutoff != -1) msg = msg.substring(0, cutoff).trim();
        if (msg.length() > 120) msg = msg.substring(0, 120) + "...";
        return msg;
    }

    private String buildPrompt(String code, String output, String stdin, String error) {
        StringBuilder sb = new StringBuilder();
        sb.append("You are a Java code analysis assistant. Analyze the provided Java code and give structured feedback.\n\n");
        sb.append("### Code\n```java\n").append(code).append("\n```\n\n");

        if (stdin != null && !stdin.isEmpty()) {
            sb.append("### Input\n").append(stdin).append("\n\n");
        }

        if (error != null && !error.isEmpty()) {
            sb.append("### Error\n").append(error).append("\n\n");
            sb.append("Please provide:\n");
            sb.append("1. **Error Analysis** - Explain why the error occurred\n");
            sb.append("2. **Fix** - Show the corrected code or explain how to fix it\n");
            sb.append("3. **Time Complexity** - Of the corrected/fixed code\n");
            sb.append("4. **Better Approach** - If applicable, suggest an improved approach\n");
        } else {
            sb.append("### Output\n").append(output != null ? output : "(no output)").append("\n\n");
            sb.append("Please provide:\n");
            sb.append("1. **Time Complexity** - Time and space complexity analysis\n");
            sb.append("2. **Better Approach** - Suggest any improvements or alternative approaches\n");
            sb.append("3. **Edge Cases** - Any edge cases the code might miss\n");
        }

        sb.append("\nFormat your response in clear markdown with sections.");

        if (error != null && !error.isEmpty()) {
            sb.append(" Focus especially on the error and how to fix it.");
        }

        return sb.toString();
    }
}
