import React, { useRef, useEffect, useState } from "react";
import { Form, Checkbox, Divider, Button, Select, Slider, Input } from "antd";
import { TaskTitle } from "../../CommonStyle";
import { FilterFormWrapper, FilterWrapper } from "../Filter/style";
import IntlMessages from "@iso/components/utility/intlMessages";
import { useDispatch, useSelector } from "react-redux";
import task from "@iso/redux/task/actions";
import filterAction from "@iso/redux/userTypeAndFilter/actions";
import {
  AppConstant,
  NameRegex,
  PasswordStrengthRegex,
  PhoneNumberMaskRegex,
  BudgetNumber,
  zipCodeRegex,
} from "@iso/config/constant";
const { findTask, getInvitedTask } = task;

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const FindFilter = (props) => {
  let { findTaskCategoryFilter , otherFields ,searchText  } = useSelector(
    (state) => state.userTypeAndFilter
  );
  const [pref, setPref] = useState([]);
  const [radius, setRadius] = useState(20);
  const [sliderFreez, setSliderFreez] = useState(false);
  const { updatePagination, updateFindTaskCategory, otherField ,searchValue } = filterAction;
  const [findFilterForm] = Form.useForm();
  let Category = useSelector((state) => state.Categories);
  const { profile } = useSelector((state) => state.Profile);
  let parentCategory = Category.allParentCategories;
  let idWiseSubCategories = Category.idWiseSubCategories;
  const [subcatList, setSubcatList] = useState([]);
  const [parentCatValue, setParentCatValue] = useState(null);
  const [subCatValue, setSubCatValue] = useState(null);
  const [budget, setBudget] = useState([]);
  const [defaultBudget, setDefaultBudget] = useState([]);


  let pagination = useSelector(
    (state) => state.userTypeAndFilter.pagination.findTask
  );
  let userStatus = useSelector(
  (state) => state?.Auth?.userStatus
  );
  //let userStatus=1
  const dispatch = useDispatch();
  const { updateFindTaskFilter, clearAll  } = filterAction;
  let AllOptions = useSelector(
    (state) => state.userTypeAndFilter.findTaskFilter
  );
  const plainOptions = Object.keys(AllOptions);
  const defaultCheckedList = plainOptions.filter(
    (ele) => AllOptions[ele] === 1
  );
  const inputField = useRef(null);
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);

  function onChanged(value) {
    setRadius(value);
  }

  useEffect(() => {
    sessionStorage.getItem("is_guest") === null && dispatch(getInvitedTask());
  }, []);
  useEffect(() => {
findFilterForm.setFieldsValue({
  zip_Code: otherFields.zipCode,
  // Task_Budget: otherFields.selectedBudget
});
setDefaultBudget(otherFields.selectedBudget)
    setPref(defaultCheckedList)

    setParentCatValue(findTaskCategoryFilter.category);
    let sublist = idWiseSubCategories[findTaskCategoryFilter.category];
    setSubcatList(sublist);
    }, [pagination, otherFields])
  useEffect(() => {
    profile.longitude && profile.latitude
      ? setSliderFreez(false)
      : setSliderFreez(true);
  }, [profile]);
  const onChange = (e) => {
    setPref(e)
  };
  const handleSubmit = (data) => {
    let budget = [];
   
    data.Task_Budget?.map((eachValue) =>
      budget.push({
        start_value: parseInt(eachValue.split("-")[0]),
        end_value: parseInt(eachValue.split("-")[1]),
      })
    );
    setBudget(budget);
    let payload = {
      budget_object: budget.length !== 0 ? budget : null, //
      zip_code: parseInt(data.zip_Code),
      task_with_no_bid: pref.includes("Tasks with no bids")  ? 1 : 0,
      remote_work: pref.includes("Remote Work") ? 1 : 0,
      nemid_authorization: pref.includes("NemID Autorization") ? 1 : 0,
      task_urgent: pref.includes("Urgent Task") ? 1 : 0,
      task_for_freelance: pref.includes("Tasks for freelancer") ? 1 : 0,
      task_for_business: pref.includes("Tasks for business") ? 1 : 0,
      placed_bids: pref.includes("Placed Bids") ? 1 : 0,
      page: 1,
      limit: 10, //
      category: parentCatValue,
      sub_category: subCatValue,
      search_radius: !sliderFreez ? radius : null,
      title_search: searchText,
    };
    dispatch(updateFindTaskFilter(
      {
        "Placed Bids": pref.includes("Placed Bids") ? 1 : 0,
        "Tasks for business": pref.includes("Tasks for business") ? 1 : 0,
        "Tasks for freelancer": pref.includes("Tasks for freelancer") ? 1 : 0,
        "Urgent Task": pref.includes("Urgent Task") ? 1 : 0,
        "Tasks with no bids": pref.includes("Tasks with no bids")  ? 1 : 0,
        "NemID Autorization": pref.includes("NemID Autorization") ? 1 : 0,
        "Remote Work": pref.includes("Remote Work") ? 1 : 0,
      }
    ));
 dispatch(otherField({
   zipCode: data.zip_Code ? parseInt(data.zip_Code): null ,
   selectedBudget: data.Task_Budget,
   task_budget: budget.length !== 0 ? budget : null,
 }))
    dispatch(
      updateFindTaskCategory({
        category: parentCatValue,
        sub_category: subCatValue,
      })
    );
    dispatch(findTask(payload));
    let pagePayload = {
      type: "findTask",
      currentPage: {
        page: 1,
        limit: 10,
      },
    };
    dispatch(updatePagination(pagePayload));
  };
  const handleCategory = (value) => {
    findFilterForm.resetFields(["subCategory"]);

    setParentCatValue(value);
    let sublist = idWiseSubCategories[value];
    setSubcatList(sublist);
  };
  const handleSubCategory = (value) => {
    setSubCatValue(value);
  };
  const handleClearAll = () => {
    setParentCatValue(null)
    setSubCatValue(null)
    dispatch(searchValue(null))

    dispatch(
      clearAll({
        payload: {
          "Placed Bids": 0,
          "Tasks for business": 0,
          "Tasks for freelancer": 0,
          "Urgent Task": 0,
          "Tasks with no bids": 0,
          "NemID Autorization": 0,
          "Remote Work": 0,
        },
        type: "findTaskFilter",
      })
    );
    let payload = {
      task_budget: [0, -1],
      task_with_no_bid: AllOptions["Tasks with no bids"] === 1 ? 1 : 0,
      remote_work: 0,
      nemid_authorization: 0,
      task_urgent: 0,
      task_for_freelance: 0,
      task_for_business: 0,
      placed_bids: 0,
      page: 1,
      limit: 10,
    };
  setPref([])
    dispatch(findTask(payload));
    dispatch(
      updateFindTaskCategory({
        category: null,
        sub_category: null,
      })
    );
    dispatch(otherField({
      zipCode: null ,
      selectedBudget: null,
      task_budget: null,
    }))
    let payloadPage = {
      type: "findTask",
      currentPage: {
        page: 1,
        limit: 10,
      },
    };
    dispatch(updatePagination(payloadPage));
    findFilterForm.resetFields();
  };
  return (
    <>
      <Form
        {...formItemLayout}
        form={findFilterForm}
        name="FindFilter-Form"
        onFinish={handleSubmit}
      >
        <FilterWrapper>
          <div className="filter-header">
            <div className="title">Filters</div>
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
              <IntlMessages id="sidebar.selectbox">
                {(placeholder) => (
                  <Select placeholder={placeholder} defaultValue={findTaskCategoryFilter.category} onChange={handleCategory} >
                    {parentCategory &&
                      parentCategory.map((x, y) => (
                        <option value={x.id}>
                          {<IntlMessages id={`${x.name}`} />}
                        </option>
                      ))}
                  </Select>
                )}
              </IntlMessages>
            </Form.Item>
            <Form.Item
              name="subCategory"
              label={<IntlMessages id="sub-category" />}
            >
              <IntlMessages id="sidebar.selectbox">
                {(placeholder) => (
                  <Select
                    className="special-subcategory"
                    // mode="multiple"
                    showArrow
                    placeholder={placeholder}
                    onChange={handleSubCategory}
                    defaultValue={findTaskCategoryFilter.sub_category}
                  >
                    {subcatList?.map((x, y) => (
                      <option value={x.id}>
                        {" "}
                        {<IntlMessages id={`${x.name}`} />}
                      </option>
                    ))}
                  </Select>
                )}
              </IntlMessages>
            </Form.Item>
            <IntlMessages id="form.profile.zipCode">
                      {(placeholder) => (
                           <Form.Item
                           name="zip_Code"
                           label={<IntlMessages id={placeholder} />}
                           rules={[
                             {
                               pattern: zipCodeRegex,
                               message: AppConstant.FormValidation.zipcodeRequired,
                             },
                           ]}
                         >
                          <Input
                            placeholder={placeholder}
                            style={{borderRadius: "14px"}}
                          />
                        </Form.Item>
                      )}
                    </IntlMessages>
      
           
            <Form.Item label={<IntlMessages id="radiusOfSearch" />}>
              <div className="distance-slider">
                <Slider
                  defaultValue={radius}
                  onChange={onChanged}
                  disabled={sliderFreez}
                  // onAfterChange={onAfterChange}
                  tooltipVisible={false}
                />
                <div className="distance-text">{radius} Km</div>
              </div>
            </Form.Item>
      
              <div class="custom" ref={inputField}>
                <IntlMessages id="sidebar.selectbox">
                  {(placeholder) => (
                      <Form.Item
                      name="Task_Budget"
                      label={<IntlMessages id="taskBudget" />}
                    >
                    <Select
                      placeholder={placeholder}
                      mode="multiple"
                      // onChange={handleChange}
                      optionLabelProp="label"
                      getPopupContainer={() => inputField.current}
                      defaultValue={defaultBudget}
                    >
                      <Option value="50kr - 100kr">
                        <IntlMessages id="opt2" />
                      </Option>
                      <Option value="100kr - 150kr">
                        <IntlMessages id="opt3" />
                      </Option>
                      <Option value="150kr - 200kr">
                        <IntlMessages id="opt4" />
                      </Option>
                      <Option value="200kr - 350kr">
                        <IntlMessages id="opt5" />
                      </Option>
                      <Option value="350kr - 350kr">
                        <IntlMessages id="opt6" />
                      </Option>
                    </Select>
            </Form.Item>

                  )}
                </IntlMessages>
              </div>
          </FilterFormWrapper>

          <TaskTitle>
            <IntlMessages id="task_status" />
          </TaskTitle>
     
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
              disabled={userStatus===3}
              onClick={() => handleClearAll()}
            >
              <IntlMessages id="clear_all" />
            </Button>
          </div>
        </FilterWrapper>
      </Form>
    </>
  );
};

export default FindFilter;
