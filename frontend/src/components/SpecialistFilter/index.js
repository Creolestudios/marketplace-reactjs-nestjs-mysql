import React, { useState } from "react";
import { Form, Checkbox, Divider, Button, Select } from "antd";
import { TaskTitle } from "../../CommonStyle";
import { FilterFormWrapper, FilterWrapper } from "../Filter/style";
import { useDispatch, useSelector } from "react-redux";
import IntlMessages from "@iso/components/utility/intlMessages";
import task from "@iso/redux/task/actions";
import filterAction from "@iso/redux/userTypeAndFilter/actions";

const { getSpecialist } = task;

const CheckboxGroup = Checkbox.Group;

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const Filter = (props) => {
  const { updateSpecialistFilter, clearAll , otherSpecialistFields ,updatePagination} = filterAction;

  let {specialistListFilter} = useSelector(
    (state) => state.userTypeAndFilter
  );
  const [pref, setPref] = useState([]);

  const plainOptions = Object.keys(specialistListFilter);

  const [specialistFilterForm] = Form.useForm();
  let Category = useSelector((state) => state.Categories);
  let userStatus = useSelector((state)=> state.Auth.userStatus)

  let parentCategory = Category.allParentCategories;
  let idWiseSubCategories = Category.idWiseSubCategories;
  const [subcatList, setSubcatList] = useState([]);
  const [parentCatValue, setParentCatValue] = useState(null);
  const [subCatValue, setSubCatValue] = useState(null);

  const dispatch = useDispatch();

  // const [indeterminate, setIndeterminate] = React.useState(true);
  // const [checkAll, setCheckAll] = React.useState(false);

  const onChange = (e) => {
    setPref(e)
  };


  const handleSubmit = (data) => {
    let payload = {
      business: pref.includes("business") ? 1 : 0,
      freelancer: pref.includes("freelancer") ? 1 : 0,
      rating_above_4: pref.includes("Rating above 4") ? 1 : 0,
      nemid_authorization: pref.includes("Nemid authorization") ? 1 : 0,
      search: "",
      page: 1,
      limit: 10,
      category: parentCatValue,
      sub_category: subCatValue,
    };
    dispatch(getSpecialist(payload));
    dispatch(updateSpecialistFilter({
      business: pref.includes("business") ? 1 : 0,
      freelancer: pref.includes("freelancer") ? 1 : 0,
      "Rating above 4": pref.includes("Rating above 4") ? 1 : 0,
      "Nemid authorization": pref.includes("Nemid authorization") ? 1 : 0,
    }));
    dispatch(otherSpecialistFields({
      category: parentCatValue,
      sub_category: subCatValue,
      city: null
    }))
    let pagePayload = {
      type: "specialistList",
      currentPage: {
        page: 1,
        limit: 10,
      },
    };
    dispatch(updatePagination(pagePayload));
  };

  const handleCategory = (value) => {
    specialistFilterForm.resetFields(["subCategory"]);
    setParentCatValue(value);
    let sublist = idWiseSubCategories[value];
    setSubcatList(sublist);
  };
  const handleSubCategory = (value) => {
    setSubCatValue(value);
  };
  const handleClearAll = () => {
    dispatch(
      clearAll({
        payload: {
          business: 0,
          freelancer: 0,
          "rating above 4": 0,
          "nemid authorization": 0,
        },
        type: "specialistListFilter",
      })
    );
    let payload = {
      business: 0,
      freelancer: 0,
      "rating_above_4": 0,
      "nemid_authorization": 0,
      page: 1,
      limit: 10,
      category: null,
      sub_category: null,
    };
    dispatch(getSpecialist(payload));
    specialistFilterForm.resetFields();
  };
  return (
    <>
      <FilterWrapper>
        <Form
          {...formItemLayout}
          form={specialistFilterForm}
          onFinish={handleSubmit}
        >
          <div className="filter-header">
            <div className="title">
              <IntlMessages id="filter" />
            </div>
            <span
              onClick={() => {
                props.filterRef.current.style.display = "none";
                document.body.style.overflow = "";
              }}
              className="icon-cross"
            ></span>
          </div>

          <FilterFormWrapper>
            <Form.Item name="select" label={<IntlMessages id="category" />}>
              <Select
                placeholder={<IntlMessages id="select" />}
                onChange={handleCategory}
                defaultValue={otherSpecialistFields.category}
              >
                {parentCategory &&
                  parentCategory.map((x, y) => (
                    <option value={x.id}>
                      {<IntlMessages id={`${x.name}`} />}
                    </option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="subCategory"
              label={
                <IntlMessages
                  id="sub-category"
                  // className="special-subcategory"
                />
              }
            >
              <Select
                className="special-subcategory"
                mode="multiple"
                // allowClear
                showArrow
                placeholder={<IntlMessages id="select" />}
                defaultValue={otherSpecialistFields.sub_category}
                onChange={handleSubCategory}
              >
                {subcatList.map((x, y) => (
                  <option value={x.id}>
                    {<IntlMessages id={`${x.name}`} />}
                  </option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="select3" label={<IntlMessages id="City" />}>
              <Select placeholder={<IntlMessages id="select" />}>
                <Option value="copenhagen">
                  {<IntlMessages id="city1" />}
                </Option>
                <Option value="aarhus">{<IntlMessages id="city2" />}</Option>
                <Option value="aalborg">{<IntlMessages id="city3" />}</Option>
                <Option value="roskilde">{<IntlMessages id="city4" />}</Option>
                <Option value="helsingor">{<IntlMessages id="city5" />}</Option>
              </Select>
            </Form.Item>
          </FilterFormWrapper>
          <TaskTitle></TaskTitle>
         
               <Form.Item name="allfilter" valuePropName="checked">
                 <Checkbox.Group options={plainOptions} value={pref} onChange={onChange} />
                </Form.Item>          
          <div className="filter-footer">
            <Divider />
            <Button
              className="apply-btn btn btn-border"
              htmlType="submit"
              style={{ float: "left" }}
              disabled={userStatus===3}
            >
              <IntlMessages id="button.apply" />
            </Button>
            <Button
              className="clear-btn btn btn-clear"
              style={{ float: "right" }}
              onClick={() => handleClearAll()}
              disabled={userStatus===3}
            >
              <IntlMessages id="clear_all" />
            </Button>
          </div>
        </Form>
      </FilterWrapper>
    </>
  );
};

export default Filter;
