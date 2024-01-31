window.onload = () => {
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
