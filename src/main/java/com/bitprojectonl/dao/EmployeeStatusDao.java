package com.bitprojectonl.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bitprojectonl.entity.EmployeeStatus;

public interface EmployeeStatusDao extends JpaRepository<EmployeeStatus, Integer>{

}
