package com.bitprojectonl.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bitprojectonl.entity.PackageType;

@Repository
public interface PackageTypeDao extends JpaRepository<PackageType,Integer>{
    
}
