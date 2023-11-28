package com.bitprojectonl.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bitprojectonl.entity.User;
@Repository
public interface UserDao extends JpaRepository<User, Integer>{

}
