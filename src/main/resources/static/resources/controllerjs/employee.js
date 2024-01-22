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
  userPrivilages = ajaxGetRequest("/privilege/bylogedusermodule/Employee");

  //Call form refresh function
  refreshEmployeeForm();
  //Call table refresh function
  refreshTable();
});

//create function for refresh table record
const refreshTable = () => {
  //create array for store employee data list
  /* employees = [
        {id:1,number:'EMP0001',fullName:'Vihan Rojitha',nic:'980480526V',mobile:'0716025465',email:'vihanvrs@gmail.com',
            empStatus_id:{id:1,name:'Working'},abc:"abc"},
        {id:2,number:'EMP0002',fullName:'Nimal Silva',nic:'953480526V',mobile:'0726025785',email:'nimal@gmail.com',
            empStatus_id:{id:2,name:'Resign'},abc:null},
        {id:3,number:'EMP0003',fullName:'Amal Perera',nic:'924482578V',mobile:'0776025365',email:'amal@gmail.com',
            empStatus_id:{id:1,name:'Working'},abc:null},
        {id:4,number:'EMP0004',fullName:'Isuru Gamage',nic:'944482365V',mobile:'0755525377',email:'isuru@gmail.com',
            empStatus_id:{id:3,name:'Deleted'},abc:null},
    ];*/

  employees = ajaxGetRequest("/employee/findall");

  //object count = table column count
  //String - number/string/date
  //function - object/array/boolean
  const displayProperty = [
    { property: "empNo", datatype: "String" },
    { property: "fullName", datatype: "String" },
    { property: "nic", datatype: "String" },
    { property: "mobile", datatype: "String" },
    { property: "email", datatype: "String" },
    { property: getEmployeeStatus, datatype: "function" },
  ];

  //call the function (tableID,dataList,display property list, refill function name, delete function name, print function name, button visibilitys,privilegeObj)
  fillDataIntoTable(
    tblEmployee,
    employees,
    displayProperty,
    refillEmployee,
    deleteEmployee,
    printEmployee,
    true,
    userPrivilages
  );

  //disable delete button when status deleted
  employees.forEach((element, index) => {
    if (userPrivilages.delete && element.employeeStatusId.name == "Delete") {
      tblEmployee.children[1].children[index].children[7].children[1].disabled =
        "disabled";
    }
  });
  $("#tblEmployee").dataTable();
};

const getEmployeeStatus = (rowOb) => {
  if (rowOb.employeeStatusId.name == "Working") {
    return (
      '<p class = "working-status">' + rowOb.employeeStatusId.name + "</p>"
    );
  } else if (rowOb.employeeStatusId.name == "Resign") {
    return '<p class = "resign-status">' + rowOb.employeeStatusId.name + "</p>";
  } else {
    return '<p class = "delete-status">' + rowOb.employeeStatusId.name + "</p>";
  }
};

//create function for refresh form area
const refreshEmployeeForm = () => {
  //create empty object
  employee = {};

  //get data list from select element
  // designations = [{id:1,name:'Manager'},{id:2,name:'Cashier'},{id:3,name:'Store-Manager'}];

  designations = ajaxGetRequest("/designation/findall");
  fillDataIntoSelect(
    cmbDesignation,
    "Select Designation",
    designations,
    "name"
  );

  // employeestatuses = [{id:1,name:'Working'},{id:2,name:'Resign'},{id:3,name:'Deleted'}];

  employeestatuses = ajaxGetRequest("/employeestatus/findall");
  fillDataIntoSelect(
    cmbEmployeeStatus,
    "Select status",
    employeestatuses,
    "name"
  );

  //need to empty all elements
  txtFullName.value = "";
  txtNIC.value = "";
  radioGenderMale.checked = false;
  radioGenderFemale.checked = false;
  txtMobileNo.value = "";
  txtLandNo.value = "";
  txtEmail.value = "";
  txtCallingName.value = "";
  dateDOB.value = "";
  txtAddress.value = "";
  txtNote.value = "";
  cmbCivilstatus.value = "";

  //need to set default color
  txtFullName.style.border = "1px solid #ced4da";
  txtCallingName.style.border = "1px solid #ced4da";
  txtNIC.style.border = "1px solid #ced4da";
  txtMobileNo.style.border = "1px solid #ced4da";
  txtLandNo.style.border = "1px solid #ced4da";
  txtEmail.style.border = "1px solid #ced4da";
  txtAddress.style.border = "1px solid #ced4da";
  dateDOB.style.border = "1px solid #ced4da";
  txtNote.style.border = "1px solid #ced4da";

  //set min/max value
  // dateDOB.min = '2023-09-09';
  // dateDOB.max = '2023-09-15';

  // //method 01
  // let currentDate = new Date();
  // dateDOB.min = currentDate.toISOString().split('T')[0];  //can be change the time with time zone

  // let maxDate = new Date();
  // maxDate.setDate(currentDate.getDate()+14);
  // dateDOB.max = maxDate.toISOString().split('T')[0];

  let minDate = new Date();
  let maxDate = new Date();

  let minMonth = minDate.getMonth();
  if (minMonth < 10) {
    minMonth = "0" + minMonth;
  }

  let minDay = minDate.getDate();
  if (minDay < 10) {
    minDay = "0" + minDay;
  }

  minDate.setFullYear(minDate.getFullYear() - 20);
  dateDOB.min = minDate.getFullYear() + "-" + minMonth + "-" + minDay;

  let maxMonth = maxDate.getMonth();
  if (maxMonth < 10) {
    maxMonth = "0" + maxMonth;
  }

  let maxDay = maxDate.getDate();
  if (maxDay < 10) {
    maxDay = "0" + maxDay;
  }

  maxDate.setFullYear(maxDate.getFullYear() - 18);
  dateDOB.max = maxDate.getFullYear() + "-" + maxMonth + "-" + maxDay;

  checkBoxActive.checked = true;
  labelCBActive.innerText = "Active";

  btnEmpUpdate.disabled = "disabled";
  btnEmpSave.disabled = "disabled";
  if (userPrivilages.insert) {
    btnEmpSave.disabled = "";
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

//create refill function
const refillEmployee = (rowObject, rowId) => {
  $("#modalEmployeeAddForm").modal("show");

  // employee = rowObject;
  employee = JSON.parse(JSON.stringify(rowObject));
  oldemployee = JSON.parse(JSON.stringify(rowObject));

  txtFullName.value = employee.fullName;
  txtCallingName.value = employee.callingName;
  txtNIC.value = employee.nic;
  dateDOB.value = employee.dateOfBirth;
  txtMobileNo.value = employee.mobile;
  txtEmail.value = employee.email;
  txtAddress.value = employee.address;
  cmbCivilstatus.value = employee.civilStatus;

  if (employee.gender == "male") {
    radioGenderMale.checked = true;
  } else {
    radioGenderFemale.checked = true;
  }

  //optional fields
  if (employee.landNo != null) txtLandNo.value = employee.landNo;
  else txtLandNo.value = "";
  if (employee.note != null) txtNote.value = employee.note;
  else txtNote.value = "";

  //if we have optional join column then need to check null
  // cmbDesignation
  fillDataIntoSelect(
    cmbDesignation,
    "Select Designation",
    designations,
    "name",
    employee.designationId.name
  );

  // cmbEmployeeStatus
  fillDataIntoSelect(
    cmbEmployeeStatus,
    "Select status",
    employeestatuses,
    "name",
    employee.employeeStatusId.name
  );
  btnEmpSave.disabled = "disabled";

  if (userPrivilages.update) {
    btnEmpUpdate.disabled = "";
  }
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
