package com.bitprojectonl.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitprojectonl.dao.UnitTypeDao;
import com.bitprojectonl.entity.UnitType;


@RestController
public class UnitTypeController {

    @Autowired
    private UnitTypeDao unitTypeDao;

    @GetMapping(value = "/unittype/list",produces = "application/json")
    public List<UnitType> getAllData() {
        return unitTypeDao.findAll();
    }
    
    
}
