import React, { useState, useEffect } from "react";
import { Input, Form, Select } from "antd";
import { ButtonLink } from "../../CommonStyle";
import { InfoCircleOutlined } from "@ant-design/icons";
import { AppConstant, BudgetGreaterZero } from "@iso/config/constant";
import IntlMessages from "@iso/components/utility/intlMessages";
const { Option } = Select;
const AddServicesForm = ({ i, type, form, idWiseServices }) => {
  const selectionHandler = (service_id) => {
    form.setFields([
      {
        name: `service_price${i}`,
        value: idWiseServices[service_id].estimated_price,
      },
    ]);
  };
  return (
    <>   
      {type !== "select" ? (
        <IntlMessages id="ant.form.nameOfServices">
        {(placeholder) => (
          <Form.Item
          rules={[
            {
              required: true,
              message: "Please type your service name",
            },
          ]}
          name={`service_name${i}`}
          label="Name of Service"
        >
            <Input placeholder={placeholder}/>
          </Form.Item>
        )}
      </IntlMessages>
        
        
       
      ) : (
        <IntlMessages id="ant.form.nameOfServices">
        {(placeholder) => (
          <Form.Item
          rules={[
            {
              required: true,
              message: "Please type your service name",
            },
          ]}
          name={`service_id${i}`}
          label="Name of Service"
        >
           <Select onChange={selectionHandler} placeholder={placeholder}>
            {Object.values(idWiseServices).map((data) => (
              <Option value={data.id} key={data.id}>
                {<IntlMessages id={`${data.name}`} />}
              </Option>
            ))}
          </Select>
          </Form.Item>
        )}
      </IntlMessages>
       
         
        
      )}

      {type !== "select" ? (
         <IntlMessages id="ant.form.estimatedPrice">
         {(placeholder) => (
           <Form.Item
           name={`estimate_price${i}`}
           label={<IntlMessages id="ant.form.estimatedPrice" />}
           tooltip={{
             title:
               "This field is obligatory. Based on the estimated prices provided by specialists, Marketplace helps to find better matching tasks.",
             icon: <InfoCircleOutlined />,
           }}
           rules={[
             {
               required: true,
               message: "Please input estimate price",
             },
             {
               pattern: BudgetGreaterZero,
               message: AppConstant.FormValidation.budgetGreaterZeroRange,
             },
           ]}
         >
              <Input type="number" placeholder={placeholder} />
           </Form.Item>
         )}
       </IntlMessages>
       
        
     
      ) : (
        <Form.Item
          name={`service_price${i}`}
          label="Estimated Price"
          tooltip={{
            title:
              "This field is obligatory. Based on the estimated prices provided by specialists, Marketplace helps to find better matching tasks.",
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: true,
              message: "Please input estimate price",
            },
          ]}
        >
          <Input
            type="number"
            placeholder="Price will be set as per service"
            disabled
          />
        </Form.Item>
      )}
    </>
  );
};

const AddMultipleServicesForm = ({ form, idWiseServices ,setNumberOfServices ,NumberOfServices }
  ) => {
  // const [NumberOfServices, setNumberOfServices] = useState([
  //   { type: "select" },
  // ]);
  const servicesList = Object.values(idWiseServices);
  useEffect(() => {
    servicesList.length === 0 &&
    setNumberOfServices((ps) => [{ type: "text" }]);
    servicesList.length > 0 &&
    setNumberOfServices((ps) => [{ type: "select" }]);
  }, [servicesList.length]);

  return (
    <>
      {NumberOfServices.map((data, i) => 
        {
        return <AddServicesForm
          idWiseServices={idWiseServices}
          form={form}
          i={i}
          type={data.type}
        />}
      )    
      }

      <ButtonLink
        className="btn blue-btn-border"
        style={{ display: "inline", width: "auto", marginRight: "20px" }}
        onClick={() => setNumberOfServices((ps) => [...ps, { type: "text" }])}
      > <IntlMessages id="createnewservice" />
      </ButtonLink>

      {servicesList.length > 0 && (
        <ButtonLink
          className="btn blue-btn-border"
          style={{ display: "inline", width: "auto", marginRight: "20px" }}
          onClick={() =>
            setNumberOfServices((ps) => [...ps, { type: "select" }])
          }
        > 
          <IntlMessages id="addnewservice" />
        </ButtonLink>
      )}
{NumberOfServices.length > 1 && <ButtonLink
        className="btn blue-btn-border"
        style={{
          display: "inline",

          width: "auto",
        }}
        onClick={() =>
          setNumberOfServices((ps) => {
            ps.length > 1 && ps.pop();
            return [...ps];
          })
        }
      >
        <IntlMessages id="remove" />
      </ButtonLink>}     
    </>
  );
};

export default AddMultipleServicesForm;
