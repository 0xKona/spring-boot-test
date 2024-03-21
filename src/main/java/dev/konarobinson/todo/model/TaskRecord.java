package dev.konarobinson.todo.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public record TaskRecord(
    @Id
    Integer id, 
    @NotBlank
    String title, 
    @Column(name="`desc`")
    String desc,
    TaskStatus status,
    TaskType taskType,
    LocalDateTime dateCreated,
    LocalDateTime dateUpdated,
    String url
) {            
}
