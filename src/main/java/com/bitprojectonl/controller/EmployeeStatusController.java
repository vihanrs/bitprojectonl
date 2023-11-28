package com.bitprojectonl.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitprojectonl.dao.EmployeeStatusDao;
import com.bitprojectonl.entity.EmployeeStatus;

@RestController
public class EmployeeStatusController {

	@Autowired  //inject DesignationDao object into variable
	private EmployeeStatusDao employeeStatusDao;  //create designationDao object
	
	//get service mapping for get all employee status data
	@GetMapping(value = "/employeestatus/findall", produces = "application/json")
	public List<EmployeeStatus> getAllData(){
		return employeeStatusDao.findAll();
	}
}
