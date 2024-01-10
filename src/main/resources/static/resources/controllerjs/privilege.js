// console.log('Browser Load');

//Access Browser onload event

//Method 01
// window.onload = function (){
//     console.log('Browser on load');

//     const employeeTable = document.querySelector('#tblEmployee');
//     console.log(employeeTable);
// }

//Method 02
// window.addEventListener('load',()=>{
//     console.log('Browser on Load 1');
// });

//Method 03
// window.addEventListener('DOMContentLoaded',()=>{
//     console.log('Browser DOM Load');
// });

window.addEventListener("load", () => {
  //Call table refresh function
  refreshTable();

  //Call form refresh function
  refreshPrivilegeForm();
});

//create function for refresh table record
const refreshTable = () => {
  //create array for store privilege data list

  privileges = ajaxGetRequest("/privilege/findall");

  //object count = table column count
  //String - number/string/date
  //function - object/array/boolean
  const displayProperty = [
    { property: getRole, datatype: "function" },
    { property: getModule, datatype: "function" },
    { property: getSelect, datatype: "function" },
    { property: getInsert, datatype: "function" },
    { property: getUpdate, datatype: "function" },
    { property: getDelete, datatype: "function" },
  ];

  //call the function (tableID,dataList,display property list, refill function name, delete function name, print function name, button visibilitys)
  fillDataIntoTable(
    tblPrivilege,
    privileges,
    displayProperty,
    refillPrivilege,
    deleteEmployee,
    printEmployee,
    true
  );

  $("#tblPrivilege").dataTable();
};

const getRole = (obj) => {
  return obj.role.name;
};

const getModule = (obj) => {
  return obj.module.name;
};

const getSelect = (obj) => {
  if (obj.sel) {
    return "Granted";
  } else {
    return "Not-Granted";
  }
};

const getInsert = (obj) => {
  if (obj.inst) {
    return "Granted";
  } else {
    return "Not-Granted";
  }
};

const getUpdate = (obj) => {
  if (obj.upd) {
    return "Granted";
  } else {
    return "Not-Granted";
  }
};

const getDelete = (obj) => {
  if (obj.del) {
    return "Granted";
  } else {
    return "Not-Granted";
  }
};

//define function for filter module list by given role id
const generateModuleList = () => {
  modulesByRole = ajaxGetRequest(
    "/module/listbyrole?roleid=" + JSON.parse(cmbRole.value).id
  );
  fillDataIntoSelect(cmbModule, "Select Module", modulesByRole, "name");
  cmbModule.disabled = false;
};

//create function for refresh form area
const refreshPrivilegeForm = () => {
  //create empty object
  privilege = {};

  //get data list from select element
  roles = ajaxGetRequest("/role/findall");
  fillDataIntoSelect(cmbRole, "Select Role", roles, "name");
  cmbRole.disabled = false;

  modules = ajaxGetRequest("/module/findall");
  fillDataIntoSelect(cmbModule, "Select Module", modules, "name");
  cmbModule.disabled = true;
};

//create function for add button
const addEmployee = () => {
  //1. need to check form errors ---> checkError()
  console.log(checkError());
  let formErrors = checkError();
  if (formErrors == "") {
    // alert('No errors!');
    //2. need to get user confirmation
    let userConfirm = window.confirm(
      "Are you sure to add following employee..?\n" +
        "\nFull Name : " +
        employee.fullName +
        "\nNIC : " +
        employee.nic +
        "\nMobile : " +
        employee.mobile +
        "\nGender : " +
        employee.gender +
        "\nEmail : " +
        employee.email +
        "\nDesgnation : " +
        employee.designationId.name
    );

    if (userConfirm) {
      //3. pass data into back end
      let serverResponse = ajaxRequestBody("/employee", "POST", employee); // url,method,object

      //4. check back end response
      if (new RegExp("^[0-9]{8}$").test(serverResponse)) {
        alert("Save sucessfully..! " + serverResponse);
        //need to refresh table and form
        refreshTable();
        refreshEmployeeForm();

        //need to hide modal
        $("#modalEmployeeAddForm").modal("hide");
      } else {
        alert("Save not sucessfully..! have some errors \n" + serverResponse);
      }
    }
  } else {
    alert("Error\n" + formErrors);
  }
};

//delete employee record
const deleteEmployee = (rowObject, rowId) => {
  const userConfirm = confirm(
    "Are you sure to delete following employee \n" + rowObject.fullName
  );

  if (userConfirm) {
    //response from backend ...
    let serverResponse = ajaxRequestBody("/employee", "DELETE", rowObject); // url,method,object
    //4. check back end response
    if (serverResponse == "OK") {
      alert("Delete sucessfully..! \n" + serverResponse);
      //need to refresh table and form
      refreshTable();
      refreshEmployeeForm();
    } else {
      alert("Save not sucessfully..! have some errors \n" + serverResponse);
    }
  }
};

