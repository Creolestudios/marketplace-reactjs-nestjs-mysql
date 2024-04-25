import React, { useState, useEffect } from "react";
import moment from "moment";
import FooterContainer from "@iso/components/Footer";
import {
  Form,
  Select,
  Checkbox,
  Input,
  Modal,
  DatePicker,
  Button,
  InputNumber,
} from "antd";
import "@iso/assets/style.css";
import { InfoCircleOutlined } from "@ant-design/icons";
import UploadComponent from "@iso/components/UploadComponent";
import { useHistory, useLocation } from "react-router-dom";

import {
  PageWrapper,
  PageContainer,
  Content,
  SmallTitle,
  Title,
} from "../../../CommonStyle";
import { ContentArea } from "../Task/style";
import { FormInput, FormArea } from "./style";
import IntlMessages from "@iso/components/utility/intlMessages";
import taskAction from "@iso/redux/task/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppConstant, zipCodeRegex, BudgetNumber } from "@iso/config/constant";
import { Link } from "react-router-dom";
import {
  Head,
  LeftSide,
  RightSide,
  Area,
  AreaName,
} from "@iso/components/Topbar/style";
import Tab from "@iso/components/Tab";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import VideoImage from "@iso/assets/images/video-icon.png";

const { createTask, singleTaskDetails } = taskAction;

const { TextArea } = Input;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ["Business", "Freelancer", "Authorized by NemID"];

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

let fileLists = { fileList: [], files: [] };

