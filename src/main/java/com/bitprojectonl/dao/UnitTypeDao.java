package com.bitprojectonl.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bitprojectonl.entity.UnitType;

@Repository
public interface UnitTypeDao extends JpaRepository<UnitType,Integer>{
    
}
