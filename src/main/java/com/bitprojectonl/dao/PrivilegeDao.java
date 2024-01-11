package com.bitprojectonl.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bitprojectonl.entity.Privilege;

@Repository
public interface PrivilegeDao extends JpaRepository<Privilege,Integer>{
	
	//create query for get privilege by username and module name
	@Query(value = "SELECT bit_or(p.sel) as sel, bit_or(p.inst) as inst, bit_or(p.upd) as upd, bit_or(p.del) as del FROM bitproject23onl.privilege as p WHERE p.role_id in (SELECT uhr.role_id FROM bitproject23onl.user_has_role as uhr WHERE uhr.user_id = (SELECT u.id FROM bitproject23onl.user as u WHERE u.username = ?1)) AND p.module_id = (SELECT m.id FROM bitproject23onl.module as m WHERE m.name = ?2);", nativeQuery = true)
	public String getPrivilegeByUserAndModule(String username,String module);
    
}
