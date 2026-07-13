package com.coderunner.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.coderunner.service.YouTubeService;

@RestController
@RequestMapping("/api/music")
public class MusicController {

    private final YouTubeService youTubeService;

    public MusicController(YouTubeService youTubeService) {
        this.youTubeService = youTubeService;
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String q) {
        try {
            List<Map<String, String>> results = youTubeService.search(q);
            return ResponseEntity.ok(Map.of("results", results));
        } catch (Exception e) {
            return ResponseEntity.status(502).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/dl")
    public ResponseEntity<?> dl(@RequestParam String id) {
        try {
            Map<String, Object> info = youTubeService.getDownloadInfo(id);
            return ResponseEntity.ok(info);
        } catch (Exception e) {
            return ResponseEntity.status(502).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/download")
    public ResponseEntity<?> download(@RequestParam String id) {
        try {
            Path filePath = youTubeService.downloadAndSave(id);
            String fileName = filePath.getFileName().toString();
            return ResponseEntity.ok(Map.of(
                "status", "ok",
                "localUrl", "/api/music/stream/" + id,
                "fileName", fileName,
                "size", Files.size(filePath)
            ));
        } catch (Exception e) {
            return ResponseEntity.status(502).body(Map.of(
                "status", "error",
                "error", e.getMessage()
            ));
        }
    }

    @GetMapping("/stream/{videoId}")
    public ResponseEntity<Resource> stream(@PathVariable String videoId) {
        try {
            Path filePath = Path.of("music", videoId + ".mp3");
            String contentType = "audio/mpeg";
            if (!Files.exists(filePath)) {
                filePath = Path.of("music", videoId + ".m4a");
                contentType = "audio/mp4";
                if (!Files.exists(filePath)) {
                    return ResponseEntity.notFound().build();
                }
            }
            FileSystemResource resource = new FileSystemResource(filePath);
            return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .contentLength(resource.contentLength())
                .header("Accept-Ranges", "bytes")
                .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/{videoId}")
    public ResponseEntity<?> delete(@PathVariable String videoId) {
        try {
            Path filePath = Path.of("music", videoId + ".mp3");
            if (!Files.exists(filePath)) {
                filePath = Path.of("music", videoId + ".m4a");
            }
            if (Files.exists(filePath)) {
                Files.delete(filePath);
                return ResponseEntity.ok(Map.of("status", "deleted"));
            }
            return ResponseEntity.ok(Map.of("status", "not_found"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}
