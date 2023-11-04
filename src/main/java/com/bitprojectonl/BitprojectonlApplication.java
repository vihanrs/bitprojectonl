package com.bitprojectonl;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@SpringBootApplication
@RestController  // to add mappings from this class to servlet container
public class BitprojectonlApplication {

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

}
