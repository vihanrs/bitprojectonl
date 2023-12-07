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
  fillDataIntoTable2(tblUser,users,displayPropertyList,userFormRefill,userDelete,printUser,true);

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
const userFormRefill = (ob, rowIndex) => {

  console.log("refill");

  user = JSON.parse(JSON.stringify(ob));
  oldUser = JSON.parse(JSON.stringify(ob));

  textUserName.value = user.userName;
  textEmail.value = user.email;
  textNote.value = user.note;

  if(user.status){
    chkUserStatus.checked= true;
    chkLblUserStatus.innerText = 'User Account is Active';
  }else{
    chkUserStatus.checked= false;
    chkLblUserStatus.innerText = 'User Account is Not-Active';
  }

  //add selected employee object (user.employeeId) to the the priviously created list
  employeeListWithoutUserAccount.push(user.employeeId); 
  fillDataIntoSelect(selectEmployee,'Select Employee',employeeListWithoutUserAccount,'fullName',user.employeeId.fullName);
  
  //need to set roles
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
              let extIndex = user.roles.map(item => item.name).indexOf(role.name);
              if(extIndex != -1){
                 user.roles.splice(extIndex,1);
              }
          }
      }

      let extUserRoleIndex = user.roles.map(item => item.name).indexOf(role.name);
      if(extUserRoleIndex != -1){
        inputCHK.checked =true;
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

//function for delete user
const userDelete = (ob, rowIndex) => {
  const userConfirm = confirm(
    "Are you sure to delete following user account \n" +
      "\n Employee is : " + ob.employeeId.fullName +
      "\n User Name is : " + ob.userName +
      "\n email is : " +ob.email
  );

  if (userConfirm) {
    //request delete service
    const deleteServerResponse = ajaxRequestBody("/user","DELETE",ob);
    if (deleteServerResponse == "OK") {
      alert("User Delete Successfully...!");
      refreshUserTable();
    } else {
      alert(
        "User Delete Not Successfully you have following errors \n " +deleteServerResponse);
    }
  }
};

//function for refresh user form
const refreshUserForm = () => {
    userForm.reset();
    //create new object for call user
    user = new Object();
    oldUser = null;

    user.roles = new Array();

    //employee list without user account
    employeeListWithoutUserAccount = ajaxGetRequest("/employee/listwithoutuseraccount");
    fillDataIntoSelect(selectEmployee,'Select Employee',employeeListWithoutUserAccount,'fullName');

    //set auto binding
    user.status = true;

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

        //set onchange event listner
        inputCHK.onchange = function(){
            if(this.checked){
                user.roles.push(role);
            }else{
                let extIndex = user.roles.map(item => item.name).indexOf(role.name);
                if(extIndex != -1){
                   user.roles.splice(extIndex,1);
                }
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

    //check only entering new record
    if(oldUser == null){
      if(textRTPassword.value == ''){
        errors = errors+"Please Enter Re-Type Password.! \n";
      }
    }
    
    if(user.email == null){
        errors = errors+"Please Enter Email.! \n";
    }

    return errors;
}

//define function for check form updates
const checkUserFormUpdates=()=>{
  let updates = '';
  if(user.userName != oldUser.userName){
    updates += 'Username is changed \n';
  }

  if(user.email != oldUser.email){
    updates += 'Email is changed '+oldUser.email+' into '+user.email+ '\n';
  }

  if(user.employeeId.id != oldUser.employeeId.id){
    updates += 'Employee is changed \n';
  }

  if(user.status != oldUser.status){
    updates += 'Status is changed \n';
  }

  let isRolesUpdated = false;
  user.roles.forEach(role => {
    oldUser.roles.forEach(oldRole => {
      if(role.id != oldRole.id){
        isRolesUpdated = true;
      }
    });
  });

  // let isRolesUpdated = user.roles.some(role => !oldUser.roles.some(oldRole => role.id === oldRole.id));

  if(isRolesUpdated || user.roles.length != oldUser.roles.length){
    updates += 'Roles are changed \n';
  }

  return updates;

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
                refreshUserForm();
            }else{
                alert("Form has errors..\n"+userPostServiceResponse);
            }
        }
        
    }else{
        alert("form has following errors..! \n"+errors);
    }
    

    
}

//define fuction for update user
const buttonUserUpdate=()=>{
  console.log(user);
  console.log(oldUser);

  //check form errors
  let errors = checkUserForm();
  if(errors == ''){
    //check update availability
    let updates = checkUserFormUpdates();
    if(updates != ""){
      //need to get user confirmation
      let userConfirm = confirm('Are you sure to update following changes..? \n'+updates)
      if(userConfirm){
        //call PUT service
        const putServiceResponse = ajaxRequestBody("/user","PUT",user);
        if(putServiceResponse == 'OK'){
          alert("Update Successfully..!");
          refreshUserTable();
          refreshUserForm();
        }else{
          alert('Failed to update changes..\n'+putServiceResponse);
        }
      }
    }else{
      alert('There is nothing to update..!');
    }
  }else{
    alert('Form has following errors..please check again! \n'+errors);
  }
  
  
}

//create print function
const printUser=(ob,rowId)=>{

  //need to get full object
  const printUser = ob;

  for(let i = 0; i < tblUser.children[1].children.length ; i++){
    tblUser.children[1].children[i].style.backgroundColor = 'white';
  }
  tblUser.children[1].children[rowId].style.backgroundColor = 'red';

  //option 01
  tdFullName.innerText = printUser.employeeId.fullName;
  tdUserName.innerText = printUser.userName;
  tdEmail.innerText = printUser.email;

  // newTab = window.open();
  // newTab.document.write(
  //     //  link bootstrap css 
  //     '<head><title>Print Employee</title>'+
  //     '<link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css" /></head>'+
  //     '<h2>Employee Details</h2>'+
  //     printEmployeeTable.outerHTML
  //     +'<script>printEmployeeTable.removeAttribute("style")</script>'
  // );

  // setTimeout(
  //     function(){
  //         newTab.print();
  //     },1000)

  //option 02
  $('#modalPrintUser').modal('show');
}

//function for print option 02
const printUsersTable = ()=>{
  newTab = window.open();
  newTab.document.write(
      //  link bootstrap css 
      '<head><title>Print User</title>'+
      '<link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css" /></head>'+
      '<h2>Employee Details</h2>'+
      printUserTable.outerHTML
  );

  //triger print() after time out
  setTimeout(
      function(){
          newTab.print();
      },1000)

}

//create funtion for print user table after 1000 milsec of new tab opening () - to refresh the new tab elements
const printUserFullTable=()=>{
  const newTab = window.open();
  newTab.document.write(
      //  link bootstrap css 
      '<head><title>Print User</title>'+
      '<script src="resources/js/jquery.js"></script>'+
      '<link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css" /></head>'+
      '<h2>Employee Details</h2>'+
      tblUser.outerHTML+
      '<script>$(".modify-button").css("display","none")</script>'
  );

  setTimeout(
      function(){
          newTab.print();
      },1000)
  
}

//function for get user email
const generateUserEmail=()=>{
  textEmail.value = JSON.parse(selectEmployee.value).email; //set value
  user.email = textEmail.value //bind value
  textEmail.style.border = "2px solid green"; 
}