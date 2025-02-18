package com.todoapp.todo.app;

import java.time.LocalDate;

import jakarta.validation.constraints.Size;

public class Todo {
	
	public Todo(int id, String username, String description, LocalDate targetDate, boolean done) {
		super();
		this.id = id;
		this.username = username;
		this.description = description;
		this.done = done;
		this.targetDate = targetDate;
	}
	
	private int id;
	private String username;
	
	@Size(min=10, message="Enter at least 10 Characters...")
	private String description;
	
	private boolean done;
	private LocalDate targetDate;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public boolean isDone() {
		return done;
	}
	public void setDone(boolean done) {
		this.done = done;
	}
	public LocalDate getTargetDate() {
		return targetDate;
	}
	public void setTargetDate(LocalDate targetDate) {
		this.targetDate = targetDate;
	}
	
	
	@Override
	public String toString() {
		return "Todo [id=" + id + ", username=" + username + ", description=" + description + ", done=" + done
				+ ", targetDate=" + targetDate + "]";
	}
	
	
    
}
