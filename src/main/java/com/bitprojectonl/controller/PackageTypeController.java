package com.bitprojectonl.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.bitprojectonl.dao.PackageTypeDao;
import com.bitprojectonl.entity.PackageType;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class PackageTypeController {

    @Autowired
    private PackageTypeDao packageTypeDao;

    @GetMapping(value = "/packagetype/list",produces = "application/json")
    public List<PackageType> getAllData() {
        return packageTypeDao.findAll();
    }
    
    
}
