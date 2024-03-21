package dev.konarobinson.todo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import dev.konarobinson.todo.model.TaskRecord;
import dev.konarobinson.todo.repository.TaskCollectionRepository;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin //default config
public class TaskController {

    private final TaskCollectionRepository repository;

    public TaskController(TaskCollectionRepository repository) {
        this.repository = repository;
    }

    @GetMapping("") // get request to /api/content
    public List<TaskRecord> findAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}") // Get Mapping is a get request to the class http, in this case /api/content/{id}
    public TaskRecord findById(@PathVariable Integer id) {
        return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Content not found!"));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("") //post request to /api/content
    public void create(@Valid @RequestBody TaskRecord content) {
        repository.save(content);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{id}") //Updates Task by Id in url
    public void update(@RequestBody TaskRecord content, @PathVariable Integer id) {
        if (repository.existsById(id)) {
            repository.save(content);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Content not found!");
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}") //deletes Task by Id in url
    public void delete(@PathVariable Integer id) {
        repository.delete(id);
    }
    
}
