package com.bitprojectonl.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bitprojectonl.entity.ItemStatus;

public interface ItemStatusDao extends JpaRepository<ItemStatus, Integer>{

}
