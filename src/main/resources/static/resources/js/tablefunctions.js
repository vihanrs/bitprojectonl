// create funtion for fill data into table
const fillDataIntoTable = (
  tableID,
  dataList,
  displayProperty,
  editButtonFunction,
  deleteButtonFunction,
  printButtonFunction,
  buttonVisibility = true,
  privilegeObj = null
) => {
  //create variable for store table body
  const tableBody = tableID.children[1];
  tableBody.innerHTML = "";
  dataList.forEach((item, ind) => {
    const tr = document.createElement("tr");

    const tdIndex = document.createElement("td");
    tdIndex.innerText = parseInt(ind) + 1;
    tr.appendChild(tdIndex);

    for (const itemOb of displayProperty) {
      const td = document.createElement("td");
      // td.innerText = item.number;
      if (itemOb.datatype == "String") {
        if (dataList[ind][itemOb.property] == null) {
          td.innerText = "-";
        } else {
          td.innerText = dataList[ind][itemOb.property];
        }
      } else if (itemOb.datatype == "function") {
        td.innerHTML = itemOb.property(dataList[ind]);
      }
      tr.appendChild(td);
    }

    const tdButton = document.createElement("td");

    const buttonEdit = document.createElement("button");
    buttonEdit.className = "btn btn-outline-warning";
    buttonEdit.innerHTML = '<i class = "fa-solid fa-edit"></i>Edit';

    buttonEdit.onclick = () => {
      console.log("Edit Event" + item.id);
      editButtonFunction(item, ind);
    };

    const buttonDelete = document.createElement("button");
    buttonDelete.className = "btn btn-outline-danger ms-1 me-1";
    buttonDelete.innerHTML = '<i class = "fa-solid fa-trash"></i>Delete';

    buttonDelete.onclick = () => {
      // console.log("Delete Event" + item.id);
      deleteButtonFunction(item, ind);
    };

    const buttonPrint = document.createElement("button");
    buttonPrint.className = "btn btn-outline-info";
    buttonPrint.innerHTML = '<i class = "fa-solid fa-print"></i>Print';

    buttonPrint.onclick = () => {
      console.log("Print Event" + item.id);
      printButtonFunction(item, ind);
    };

    if (buttonVisibility) {
      if (privilegeObj != null && privilegeObj.update) {
        tdButton.appendChild(buttonEdit);
      }

      if (privilegeObj != null && privilegeObj.delete) {
        tdButton.appendChild(buttonDelete);
      }

      tdButton.appendChild(buttonPrint);
      tr.appendChild(tdButton);
    } else {
      const empty = document.createElement("p");
      tdButton.appendChild(empty);
      tr.appendChild(tdButton);
    }

    tableBody.appendChild(tr);
  });
};

// create funtion for fill data into table
const fillDataIntoTable2 = (
  tableID,
  dataList,
  displayProperty,
  editButtonFunction,
  deleteButtonFunction,
  printButtonFunction,
  buttonVisibility = true
) => {
  //create variable for store table body
  const tableBody = tableID.children[1];
  tableBody.innerHTML = "";
  dataList.forEach((item, ind) => {
    const tr = document.createElement("tr");

    const tdIndex = document.createElement("td");
    tdIndex.innerText = parseInt(ind) + 1;
    tr.appendChild(tdIndex);

    for (const itemOb of displayProperty) {
      const td = document.createElement("td");
      // td.innerText = item.number;
      if (itemOb.datatype == "String") {
        if (dataList[ind][itemOb.property] == null) {
          td.innerText = "-";
        } else {
          td.innerText = dataList[ind][itemOb.property];
        }
      } else if (itemOb.datatype == "function") {
        td.innerHTML = itemOb.property(dataList[ind]);
      }
      tr.appendChild(td);
    }

    const tdButton = document.createElement("td");
    tdButton.className = "text-center modify-button";

    const divButton = document.createElement("div");

    divButton.className = "dropdown";

    const iButton = document.createElement("i");
    iButton.className = "fa-solid fa-ellipsis-vertical";
    iButton.setAttribute("data-bs-toggle", "dropdown");
    iButton.setAttribute("arial-expand", "false");

    divButton.appendChild(iButton);

    const ulButton = document.createElement("ul");
    ulButton.className = "dropdown-menu";
    const liEditButton = document.createElement("li");
    liEditButton.className = "dropdown-item";
    const liDeleteButton = document.createElement("li");
    liDeleteButton.className = "dropdown-item";
    const liPrintButton = document.createElement("li");
    liPrintButton.className = "dropdown-item";

    ulButton.appendChild(liEditButton);
    ulButton.appendChild(liDeleteButton);
    ulButton.appendChild(liPrintButton);

    divButton.appendChild(ulButton);

    const buttonEdit = document.createElement("button");
    buttonEdit.className = "btn btn-outline-warning";
    buttonEdit.innerHTML = '<i class = "fa-solid fa-edit"></i>';

    buttonEdit.onclick = () => {
      console.log("Edit Event" + item.id);
      editButtonFunction(item, ind);
    };
    liEditButton.appendChild(buttonEdit);

    const buttonDelete = document.createElement("button");
    buttonDelete.className = "btn btn-outline-danger ms-1 me-1";
    buttonDelete.innerHTML = '<i class = "fa-solid fa-trash"></i>';

    buttonDelete.onclick = () => {
      // console.log("Delete Event" + item.id);
      deleteButtonFunction(item, ind);
    };
    liDeleteButton.appendChild(buttonDelete);

    const buttonPrint = document.createElement("button");
    buttonPrint.className = "btn btn-outline-info";
    buttonPrint.innerHTML = '<i class = "fa-solid fa-print"></i>';

    buttonPrint.onclick = () => {
      console.log("Print Event" + item.id);
      printButtonFunction(item, ind);
    };
    liPrintButton.appendChild(buttonPrint);

    if (buttonVisibility) {
      tdButton.appendChild(divButton);

      tr.appendChild(tdButton);
    }

    tableBody.appendChild(tr);
  });
};

