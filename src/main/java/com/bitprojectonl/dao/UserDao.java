package com.bitprojectonl.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bitprojectonl.entity.User;
@Repository
public interface UserDao extends JpaRepository<User, Integer>{

	//create query for get user by given user name
	@Query(value = "Select u from User u where u.userName = ?1")
	public User getUserByUserName(String userName);
	
	//create query for get user by given email
	@Query(value = "Select u from User u where u.email = ?1")
	public User getUserByEmail(String email);
	
	//create query for get user by given employee
	@Query(value = "select u from User u where u.employeeId.id = ?1")
	public User getUserByEmployee(Integer id);
}
