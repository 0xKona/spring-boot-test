package dev.konarobinson.todo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import dev.konarobinson.todo.model.TaskRecord;
import dev.konarobinson.todo.repository.TaskCollectionRepository;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskCollectionRepository repository;

    public TaskController(TaskCollectionRepository repository) {
        this.repository = repository;
    }

    //make a request and find all the pieces of content in the system

    @GetMapping("") // get request to /api/content
    public List<TaskRecord> findAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}") // Get Mapping is a get request to the class http, in this case /api/content/{id}
    public TaskRecord findById(@PathVariable Integer id) {
        return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Content not found!"));
    }

    @PostMapping("") //post request to /api/content
    public void create(@RequestBody TaskRecord content) {
        repository.save(content);
    }

    
}
