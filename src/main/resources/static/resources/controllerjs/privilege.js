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
    deletePrivilege,
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

  cmbRole.style.border = "1px solid #ced4da";
  cmbModule.style.border = "1px solid #ced4da";

  privilege.sel = false;
  privilege.inst = false;
  privilege.upd = false;
  privilege.del = false;

  labelCBSelect.innerText = "Not-Granted";
  labelCBInsert.innerText = "Not-Granted";
  labelCBUpdate.innerText = "Not-Granted";
  labelCBDelete.innerText = "Not-Granted";
};

const checkError = () => {
  //need to check all required prperty filds
  let error = "";
  // if(txtFullName.value == ''){
  if (privilege.role == null) {
    error = error + "Please select valid role...!\n";
  }
  if (privilege.module == null) {
    error = error + "Please select valid module...!\n";
  }
  if (privilege.sel == null) {
    error = error + "Please select select privilege...!\n";
  }
  if (privilege.inst == null) {
    error = error + "Please select insert privilege...!\n";
  }
  if (privilege.upd == null) {
    error = error + "Please select update privilege...!\n";
  }
  if (privilege.del == null) {
    error = error + "Please select delete privilege...!\n";
  }

  return error;
};

//create function for add button
const addPrivilege = () => {
  //1. need to check form errors ---> checkError()
  console.log(checkError());
  let formErrors = checkError();
  if (formErrors == "") {
    // alert('No errors!');
    //2. need to get user confirmation
    let userConfirm = window.confirm(
      "Are you sure to add following employee..?\n" +
        "\nRole : " +
        privilege.role.name +
        "\nModule : " +
        privilege.module.name
    );

    if (userConfirm) {
      //3. pass data into back end
      let serverResponse = ajaxRequestBody("/privilege", "POST", privilege); // url,method,object

      //4. check back end response
      if (serverResponse === "OK") {
        alert("Save sucessfully..! " + serverResponse);
        //need to refresh table and form
        refreshTable();
        privilegeForm.reset();
        refreshPrivilegeForm();

        //need to hide modal
        $("#modalPrivilegeAddForm").modal("hide");
      } else {
        alert("Save not sucessfully..! have some errors \n" + serverResponse);
      }
    }
  } else {
    alert("Error\n" + formErrors);
  }
};

//delete Privilege record
const deletePrivilege = (rowObject, rowId) => {
  const userConfirm = confirm(
    "Are you sure to delete following privilege \n" +
      "Role : " +
      rowObject.role.name +
      "\nModule : " +
      rowObject.module.name
  );

  if (userConfirm) {
    //response from backend ...
    let serverResponse = ajaxRequestBody("/privilege", "DELETE", rowObject); // url,method,object
    //4. check back end response
    if (serverResponse == "OK") {
      alert("Delete sucessfully..! \n" + serverResponse);
      //need to refresh table and form
      refreshTable();
      privilegeForm.reset();
      refreshEmployeeForm();
    } else {
      alert("Delete not sucessfully..! have some errors \n" + serverResponse);
    }
  }
};

const checkUpdate = () => {
  let updates = "";

  if (oldprivilege.role.id != privilege.role.id) {
    updates = updates + "Role has changed \n";
  }
  if (oldprivilege.module.id != privilege.module.id) {
    updates = updates + "Module has changed \n";
  }
  if (oldprivilege.sel != privilege.sel) {
    updates = updates + "Select has changed \n";
  }
  if (oldprivilege.inst != privilege.inst) {
    updates = updates + "Insert has changed \n";
  }
  if (oldprivilege.upd != privilege.upd) {
    updates = updates + "Update has changed \n";
  }
  if (oldprivilege.del != privilege.del) {
    updates = updates + "Delete has changed \n";
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

  if (privilege.sel) {
    checkBoxSelect.checked = true;
    labelCBSelect.innerText = "Granted";
  } else {
    checkBoxSelect.checked = false;
    labelCBSelect.innerText = "Not-Granted";
  }

  if (privilege.inst) {
    checkBoxInsert.checked = true;
    labelCBInsert.innerText = "Granted";
  } else {
    checkBoxInsert.checked = false;
    labelCBInsert.innerText = "Not-Granted";
  }
  if (privilege.upd) {
    checkBoxUpdate.checked = true;
    labelCBUpdate.innerText = "Granted";
  } else {
    checkBoxUpdate.checked = false;
    labelCBUpdate.innerText = "Not-Granted";
  }
  if (privilege.del) {
    checkBoxDelete.checked = true;
    labelCBDelete.innerText = "Granted";
  } else {
    checkBoxDelete.checked = false;
    labelCBDelete.innerText = "Not-Granted";
  }
};

//define method for privilege update
const buttonPrivilegeUpdate = () => {
  let errors = checkError();
  if (errors == "") {
    let updates = checkUpdate();
    if (updates != "") {
      let userConfirm = confirm(
        "Are you sure to update following changes...?\n" + updates
      );
      if (userConfirm) {
        let updateSeriveResponse = ajaxRequestBody(
          "/privilege",
          "PUT",
          privilege
        );
        if (updateSeriveResponse == "OK") {
          alert("Update sucessfully..! ");
          //need to refresh table and form
          refreshTable();
          privilegeForm.reset();
          refreshPrivilegeForm();

          //need to hide modal
          $("#modalPrivilegeAddForm").modal("hide");
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
