package com.backend.todo.basic.auth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@CrossOrigin(origins="http://localhost:4200")
public class BasicAuthenticationController {

	@GetMapping("/basicauth")
	public AuthenticationBean authenticated() {
		return new AuthenticationBean("You are Authenticated");
	}
}
