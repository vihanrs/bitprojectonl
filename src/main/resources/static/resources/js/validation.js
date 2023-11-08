// create text field validation function 
const textFieldValidator = (fieldId,pattern,object,property)=>{
    const fieldValue = fieldId.value;
    const regPattern = new RegExp(pattern);

    if(fieldValue !== ""){
        if(regPattern.test(fieldValue)){
            fieldId.style.border = '2px solid green';

            //bind value into object property
            console.log(window[object]);
            window[object][property] = fieldValue;
        }else{
            fieldId.style.border = '1px solid red';
            //need to bind null
            window[object][property] = null;
        }
    }else{
        //need to bind null
        window[object][property] = null;
        if(fieldId.required){
            fieldId.style.border = '1px solid red';
        }else{
            fieldId.style.border = '1px solid #ced4da';
        }
    }
}

//create select field validation function
const selectDFieldValidator = (fieldId,object,property)=>{
    const fieldValue = fieldId.value;

    if(fieldValue !== ""){
        fieldId.style.border = '2px solid green';
        window[object][property] = JSON.parse(fieldValue); //convert to JS object
    }else{
        window[object][property] = null;
        if(fieldId.required){
            fieldId.style.border = '1px solid red';
        }else{
            fieldId.style.border = '1px solid #ced4da';
        }
    }
}

const selectFieldValidator = (fieldId,pattern)=>{
    const fieldValue = fieldId.value;

    if(fieldValue !== ""){
        fieldId.style.border = '2px solid green';
    }else{
        fieldId.style.border = '1px solid #ced4da';
    }
}

//generate calling name values
const generateCallingNameValues = ()=>{
    const callingNames = document.querySelector('#callingname');
    callingNames.innerHTML = '';

    callingNamePartList = txtFullName.value.split(' ');
    callingNamePartList.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        callingNames.appendChild(option);
    });
}

//validate calling name value

/*
const callingNameValidator=(fieldId,dataList)=>{
    const typedValue = fieldId.value;
    const options = dataList.getElementsByTagName('option');
    const optionValues = [];
    for (var i = 0; i < options.length; i++) {
        optionValues.push(options[i].value);
    }
    // console.log(optionValues);

    if(optionValues.includes(typedValue)){
        console.log(typedValue);
        fieldId.style.border = '2px solid green';
    }else{
        fieldId.style.border = '1px solid red';
    }
}
*/
const callingNameValidator=(field)=>{
    const callingNameValue = field.value;
    cNameExt = false;

    for (let element of callingNamePartList) {
        if(element == callingNameValue){
            cNameExt = true;
            break;
        }
    }

    // let extIndex = callingNamePartList.map(cname => cname).indexOf(callingNameValue);  //0 //-1

    if(cNameExt){
        field.style.border = '2px solid green';
        employee.callingName = callingNameValue;
    }else{
        field.style.border = '1px solid red';
        employee.callingName = null;
    }
}

// create date field validation function
const dateFieldValidator = (fieldId,object,property)=>{
    const fieldValue = fieldId.value;
    const regPattern = new RegExp("^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$");

    if(fieldValue !== ""){
        if(regPattern.test(fieldValue)){
            fieldId.style.border = '2px solid green';

            //bind value into object property
            console.log(window[object]);
            window[object][property] = fieldValue;
        }else{
            fieldId.style.border = '1px solid red';
            //need to bind null
            window[object][property] = null;
        }
    }else{
        //need to bind null
        window[object][property] = null;
        if(fieldId.required){
            fieldId.style.border = '1px solid red';
        }else{
            fieldId.style.border = '1px solid #ced4da';
        }
    }
}


// create radio field validation function
const radioFieldValidator = (fieldId,object,property)=>{
    const fieldValue = fieldId.value;

    if(fieldValue.checked){
        //bind value into object property
        window[object][property] = fieldValue;
    }else{
        //need to bind null
        window[object][property] = null;
    }
}

// create checkbox validation function
const checkBoxValidator = (fieldId,object,property,trueValue,falseValue,lableId,labelTrueValue,labelFalseValue)=>{

    if(fieldId.checked){
        //bind value into object property
        window[object][property] = trueValue;
        lableId.innerText = labelTrueValue;
    }else{
        //need to bind null
        window[object][property] = falseValue;
        lableId.innerText = labelFalseValue;
    }
}