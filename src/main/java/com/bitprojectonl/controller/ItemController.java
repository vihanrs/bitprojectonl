package com.bitprojectonl.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitprojectonl.dao.ItemDao;
import com.bitprojectonl.entity.Item;

import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping(value = "/item")
public class ItemController {

	@Autowired  //inject DesignationDao object into variable
	private ItemDao itemDao;  //create designationDao object

	@Autowired
	private PrivilegeController privilegeController;
	
	@GetMapping(value = "/findall", produces = "application/json")
	public List<Item> getAllData(){

		//get logged user authentication object
    	Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
    	
    	if(privilegeController.hasPrivilege(auth.getName(), "Item", "select")) {
    		return itemDao.findAll();
    	}else {
    		return null;
    	}
	}
}
