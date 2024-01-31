package com.bitprojectonl.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.bitprojectonl.dao.SubCategoryDao;
import com.bitprojectonl.entity.SubCategory;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class SubCategoryController {

    @Autowired
    private SubCategoryDao subCategoryDao;

    @GetMapping(value = "/subcategory/list",produces = "application/json")
    public List<SubCategory> getAllData() {
        return subCategoryDao.findAll();
    }

    //define mapping for get subcaregory by given category id
    @GetMapping(value = "/subcategory/listbycategory",params = {"categoryId"},produces = "application/json")
    public List<SubCategory> getAllDataByCategory(@RequestParam("categoryId") Integer categoryId) {
        return subCategoryDao.findByCategoryId(categoryId);
    }
    
    
}
