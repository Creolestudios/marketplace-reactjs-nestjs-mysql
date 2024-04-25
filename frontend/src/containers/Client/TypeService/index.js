import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tabs, Modal, Collapse, Form } from "antd";
import { ButtonLink, SmallTitle, BtnWrapper } from "../../../CommonStyle";

import { ServiceTabWrapper, DropDetail } from "./style";
import { Price } from "@iso/components/Card/style";
import AddCatSubCatServiceModal from "@iso/components/AddCatSubCatServiceModal";
import catActions from "@iso/redux/categoriesAndServices/actions";
import IntlMessages from "@iso/components/utility/intlMessages";
const { Panel } = Collapse;

const { TabPane } = Tabs;

const formTypes = {
  category: "category",
  subcategory: "subcategory",
  services: "services",
};
const formNames = {
  category: <IntlMessages id="addCategory" />,
  subcategory: <IntlMessages id="antd.label.title.AddSubCategory" />,
  services: <IntlMessages id="ant.form.typeOfServices" />,
};

function TypeServices({ isMyProfile }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  let userStatus = useSelector(
  (state) => state?.Auth?.userStatus
  );
  //let userStatus=1
  const [modal, setModal] = useState({
    open: false,
    type: formTypes.services,
    title: formNames.services,
  });
  const [NumberOfServices, setNumberOfServices] = useState([
    { type: "select" },
  ]);
  const { categoriesData, idWiseMyCategoryData } = useSelector(
    (state) => state.Profile
  );

  const [catAndSubcat, setcatAndSubcat] = useState({});
  useEffect(() => {
    setcatAndSubcat({
      cat: categoriesData[0] && categoriesData[0]?.parentCategoryData.id,
      subcat:
        categoriesData[0] && categoriesData[0]?.subCategoryData[0]?.data?.id,
    });
  }, [categoriesData]);

  const submitCatForm = (values) => {
    if (!values.other_sub_category) values["other_sub_category"] = "";
    const keys = Object.keys(values);
    // if (values.sub_category === 2 && !values.other_sub_category) {
    //   form.setFields([
    //     {
    //       name: "other_sub_category",
    //       errors: ["Please type other sub category"],
    //     },
    //   ]);
    // }
    const serviceArray = [];
    const priceArray = [];
    keys.forEach((x) => {
      if (x.includes("service_name")) {
        serviceArray.push(values[x]);
      }
      if (x.includes("estimate_price")) {
        priceArray.push(parseInt(values[x]));
      }
    });
    const payload = {
      service_object: serviceArray.map((x, i) => ({
        category: values.category,
        sub_category: values.sub_category,
        other_sub_category: values.other_sub_category,
        estimate_price: priceArray[i],
        service_name: x,
      })),
    };
    console.log("payaaaload",payload)
    // if other_sub_cat is not selected we still have to send "other_sub_cat": "" in request

    // after validation we will send api call for adding catandservices
    dispatch(
      catActions.addCatAndServices({
        payload: payload,
        values: {
          category: values.category,
          sub_category: values.sub_category,
        },
        type: modal.type,
      })
    );

    resetCat()
    //resetForm();
  };
  const handleClose = (value) => {
    resetCat()
  }
const resetCat = () => {
  let newCat = form.getFieldValue(["category"])
    let newSubcat = form.getFieldValue(["sub_category"])
    form.resetFields()
    form.setFields([
      {
        name: "category",
        value: newCat,
      },
      {
        name: "sub_category",
        value: newSubcat,
      },
    ])
    setNumberOfServices([
      { type: "text" },
    ])
    setModal((ps) => ({ ...ps, open: false }));
}
  return (
    <>
      <ServiceTabWrapper>
        {isMyProfile ? (
          <BtnWrapper
            className={
              categoriesData.length > 0
                ? "Category-btn"
                : "Category-btn head-Category"
            }
          >
            <ButtonLink
              className="btn category"
              disabled={userStatus===3}
              onClick={() => {
                setModal({
                  open: true,
                  type: formTypes.category,
                  title: formNames.category,
                });
              }}
            >
              <IntlMessages id="addnewcategory" />
            </ButtonLink>
            <ButtonLink
              onClick={() => {
                setModal({
                  open: true,
                  type: formTypes.subcategory,
                  title: formNames.subcategory,
                });
              }}
              disabled={userStatus===3}
              className="btn blue-btn-border sub-category"
            >
              <IntlMessages id="addnewsubcategory" />
            </ButtonLink>
          </BtnWrapper>
        ) : null}
        {categoriesData.length > 0 ? (
          <Tabs
            onChange={(x) =>
              setcatAndSubcat((ps) => ({
                ...ps,
                cat: parseInt(x),
                subcat: parseInt(idWiseMyCategoryData[x][0]?.data?.id),
              }))
            }
          >
            {categoriesData.map((data) => (
              <TabPane
                tab={data.parentCategoryData.name}
                key={data.parentCategoryData.id}
              >
                <Collapse
                  onChange={(x) => {
                    x &&
                      setcatAndSubcat((ps) => ({
                        ...ps,
                        subcat: parseInt(x),
                        cat:data.parentCategoryData.id
                      }));
                  }
                
                }
                  accordion
                  expandIconPosition="right"
                >
                  {data.subCategoryData.map((d, i) => (
                    <Panel header={d.data.name} key={d.data.id}>
                      {d.services.map((d, i) => (
                        <DropDetail key={d.id}>
                          <SmallTitle className="drop-title">
                            {<IntlMessages id={`${d.name}`} />}
                          </SmallTitle>
                          <Price className="price">{d.estimated_price} kr</Price>
                        </DropDetail>
                      ))}
                      {isMyProfile ? (
                        <ButtonLink
                          style={{
                            display: "inline-block",
                          }}
                          className="btn blue-btn-border"
                          disabled={userStatus===3}
                          onClick={() => {
                            setModal({
                              open: true,
                              type: formTypes.services,
                              title: formNames.services,
                            });
                          }}
                        >
                          <IntlMessages id="addtypeofservice" />
                        </ButtonLink>
                      ) : null}
                    </Panel>
                  ))}
                </Collapse>
              </TabPane>
            ))}
          </Tabs>
        ) : (
          ""
        )}
      </ServiceTabWrapper>

      <Modal
        width={887}
        title={modal.title}
        centered={true}
        visible={modal.open}
        onCancel={(value)=> handleClose(value)}
        footer={false}
      >
        <AddCatSubCatServiceModal
          type={modal.type}
          onFinish={submitCatForm}
          form={form}
          cat={catAndSubcat.cat}
          subcat={catAndSubcat.subcat}
          setNumberOfServices={setNumberOfServices}
          NumberOfServices={NumberOfServices}
        />
      </Modal>
    </>
  );
}

export default TypeServices;
