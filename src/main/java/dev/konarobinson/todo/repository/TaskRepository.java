package dev.konarobinson.todo.repository;

import org.springframework.data.repository.ListCrudRepository;

import dev.konarobinson.todo.model.TaskRecord;

public interface TaskRepository extends ListCrudRepository<TaskRecord, Integer>{

}
