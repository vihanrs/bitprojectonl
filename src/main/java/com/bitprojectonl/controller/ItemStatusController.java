package com.bitprojectonl.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitprojectonl.dao.ItemStatusDao;
import com.bitprojectonl.entity.ItemStatus;

@RestController
public class ItemStatusController {

	@Autowired  //inject object into variable
	private ItemStatusDao itemStatusDao;  //create  object
	
	//get service mapping for get all item status data
	@GetMapping(value = "/itemstatus/list", produces = "application/json")
	public List<ItemStatus> getAllData(){
		return itemStatusDao.findAll();
	}
}
