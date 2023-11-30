//browser onload event
window.onload = () => {
  // console.log('hellos');

  //active tooltip
  $('[data-bs-toggle="tooltip"]').tooltip();

  //call table refresh function
  refreshUserTable();

  //call form refresh function
  refreshUserForm();
};

//create funtion refresh table
const refreshUserTable = () => {
  // const users = [
  //     {id:1,employee_id:{id:1,fullName:'Vihan Rojitha',calligName:'Vihan'},username:'vihan', email:'vihan@gmail.com',status:true,role_id:{id:1,name:'Manager'}},
  //     {id:2,employee_id:{id:2,fullName:'Ruwan Silva',calligName:'Ruwan'},username:'ruwan', email:'ruwan@gmail.com',status:false,role_id:{id:2,name:'Cashier'}},
  //     {id:3,employee_id:{id:3,fullName:'Kamal Perera',calligName:'Kamal'},username:'kamal', email:'kamal@gmail.com',status:true,role_id:{id:1,name:'Manager'}},
  //     {id:4,employee_id:{id:4,fullName:'Dasun Shanaka',calligName:'Dasun'},username:'dasun', email:'dasun@gmail.com',status:false,role_id:{id:3,name:'Store-Manager'}}
  // ];

  const users = ajaxGetRequest("/user/findall");
  //column count = object count
  //string - number/string/date
  //function - object/array/boolean
  const displayPropertyList = [
    { datatype: "function", property: getEmployee },
    { datatype: "String", property: "userName" },
    { datatype: "String", property: "email" },
    { datatype: "function", property: getRole },
    { datatype: "function", property: getUserStatus },
  ];

  //call fill data into table
  //(tableid,datalist,propertylist)
  fillDataIntoTable2(tblUser,users,displayPropertyList,userFormRefill,userDelete,userPrint,true);

  //call jquery data table
  $("#tblUser").dataTable();
};

//function for get employee name
const getEmployee = (ob) => {
  return ob.employeeId.fullName;
};

//function for get role
const getRole = (ob) => {
  // return ob.role_id.name;
  let userRoles = '';
  ob.roles.forEach(userRole => {
    userRoles = userRoles+ userRole.name+', '
  });

  return userRoles;
};

//function for get user status
const getUserStatus = (ob) => {
  if (ob.status) {
    return '<p style="border-radius:10px;" class="bg-success text-center fw-bold p-2">Active</p>';
  } else {
    return '<p style="border-radius:10px;" class="bg-danger text-center fw-bold p-2">Not-Active</p>';
  }
};

//function for refill user form
const userFormRefill = (ob, rowIndex) => {};

//function for delete user
const userDelete = (ob, rowIndex) => {
  const userConfirm = confirm(
    "Are you sure to delete following user account \n" +
      "\n Employee is : " +
      ob.employee_id.fullName +
      "\n User Name is : " +
      ob.username +
      "\n email is : " +
      ob.email
  );

  if (userConfirm) {
    //request delete service
    const deleteServerResponse = "ok";
    if (deleteServerResponse == "ok") {
      alert("User Delete Successfully...!");
      refreshUserTable();
    } else {
      alert(
        "User Delete Not Successfully you have following errors \n " +
          deleteServerResponse
      );
    }
  }
};

//function for print user record
const userPrint = (ob, rowIndex) => {};

//function for refresh user form
const refreshUserForm = () => {
    //create new object for call user
    user = new Object();

    //employee list without user account
    employeeListWithoutUserAccount = ajaxGetRequest("/employee/listwithoutuseraccount");
    fillDataIntoSelect(selectEmployee,'Select Employee',employeeListWithoutUserAccount,'fullName');

    //set auto binding
    user.status = true;
    user.roles = new Array();

    //set default color
    selectEmployee.style.border = "2px solid #ced4da";
    textUserName.style.border = "2px solid #ced4da";
    textPassword.style.border = "2px solid #ced4da";
    textRTPassword.style.border = "2px solid #ced4da";
    textEmail.style.border = "2px solid #ced4da";
    textNote.style.border = "2px solid #ced4da";

    //need to get role list
    roles = ajaxGetRequest("/role/list");
    divRoles.innerHTML = "";
    roles.forEach(role => {
        const div = document.createElement('div');
        div.className = "form-check form-check-inline";
        const inputCHK = document.createElement('input');
        inputCHK.type = "checkbox";
        inputCHK.className = "form-check-input";
        inputCHK.id = "chk"+role.name;

        inputCHK.onchange = function(){
            if(this.checked){
                user.roles.push(role);
            }else{
                
            }
        }

        const label = document.createElement('label');
        label.className = "form-check-label fw-bold";
        label.for = inputCHK.id;
        label.innerText = role.name;

        div.appendChild(inputCHK);
        div.appendChild(label);

        divRoles.appendChild(div);
    });
};

//define function for password retype
const passwordRTValidator=()=>{
    if(textPassword.value != ""){
        if(textPassword.value == textRTPassword.value){
            textPassword.style.border = "2px solid green";
            textRTPassword.style.border = "2px solid green";
            user.password = textPassword.value;
        }else{
            textPassword.style.border = "2px solid red";
            textRTPassword.style.border = "2px solid red";
            user.password = null;
        }
    }else{
        alert("Please fill passowrd field...!");
        textPassword.style.border = "2px solid red";
        textRTPassword.style.border = "2px solid red";
    }
}

//define function for check user form errors
const checkUserForm=()=>{
    let errors = "";

    if(user.employeeId == null){
        errors = errors+"Please Select Employee.! \n";
    }
    if(user.userName == null){
        errors = errors+"Please Enter Username.! \n";
    }
    if(user.password == null){
        errors = errors+"Please Enter Password.! \n";
    }
    if(textPassword.value == ''){
        errors = errors+"Please Enter Re-Type Password.! \n";
    }
    if(user.email == null){
        errors = errors+"Please Enter Email.! \n";
    }

    return errors;
}

//define function for submit user object
const buttonUserSubmit=()=>{
    console.log(user);

    //need to check form errors
    let errors = checkUserForm();

    if(errors == ""){
        //get user confirmation
        const userResponse = confirm("Are you user to add following user \n"+
                                "\n Employee : "+user.employeeId.fullName +
                                "\n Username : "+user.userName +
                                "\n Email : "+user.email 
                                );

        if(userResponse){
            //call post service
            const userPostServiceResponse = ajaxRequestBody("/user","POST",user);

            if(userPostServiceResponse == "OK"){
                alert("Save Successfully..!");
                refreshUserTable();
                userForm.reset();
                refreshUserForm();
            }else{
                alert("Form has errors..\n"+userPostServiceResponse);
            }
        }
        
    }else{
        alert("form has following errors..! \n"+errors);
    }
    

    
}
