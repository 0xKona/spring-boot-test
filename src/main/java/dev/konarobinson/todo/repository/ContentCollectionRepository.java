package dev.konarobinson.todo.repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import dev.konarobinson.todo.model.Content;
import dev.konarobinson.todo.model.Status;
import dev.konarobinson.todo.model.Type;
import jakarta.annotation.PostConstruct;

@Repository
public class ContentCollectionRepository {

    private final List<Content> contentList = new ArrayList<>();

    public ContentCollectionRepository() {
    }

    public List<Content> findAll() {
        return contentList;
    }

    public Optional<Content> findById(Integer id) {
        return contentList.stream().filter(c -> c.id().equals(id)).findFirst();
    }

    
    public void save(Content content) {
        contentList.add(content);
    }
    
    @PostConstruct
    private void init() {
        Content content = new Content(
            1, 
            "Test Task 1",
            "Decription for Test Task 1",
            Status.TO_DO,
            Type.FEATURE,
            LocalDateTime.now(),
            null,
            ""
        );

        contentList.add(content);
    }
}
