import React, { useState } from "react";
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
  message,
} from "antd";
import "@iso/assets/style.css";
import { InfoCircleOutlined } from "@ant-design/icons";
import UploadComponent from "@iso/components/UploadComponent";
import { useHistory } from "react-router-dom";
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
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import HeadTitle from "@iso/components/Topbar";
import PlacesSuggestion from "@iso/components/PlacesAutoSuggestion";
import ImageModal from "@iso/components/ImageModal";
import dateValidationFunction from "../../../library/helpers/dateValidation";
import {getVideoCover} from "../../../library/helpers/getVideoCover";
import { Alert } from "antd";
import VideoImage from "@iso/assets/images/video-icon.png";
const { createTask } = taskAction;
const { TextArea } = Input;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const plainEnOptions = [
  { label: "Business", value: "Business" },
  { label: "Freelancer", value: "Freelancer" },
  { label: "Authorized by NemID", value: "Authorized by NemID" },
];
const plainDeOptions = [
  { label: "Forretning", value: "Business" },
  { label: "Freelancer", value: "Freelancer" },
  { label: "Autoriseret af NemID", value: "Authorized by NemID" },
];
const defaultCheckedList = ["Business"];

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

let fileLists = { fileList: [], files: [] };

function CreateTask() {
  const [address, setAddress] = useState("");
  const [coordinate, setCoordinate] = useState({
    lat: null,
    lng: null,
  });
  const [createForm] = Form.useForm();
  let Category = useSelector((state) => state.Categories);
  let language = useSelector(
    (state) => state.LanguageSwitcher.language.languageId
  );
  let userStatus = useSelector(
  (state) => state?.Auth?.userStatus
  );
  //let userStatus=1
  let parentCategory = Category.allParentCategories;
  let idWiseSubCategories = Category.idWiseSubCategories;
  let idWiseParentCategories = Category.idWiseParentCategories;
  let history = useHistory();

  const [selectedItem, SetSelectedItem] = useState("GET_STARTED");
  const dispatch = useDispatch();
  const canvasRef = React.useRef(null);
  const [isUploaded, setisUploaded] = useState(false);
  const [dateTimeError, setDateTimeError] = useState(false);
  const [endDateTimeError, setEndDateTimeError] = useState(false);
  const [dateEndValidationError, setDateEndValidationError] = useState(false);
  const [subcatList, setSubcatList] = useState([]);
  const [parentCatValue, setParentCatValue] = useState([]);
  const [subCatValue, setSubCatValue] = useState([]);
  const [uploadError, setuploadError] = useState("");
  const [fileList, setfileList] = useState(fileLists);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [remote, setRemote] = useState(false);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [prefrance, setPrefrance] = useState("BUSINESS");
  const [imageUrl, setImageUrl] = useState("");
  
  const onChange = (list) => {
    setCheckedList(list);
    if (list.includes("Business") && list.includes("Freelancer")) {
      setPrefrance("BOTH");
    } else if (list.includes("Business")) {
      setPrefrance("BUSINESS");
    } else if (list.includes("Freelancer")) {
      setPrefrance("FREELANCE");
    }
  };
  async function handlerPreview(file) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
  }
  async function handlerChange({ fileList, file }) {
     setuploadError("");
    const isValidImage =
      file.type === "image/jpeg" || file.type === "image/png";
    const isValidVideo = file.type === "video/mp4" || file.type === "video/quicktime" ;
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
    let payload = {
      task_action: "CREATE",
      title: data.title,
      description: data.description,
      category_id: parentCatValue,
      sub_category_id: subCatValue,
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
    };
    Object.keys(payload).forEach((key) => formData.append(key, payload[key]));
    fileList.files.forEach((file) =>
      formData.append("task_media", file.originFileObj)
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
  const handleToday = (name, value, startTime) => {
    if (startTime) {
      let time = moment(value).format("HH:mm:ss a");
      time = parseInt(time.split(":")[0]);
      createForm.setFields([
        {
          name: "start_time",
          value: time,
        },
      ]);
    }
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
    dateValidationFunction(
      startDate,
      startTime,
      endDate,
      endTime,
      selectedItem,
      setDateTimeError,
      setEndDateTimeError
    );
  };
  const handleValidationAndSubmit = () => {
    dateValidation();
    createForm.submit();
  };
  const dateEndValidation = (date, dateString) => {
    dateValidation();
    const startDate = createForm.getFieldValue("start_date");
    if (moment(startDate).isAfter(moment(date))) {
      setDateEndValidationError(true);
    } else {
      setDateEndValidationError(false);
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
          
          <Content className="create-task">
            <HeadTitle options={["Employer"]} />
            <ContentArea>
              
              <FormArea>
                
                <Form
                  {...formItemLayout}
                  form={createForm}
                  name="create-Form"
                  onFinish={handleSubmit}
                >
                  {userStatus === 3 && <Alert message="User Suspended! Please Activate your account" type="warning" />}
 

                  <FormInput>
                    <IntlMessages id="sidebar.selectbox">
                      {(placeholder) => (
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
                          <Select
                            placeholder={placeholder}
                            onChange={handleCategory}
                          >
                            {parentCategory.map((x, index) => (
                              <Select.Option key={index} value={x.id}>
                                {<IntlMessages id={`${x.name}`} />}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      )}
                    </IntlMessages>
                    <IntlMessages id="sidebar.selectbox">
                      {(placeholder) => (
                        <Form.Item
                          name="sub_category_id"
                          label={
                            <IntlMessages id="antTable.title.sub_category" />
                          }
                          rules={[
                            {
                              required: true,
                              message: AppConstant.FormValidation.subCategory,
                            },
                          ]}
                        >
                          <Select
                            placeholder={placeholder}
                            onChange={handleSubCategory}
                          >
                            {subcatList.map((x, y) => (
                              <option value={x.id}>
                                {<IntlMessages id={`${x.name}`} />}
                              </option>
                            ))}
                          </Select>
                        </Form.Item>
                      )}
                    </IntlMessages>
                  </FormInput>
                  <FormInput>
                    <IntlMessages id="antd.form.label.NeedAHelpWith">
                      {(placeholder) => (
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
                          <Input
                            placeholder={
                              idWiseParentCategories[parentCatValue]
                                ? `${placeholder} ${idWiseParentCategories[parentCatValue]}`
                                : `${placeholder} task`
                            }
                          />
                        </Form.Item>
                      )}
                    </IntlMessages>

                    {/* I need a handyman for repairing broken cabinet */}
                  </FormInput>
                  <FormInput>
                    <IntlMessages id="antd.form.label.TaskDescription">
                      {(placeholder) => (
                        <Form.Item
                          className="w-100"
                          name="description"
                          label={
                            <IntlMessages id="antInput.label.aboutThisTask" />
                          }
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
                            placeholder={placeholder}
                            rows={4}
                            autoSize={{ minRows: 3, maxRows: 5 }}
                          />
                        </Form.Item>
                      )}
                    </IntlMessages>
                  </FormInput>

                  <FormInput className="mb">
                    <IntlMessages id="getStarted">
                      {(placeholder) => (
                        <Form.Item
                          className="started"
                          //   className="w-100"
                          name="date_and_time"
                          label={
                            <IntlMessages id="antInput.label.dateAndTime" />
                          }
                          rules={[
                            {
                              required: true,
                              message: AppConstant.FormValidation.date,
                            },
                          ]}
                        >
                          <Select
                            placeholder={placeholder}
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
                      )}
                    </IntlMessages>

                    <Form.Item className="date-time-mng" label="d">
                      <Input.Group>
                        <FormInput className="time-wrapper">
                          <>
                            {" "}
                            <IntlMessages id="antTable.title.Date">
                              {(placeholder) => (
                                <Form.Item
                                  className="time-left-section"
                                  name={
                                    selectedItem === "TO_FINISH_WORK"
                                      ? "end_date"
                                      : "start_date"
                                  }
                                >
                                  <DatePicker
                                    onChange={dateValidation}
                                    disabledDate={(current) => {
                                      return (
                                        moment().add(
                                          selectedItem == "TO_FINISH_WORK"
                                            ? 0
                                            : -1,
                                          "days"
                                        ) >= current
                                      );
                                    }}
                                    format="DD/MM/YYYY"
                                    placeholder={placeholder}
                                    //onChange={(val) => setValue(val)}
                                  />
                                </Form.Item>
                              )}
                            </IntlMessages>
                            <Form.Item
                              className="time-section"
                              name={
                                selectedItem === "TO_FINISH_WORK"
                                  ? "end_time"
                                  : "start_time"
                              }
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
                                onChange={dateValidation}
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
                                handleToday("start_date", moment(), true)
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
                      <Form.Item
                        className="date-time-mng label-remove"
                        label="d"
                      >
                        <Input.Group>
                          <FormInput className="time-wrapper">
                            <>
                              {" "}
                              <Form.Item
                                className="time-left-section"
                                name="end_date"
                              >
                                <DatePicker
                                  onChange={dateEndValidation}
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
                              >
                                <InputNumber
                                  // style={{ width: "140px" }}
                                  placeholder="end Time"
                                  min={1}
                                  max={24}
                                  onChange={dateValidation}
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
                        {dateEndValidationError ? (
                          <p className="ant-form-item-explain ant-form-item-explain-error">
                            <IntlMessages id="endDateShouldBegraterThanStartDate" />
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
                    <IntlMessages id="form.profile.zipCode">
                      {(placeholder) => (
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
                              message:
                                AppConstant.FormValidation.zipcodeRequired,
                            },
                            {
                              pattern: zipCodeRegex,
                              message:
                                AppConstant.FormValidation.zipcodeValidation,
                            },
                          ]}
                        >
                          <Input placeholder={placeholder} />
                        </Form.Item>
                      )}
                    </IntlMessages>
                    <IntlMessages id="form.profile.address">
                      {(placeholder) => (
                        <Form.Item
                          name="address"
                          label={
                            <IntlMessages id="checkout.billingform.address" />
                          }
                          rules={[
                            {
                              required: true,
                              message: AppConstant.FormValidation.address,
                            },
                          ]}
                        >
                          <PlacesSuggestion
                            value={address}
                            onChange={setAddress}
                            onSelect={handleSelect}
                            place={placeholder}
                          />
                        </Form.Item>
                      )}
                    </IntlMessages>
                  </FormInput>
                  <FormInput>
                    <IntlMessages id="antInput.label.estimatedBudget">
                      {(placeholder) => (
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
                          <Input inputType="number" addonAfter="kr" placeholder={"Estimated Budget 150 Kr"} />
                        </Form.Item>
                      )}
                    </IntlMessages>
                  </FormInput>
                  {fileList.fileList.length > 0 && (
                    <UploadComponent
                      viewMode={true}
                      title={false}
                      showTextarea={false}
                      fileList={fileList.fileList}
                      handlePreview={handlerPreview}
                      cancel={setisModalVisible}
                      handleChange={handlerChange}
                      thumbnail={imageUrl}
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
                    disabled={userStatus===3}
                  >
                    {fileList.fileList.length > 0 ? (
                      <IntlMessages id="Add/Delete" />
                    ) : (
                      "upload"
                    )}
                  </Button>

                  <div className="share-contact-checkbox">
                    <Checkbox onChange={handleRemote}>
                      <IntlMessages id="form.doneRemotely" />
                    </Checkbox>
                  </div>
                  <div className="task-checkbox">
                    <Title className="checkbox-title">
                      <IntlMessages id="form.performBySpecialist" />
                    </Title>
                    <CheckboxGroup
                      options={
                        language === "en" ? plainEnOptions : plainDeOptions
                      }
                      value={checkedList}
                      onChange={onChange}
                    />
                  </div>
                  {/* <div className="task-checkbox">
                    <Title className="checkbox-title">
                      **
                      <IntlMessages id="form.publishInfo" />
                    </Title>
                  </div> */}
                  <div className="from-btn">
                    <Button
                      onClick={handleValidationAndSubmit}
                      style={{ width: "auto" }}
                      className="btn btn-no-disable-style "
                      disabled={userStatus===3}
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
                      to={userStatus ===1 ?"/client/task":"#"}
                    >
                      <IntlMessages id="button.cancel" />
                    </Link>
                  </div>
                </Form>
              </FormArea>
            </ContentArea>
          </Content>
        </PageContainer>
        <ImageModal
          visible={isModalVisible}
          uploadError={uploadError}
          fileList={fileList.fileList}
          handlePreview={handlerPreview}
          handleChange={handlerChange}
          setisModalVisible={setisModalVisible}
        />
      </PageWrapper>
      <FooterContainer />
    </>
  );
}
export default CreateTask;
