package com.coderunner.repository;

import com.coderunner.model.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface FileRepository extends JpaRepository<FileEntity, Long> {
    Optional<FileEntity> findByPath(String path);
    boolean existsByPath(String path);
    void deleteByPath(String path);
}
