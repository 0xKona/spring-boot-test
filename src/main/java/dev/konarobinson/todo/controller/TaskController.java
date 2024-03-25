package dev.konarobinson.todo.controller;

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
import dev.konarobinson.todo.repository.TaskRepository;
@RestController
@RequestMapping("/api/tasks")
@CrossOrigin //default config
public class TaskController {

    private final TaskRepository repository;

    public TaskController(TaskRepository repository) {
        this.repository = repository;
    }

    @GetMapping("") // get request to /api/tasks
    public Iterable<TaskRecord> findAll() {
        return repository.findAll();
    }

    @SuppressWarnings("null")
    @GetMapping("/{id}") // Get Mapping is a get request to the class http, in this case /api/tasks/{id}
    public TaskRecord findById(@PathVariable Integer id) {
        return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Content not found!"));
    }

    @SuppressWarnings("null")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("") //post request to /api/content
    public void create(@RequestBody TaskRecord task) {
        repository.save(task);
    }

    @SuppressWarnings("null")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{id}") //Updates Task by Id in url
    public void update(@RequestBody TaskRecord task, @PathVariable Integer id) {
        if (repository.existsById(id)) {
            task.setId(id);
            repository.save(task);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found!");
        }
    }

    @SuppressWarnings("null")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}") //deletes Task by Id in url
    public void delete(@PathVariable Integer id) {
        repository.deleteById(id);
    }
    
}
