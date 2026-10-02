package com.skillsync.controller;

import com.skillsync.dto.AIRequest;
import com.skillsync.service.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin("*")
public class AIController {

    @Autowired
    private AIService aiService;

    @PostMapping("/chat")
    public ResponseEntity<String> chat(@RequestBody AIRequest request) {

        if (request.getPrompt() == null || request.getPrompt().isBlank()) {
            return ResponseEntity.badRequest()
                    .body("Please enter a question before asking the AI.");
        }

        try {
            return ResponseEntity.ok(aiService.askAI(request.getPrompt()));
        } catch (AIService.GeminiException e) {
            return ResponseEntity.status(e.getStatus()).body(e.getMessage());
        }
    }
}
