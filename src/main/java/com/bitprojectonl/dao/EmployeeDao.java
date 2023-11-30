package com.bitprojectonl.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bitprojectonl.entity.Employee;

@Repository
public interface EmployeeDao extends JpaRepository<Employee,Integer>{
    
	//define query for get next employee number
	@Query(value = "Select lpad(max(e.empno)+1,8,0) as empno FROM employee as e",nativeQuery = true)
	public String getNextEmpNo();
	
	
	//define query for get employee by given mobile no
	@Query(value = "Select e FROM Employee e WHERE e.mobile=?1")
	public Employee getEmployeeByMobile(String mobile);
	
	//define query for get employee by given nic
	@Query(value = "Select e FROM Employee e WHERE e.nic=:nic")
	public Employee getEmployeeByNic(@Param("nic") String nic);
	
	//define query for get employee by given email
	public Employee findByEmailEquals(String email);
	
	//define query for get Employee List without user account
	@Query(value = "Select e from Employee e where e.id not in (select u.employeeId from User u)")
	public List<Employee> getEmployeeListWithoutUserAcoount();
}