function EditTask() {
  const [coordinate, setCoordinate] = useState({
    lat: null,
    lng: null,
  });
  const [address, setAddress] = useState("");
  const { profile } = useSelector((state) => state.Profile);
  let singleTask = useSelector((state) => state.Task.singleTaskDetails);
  const location = useLocation();
  const { pathname } = location;
  const [createForm] = Form.useForm();
  let Category = useSelector((state) => state.Categories);
  let parentCategory = Category.allParentCategories;
  let idWiseSubCategories = Category.idWiseSubCategories;
  let history = useHistory();
  const [cancelMedia, setCancelMedia] = useState([]);
  const [selectedItem, SetSelectedItem] = useState("");
  const dispatch = useDispatch();
  const [isUploaded, setisUploaded] = useState(false);
  const [dateTimeError, setDateTimeError] = useState(false);
  const [subcatList, setSubcatList] = useState([]);
  const [endDateTimeError, setEndDateTimeError] = useState(false);
  const [parentCatValue, setParentCatValue] = useState([]);
  const [subCatValue, setSubCatValue] = useState([]);
  const [uploadError, setuploadError] = useState("");
  const [fileList, setfileList] = useState(fileLists);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [remote, setRemote] = useState(false);
  const [checkedList, setCheckedList] = useState(["Authorized by NemID"]);
  const [prefrance, setPrefrance] = useState("BUSINESS");
  const onChange = (list) => {
    const s = new Set(list);
    let newList = [...s];
    setCheckedList([...s]);
    if (newList.includes("Business") && newList.includes("Freelancer")) {
      setPrefrance("BOTH");
    } else if (newList.includes("Business")) {
      setPrefrance("BUSINESS");
    } else {
      setPrefrance("FREELANCE");
    }
  };
  async function handlerPreview(file) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
  }
  function handlerChange({ fileList, file }) {
    setuploadError("");
    const isValidImage =
      file.type === "image/jpeg" || file.type === "image/png";
    const isValidVideo =
      file.type === "video/mp4" || file.type === "video/quicktime";
    const isValidAudio = file.type === "audio/mpeg";
    if (!isValidAudio && !isValidVideo && !isValidImage) {
      setuploadError(<IntlMessages id="ant.deafult.sizeError" />);
      return;
    }
    const imgSzLt = file.size / 1024 / 1024 < 20;
    const vdSzLt = file.size / 1024 / 1024 < 50;
    const audSzLt = file.size / 1024 / 1024 < 10;
    if (isValidImage && !imgSzLt) {
      setuploadError(<IntlMessages id="ant.Image.sizeError" />);
      return;
    }
    if (isValidVideo && !vdSzLt) {
      setuploadError(<IntlMessages id="ant.Video.sizeError" />);
      return;
    }
    if (isValidAudio && !audSzLt) {
      setuploadError(<IntlMessages id="ant.Audio.sizeError" />);
      return;
    }
    if (isValidVideo && !file.thumbUrl) {
      // const thumb = await getVideoCover(file);
      // const thumbNailURL = URL.createObjectURL(thumb);
      file.thumbUrl = VideoImage;
      // const videoUrl = URL.createObjectURL(file);
      // setImageUrl(videoUrl);
  }
    setfileList((ps) => ({
      fileList,
      files: fileList,
    }));
  }
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const handleRemote = (e) => {
    setRemote(e.target.checked);
  };
  const handleSubmit = (data) => {
    let city = data.address.split(",")[0];
    let formData = new FormData();
    let start = "";
    let end = "";
    if (data.range_date !== undefined) {
      start = moment(data.range_date[0]).format("YYYY-MM-DD");
      end = moment(data.range_date[1]).format("YYYY-MM-DD");
    } else {
      start = moment(data.start_date).format("YYYY-MM-DD");
      end = moment(data.start_date).format("YYYY-MM-DD");
    }
    let dataDate = moment(data.start_date).format("YYYY-MM-DD");
    let payload = {
      task_action: "UPDATE",
      title: data.title,
      description: data.description,
      category_id: parentCatValue,
      sub_category_id: data.sub_category_id,
      date_and_time: data.date_and_time,
      end_date: data.end_date
        ? moment(data.end_date).format("YYYY-MM-DD")
        : null,
      end_time: data.end_date || data.date_and_time === 2 ? data.end_time : 0,
      nemid_authorized: checkedList.includes("Authorized by NemID") ? 1 : 0,
      specialist_preference: prefrance,
      remote_job: remote ? 1 : 0,
      zipcode: data.zipcode,
      latitude: coordinate.lat,
      longitude: coordinate.lng,
      city: city,
      address: data.address,
      estimated_budget: data.estimated_budget,
      start_date: data.start_date
        ? moment(data.start_date).format("YYYY-MM-DD")
        : null,
      start_time: data.start_time ? data.start_time : 0,
      task_id: pathname.split("/").slice(-1)[0],
    };
    Object.keys(payload).forEach((key) => formData.append(key, payload[key]));
    {
      cancelMedia.length > 0
        ? formData.append("delete_media", JSON.stringify(cancelMedia))
        : formData.append("delete_media", JSON.stringify([]));
    }

    fileList.files.map((file) =>
  {  
       if(file.originFileObj){
      return formData.append("task_media", file.originFileObj )}
  }
    // return  formData.append("task_media", file.originFileObj ? file.originFileObj : file.url)}
    );
    dispatch(createTask(formData, history));
  };
  const handleCategory = (value) => {
    createForm.resetFields(["sub_category_id"]);
    setParentCatValue(value);
    let sublist = idWiseSubCategories[value];
    setSubcatList(sublist);
  };
  const handleSubCategory = (value) => {
    setSubCatValue(value);
  };
  const handleToday = (name, value) => {
    createForm.setFields([
      {
        name: name,
        value: value,
      },
    ]);
  };
  const handleDateType = (value) => {
    SetSelectedItem(value);
  };
  const dateValidation = () => {
    const startDate = createForm.getFieldValue("start_date");
    const startTime = createForm.getFieldValue("start_time");
    const endDate = createForm.getFieldValue("end_date");
    const endTime = createForm.getFieldValue("end_time");
    if (selectedItem === "GET_STARTED") {
      if (!startDate || !startTime) {
        setDateTimeError(true);
      } else {
        setDateTimeError(false);
      }
    } else if (selectedItem === "TO_FINISH_WORK") {
      if (!endDate || !endTime) {
        setDateTimeError(true);
      } else {
        setDateTimeError(false);
      }
    } else {
      if (selectedItem === "SPECIFY_PERIOD") {
        if (!startDate || !startTime) {
          setDateTimeError(true);
        } else {
          setDateTimeError(false);
        }
        if (!endDate || !endTime) {
          setEndDateTimeError(true);
        } else {
          setEndDateTimeError(false);
        }
      }
    }
  };
  const handleValidationAndSubmit = () => {
    dateValidation();

    if (!dateTimeError && !endDateTimeError) {
      createForm.submit();
    }
  };
  useEffect(() => {
    let selectedPath = pathname.split("/").slice(-1)[0];
    dispatch(
      singleTaskDetails(
        {
          user_type: `employer`,
          task_id: selectedPath,
        },
        history
      )
    );
  }, []);
  useEffect(() => {  
    if (singleTask) {
      if (
        singleTask.task.task_status !== 1 &&
        singleTask.task.task_status !== 3
      ) {
        history.push(`/client`);
      }

      let checkedListCopy = [...checkedList];
  //authorized by nemid condition removed because images were not working, need to make changes
        let list = [];
        singleTask.taskMedia.map((eachValue) =>
          list.push({
            uid: eachValue.id,
            name: "",
            url: eachValue.media,
            type: eachValue.media_type === "image" ? "image/png" :"video/mp4",
            size: 1,
            previousImage: true,
          })
        );
          console.log("this is list",list)
        setfileList((ps) => ({
          fileList: list,
          files: list,
        }));
        checkedListCopy = checkedListCopy.filter(
          (e) => e !== "Authorized by NemID"
        );
      setCheckedList(
        singleTask.task.specialist_preference === 1
          ? [...checkedListCopy, "Freelancer"]
          : singleTask.task.specialist_preference === 0
          ? [...checkedListCopy, "Business"]
          : [...checkedListCopy, "Freelancer", "Business"]
      );
      setRemote(singleTask.task.remote_job === 1 ? true : false);
      setParentCatValue(singleTask.task.category_id);
      let parentNumber = singleTask.task.category_id;
      let sublist;
      if (parentNumber) {
        sublist = idWiseSubCategories[parentNumber];
        setSubcatList(sublist);
      }
      // let sublist = idWiseSubCategories[5]
      createForm.setFieldsValue({
        description: singleTask.task.description,
        title: singleTask.task.title,
        zipcode: singleTask.task.zipcode,
        address: singleTask.task.address,
        estimated_budget: singleTask.task.estimated_budget,
        category_id: singleTask.task.category_id,
        sub_category_id: singleTask.task.sub_category_id,
        date_and_time:
          singleTask.task.date_and_time === 0
            ? "GET_STARTED"
            : singleTask.task.date_and_time === 1
            ? "TO_FINISH_WORK"
            : "SPECIFY_PERIOD",
        start_date:
          singleTask.task.date_and_time === 0 ||
          singleTask.task.date_and_time === 2
            ? moment(`${singleTask.task.start_date_time}`)
            : "",
        end_date:
          singleTask.task.date_and_time === 2 ||
          singleTask.task.date_and_time === 1
            ? moment(`${singleTask.task.end_date_time}`)
            : "",
        start_time: singleTask.task.start_time,
        end_time: singleTask.task.end_time,
      });
      SetSelectedItem(
        singleTask.task.date_and_time === 0
          ? "GET_STARTED"
          : singleTask.task.date_and_time === 1
          ? "TO_FINISH_WORK"
          : "SPECIFY_PERIOD"
      );
    }
  }, [singleTask]);
  const handleRemove = (value) => {
    if (value.previousImage) {
      setCancelMedia((ps) => [...ps, value.url]);
    }
  };
  const previewRemove = (value) => {
    if (value.previousImage) {
      setCancelMedia((ps) => [...ps, value.url]);
    }
  };
  const handleSelect = async (value) => {
    createForm.setFieldsValue({
      address: value,
    });
    setAddress(value);
    const result = await geocodeByAddress(value);
    const latLng = await getLatLng(result[0]);
    setCoordinate(latLng);
  };
  return (
    <>
      <PageWrapper>
        <PageContainer>
          <Content>
            <Head>
              <LeftSide>
                <Tab />
                <Area>
                  <i className="icon-location"> </i>
                  <AreaName>
                    {" "}
                    {profile.city ? profile.city : "Copenhagen"}{" "}
                  </AreaName>
                </Area>
              </LeftSide>
              <RightSide active={true} className="task-detail-rigth-side">
                <Select
                  defaultValue={<IntlMessages id="antTable.title.Employer" />}
                >
                  <Option value="employer">
                    {" "}
                    <IntlMessages id="antTable.title.Employer" />{" "}
                  </Option>
                </Select>
              </RightSide>
            </Head>
            <ContentArea>
              <FormArea>
                <Form
                  {...formItemLayout}
                  form={createForm}
                  name="create-Form"
                  onFinish={handleSubmit}
                >
                  <FormInput>
                    <Form.Item
                      name="category_id"
                      label={<IntlMessages id="antTable.title.category" />}
                      rules={[
                        {
                          required: true,
                          message: AppConstant.FormValidation.category,
                        },
                      ]}
                    >
                      <Select placeholder="Select" onChange={handleCategory}>
                        {parentCategory.map((x, index) => (
                          <Select.Option key={index} value={x.id}>
                            {<IntlMessages id={`${x.name}`} />}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="sub_category_id"
                      label={<IntlMessages id="antTable.title.sub_category" />}
                      rules={[
                        {
                          required: true,
                          message: AppConstant.FormValidation.subCategory,
                        },
                      ]}
                    >
                      <Select placeholder="Select" onChange={handleSubCategory}>
                        {subcatList.map((x, y) => (
                          <option value={x.id}>
                            {<IntlMessages id={`${x.name}`} />}
                          </option>
                        ))}
                      </Select>
                    </Form.Item>
                  </FormInput>
                  <FormInput>
                    <Form.Item
                      className="w-100"
                      name="title"
                      label={<IntlMessages id="antTable.title.title" />}
                      rules={[
                        {
                          required: true,
                          message: AppConstant.FormValidation.titleRequired,
                        },
                      ]}
                    >
                      <Input placeholder="I need a handyman for repairing broken cabinet" />
                    </Form.Item>
                  </FormInput>
                  <FormInput>
                    <Form.Item
                      className="w-100"
                      name="description"
                      label={<IntlMessages id="antInput.label.aboutThisTask" />}
                      tooltip={{
                        title: <IntlMessages id="ant.about.toolTip" />,
                        icon: <InfoCircleOutlined />,
                      }}
                      rules={[
                        {
                          required: true,
                          message: AppConstant.FormValidation.description,
                        },
                      ]}
                    >
                      <TextArea
                        placeholder="Task description"
                        defaultValue={singleTask.task.description}
                        rows={4}
                        autoSize={{ minRows: 3, maxRows: 5 }}
                      />
                    </Form.Item>
                  </FormInput>

                  <FormInput className="mb">
                    <Form.Item
                      className="started"
                      //   className="w-100"
                      name="date_and_time"
                      label={<IntlMessages id="antInput.label.dateAndTime" />}
                      rules={[
                        {
                          required: true,
                          message: AppConstant.FormValidation.date,
                        },
                      ]}
                    >
                      <Select
                        placeholder="Get Started"
                        onChange={handleDateType}
                        value={selectedItem}
                      >
                        <Option value="GET_STARTED">
                          <IntlMessages id="getStarted" />
                        </Option>
                        <Option value="TO_FINISH_WORK">
                          <IntlMessages id="toFinishWork" />
                        </Option>
                        <Option value="SPECIFY_PERIOD">
                          <IntlMessages id="specifyPeriod" />
                        </Option>
                      </Select>
                    </Form.Item>

                    <Form.Item className="date-time-mng" label="d">
                      <Input.Group>
                        <FormInput className="time-wrapper">
                          <>
                            {" "}
                            <Form.Item
                              name={
                                selectedItem === "TO_FINISH_WORK"
                                  ? "end_date"
                                  : "start_date"
                              }
                              onChange={dateValidation}
                            >
                              <DatePicker
                                value={moment()}
                                disabledDate={(current) => {
                                  return (
                                    moment().add(
                                      selectedItem == "TO_FINISH_WORK" ? 0 : -1,
                                      "days"
                                    ) >= current
                                  );
                                }}
                                format="DD/MM/YYYY"
                                placeholder="Date"
                                //onChange={(val) => setValue(val)}
                              />
                            </Form.Item>
                            <Form.Item
                              className="time-section"
                              name={
                                selectedItem === "TO_FINISH_WORK"
                                  ? "end_time"
                                  : "start_time"
                              }
                              onChange={dateValidation}
                            >
                              <InputNumber
                                // style={{ width: "140px" }}
                                placeholder={
                                  selectedItem === "TO_FINISH_WORK"
                                    ? "end time"
                                    : "start time"
                                }
                                min={1}
                                max={24}
                              />
                            </Form.Item>
                          </>
                        </FormInput>
                      </Input.Group>
                      {dateTimeError ? (
                        <p className="ant-form-item-explain ant-form-item-explain-error">
                          <IntlMessages id="rovideDateAndTime" />
                        </p>
                      ) : (
                        ""
                      )}

                      <div
                        className="today-indi"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          margin: "10px 0 0",
                        }}
                      >
                        {selectedItem === "GET_STARTED" ? (
                          <>
                            {" "}
                            <SmallTitle
                              onClick={() =>
                                handleToday("start_date", moment())
                              }
                              style={{
                                margin: "0 20px 0 0",
                                cursor: "pointer",
                              }}
                            >
                              <IntlMessages id="today" />
                            </SmallTitle>
                            <SmallTitle
                              style={{
                                margin: "0 10px 0 0",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleToday(
                                  "start_date",
                                  moment().add(1, "days")
                                )
                              }
                            >
                              <IntlMessages id="tomorrow" />
                            </SmallTitle>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </Form.Item>
                    {selectedItem === "SPECIFY_PERIOD" ? (
                      <Form.Item className="date-time-mng" label="d">
                        <Input.Group>
                          <FormInput className="time-wrapper">
                            <>
                              {" "}
                              <Form.Item
                                name="end_date"
                                onChange={dateValidation}
                              >
                                <DatePicker
                                  disabledDate={(current) => {
                                    return moment().add(0, "days") >= current;
                                  }}
                                  format="DD/MM/YYYY"
                                  placeholder="Date"
                                  //onChange={(val) => setValue(val)}
                                />
                              </Form.Item>
                              <Form.Item
                                className="time-section"
                                name="end_time"
                                onChange={dateValidation}
                              >
                                <InputNumber
                                  // style={{ width: "140px" }}
                                  placeholder="end Time"
                                  min={1}
                                  max={24}
                                />
                              </Form.Item>
                              <div
                                className="today-indi"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  margin: "10px 0 0",
                                }}
                              >
                                {" "}
                              </div>
                            </>
                          </FormInput>
                        </Input.Group>
                        {endDateTimeError ? (
                          <p className="ant-form-item-explain ant-form-item-explain-error">
                            <IntlMessages id="rovideDateAndTime" />
                          </p>
                        ) : (
                          ""
                        )}
                      </Form.Item>
                    ) : (
                      ""
                    )}
                  </FormInput>
                  <FormInput>
                    <Form.Item
                      label={<IntlMessages id="form.profile.zipCode" />}
                      name="zipcode"
                      tooltip={{
                        title: <IntlMessages id="ant.zipCode.toolTip" />,
                        icon: <InfoCircleOutlined />,
                      }}
                      rules={[
                        {
                          required: true,
                          message: AppConstant.FormValidation.zipcodeRequired,
                        },
                        {
                          pattern: zipCodeRegex,
                          message: AppConstant.FormValidation.zipcodeValidation,
                        },
                      ]}
                    >
                      <Input placeholder="form.profile.zipCode" />
                    </Form.Item>
                    <Form.Item
                      name="address"
                      label={<IntlMessages id="checkout.billingform.address" />}
                    >
                      <PlacesAutocomplete
                        value={address}
                        onChange={setAddress}
                        onSelect={handleSelect}
                      >
                        {({
                          getInputProps,
                          suggestions,
                          getSuggestionItemProps,
                          loading,
                        }) => (
                          <div>
                            <input
                              style={{ outline: "none" }}
                              {...getInputProps({
                                placeholder: "Type location",
                              })}
                            />
                            <div>
                              {loading ? <div>...loading </div> : null}
                              {suggestions.map((suggestions) => {
                                const style = suggestions.active
                                  ? {
                                      backgroundColor: "#fafafa",
                                      cursor: "pointer",
                                    }
                                  : {
                                      backgroundColor: "#ffffff",
                                      cursor: "pointer",
                                    };
                                return (
                                  <div
                                    {...getSuggestionItemProps(suggestions, {
                                      style,
                                    })}
                                  >
                                    {suggestions.description}{" "}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete>
                    </Form.Item>
                  </FormInput>
                  <FormInput>
                    <Form.Item
                      label={
                        <IntlMessages id="antInput.label.estimatedBudget" />
                      }
                      name="estimated_budget"
                      tooltip={{
                        title: <IntlMessages id="ant.budget.toolTip" />,
                        icon: <InfoCircleOutlined />,
                      }}
                      rules={[
                        {
                          required: true,
                          message: AppConstant.FormValidation.budget,
                        },
                        {
                          pattern: BudgetNumber,
                          message: AppConstant.FormValidation.budgetRange,
                        },
                      ]}
                    >
                      <Input
                        inputType="number"
                        placeholder="Estimated Budget"
                      />
                    </Form.Item>
                  </FormInput>
                  {fileList.fileList.length > 0 && (
                    <UploadComponent
                      onRemove={previewRemove}
                      viewMode={true}
                      title={false}
                      showTextarea={false}
                      fileList={fileList.fileList}
                      handlePreview={handlerPreview}
                      cancel={setisModalVisible}
                      handleChange={handlerChange}
                    />
                  )}
                  <div className="photos-videos-wrapper">
                    <div className="title">
                      <IntlMessages id="photoVideo" />
                    </div>
                    {isUploaded && (
                      <div className="photos-videos-item">
                        {fileList.map((file, index) => (
                          <div key={index} className="img-list">
                            <img src={file.url} alt="" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button
                    style={{ display: "table", width: "auto" }}
                    className="btn info-btn-border upload-btn"
                    onClick={() => setisModalVisible(true)}
                  >
                    {fileList.fileList.length > 0 ? "Add/delete" : "upload"}
                  </Button>

                  <div className="share-contact-checkbox">
                    <Checkbox checked={remote} onChange={handleRemote}>
                      <IntlMessages id="form.doneRemotely" />
                    </Checkbox>
                  </div>
                  <div className="task-checkbox">
                    <Title className="checkbox-title">
                      <IntlMessages id="form.performBySpecialist" />
                    </Title>
                    <CheckboxGroup
                      options={plainOptions}
                      value={checkedList}
                      onChange={onChange}
                    />
                  </div>
                  <div className="from-btn">
                    <Button
                      onClick={handleValidationAndSubmit}
                      style={{ width: "auto" }}
                      className="btn publish-btn"
                    >
                      <IntlMessages id="publish" />
                    </Button>
                    <Link
                      className="btn btn-clear"
                      style={{
                        background: "none",
                        color: "#758287",
                        border: "none",
                        width: "auto",
                      }}
                      to={`/client/task-details/employer/${singleTask.task.id}`}
                    >
                      <IntlMessages id="button.cancel" />
                    </Link>
                  </div>
                </Form>
              </FormArea>
            </ContentArea>
          </Content>
        </PageContainer>

        <Modal
          className="modal-section"
          width={887}
          title={<IntlMessages id="Upload Photos/Videos" />}
          centered={true}
          visible={isModalVisible}
          onCancel={() => setisModalVisible(false)}
          footer={[
            <Button
              className="btn info-btn-border upload-btn"
              style={{
                display: "inline-block",
                float: "left",
                width: "auto",
              }}
              onClick={() => setisModalVisible(false)}
            >
              <IntlMessages id="button.Upload" />
            </Button>,
          ]}
        >
          <UploadComponent
            onRemove={handleRemove}
            uploadError={uploadError}
            title={false}
            showTextarea={false}
            fileList={fileList.fileList}
            handlePreview={handlerPreview}
            cancel={setisModalVisible}
            handleChange={handlerChange}
          />
        </Modal>
      </PageWrapper>
      <FooterContainer />
    </>
  );
}

export default EditTask;
