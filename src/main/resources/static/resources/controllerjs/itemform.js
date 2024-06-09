window.onload = () => {
  userPrivilages = ajaxGetRequest("/privilege/bylogedusermodule/Item");
  //call table refresh function
  refreshItemForm();
};

//define function for refresh item form
const refreshItemForm = () => {
  item = {};

  itemStatuses = ajaxGetRequest("/itemstatus/list");
  fillDataIntoSelect(
    cmbItemStatus,
    "Select Status",
    itemStatuses,
    "name",
    "Not-Available"
  );
  //bind default value
  //use of JSON.parse  beacuse values are dynamic
  item.itemstatus_id = JSON.parse(cmbItemStatus.value);
  cmbItemStatus.style.border = "2px solid green";

  brands = ajaxGetRequest("/brand/list");
  fillDataIntoSelect(cmbBrand, "Select Brand", brands, "name");

  categories = ajaxGetRequest("/category/list");
  fillDataIntoSelect(cmbCategory, "Select Category", categories, "name");

  subcategories = ajaxGetRequest("/subcategory/list");
  fillDataIntoSelect(
    cmbSubCategory,
    "Select Sub-Category",
    subcategories,
    "name"
  );

  unittypes = ajaxGetRequest("/unittype/list");
  fillDataIntoSelect(cmbUnitType, "Select Unit Type", unittypes, "name");

  packagetypes = ajaxGetRequest("/packagetype/list");
  fillDataIntoSelect(
    cmbPackageType,
    "Select Package Type",
    packagetypes,
    "name"
  );

  resetIntoDetault([
    cmbBrand,
    cmbSubCategory,
    cmbCategory,
    cmbUnitType,
    cmbPackageType,
    txtUnitSize,
    txtItemName,
    txtSalePrice,
    txtPurchasePrice,
    txtNote,
    textROP,
    textROQ,
  ]);

  if (userPrivilages.insert) {
    btnSave.disabled = "";
  } else {
    btnSave.disabled = "disabled";
  }
};

//define function for filter sub category by category
const filterSubCategory = () => {
  subcategoriesByCategory = ajaxGetRequest(
    "/subcategory/listbycategory?categoryId=" + JSON.parse(cmbCategory.value).id //query parameter
  );

  fillDataIntoSelect(
    cmbSubCategory,
    "Select Sub-Category",
    subcategoriesByCategory,
    "name"
  );
};

//define function for filter sub category by brand
const filterCategory = () => {
  categoriesByBrand = ajaxGetRequest(
    "/category/listbybrand/" + JSON.parse(cmbBrand.value).id // path variable
  );
  fillDataIntoSelect(cmbCategory, "Select Category", categoriesByBrand, "name");
};

//define function for generate item name
const generateItemName = () => {
  if (
    cmbBrand.value != "" &&
    cmbCategory.value != "" &&
    cmbSubCategory.value != "" &&
    txtUnitSize.value != "" &&
    cmbUnitType.value != "" &&
    cmbPackageType.value != ""
  ) {
    txtItemName.value =
      JSON.parse(cmbBrand.value).name +
      " " +
      JSON.parse(cmbSubCategory.value).name +
      " " +
      txtUnitSize.value +
      JSON.parse(cmbUnitType.value).name +
      " " +
      JSON.parse(cmbPackageType.value).name;
    item.itemname = txtItemName.value;
    txtItemName.style.border = "2px solid green";
  }
};

const checkFormErrors = () => {
  let errors = "";

  //check all required fields
  // if (item.itemname == null) {
  //   errors = errors + "Please enter item name...! ";
  // }

  //use when this property not in selected property list which passing to the backend
  if (cmbCategory.value == "") {
    errors = errors + "Please select category...! ";
  }

  // if (item.category_id == null) {
  //   errors = errors + "Please select category...! ";
  // }

  return errors;
};

const submitItemForm = () => {
  //check form errors
  let errors = checkFormErrors();
  if (errors == "") {
    //get user confirmation
    let userConfirmation = confirm(
      "Are you sure to following item details \n+" + "Item name" + item.itemname
    );

    if (userConfirmation) {
      //call post service
      let serviceResponse = ajaxRequestBody("/item", "POST", item);
      if (serviceResponse == "OK") {
        alert("Save successfully");
        formItem.reset();
        refreshItemForm();
      } else {
        alert("Save not successfully \n" + serviceResponse);
      }
    }
  } else {
    alert("Form has following errors.." + errors);
  }
};
