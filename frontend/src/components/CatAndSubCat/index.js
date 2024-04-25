import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Select, Form, Input } from "antd";
import IntlMessages from "@iso/components/utility/intlMessages";
const { Option } = Select;

function CatAndSubCat({ form, type, cat, subcat }) {
  const Categories = useSelector((state) => state.Categories);

  const [subCategoriesData, setsubCategoriesData] = useState([]);
  const [showOtherCategory, setShowOtherCategory] = useState(false);

  useEffect(() => {
    const sub = Categories.idWiseSubCategories[cat] || [];
    setsubCategoriesData((d) => sub);
    // form.setFields([
    //   {
    //     name: "sub_category",
    //     value: !isNaN(subcat) && parseInt(subcat),
    //   },
    // ]);
    form.setFields([
      {
        name: "category",
        value: cat && parseInt(cat),
      },
    ]);
  }, [subcat, cat]);

  const getSubCategoriesData = () => {
    const currentCategory = form.getFieldValue("category");
    const sub = Categories.idWiseSubCategories[currentCategory] || [];
    form.resetFields(["sub_category"]);
    setsubCategoriesData((d) => sub);
  };

  // getSubCategoriesData();
  // form.setFields([
  //   {
  //     name: "sub_category",
  //     value: 2,
  //   },
  // ]);
const handleSubcat = (e) => {
let otherSubList = new Set([54,61,77,84,91,101,117,126,143 ,179 ,181 ,180,182])
if(otherSubList.has(e)){
  setShowOtherCategory(true)
}else{
  setShowOtherCategory(false)
}
}
  return (
    <>
      <IntlMessages id="sidebar.selectbox">
        {(placeholder) => (
          <Form.Item
            name="category"
            label={<IntlMessages id="antTable.title.category" />}
            rules={[
              {
                required: true,
                message: <IntlMessages id="msg" />,
              },
            ]}
          >
            <Select onChange={getSubCategoriesData} placeholder={placeholder}>
              {Categories.allParentCategories.map((data) => (
                <Option key={data.id} value={data.id}>
                  {data.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
      </IntlMessages>
      {type !== "category" && (
        <>
          <IntlMessages id="sidebar.selectbox">
            {(placeholder) => (
              <Form.Item
                name="sub_category"
                label={<IntlMessages id="antTable.title.sub_category" />}
                className="remove-mobile-space"
                rules={[
                  {
                    required: true,
                    message: <IntlMessages id="modal-msg" />,
                  },
                ]}
              >
                <Select placeholder={placeholder} onChange={handleSubcat}>
                  {subCategoriesData.map((data) => (
                    <Option key={data.id} value={data.id}>
                      {data.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          </IntlMessages>

          <IntlMessages id="placeholder">
            {(placeholder) => (
              <Form.Item
                // className="label-remove"
                name="other_sub_category"
                label={<IntlMessages id="antd.form.label.OtheSubCategory" />}
                style={!showOtherCategory ? {display: "none"} : {display: "block"}}
              >
                <Input placeholder={placeholder} />
              </Form.Item>
            )}
          </IntlMessages>
        </>
      )}
    </>
  );
}

export default CatAndSubCat;
