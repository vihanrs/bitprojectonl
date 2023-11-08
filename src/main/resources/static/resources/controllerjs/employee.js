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

window.addEventListener('load',()=>{
    
    //Call table refresh function
    refreshTable();

    //Call form refresh function
    refreshEmployeeForm();
});

//create function for refresh table record
const refreshTable = ()=>{
    //create array for store employee data list
    employees = [
        {id:1,number:'EMP0001',fullName:'Vihan Rojitha',nic:'980480526V',mobile:'0716025465',email:'vihanvrs@gmail.com',
            empStatus_id:{id:1,name:'Working'},abc:"abc"},
        {id:2,number:'EMP0002',fullName:'Nimal Silva',nic:'953480526V',mobile:'0726025785',email:'nimal@gmail.com',
            empStatus_id:{id:2,name:'Resign'},abc:null},
        {id:3,number:'EMP0003',fullName:'Amal Perera',nic:'924482578V',mobile:'0776025365',email:'amal@gmail.com',
            empStatus_id:{id:1,name:'Working'},abc:null},
        {id:4,number:'EMP0004',fullName:'Isuru Gamage',nic:'944482365V',mobile:'0755525377',email:'isuru@gmail.com',
            empStatus_id:{id:3,name:'Deleted'},abc:null},
    ];

    //object count = table column count
    //String - number/string/date
    //function - object/array/boolean 
    const displayProperty = [   {property:'number',datatype:'String'},
                                {property:'fullName',datatype:'String'},
                                {property:'nic',datatype:'String'},
                                {property:'mobile',datatype:'String'},
                                {property:'email',datatype:'String'},
                                {property:getEmployeeStatus,datatype:'function'}    ]
    
    
    //call the function (tableID,dataList,display property list, refill function name, delete function name, print function name, button visibilitys)
    fillDataIntoTable(tblEmployee,employees,displayProperty,refillEmployee,deleteEmployee,printEmployee,true);

    $('#tblEmployee').dataTable();
}

const getEmployeeStatus = (rowOb)=>{
    if(rowOb.empStatus_id.name == 'Working'){
        return '<p class = "working-status">'+rowOb.empStatus_id.name+'</p>';
    }else if(rowOb.empStatus_id.name == 'Resign'){
        return '<p class = "resign-status">'+rowOb.empStatus_id.name+'</p>';
    }else{
        return '<p class = "delete-status">'+rowOb.empStatus_id.name+'</p>';
    }
    
}

//create function for refresh form area
const refreshEmployeeForm = ()=>{
    //create empty object
    employee = {};

    //get data list from select element
    designations = [{id:1,name:'Manager'},{id:2,name:'Cashier'},{id:3,name:'Store-Manager'}];

    fillDataIntoSelect(cmbDesignation,'Select Designation',designations,'name');

    //need to empty all elements
    txtFullName.value = '';
    txtNIC.value = '';
    txtMobileNo.value = '';
    txtLandNo.value = '';
    txtEmail.value = '';
    txtCallingName.value = '';
    dateDOB.value = '';
    txtAddress.value = '';
    txtNote.value = '';
    cmbCivilstatus.value = '';
 
    //need to set default color
    txtFullName.style.border = '1px solid #ced4da';
    txtNIC.style.border = '1px solid #ced4da';
    txtMobileNo.style.border = '1px solid #ced4da';
    txtLandNo.style.border = '1px solid #ced4da';
    txtEmail.style.border = '1px solid #ced4da';
    txtCallingName.style.border = '1px solid #ced4da';
    dateDOB.style.border = '1px solid #ced4da';
    txtNote.style.border = '1px solid #ced4da';
    txtAddress.style.border = '1px solid #ced4da';

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
    if(minMonth < 10){
        minMonth = '0'+minMonth;
    }

    let minDay = minDate.getDate();
    if(minDay < 10){
        minDay = '0'+minDay;
    }

    minDate.setFullYear(minDate.getFullYear()-20);
    dateDOB.min = minDate.getFullYear()+'-'+minMonth+'-'+minDay;

    let maxMonth = maxDate.getMonth();
    if(maxMonth < 10){
        maxMonth = '0'+maxMonth;
    }

    let maxDay = maxDate.getDate();
    if(maxDay < 10){
        maxDay = '0'+maxDay;
    }

    maxDate.setFullYear(maxDate.getFullYear()-18);
    dateDOB.max = maxDate.getFullYear()+'-'+maxMonth+'-'+maxDay;



    checkBoxActive.checked = true;
    labelCBActive.innerText = 'Active';
}

//delete employee record
const deleteEmployee = (rowObject) =>{
    const userConfirm = confirm('Are you sure to delete following employee \n'+rowObject.fullName);

    if(userConfirm){
        //response from backend ...

        alert('Employee Delete Successfully...!');
        refreshTable();
        divModifybutton.className = 'd-none';
    }else{

    }
}

const checkError = ()=>{
    //need to check all required prperty filds
    let error = '';
    // if(txtFullName.value == ''){
    if(employee.fullName == null){
        error = error+'Please Enter Valid Full Name...!\n';
        txtFullName.style.border = '2px solid red';
    }
    if(employee.callingName == null){
        error = error+'Please Enter Valid Calling Name...!\n';
        txtEmail.style.border = '2px solid red';
    }
    if(employee.nic == null){
        error = error+'Please Enter NIC...!\n';
        txtNIC.style.border = '2px solid red';
    }
    if(employee.mobile == null){
        error = error+'Please Enter Mobile No...!\n';
        txtMobileNo.style.border = '2px solid red';
    }
    if(employee.email == null){
        error = error+'Please Enter Email...!\n';
        txtEmail.style.border = '2px solid red';
    }

    if(employee.dob == null){
        error = error+'Please Enter Email...!\n';
        dateDOB.style.border = '2px solid red';
    }

    return error;   
}

//create function for add button
const addEmployee = ()=>{
    //1. need to check form errors ---> checkError() 
    console.log(checkError());
    let formErrors = checkError();
    if(formErrors == ''){
        // alert('No errors!');
        //2. need to get user confirmation
        let userConfirm = window.confirm('Are you sure to add following employee..?\n'
                                        + '\nFull Name : '+employee.fullName 
                                        + '\nNIC : '+employee.nic
                                        + '\nMobile : '+employee.mobile
                                        + '\nGender : '+employee.gender
                                        + '\nActive : '+employee.active
                                        + '\nEmail : '+employee.email);

        if(userConfirm){
        //3. pass data into back end
        let serverResponse = 'OK';
        //4. check back end response
            if(serverResponse == 'OK'){
                alert('Save sucessfully..!');
                //need to refresh table and form
                refreshTable();
                refreshEmployeeForm();

                //need to hide modal
                $('#modalEmployeeAddForm').modal('hide');
            }else{
                alert('Save not sucessfully..! have some errors \n'+serverResponse);
            }
        }
        
    }else{
        alert('Error\n' + formErrors);
    }
}

//create refill function
const refillEmployee=(rowId)=>{
    $('#modalEmployeeAddForm').modal('show');
}

//create print function
const printEmployee=(rowId)=>{

}