package com.bitprojectonl.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitprojectonl.dao.PrivilegeDao;
import com.bitprojectonl.entity.Privilege;

@RestController
public class PrivilegeController {
    @Autowired
    private PrivilegeDao privilegeDao;

    //get service mapping for get all designations
    @GetMapping(value = "/privilege/findall", produces = "application/json")
    public List<Privilege> findAll() {
        return privilegeDao.findAll();
    }

}
