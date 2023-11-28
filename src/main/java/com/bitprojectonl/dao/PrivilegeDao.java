package com.bitprojectonl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrivilegeDao extends JpaRepository<Privilege,Integer>{
    
}
