package com.todoapp.todo.app;

import java.time.LocalDate;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import jakarta.validation.Valid;

@Controller
@SessionAttributes("name")
public class TodoController {
	//list-todos
	private TodoService todoService;
	
	public TodoController(TodoService todoService) {
		super();
		this.todoService = todoService;
	}

	@RequestMapping("list-todos")
	public String showTodos(ModelMap model) {
		String username = getLoggedInUsername(model);
		List<Todo> todos = todoService.findByUsername(username);
		model.put("todos", todos);
		return "listTodos";
	}

	@GetMapping("add-todo")
	public String showNewTodoPage(ModelMap model) {
		String username = getLoggedInUsername(model);
		Todo todo = new Todo(0,username,"", LocalDate.now().plusYears(1), false);
		model.put("todo", todo);
		return "todo";
	}
	
	@PostMapping("add-todo")
	public String addNewTodo(ModelMap model, @Valid Todo todo, BindingResult result) {
		if (result.hasErrors()) {
			return "todo";
		}
		
		String username = getLoggedInUsername(model);
		todoService.addTodo(username,todo.getDescription(), todo.getTargetDate(), false);
		return "redirect:list-todos";
	}
	
	@RequestMapping("delete-todo")
	public String deleteTodo(@RequestParam int id) {
		todoService.deleteById(id);
		return "redirect:list-todos";
	}
	
	@GetMapping("update-todo")
	public String showUpdateTodoPage(@RequestParam int id, ModelMap model) {
		Todo todo = todoService.findById(id);
		model.addAttribute("todo", todo);
		return "todo";
	}
	
	@PostMapping("update-todo")
	public String updateTodo(ModelMap model, @Valid Todo todo, BindingResult result) {
		if (result.hasErrors()) {
			return "todo";
		}
		
		String username = getLoggedInUsername(model);
		todo.setUsername(username);
		todoService.updateTodo(todo);
		return "redirect:list-todos";
	}
	
	private String getLoggedInUsername(ModelMap model) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return authentication.getName();
	}
	
	
    
}
