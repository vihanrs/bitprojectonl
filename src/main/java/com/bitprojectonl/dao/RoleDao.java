package com.bitprojectonl.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bitprojectonl.entity.Role;

@Repository
public interface RoleDao extends JpaRepository<Role, Integer>{

}
