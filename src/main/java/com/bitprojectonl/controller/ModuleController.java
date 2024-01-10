package com.bitprojectonl.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bitprojectonl.dao.ModuleDao;
import com.bitprojectonl.entity.Module;

@RestController
public class ModuleController {

	@Autowired  //inject DesignationDao object into variable
	private ModuleDao moduleDao;  //create designationDao object
	
	@GetMapping(value = "/module/findall", produces = "application/json")
	public List<Module> getAllModules(){
		return moduleDao.findAll();
	}
	
	//get mapping for get module date by given role id - [/module/listbyrole?roleid=1]
	@GetMapping(value = "/module/listbyrole", params = {"roleid"})
	public List<Module> getModulesByRole(@RequestParam("roleid") Integer roleId){
		return moduleDao.getModuleByRole(roleId);
	}
	
}
