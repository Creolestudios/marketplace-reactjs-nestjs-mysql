import React, { useState } from "react";
import { Input, Form, Select, Divider, Button } from "antd";
import { AddTypeServiceModel } from "./style";
import CatAndSubCat from "../CatAndSubCat";
import { FormWrapper, ButtonLink } from "../../CommonStyle";
import AddMultipleServicesForm from "@iso/components/AddMultipleServicesForm";
import IntlMessages from "@iso/components/utility/intlMessages";
// const { TextArea } = Input;

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const { Option } = Select;

// This component will be use to make modal for add category , add sub category and add services
// if props.type === category, than it will get pass to the CatAndSubCat component and that component will only show category input item and nothing else. Also as type is not services so services input box will also not appear

// If props.type === services than it will show whole form
// if props.type is nothing or subcategory , services will not show up, and as it is not onlt set to category CatAndSubCat component will render catergory and subcategory input box

const AddTypeService = (props) => {
  const handleAdd = () => {
    props.form.submit()
    props.setNumberOfServices([
      { type: "text" },
    ])
  }

  return (
    <>
      <AddTypeServiceModel>
        <FormWrapper>
          <Form
            form={props.form}
            {...layout}
            name="cat-subcat-services"
            onFinish={props.onFinish}
          >
            <CatAndSubCat
              cat={props.cat}
              // subcat={props.subcat}
              type={props.type}
              form={props.form}
            />

            {props.type === "services" && (
              <>
                <Divider className="category-divider" />
                <AddMultipleServicesForm
                  idWiseServices={{}}
                  form={props.form}
                  setNumberOfServices={props.setNumberOfServices}
                  NumberOfServices={props.NumberOfServices}
                />
              </>
            )}
            <Form.Item className="w-100 btn-wrapper">
              <ButtonLink
                className="btn blue-btn-border"
                onClick={handleAdd}
                style={{ display: "inline", width: "auto" }}
              >
                <IntlMessages id="add" />
              </ButtonLink>
            </Form.Item>
          </Form>
        </FormWrapper>
      </AddTypeServiceModel>
    </>
  );
};

export default AddTypeService;
