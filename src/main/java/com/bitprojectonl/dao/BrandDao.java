package com.bitprojectonl.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bitprojectonl.entity.Brand;

@Repository
public interface BrandDao extends JpaRepository<Brand,Integer>{
    
}
