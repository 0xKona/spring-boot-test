package dev.konarobinson.todo.repository;

import org.springframework.data.repository.CrudRepository;

import dev.konarobinson.todo.model.TaskRecord;

public interface TaskRepository extends CrudRepository<TaskRecord, Integer>{

}
