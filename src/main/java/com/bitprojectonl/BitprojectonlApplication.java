package com.bitprojectonl;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.bitprojectonl.dao.EmployeeDao;
import com.bitprojectonl.dao.RoleDao;
import com.bitprojectonl.dao.UserDao;
import com.bitprojectonl.entity.Role;
import com.bitprojectonl.entity.User;

@SpringBootApplication
@RestController  // to add mappings from this class to servlet container
public class BitprojectonlApplication {
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private EmployeeDao employeeDao;
	
	@Autowired
	private RoleDao roleDao;
	
	@Autowired
	private UserDao userDao;

	public static void main(String[] args) {
		SpringApplication.run(BitprojectonlApplication.class, args);

		System.out.println("Hello World");
	}

	@RequestMapping(path = "/test")
	public String testRequest(){
		return "Wellcome!";
	}

	@RequestMapping(path = "/testUI")
	public ModelAndView testUI(){
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("test.html");
		return modelAndView;
	}
	
	@GetMapping(value = "/createadmin")
	public String generateAdmin() {
		User adminUser = new User();
		adminUser.setUserName("Admin");
		adminUser.setPassword(bCryptPasswordEncoder.encode("12345"));
		adminUser.setEmail("admin@gmail.com");
		adminUser.setStatus(true);
		adminUser.setAddedDateTime(LocalDateTime.now());
		adminUser.setEmployeeId(employeeDao.getReferenceById(1));
		
		Set<Role> roles = new HashSet<Role>(); 
		roles.add(roleDao.getReferenceById(1));
		
		adminUser.setRoles(roles);
		
		userDao.save(adminUser);
		
		return "<script> window.location.replace('http://localhost:8080/login');</script>";
	}

}