const checkError = () => {
  //need to check all required prperty filds
  let error = "";
  // if(txtFullName.value == ''){
  if (employee.fullName == null) {
    error = error + "Please Enter Valid Full Name...!\n";
    txtFullName.style.border = "2px solid red";
  }
  if (employee.callingName == null) {
    error = error + "Please Enter Valid Calling Name...!\n";
    txtEmail.style.border = "2px solid red";
  }
  if (employee.nic == null) {
    error = error + "Please Enter NIC...!\n";
    txtNIC.style.border = "2px solid red";
  }
  if (employee.gender == null) {
    error = error + "Please Enter Gender...!\n";
  }
  if (employee.dateOfBirth == null) {
    error = error + "Please Enter dateOfBirth...!\n";
    dateDOB.style.border = "2px solid red";
  }
  if (employee.mobile == null) {
    error = error + "Please Enter Mobile No...!\n";
    txtMobileNo.style.border = "2px solid red";
  }
  if (employee.email == null) {
    error = error + "Please Enter Email...!\n";
    txtEmail.style.border = "2px solid red";
  }
  if (employee.address == null) {
    error = error + "Please Enter Address...!\n";
    txtAddress.style.border = "2px solid red";
  }
  if (employee.designationId == null) {
    error = error + "Please Enter Designation...!\n";
    cmbDesignation.style.border = "2px solid red";
  }
  if (employee.civilStatus == null) {
    error = error + "Please Enter Civil Status...!\n";
    cmbCivilstatus.style.border = "2px solid red";
  }
  if (employee.employeeStatusId == null) {
    error = error + "Please Enter Employee Status...!\n";
    cmbEmployeeStatus.style.border = "2px solid red";
  }

  return error;
};

const checkUpdate = () => {
  let updates = "";

  if (oldemployee.nic != employee.nic) {
    updates = updates + "NIC has changed \n";
  }

  if (oldemployee.designationId.name != employee.designationId.name) {
    updates = updates + "Designation has changed \n";
  }

  if (oldemployee.mobile != employee.mobile) {
    updates =
      updates +
      "NIC has changed " +
      oldemployee.mobile +
      " into " +
      employee.mobile +
      " \n";
  }

  return updates;
};

//create refill function
const refillPrivilege = (rowObject, rowId) => {
  $("#modalPrivilegeAddForm").modal("show");

  // employee = rowObject;
  privilege = JSON.parse(JSON.stringify(rowObject));
  oldprivilege = JSON.parse(JSON.stringify(rowObject));

  //get data list from select element
  roles = ajaxGetRequest("/role/findall");
  fillDataIntoSelect(
    cmbRole,
    "Select Role",
    roles,
    "name",
    privilege.role.name
  );

  modules = ajaxGetRequest("/module/findall");
  fillDataIntoSelect(
    cmbModule,
    "Select Module",
    modules,
    "name",
    privilege.module.name
  );

  cmbRole.disabled = true;
  cmbModule.disabled = true;
};

//define method for employee update
const buttonEmployeeUpdate = () => {
  let errors = checkError();
  if (errors == "") {
    let updates = checkUpdate();
    if (updates != "") {
      let userConfirm = confirm(
        "Are you sure to update following changes...?\n" + updates
      );
      if (userConfirm) {
        let updateSeriveResponse = ajaxRequestBody(
          "/employee",
          "PUT",
          employee
        );
        if (updateSeriveResponse == "OK") {
          alert("Update sucessfully..! ");
          //need to refresh table and form
          refreshTable();
          refreshEmployeeForm();

          //need to hide modal
          $("#modalEmployeeAddForm").modal("hide");
        } else {
          alert(
            "Update not sucessfully..! have some errors \n" +
              updateSeriveResponse
          );
        }
      }
    } else {
      alert("Nothing to Update...!");
    }
  } else {
    alert("form has following errors \n" + errors);
  }
};

//create print function
const printEmployee = (ob, rowId) => {
  //need to get full object
  const printEmp = ob;

  for (let i = 0; i < tblEmployee.children[1].children.length; i++) {
    tblEmployee.children[1].children[i].style.backgroundColor = "white";
  }
  tblEmployee.children[1].children[rowId].style.backgroundColor = "red";

  //option 01
  tdFullName.innerText = printEmp.fullName;
  tdNIC.innerText = printEmp.nic;
  tdMobile.innerText = printEmp.mobile;
  tdStatus.innerText = printEmp.employeeStatusId.name;

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
  $("#modalPrintEmployee").modal("show");
};

//function for print option 02
const printEmpTable = () => {
  newTab = window.open();
  newTab.document.write(
    //  link bootstrap css
    "<head><title>Print Employee</title>" +
      '<link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css" /></head>' +
      "<h2>Employee Details</h2>" +
      printEmployeeTable.outerHTML
  );

  //triger print() after time out
  setTimeout(function () {
    newTab.print();
  }, 1000);
};

//create funtion for print employee table after 1000 milsec of new tab opening () - to refresh the new tab elements
const printEmpFullTable = () => {
  const newTab = window.open();
  newTab.document.write(
    //  link bootstrap css
    "<head><title>Print Employee</title>" +
      '<script src="resources/js/jquery.js"></script>' +
      '<link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css" /></head>' +
      "<h2>Employee Details</h2>" +
      tblEmployee.outerHTML +
      '<script>$(".modify-button").css("display","none")</script>'
  );

  setTimeout(function () {
    newTab.print();
  }, 1000);
};
