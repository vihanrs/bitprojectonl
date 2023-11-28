//browser onload event
window.onload=()=>{
    // console.log('hellos');

    //call table refresh function
    refreshUserTable();
}

//create funtion refresh table
const refreshUserTable = () =>{

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
        {datatype:'function',property:getEmployee},
        {datatype:'String',property:'username'},
        {datatype:'String',property:'email'},
        {datatype:'function',property:getRole},
        {datatype:'function',property:getUserStatus}
    ];

    
    //call fill data into table
    //(tableid,datalist,propertylist)
    fillDataIntoTable2(tblUser,users,displayPropertyList,userFormRefill,userDelete,userPrint,true);

    //call jquery data table
    $('#tblUser').dataTable();
}

const getEmployee = (ob) =>{
    return ob.employeeId.fullName;
}

const getRole = (ob) =>{
    // return ob.role_id.name;
    return "role";
}

const getUserStatus = (ob) =>{
    if(ob.status){
        return '<p style="border-radius:10px;" class="bg-success text-center fw-bold p-2">Active</p>';
    }else{
        return '<p style="border-radius:10px;" class="bg-danger text-center fw-bold p-2">Not-Active</p>';
    }
}

const userFormRefill =(ob,rowIndex)=>{

}

const userDelete =(ob,rowIndex)=>{
    const userConfirm = confirm('Are you sure to delete following user account \n'+
                                '\n Employee is : '+ob.employee_id.fullName+
                                '\n User Name is : '+ob.username+
                                '\n email is : '+ob.email
    );

    if(userConfirm){
        //request delete service
        const deleteServerResponse = 'ok';
        if(deleteServerResponse=='ok'){
            alert('User Delete Successfully...!');
            refreshUserTable();
        }else{
            alert('User Delete Not Successfully you have following errors \n '+deleteServerResponse);
        }


    }
}

const userPrint =(ob,rowIndex)=>{

}