package com.bitprojectonl.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.bitprojectonl.dao.PrivilegeDao;
import com.bitprojectonl.entity.Privilege;

@RestController
@RequestMapping(value = "/privilege")
public class PrivilegeController {
    @Autowired
    private PrivilegeDao privilegeDao;

    //get mapping for generate privilege UI
    @GetMapping()
    public ModelAndView getPrivilegeUI() {
    	//get loged user authentication object
    	Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
    	
    	ModelAndView privilegeView = new ModelAndView();
    	privilegeView.addObject("title","Privilege : BIT Project 2023");
    	privilegeView.addObject("logusername",auth.getName());
    	privilegeView.setViewName("privilege.html");
    	return privilegeView;
    }
    
    //get service mapping for get all designations
    @GetMapping(value = "/findall", produces = "application/json")
    public List<Privilege> findAll() {
        return privilegeDao.findAll(Sort.by(Direction.DESC,"id"));
    }
    
    public HashMap<String,Boolean> getPrivilegeByUserAndModule(String username,String module){
    	HashMap<String, Boolean> userPrivilege = new HashMap<String,Boolean>();
    	
    	if(username.equals("Admin")){
    		userPrivilege.put("select", true);
    		userPrivilege.put("insert", true);
    		userPrivilege.put("update", true);
    		userPrivilege.put("delete", true);
    	}else {
    		String userPrivileges = privilegeDao.getPrivilegeByUserAndModule(username, module);
    		String[] privileges = userPrivileges.split(",");
    		userPrivilege.put("select", privileges[0].equals("1"));
    		userPrivilege.put("insert", privileges[1].equals("1"));
    		userPrivilege.put("update", privileges[2].equals("1"));
    		userPrivilege.put("delete", privileges[3].equals("1"));
    	}
    	
    	return userPrivilege;
    }
    
    public Boolean hasPrivilege(String username,String module,String operation) {
    	HashMap<String, Boolean> logedUserPrivileges = getPrivilegeByUserAndModule(username, module);
    	return logedUserPrivileges.get(operation); 
    }

}
