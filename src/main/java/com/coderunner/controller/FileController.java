package com.coderunner.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.coderunner.model.FileEntity;
import com.coderunner.service.FileService;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping
    public Map<String, String> getAllFiles() {
        return fileService.getFilesMap();
    }

    @PostMapping
    public ResponseEntity<?> createFile(@RequestBody Map<String, String> body) {
        String path = body.get("path");
        String name = body.get("name");
        String content = body.getOrDefault("content", "");
        if (path == null || name == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "path and name required"));
        }
        FileEntity saved = fileService.createOrUpdate(path, name, content);
        return ResponseEntity.ok(Map.of("id", saved.getId(), "path", saved.getPath(), "name", saved.getName()));
    }

    @PutMapping
    public ResponseEntity<?> updateFile(@RequestBody Map<String, String> body) {
        String path = body.get("path");
        String content = body.getOrDefault("content", "");
        String name = body.get("name");
        if (path == null || name == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "path and name required"));
        }
        fileService.createOrUpdate(path, name, content);
        return ResponseEntity.ok(Map.of("status", "ok"));
    }

    @DeleteMapping
    public ResponseEntity<?> deleteFile(@RequestParam String path) {
        fileService.deleteByPath(path);
        return ResponseEntity.ok(Map.of("status", "deleted"));
    }
}
