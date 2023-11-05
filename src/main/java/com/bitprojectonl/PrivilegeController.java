package com.bitprojectonl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PrivilegeController {
    @Autowired
    private PrivilegeDao privilegeDao;

    @GetMapping(value = "/privilege/findall", produces = "application/json")
    public List<Privilege> findAll() {
        return privilegeDao.findAll();
    }

}
