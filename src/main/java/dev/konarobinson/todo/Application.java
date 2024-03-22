package dev.konarobinson.todo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import dev.konarobinson.todo.model.TaskRecord;
import dev.konarobinson.todo.model.TaskStatus;
import dev.konarobinson.todo.model.TaskType;

@SpringBootApplication
@EnableJpaRepositories(basePackages = {"dev.konarobinson.todo.repository"})
@EntityScan(basePackages = {"dev.konarobinson.todo.model"})
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);

		// TaskRecord example = new TaskRecord(1, "Hello", "Heloo desc", TaskStatus.TO_DO, TaskType.FEATURE, null, null, "");
		// System.out.println(example.toString());
	}

}
