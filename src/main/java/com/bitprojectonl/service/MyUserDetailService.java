package com.bitprojectonl.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bitprojectonl.dao.UserDao;
import com.bitprojectonl.entity.Role;
import com.bitprojectonl.entity.User;

import jakarta.transaction.Transactional;

@Service
public class MyUserDetailService implements UserDetailsService{
	
	@Autowired
	private UserDao userDao;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		//get user by username  
		User extUser = userDao.getUserByUserName(username);
		
		Set<GrantedAuthority> userRoles = new HashSet<GrantedAuthority>();
		
		//get role list from user
		for(Role role : extUser.getRoles()) {
			userRoles.add(new SimpleGrantedAuthority(role.getName()));
		}
		
		ArrayList<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>(userRoles);
		
		UserDetails user =  new org.springframework.security.core.userdetails.User(extUser.getUserName(),extUser.getPassword(),extUser.getStatus(),true,true,true,grantedAuthorities);
		
		return user;
	}

}
