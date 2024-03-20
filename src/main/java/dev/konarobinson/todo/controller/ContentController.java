package dev.konarobinson.todo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import dev.konarobinson.todo.model.Content;
import dev.konarobinson.todo.repository.ContentCollectionRepository;

@RestController
@RequestMapping("/api/content")
public class ContentController {

    private final ContentCollectionRepository repository;

    public ContentController(ContentCollectionRepository repository) {
        this.repository = repository;
    }

    //make a request and find all the pieces of content in the system

    @GetMapping("") // get request to /api/content
    public List<Content> findAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}") // Get Mapping is a get request to the class http, in this case /api/content/{id}
    public Content findById(@PathVariable Integer id) {
        return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Content not found!"));
    }

    @PostMapping("") //post request to /api/content
    public void create(Content content) {
        repository.save(content);
    }
}
