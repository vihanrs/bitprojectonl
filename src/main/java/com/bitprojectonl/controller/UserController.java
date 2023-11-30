package com.bitprojectonl.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.bitprojectonl.dao.UserDao;
import com.bitprojectonl.entity.User;

@RestController
@RequestMapping(value = "/user") //class level mapping
public class UserController {
	
	@Autowired //inject UserDao object into variable
	private UserDao userDao; //create userDao object
	
	// create get mapping for get user all data -- [/user/findall]
	@GetMapping(value = "/findall",produces = "application/json")
	public List<User> getAllData(){
		return userDao.findAll(Sort.by(Direction.DESC,"id"));
	}

	// create UI service [/user -- return user UI]
	@GetMapping
	public ModelAndView userUI() {
		ModelAndView userView = new ModelAndView();
		userView.setViewName("user.html");
		return userView;
	}
	
	//create post mapping for save user
	@PostMapping
	public String saveUser(@RequestBody User user) {
		
		//check duplicate email,user name,employee
		try {
			//set added date time
			user.setAddedDateTime(LocalDateTime.now());
			userDao.save(user);
			return "OK";
		} catch (Exception e) {
			return "User Save Not Completed : "+e.getMessage();
		}
	}
	
	
}
