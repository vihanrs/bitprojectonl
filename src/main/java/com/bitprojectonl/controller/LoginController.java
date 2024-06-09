package com.bitprojectonl.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

	@GetMapping(value = "/dashboard")
	public ModelAndView indexUI() {
		
		//get loged user authentication object
		Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
		
		ModelAndView indexView = new ModelAndView();
		indexView.addObject("logusername",auth.getName());
		indexView.addObject("title","Dashboard : BIT Project 2023");
		indexView.setViewName("index.html");
		return indexView;
	}
}
