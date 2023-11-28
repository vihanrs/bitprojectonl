package com.bitprojectonl.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.bitprojectonl.entity.Designation;

@Repository
public interface DesignationDao extends JpaRepository<Designation, Integer>{

}
