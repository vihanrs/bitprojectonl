package com.bitprojectonl.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.bitprojectonl.dao.BrandDao;
import com.bitprojectonl.entity.Brand;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class BrandController {

    @Autowired
    private BrandDao brandDao;

    @GetMapping(value = "/brand/list",produces = "application/json")
    public List<Brand> getAllData() {
        return brandDao.findAll();
    }
    
    
    
}
