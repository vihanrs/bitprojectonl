package com.bitprojectonl.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.bitprojectonl.entity.Item;

@Repository
public interface ItemDao extends JpaRepository<Item, Integer>{

    // define query for get item with selected columns
    @Query(value = "select new Item(i.id,i.itemcode,i.itemname,i.salesprice,i.purchaseprice,i.itemstatus_id) from Item i order by i.id desc")
    public List<Item> findAll();
}
