package com.bitprojectonl.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitprojectonl.dao.RoleDao;
import com.bitprojectonl.entity.Role;

@RestController
public class RoleController {

	@Autowired  //inject DesignationDao object into variable
	private RoleDao roleDao;  //create designationDao object
	
	@GetMapping(value = "/role/findall", produces = "application/json")
	public List<Role> getAllRoles(){
		return roleDao.findAll();
	}
}
