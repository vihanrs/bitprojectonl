package com.bitprojectonl.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class LoginController {

	@GetMapping(value = "/login")
	public ModelAndView loginUI() {
		ModelAndView loginView = new ModelAndView();
		loginView.setViewName("login.html");
		return loginView;
	}
	
	@GetMapping(value = "/error")
	public ModelAndView errorUI() {
		ModelAndView errornView = new ModelAndView();
		errornView.setViewName("error.html");
		return errornView;
	}
	
	@GetMapping(value = "/index")
	public ModelAndView indexUI() {
		ModelAndView indexView = new ModelAndView();
		indexView.setViewName("index.html");
		return indexView;
	}
}
