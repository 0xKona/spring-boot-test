package dev.konarobinson.todo.model;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;

public record TaskRecord(
    Integer id, 
    @NotBlank
    String title, 
    String desc,
    TaskStatus status,
    TaskType taskType,
    LocalDateTime dateCreated,
    LocalDateTime dateUpdated,
    String url
    ) {    
        
}
