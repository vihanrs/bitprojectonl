package com.bitprojectonl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController {
    
    @Autowired
    private EmployeeDao employeeDao;

    // public EmployeeController(EmployeeDao employeeDao){
    //     this.employeeDao = employeeDao;
    // }

    //create get mapping for get employee all data -- [/employee/findall]
    @GetMapping(value = "/employee/findall" , produces = "application/json")
    public List<Employee> findAll(){
        //login user authentication and authorization
        return employeeDao.findAll();
    }
}