// create funtion for fill data into table
const fillDataIntoTable3 = (
  tableID,
  dataList,
  displayProperty,
  editButtonFunction,
  deleteButtonFunction,
  printButtonFunction,
  buttonVisibility = true
) => {
  //create variable for store table body
  const tableBody = tableID.children[1];
  tableBody.innerHTML = "";
  dataList.forEach((item, ind) => {
    const tr = document.createElement("tr");

    const tdIndex = document.createElement("td");
    tdIndex.innerText = parseInt(ind) + 1;
    tr.appendChild(tdIndex);

    for (const itemOb of displayProperty) {
      const td = document.createElement("td");
      // td.innerText = item.number;
      if (itemOb.datatype == "String") {
        if (dataList[ind][itemOb.property] == null) {
          td.innerText = "-";
        } else {
          td.innerText = dataList[ind][itemOb.property];
        }
      } else if (itemOb.datatype == "function") {
        td.innerHTML = itemOb.property(dataList[ind]);
      }
      tr.appendChild(td);
    }

    const tdButton = document.createElement("td");
    tdButton.className = "text-center";

    const divButton = document.createElement("div");

    divButton.className = "from-check";

    const radioInput = document.createElement("input");
    radioInput.className = "form-check-input";
    radioInput.name = "modify";
    radioInput.type = "radio";
    radioInput.onchange = function () {
      divModifybutton.setAttribute("class", "");
      window["editId"] = item;
    };
    divButton.appendChild(radioInput);

    if (buttonVisibility) {
      tdButton.appendChild(divButton);

      tr.appendChild(tdButton);
    }

    tableBody.appendChild(tr);
  });
};

// create funtion for fill data into table
const fillDataIntoTable4 = (
  tableID,
  dataList,
  displayProperty,
  buttonVisibility = true
) => {
  //create variable for store table body
  const tableBody = tableID.children[1];
  tableBody.innerHTML = "";
  dataList.forEach((item, ind) => {
    const tr = document.createElement("tr");

    const tdIndex = document.createElement("td");
    tdIndex.innerText = parseInt(ind) + 1;
    tr.appendChild(tdIndex);

    for (const itemOb of displayProperty) {
      const td = document.createElement("td");
      // td.innerText = item.number;
      if (itemOb.datatype == "String") {
        if (dataList[ind][itemOb.property] == null) {
          td.innerText = "-";
        } else {
          td.innerText = dataList[ind][itemOb.property];
        }
      } else if (itemOb.datatype == "function") {
        td.innerHTML = itemOb.property(dataList[ind]);
      }
      tr.appendChild(td);
    }

    if (buttonVisibility) {
      tr.onclick = function () {
        divModifybutton.setAttribute("class", "");
        window["editId"] = item;
      };
    }

    tableBody.appendChild(tr);
  });
};

// create funtion for fill data into table
const fillDataIntoTable5 = (
  tableID,
  dataList,
  displayProperty,
  editFunction,
  buttonVisibility = true
) => {
  //create variable for store table body
  const tableBody = tableID.children[1];
  tableBody.innerHTML = "";
  dataList.forEach((item, ind) => {
    const tr = document.createElement("tr");

    const tdIndex = document.createElement("td");
    tdIndex.innerText = parseInt(ind) + 1;
    tr.appendChild(tdIndex);

    for (const itemOb of displayProperty) {
      const td = document.createElement("td");
      // td.innerText = item.number;
      if (itemOb.datatype == "String") {
        if (dataList[ind][itemOb.property] == null) {
          td.innerText = "-";
        } else {
          td.innerText = dataList[ind][itemOb.property];
        }
      } else if (itemOb.datatype == "function") {
        td.innerHTML = itemOb.property(dataList[ind]);
      }
      tr.appendChild(td);
    }

    if (buttonVisibility) {
      tr.onclick = function () {
        divModifybutton.setAttribute("class", "");
        editFunction(item);
        window["editId"] = item;
      };
    }

    tableBody.appendChild(tr);
  });
};
