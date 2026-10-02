package com.skillsync.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.List;
import java.util.Map;

@Service
public class AIService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.model:gemini-3.6-flash}")
    private String model;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://generativelanguage.googleapis.com")
            .build();

    public String askAI(String prompt) {

        Map<String, Object> body = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                )
        );

        Map<?, ?> response;

        try {
            response = webClient.post()
                    .uri("/v1beta/models/{model}:generateContent?key={key}", model, apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

        } catch (WebClientResponseException.TooManyRequests e) {
            throw new GeminiException(HttpStatus.TOO_MANY_REQUESTS,
                    "Gemini AI quota is currently unavailable. Please try again later.");

        } catch (WebClientResponseException.Unauthorized | WebClientResponseException.Forbidden e) {
            throw new GeminiException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "The Gemini API key is missing or invalid. Please check the server configuration.");

        } catch (WebClientResponseException.NotFound e) {
            throw new GeminiException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "The configured Gemini model was not found. Please check gemini.api.model.");

        } catch (WebClientResponseException.ServiceUnavailable e) {
            throw new GeminiException(HttpStatus.SERVICE_UNAVAILABLE,
                    "Gemini AI is experiencing high demand right now. Please try again in a few seconds.");

        } catch (WebClientResponseException e) {
            throw new GeminiException(HttpStatus.BAD_GATEWAY,
                    "Gemini AI could not process this request right now.");

        } catch (Exception e) {
            throw new GeminiException(HttpStatus.SERVICE_UNAVAILABLE,
                    "Unable to reach the Gemini AI service. Please check your network connection.");
        }

        String text = extractText(response);

        if (text == null || text.isBlank()) {
            throw new GeminiException(HttpStatus.BAD_GATEWAY,
                    "Gemini AI did not return a response. Please try again.");
        }

        return text;
    }

    @SuppressWarnings("unchecked")
    private String extractText(Map<?, ?> response) {
        if (response == null) return null;

        List<?> candidates = (List<?>) response.get("candidates");
        if (candidates == null || candidates.isEmpty()) return null;

        Object contentObj = ((Map<?, ?>) candidates.get(0)).get("content");
        if (!(contentObj instanceof Map)) return null;

        List<?> parts = (List<?>) ((Map<?, ?>) contentObj).get("parts");
        if (parts == null || parts.isEmpty()) return null;

        Object text = ((Map<?, ?>) parts.get(0)).get("text");
        return text != null ? text.toString() : null;
    }

    public static class GeminiException extends RuntimeException {
        private final HttpStatus status;

        public GeminiException(HttpStatus status, String message) {
            super(message);
            this.status = status;
        }

        public HttpStatus getStatus() {
            return status;
        }
    }
}
