function getCatAndSubCat(data, idWiseSubCategories, idWiseParentCategories) {
  const { category, sub_category } = data.albumCategory;

  const subcat = idWiseSubCategories[category].filter(
    (d) => d.id === sub_category
  );
  const cat = idWiseParentCategories[category];
  return [cat, subcat[0].name];
}

export default getCatAndSubCat;
