package com.coderunner.model;

import jakarta.persistence.*;

@Entity
@Table(name = "code_files")
public class FileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 500)
    private String path;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(columnDefinition = "CLOB")
    @Lob
    private String content;

    public FileEntity() {}

    public FileEntity(String path, String name, String content) {
        this.path = path;
        this.name = name;
        this.content = content;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getPath() { return path; }
    public void setPath(String path) { this.path = path; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
