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
    
    @JsonProperty("date_created")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "date_created")
    private LocalDateTime date_created;

    @JsonProperty("date_updated")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "date_updated")
    private LocalDateTime date_updated;

    public TaskRecord() {
    }

    // Getters and setters (These allow you to update and delete tasks once set by getting id of individual tasks)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

}
