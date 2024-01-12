package com.bitprojectonl.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.bitprojectonl.dao.EmployeeDao;
import com.bitprojectonl.dao.EmployeeStatusDao;
import com.bitprojectonl.dao.UserDao;
import com.bitprojectonl.entity.Employee;
import com.bitprojectonl.entity.User;

import jakarta.transaction.Transactional;

@RestController
public class EmployeeController {

	//create employeedao object
	@Autowired
	private EmployeeDao employeeDao;  // Dependency injection :EmployeeDao is an interface so it cannot create instance then use dependency injection

	@Autowired
	private UserDao userDao;
	// public EmployeeController(EmployeeDao employeeDao){
	// this.employeeDao = employeeDao;
	// }
	
	//create employeestatusdao object
	@Autowired
	private EmployeeStatusDao employeeStatusDao;
	
	@Autowired
	private PrivilegeController privilegeController;

	// create ui service [/employee -- return empolyee ui]
	@RequestMapping(value = "/employee")
	public ModelAndView employeeUI() {
		//get loged user authentication object
		Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
				
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("logusername",auth.getName());
		modelAndView.addObject("title","Employee : BIT Project 2023");
		// set object when loading
		// modelAndView.addObject("employee", employeeObj);
		modelAndView.setViewName("employee.html");
		return modelAndView;
	}

	//create get mapping for get employee list without user account
	@GetMapping(value = "/employee/listwithoutuseraccount", produces = "application/json")
	public List<Employee> getEmployeeListWithoutUserAcoount(){
		return employeeDao.getEmployeeListWithoutUserAcoount();
	}
	
	// create get mapping for get employee all data -- [/employee/findall]
	@GetMapping(value = "/employee/findall", produces = "application/json")
	public List<Employee> findAll() {
		// login user authentication and authorization
		return employeeDao.findAll(Sort.by(Direction.DESC,"id"));
	}

	// create post mapping for save employee record
	@PostMapping(value = "/employee")
	public String save(@RequestBody Employee employee) {
		try {
			//check unique value
			Employee extEmployeeMobileNo = employeeDao.getEmployeeByMobile(employee.getMobile());
			if(extEmployeeMobileNo != null) {
				return "Save not Completed : Mobile No Alrady Exist";
			}
			
			Employee extEmployeeNIC = employeeDao.getEmployeeByNic(employee.getNic());
			if(extEmployeeNIC != null) {
				return "Save not Completed : NIC Alrady Exist";
			}
			
			Employee extEmployeeEmail = employeeDao.findByEmailEquals(employee.getEmail());
			if(extEmployeeEmail != null) {
				return "Save not Completed : Email Alrady Exist";
			}
			
			
			employee.setAddedDateTime(LocalDateTime.now()); // set current datetime
			
			String nextEmpNo = "00000001";
			if(employeeDao.getNextEmpNo() != null && employeeDao.getNextEmpNo() != "") {
				nextEmpNo = employeeDao.getNextEmpNo();
			}
			
			employee.setEmpNo(nextEmpNo);// auto generated EMP no
			
			System.out.println("Designation ID " + employee.getDesignationId());
//			employee.setDesignationId(new Designation(1, "Manager"));

			employeeDao.save(employee);
			return nextEmpNo;
		}catch (Exception e) {
			return "Save not Completed: " + e.getMessage();
		}
	}
	
	// create server mapping for delete employee
	@Transactional //manage the transaction commits
	@DeleteMapping(value = "/employee")
	public String delete(@RequestBody Employee employee) {
		//get loged user authentication object
    	Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
    	
		if(!privilegeController.hasPrivilege(auth.getName(), "Employee", "delete")) {
			return "Access Denied !!!";
		}
		
		try {
			//check database before delete
			Employee extEmp = employeeDao.getReferenceById(employee.getId());
			if(extEmp == null) {
				return "Delete Not Completed : Employee not exist...!";
			}
			
//			Hard Delete
//			employeeDao.delete(employee);
//			employeeDao.delete(employeeDao.getReferenceById(employee.getId()));
			
//			Soft Delete - Change the Status
			extEmp.setEmployeeStatusId(employeeStatusDao.getReferenceById(3));
			extEmp.setDeleteDateTime(LocalDateTime.now());
			employeeDao.save(extEmp);
			
			//set status in-active user account related to employee
			User extUser = userDao.getUserByEmployee(extEmp.getId());
			if(extUser != null) {
				extUser.setStatus(false);
				userDao.save(extUser);
			}
			
			return "OK";
		} catch (Exception e) {
			return "Delete not Completed: " + e.getMessage();
		}
	}

	// create mapping for update employee
	@PutMapping(value = "/employee")
	@Transactional
	public String update(@RequestBody Employee employee) {
		
		//needs to check duplicate records
		Employee extEmployee = employeeDao.getReferenceById(employee.getId());
		if(extEmployee != null) {
			return "Update not Completed: Employee not existing...!";
		}
		
		Employee extEmployeeMobile = employeeDao.getEmployeeByMobile(employee.getMobile());
		if(extEmployeeMobile != null && extEmployeeMobile.getId() != employee.getId()) {
			return "Update not Completed: Mobile no Already Existing...!";
		}
		
		Employee extEmployeeNic = employeeDao.getEmployeeByNic(employee.getNic());
		if(extEmployeeNic != null && extEmployeeNic.getId() != employee.getId()) {
			return "Update not Completed: NIC Already Existing...!";
		}
		try {
			employee.setLastModifyDateTime(LocalDateTime.now());
			employeeDao.save(employee);
			
			//check employee status and user status
			if(employee.getEmployeeStatusId().getName().equals("Resign") || employee.getEmployeeStatusId().getName().equals("Delete") ){
				User extUser = userDao.getUserByEmployee(employee.getId());
				if(extUser != null) {
					extUser.setStatus(false);
					userDao.save(extUser);
				}
			}
			
			return "OK";
		} catch (Exception e) {
			return "Update not Completed : "+e.getMessage();
		}
	}
}
