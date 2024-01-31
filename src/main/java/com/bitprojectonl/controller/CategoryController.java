package com.bitprojectonl.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.bitprojectonl.dao.CategoryDao;
import com.bitprojectonl.entity.Brand;
import com.bitprojectonl.entity.Category;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
public class CategoryController {

    @Autowired
    private CategoryDao categoryDao;

    @GetMapping(value = "/category/list",produces = "application/json")
    public List<Category> getAllData() {
        return categoryDao.findAll();
    }
    
    @GetMapping(value = "/category/listbybrand/{brandid}",produces = "application/json")
    public List<Category> getAllDataByBrand(@PathVariable("brandid") Integer brandId) {
        return categoryDao.findAllByBrand(brandId);
    }
    
}
