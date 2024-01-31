package com.bitprojectonl.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bitprojectonl.entity.Category;

@Repository
public interface CategoryDao extends JpaRepository<Category,Integer>{
    
    @Query(value = "select c from Category c where c.id in (select bhc.category_id.id from BrandHasCategory bhc where bhc.brand_id.id=?1)")
    public List<Category> findAllByBrand(Integer brandId);
}
