package com.coderunner.service;

import java.util.*;

import org.springframework.stereotype.Service;

import com.coderunner.model.FileEntity;
import com.coderunner.repository.FileRepository;

import jakarta.annotation.PostConstruct;

@Service
public class FileService {

    private final FileRepository fileRepository;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    @PostConstruct
    public void initDefaults() {
        if (fileRepository.count() == 0) {
            fileRepository.save(new FileEntity(
                "/workspace/Main.java", "Main.java",
                "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}"
            ));
            fileRepository.save(new FileEntity(
                "/workspace/README.md", "README.md",
                "# My Java Project\n\nA simple Java application built with Code Runner."
            ));
        }
    }

    public List<FileEntity> getAllFiles() {
        return fileRepository.findAll();
    }

    public Map<String, String> getFilesMap() {
        List<FileEntity> files = fileRepository.findAll();
        Map<String, String> map = new LinkedHashMap<>();
        for (FileEntity f : files) {
            map.put(f.getPath(), f.getContent());
        }
        return map;
    }

    public FileEntity createOrUpdate(String path, String name, String content) {
        Optional<FileEntity> existing = fileRepository.findByPath(path);
        FileEntity entity;
        if (existing.isPresent()) {
            entity = existing.get();
            entity.setContent(content);
            entity.setName(name);
        } else {
            entity = new FileEntity(path, name, content != null ? content : "");
        }
        return fileRepository.save(entity);
    }

    public void deleteByPath(String path) {
        fileRepository.findByPath(path).ifPresent(fileRepository::delete);
    }
}
