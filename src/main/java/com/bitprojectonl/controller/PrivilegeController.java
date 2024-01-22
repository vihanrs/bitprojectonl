package com.bitprojectonl.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.bitprojectonl.dao.PrivilegeDao;
import com.bitprojectonl.entity.Privilege;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping(value = "/privilege")
public class PrivilegeController {
    @Autowired
    private PrivilegeDao privilegeDao;

    //get mapping for generate privilege UI
    @GetMapping()
    public ModelAndView getPrivilegeUI() {
    	//get logged user authentication object
    	Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
    	
    	ModelAndView privilegeView = new ModelAndView();
    	privilegeView.addObject("title","Privilege : BIT Project 2023");
    	privilegeView.addObject("logusername",auth.getName());
    	privilegeView.setViewName("privilege.html");
    	return privilegeView;
    }
    
    //get service mapping for get all privileges
    @GetMapping(value = "/findall", produces = "application/json")
    public List<Privilege> findAll() {
        return privilegeDao.findAll(Sort.by(Direction.DESC,"id"));
    }

	@PostMapping
	public String savePrivilege(@RequestBody Privilege privilege) {
		
		//authentication and authorization

		//duplicate check
		Privilege extPrivilege = privilegeDao.getByRoleModule(privilege.getRole().getId(),privilege.getModule().getId());
		if(extPrivilege!= null){
			return "Save not completed : Privilege allready exist by given role and module";	
		}
		try {

			privilegeDao.save(privilege);
			return "OK";
		} catch (Exception e) {
			return "Save not completed : "+e.getMessage();
		}
	}

	//create update mapping for update privilege record
	@PutMapping
	public String updatePrivilege(@RequestBody Privilege privilege){
		//authentication authorization check

		//check existing 
		Privilege extPrivilege = privilegeDao.getReferenceById(privilege.getId());
		if(extPrivilege == null){
			return "Update not complete : Given privilege record not existe...!";
		}
		
		try {

			privilegeDao.save(privilege);

			return "OK";

		} catch (Exception e) {
			return "Delete not complete :"+e.getMessage();
		}
	}

	//create delete mapping for delete privilege record
	@DeleteMapping
	public String deletePrivilege(@RequestBody Privilege privilege){
		//authentication authorization check

		//check existing 
		Privilege extPrivilege = privilegeDao.getReferenceById(privilege.getId());
		if(extPrivilege == null){
			return "Delete not complete : Given privilege record not existe...!";
		}
		try {
			//set auto generated values
			extPrivilege.setSel(false);
			extPrivilege.setInst(false);
			extPrivilege.setUpd(false);
			extPrivilege.setDel(false);

			privilegeDao.save(extPrivilege);

			return "OK";

		} catch (Exception e) {
			return "Delete not complete :"+e.getMessage();
		}
	}
	
	// get mapping for get privileges by logged user module
	@GetMapping(value = "/bylogedusermodule/{modulename}" , produces = "application/json")
	public HashMap<String,Boolean> getPrivilegeByLoggedUserModule(@PathVariable("modulename") String moduleName){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		return getPrivilegeByUserAndModule(auth.getName(), moduleName);
	}
    
	//define method for get privilege by user module
    public HashMap<String,Boolean> getPrivilegeByUserAndModule(String username,String module){
    	HashMap<String, Boolean> userPrivilege = new HashMap<String,Boolean>();
    	
    	if(username.equals("Admin")){
    		userPrivilege.put("select", true);
    		userPrivilege.put("insert", true);
    		userPrivilege.put("update", true);
    		userPrivilege.put("delete", true);
    	}else {
    		String userPrivileges = privilegeDao.getPrivilegeByUserAndModule(username, module);
    		String[] privileges = userPrivileges.split(",");
    		userPrivilege.put("select", privileges[0].equals("1"));
    		userPrivilege.put("insert", privileges[1].equals("1"));
    		userPrivilege.put("update", privileges[2].equals("1"));
    		userPrivilege.put("delete", privileges[3].equals("1"));
    	}
    	
    	return userPrivilege;
    }
    
    public Boolean hasPrivilege(String username,String module,String operation) {
    	HashMap<String, Boolean> logedUserPrivileges = getPrivilegeByUserAndModule(username, module);
    	return logedUserPrivileges.get(operation); 
    }

}
