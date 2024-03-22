package dev.konarobinson.todo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "tasks")
public class TaskRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @NotNull
    @Column(name = "title")
    @JsonProperty("title")
    private String title;
    
    @JsonProperty("description")
    @Column(name = "description")
    private String description;
    
    @JsonProperty("status")
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private TaskStatus status;
    
    @JsonProperty("taskType")
    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private TaskType taskType;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSSSS")
    @Column(name = "date_created")
    private LocalDateTime dateCreated;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSSSS")
    @Column(name = "date_updated")
    private LocalDateTime dateUpdated;

    @JsonProperty("url")
    @Column(name = "url")
    private String url;

    public TaskRecord() {
    }

}
