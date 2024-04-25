import React from "react";
import { useSelector } from "react-redux";
import { Form, Alert } from "antd";
import { FormWrapper, ButtonLink, BtnWrapper } from "../../CommonStyle";
import IntlMessages from "@iso/components/utility/intlMessages";
import AddMultipleServicesForm from "@iso/components/AddMultipleServicesForm";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const ServiceType = (props) => {
  const { category, sub_category } = props;

  const { error } = useSelector((state) => state.Portfolio);
  const { idWiseMyCategoryData } = useSelector((state) => state.Profile);

  const selectedSubCat = idWiseMyCategoryData[category]
    ? idWiseMyCategoryData[category].filter(
        (data) => data.data.id === sub_category
      )
    : [];
  const idWiseServices = {};
  selectedSubCat[0] &&
    selectedSubCat[0].services.forEach(
      (data) => (idWiseServices[data.id] = data)
    );

  const submitServices = (values) => {
    const keys = Object.keys(values);
    const serviceArray = [];
    const priceArray = [];
    const serviceIdArray = [];
    keys.forEach((x) => {
      if (x.includes("service_name")) {
        serviceArray.push(values[x]);
      }

      if (x.includes("estimate_price")) {
        priceArray.push(parseInt(values[x]));
      }
      if (x.includes("service_id")) {
        serviceIdArray.push(values[x]);
      }

      if (x.includes("service_price")) {
        priceArray.push(parseInt(values[x]));
      }
    });

    const addingExistingServices = serviceIdArray.map((data) => ({
      service_id: data,
    }));
    const payload = {
      service_object: [
        ...serviceArray.map((x, i) => ({
          estimate_price: priceArray[i],
          service_name: x,
        })),
        ...addingExistingServices,
      ],
    };
    // above algorithm is for creating such data structure (given below) : form should be submitted in such format
    //   {
    //   "service_object": [
    //       {
    //           "service_id": 10
    //       },
    //       {
    //           "service_name": "pipe clean",
    //           "estimate_price": 59472
    //       }
    //   ]
    // }
    props.onFinish(payload);
  };
  return (
    <>
      <FormWrapper className="service-modal">
        <div>
          {error && (
            <Alert
              style={{ borderRadius: "30px", marginBottom: "20px" }}
              message={error}
              type="warning"
              showIcon
            />
          )}
        </div>
        <Form
          {...layout}
          form={props.form}
          name="control-hooks"
          onFinish={submitServices}
        >      
          <AddMultipleServicesForm
            idWiseServices={idWiseServices}
            form={props.form}
            setNumberOfServices={props.setNumberOfServices}
            NumberOfServices={props.NumberOfServices}
          />
          <div style={{ width: "100%", marginTop: "20px" }}>
            {props.children}
          </div>

          <Form.Item className="w-100" label="Photos/Videos">
            <ButtonLink
              className="btn blue-btn-border"
              style={{
                display: "inline-block",
                float: "left",
                width: "auto",
              }}
              onClick={props.serviceUploadmodel}
            >
              <IntlMessages id="UPLOAD" />
            </ButtonLink>
          </Form.Item>

          <Form.Item className="w-100 btn-wrapper">
            <BtnWrapper>
              <ButtonLink
                style={{ width: "auto" }}
                className="btn"
                type="primary"
                onClick={props.form.submit}
              >
                <IntlMessages id="button.add" />
              </ButtonLink>
              <ButtonLink
                style={{ width: "auto" }}
                className="btn btn-cancel"
                onClick={() =>
                  {Object.values(idWiseServices).length > 0 ? props.modalCancel("select") : props.modalCancel("text")}
                  }
              >
               <IntlMessages id="cancel" />
              </ButtonLink>
            </BtnWrapper>
          </Form.Item>
        </Form>
      </FormWrapper>
    </>
  );
};

export default ServiceType;
