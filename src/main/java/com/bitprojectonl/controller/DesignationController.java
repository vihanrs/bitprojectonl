package com.bitprojectonl.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitprojectonl.dao.DesignationDao;
import com.bitprojectonl.entity.Designation;

@RestController
public class DesignationController {

	@Autowired  //inject DesignationDao object into variable
	private DesignationDao designationDao;  //create designationDao object
	
	@GetMapping(value = "/designation/findall", produces = "application/json")
	public List<Designation> getAllData(){
		return designationDao.findAll();
	}
}
