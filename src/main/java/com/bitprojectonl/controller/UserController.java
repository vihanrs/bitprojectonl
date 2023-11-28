package com.bitprojectonl.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.bitprojectonl.dao.UserDao;
import com.bitprojectonl.entity.User;

@RestController
@RequestMapping(value = "/user") //class level mapping
public class UserController {
	
	@Autowired
	private UserDao userDao;
	
	@GetMapping(value = "/findall",produces = "application/json")
	public List<User> getAllData(){
		return userDao.findAll(Sort.by(Direction.DESC,"id"));
	}

	@GetMapping
	public ModelAndView userUI() {
		ModelAndView userView = new ModelAndView();
		userView.setViewName("user.html");
		return userView;
	}
}
