package com.bitprojectonl.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
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
    	ModelAndView privilegeView = new ModelAndView();
    	privilegeView.setViewName("privilege.html");
    	return privilegeView;
    }
    
    //get service mapping for get all designations
    @GetMapping(value = "/findall", produces = "application/json")
    public List<Privilege> findAll() {
        return privilegeDao.findAll(Sort.by(Direction.DESC,"id"));
    }

}
