window.onload = () => {
  //call table refresh function
  refreshItemTable();
};

const refreshItemTable = () => {
  const items = ajaxGetRequest("/item/findall");

  const displayPropertyList = [
    { datatype: "String", property: "itemcode" },
    { datatype: "String", property: "itemname" },
    { datatype: "String", property: "email" },
    { datatype: "function", property: getRole },
    { datatype: "function", property: getUserStatus },
  ];
};
