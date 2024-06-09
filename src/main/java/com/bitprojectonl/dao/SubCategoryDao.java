package com.bitprojectonl.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bitprojectonl.entity.SubCategory;

@Repository
public interface SubCategoryDao extends JpaRepository<SubCategory,Integer>{
    
    //create query for get sub category by given category id
    @Query(value = "select subc from SubCategory subc where subc.category_id.id=?1")
    public List<SubCategory> findByCategoryId(Integer categoryId);
}
