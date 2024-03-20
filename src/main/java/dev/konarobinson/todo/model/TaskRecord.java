package dev.konarobinson.todo.model;

import java.time.LocalDateTime;

public record TaskRecord(
    Integer id,
    String title,
    String desc,
    TaskStatus status,
    TaskType contentType,
    LocalDateTime dateCreated,
    LocalDateTime dateUpdated,
    String url
    ) {    
        
}
