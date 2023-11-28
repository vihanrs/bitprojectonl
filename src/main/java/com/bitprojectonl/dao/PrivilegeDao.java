package com.bitprojectonl.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bitprojectonl.entity.Privilege;

@Repository
public interface PrivilegeDao extends JpaRepository<Privilege,Integer>{
    
}
