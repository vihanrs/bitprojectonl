
const fillDataIntoSelect = (fieldId,message,dataList,property)=>{
    fieldId.innerHTML = '';
    let optionMessage = document.createElement('option');
    optionMessage.value = '';
    optionMessage.selected = 'selected';
    optionMessage.disabled = 'disable';
    optionMessage.innerText = message;
    fieldId.appendChild(optionMessage);

    for (const data of dataList) {
        let option = document.createElement('option');
        option.value = JSON.stringify(data); //convert into JSON string
        option.innerText = data[property];
        fieldId.appendChild(option);
    }
}