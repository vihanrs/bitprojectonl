package com.bitprojectonl.controller;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
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
import com.bitprojectonl.entity.Designation;
import com.bitprojectonl.entity.Employee;

@RestController
public class EmployeeController {

	//create employeedao object
	@Autowired
	private EmployeeDao employeeDao;  // Dependency injection :EmployeeDao is an interface so it cannot create instance then use dependency injection

	// public EmployeeController(EmployeeDao employeeDao){
	// this.employeeDao = employeeDao;
	// }
	
	//create employeestatusdao object
	@Autowired
	private EmployeeStatusDao employeeStatusDao;

	// create ui service [/employee -- return empolyee ui]
	@RequestMapping(value = "/employee")
	public ModelAndView employeeUI() {
		ModelAndView modelAndView = new ModelAndView();
		// set object when loading
		// modelAndView.addObject("employee", employeeObj);
		modelAndView.setViewName("employee.html");
		return modelAndView;
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
			employee.setDesignationId(new Designation(1, "Manager"));

			employeeDao.save(employee);
			return nextEmpNo;
		}catch (Exception e) {
			return "Save not Completed: " + e.getMessage();
		}
	}
	
	// create server mapping for delete employee
	@DeleteMapping(value = "/employee")
	public String delete(@RequestBody Employee employee) {
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
			
			return "OK";
		} catch (Exception e) {
			return "Delete not Completed: " + e.getMessage();
		}
	}

	// create mapping for update employee
	@PutMapping(value = "/employee")
	public String update(@RequestBody Employee employee) {
		try {
			employee.setLastModifyDateTime(LocalDateTime.now());
			employeeDao.save(employee);
			return "OK";
		} catch (Exception e) {
			return "Update not Completed : "+e.getMessage();
		}
	}
}
