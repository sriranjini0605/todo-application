package com.todoapp.todo.login;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


@Controller
@SessionAttributes("name")
public class welcomeController {
	
	///login => com.in28minutes.springboot.myfirstwebapp.login.LoginController => login.jsp
	@RequestMapping(value ="/", method = RequestMethod.GET)
	public String goToWelcomePage(ModelMap model) {
		model.put("name", getLoggedInUserName());
		return "welcome";
	}
	
	private String getLoggedInUserName() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return authentication.getName();
	}
	
}
