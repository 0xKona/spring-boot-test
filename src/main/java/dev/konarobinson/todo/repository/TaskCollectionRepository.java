package dev.konarobinson.todo.repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import dev.konarobinson.todo.model.TaskRecord;
import dev.konarobinson.todo.model.TaskStatus;
import dev.konarobinson.todo.model.TaskType;
import jakarta.annotation.PostConstruct;

@Repository
public class TaskCollectionRepository {

    private final List<TaskRecord> contentList = new ArrayList<>();

    public TaskCollectionRepository() {
    }

    public List<TaskRecord> findAll() {
        return contentList;
    }

    public Optional<TaskRecord> findById(Integer id) {
        return contentList.stream().filter(c -> c.id().equals(id)).findFirst();
    }

    
    public void save(TaskRecord content) {
        contentList.add(content);
    }
    
    @PostConstruct
    private void init() {
        TaskRecord content = new TaskRecord(
            1, 
            "Test Task 1",
            "Decription for Test Task 1",
            TaskStatus.TO_DO,
            TaskType.FEATURE,
            LocalDateTime.now(),
            null,
            ""
        );

        contentList.add(content);
    }
}
