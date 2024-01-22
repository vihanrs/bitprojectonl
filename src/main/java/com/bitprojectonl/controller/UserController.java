package com.bitprojectonl.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.bitprojectonl.dao.UserDao;
import com.bitprojectonl.entity.User;

@RestController
@RequestMapping(value = "/user") // class level mapping
public class UserController {

	@Autowired // inject UserDao object into variable
	private UserDao userDao; // create userDao object
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private PrivilegeController privilegeController;

	// create get mapping for get user all data -- [/user/findall]
	@GetMapping(value = "/findall", produces = "application/json")
	public List<User> getAllData() {
		//get logged user authentication object
    	Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
    	
    	if(privilegeController.hasPrivilege(auth.getName(), "User", "select")) {
    		return userDao.findAll(Sort.by(Direction.DESC, "id"));
    	}else {
    		return null;
    	}
		
	}

	// create UI service [/user -- return user UI]
	@GetMapping
	public ModelAndView userUI() {
		//get logged user authentication object
		Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
		ModelAndView userView = new ModelAndView();
		userView.addObject("logusername",auth.getName());
		userView.addObject("title","User : BIT Project 2023");
		userView.setViewName("user.html");
		return userView;
	}

	// create post mapping for save user
	@PostMapping
	public String saveUser(@RequestBody User user) {
		//get logged user authentication object
    	Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
    	
    	if(!privilegeController.hasPrivilege(auth.getName(), "User", "insert")) {
    		return "Access Denied !!!";
    	}

		// check duplicate email,user name,employee
		User extUser = userDao.getUserByUserName(user.getUserName());
		if (extUser != null) {
			return "User Save Not Completed : username " + user.getUserName() + " allready ext! ";
		}

		extUser = userDao.getUserByEmail(user.getEmail());
		if (extUser != null) {
			return "User Save Not Completed : email " + user.getEmail() + " allready ext! ";
		}

		extUser = userDao.getUserByEmployee(user.getEmployeeId().getId());
		if (extUser != null) {
			return "User Save Not Completed : given employee allready ext! ";
		}

		try {
			// set added date time
			user.setAddedDateTime(LocalDateTime.now());
			user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
			userDao.save(user);
			return "OK";
		} catch (Exception e) {
			return "User Save Not Completed : " + e.getMessage();
		}
	}

	// create delete mapping for delete user account [/user]
	@DeleteMapping
	public String deleteUser(@RequestBody User user) {
		//get loged user authentication object
		Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
		    	
		if(!privilegeController.hasPrivilege(auth.getName(), "User", "delete")) {
		    return "Access Denied !!!";
		}

		// need to check given user ext or not
		User extUser = userDao.getReferenceById(user.getId());
		if (extUser == null) {
			return "User Delete Not Completed : Given User Not Ext..!";
		}

		try {
			user.setStatus(false); // change user status to inactive
			userDao.save(user);
			return "OK";
		} catch (Exception e) {
			return "User Delete Not Completed : " + e.getMessage();
		}
	}

	@PutMapping
	public String updateUser(@RequestBody User user) {
		// check logged user authentication and authorization
		//get loged user authentication object
		Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
    	
    	if(!privilegeController.hasPrivilege(auth.getName(), "User", "update")) {
    		return "Access Denied !!!";
    	}

		User extUser = userDao.getReferenceById(user.getId());
		if(extUser == null) {
			return "Update not completed : User not available";
		}
		
		// check duplicates
		User extCheckUser = userDao.getUserByUserName(user.getUserName());
		if(extCheckUser !=null && user.getId() != extCheckUser.getId()) {
			return "Update not completed : Username already ext...!";
		}
		
		extCheckUser = userDao.getUserByEmail(user.getEmail());
		if(extCheckUser !=null && user.getId() != extCheckUser.getId()) {
			return "Update not completed : Email already ext...!";
		}

		try {
			
			//if user can change the password 
			
//			if (!user.getPassword().equals("")) {
//				if (extUser.getPassword().equals(user.getPassword())) { //password matcher use for encrypted password
//					return "Update failed : Given password allready ext..!";
//				}else {
//					//encrypt new password
//				}
//			}else {
//				user.setPassword(extUser.getPassword());
//			}
			
			
			user.setPassword(extUser.getPassword());
			userDao.save(user);
			return "OK";
		} catch (Exception e) {
			return "User Update Not Completed : " + e.getMessage();
		}
	}

}
