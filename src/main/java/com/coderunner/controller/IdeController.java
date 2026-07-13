package com.coderunner.controller;

import com.coderunner.model.AiChatRequest;
import com.coderunner.model.AiChatResponse;
import com.coderunner.model.AiFeedbackRequest;
import com.coderunner.model.AiFeedbackResponse;
import com.coderunner.model.ExecuteRequest;
import com.coderunner.model.ExecuteResponse;
import com.coderunner.service.AiFeedbackService;
import com.coderunner.service.ExecutionService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class IdeController {

    private final ExecutionService executionService;
    private final AiFeedbackService aiFeedbackService;

    public IdeController(ExecutionService executionService, AiFeedbackService aiFeedbackService) {
        this.executionService = executionService;
        this.aiFeedbackService = aiFeedbackService;
    }

    @GetMapping("/")
    public String ide() {
        return "ide";
    }

    @PostMapping("/api/execute")
    @ResponseBody
    public ExecuteResponse execute(@RequestBody ExecuteRequest req) {
        String output = executionService.execute(req.getCode(), req.getStdin());
        boolean success = !output.startsWith("Error:");
        return new ExecuteResponse(output, success);
    }

    @PostMapping("/api/ai-feedback")
    @ResponseBody
    public AiFeedbackResponse aiFeedback(@RequestBody AiFeedbackRequest req) {
        String feedback = aiFeedbackService.getFeedback(req.getCode(), req.getOutput(), req.getStdin(), req.getError());
        return new AiFeedbackResponse(feedback);
    }

    @PostMapping("/api/ai/chat")
    @ResponseBody
    public AiChatResponse aiChat(@RequestBody AiChatRequest req) {
        String reply = aiFeedbackService.chat(req.getMessages());
        return new AiChatResponse(reply);
    }
}
