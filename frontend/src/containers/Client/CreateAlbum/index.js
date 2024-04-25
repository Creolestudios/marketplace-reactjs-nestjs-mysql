import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, Input, Alert } from "antd";
import {
  Content,
  FormWrapper,
  ButtonLink,
  BtnWrapper,
} from "../../../CommonStyle";
import UploadComponent from "@iso/components/UploadComponent";
import { ImagePriviewer, Figure } from "./style";
import ServiceType from "@iso/components/ServiceType";
import CatAndSubCat from "@iso/components/CatAndSubCat";
import portfolioActions from "@iso/redux/portfolio/actions";
import modalsActions from "@iso/redux/modals/actions";
import IntlMessages from "@iso/components/utility/intlMessages";
import VideoImage from "@iso/assets/images/video-icon.png";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

let fileLists = { fileList: [], files: [] };

function CreateAlbum() {
  const [NumberOfServices, setNumberOfServices] = useState([
    { type: "select" },
  ]);
  const history = useHistory();
  const dispatch = useDispatch();
  const [createAlbumForm] = Form.useForm();
  const [photoSubmitForm] = Form.useForm();
  const [addAlbumServiceForm] = Form.useForm();

  const [fileList, setfileList] = useState(fileLists);
  const [uploadError, setuploadError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [albumData, setAlbumData] = useState({
    createAlbumForm: {},
    albumMediaForm: {},
  });

  const Modals = useSelector((state) => state.Modals);
  const Portfolio = useSelector((state) => state.Portfolio);
let userStatus = useSelector(
  (state) => state?.Auth?.userStatus
  );
  //let userStatus=1
  const { error } = Portfolio;
  const changeModalStatus = (payload) => {
    dispatch(modalsActions.setModalStatus(payload));
  };

  async function handlerPreview(file) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
  }

  function handlerChange({ fileList, file }) {
    const isValidVideo = file.type === "video/mp4" || file.type === "video/quicktime" ;
    if (isValidVideo && !file.thumbUrl) {
      file.thumbUrl = VideoImage;
  }
    setfileList((ps) => ({
      fileList,
      files: [...ps.files, file],
    }));

    fileList[fileList.length - 1]
      ? onPreview(fileList[fileList.length - 1])
      : setSelectedImage("");
    fileList[fileList.length - 1] === 0
      ? setuploadError("Please upload media to create album.")
      : setuploadError("");
  }
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const createAlbumSubmit = (values) => {   
 if(values.other_sub_category){
   values["sub_category_type"] = 1
 }else{
  values["sub_category_type"] = 0
 }
    // if (values.sub_category === 2 && !values.other_sub_category) {
    //   createAlbumForm.setFields([
    //     {
    //       name: "other_sub_category",
    //       errors: ["Please type other sub category"],
    //     },
    //   ]);
    //   return;
    // }
    // if other_sub_cat is not selected we still have to send "other_sub_cat": "" in request
    if (!values.other_sub_category) values["other_sub_category"] = "";
    
    setAlbumData((ps) => ({ ...ps, createAlbumForm: values }));
    changeModalStatus({ addServiceModal: true });

    //dispatch(portfolioActions.createAlbum(values));
  };

  const submitCreateAlbumForm = (values) => {
    console.log("valuessss",values)
    albumData.albumMediaForm.description
      ? dispatch(
          portfolioActions.createAlbum({
            ...albumData,
            addServicesForm: values,
            history,
          })
        )
      : setuploadError(
          "Please upload media and media description to create album."
        );
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    setSelectedImage({src: src, type: file.type});

    if (file.type.includes("video")) {
      setSelectedImage("")
      const videoPlayerElement = document.createElement("video");
      const source = document.createElement("source");
      source.setAttribute("src", src);
      videoPlayerElement.setAttribute("controls", "controls");
      videoPlayerElement.innerHTML = source.outerHTML;
      const imgWindow = src;
    
      setSelectedImage({src: src, type: file.type});
    }
  };

  const submitAlbumMedia = () => {
    const desc = photoSubmitForm.getFieldValue("description");

    if (!desc) {
      photoSubmitForm.setFields([
        {
          name: "description",
          errors: ["Please describe your album"],
        },
      ]);
      return;
    }
    if (!fileList.fileList.length > 0) {
      setuploadError("Please upload media to create album.");
      return;
    }
    const values = {
      description: desc,
      fileList: fileList.files,
    };
    // const form = new FormData();
    // fileList.files.map((file) => form.append("album_media", file));
    // form.append("description", desc);

    // we will need to append user_album_id later after creat album saga call. that is why I am comenting it here and mentioning that as well.
    //form.append("user_album_id", Portfolio.currentAlbum.id);

    setAlbumData((ps) => ({ ...ps, albumMediaForm: values }));
    //dispatch(portfolioActions.addAlbumMedia(form, history));
    changeModalStatus({ addMediaModal: false });
  };
  const handleClear = () => {
    createAlbumForm.resetFields();
  };
  return (
    <>
      <Content>
        <FormWrapper>
          {error && (
            <Alert
              style={{ borderRadius: "40px", marginBottom: "20px" }}
              message={error}
              type="warning"
              showIcon
            />
          )}
          <Form
            form={createAlbumForm}
            onFinish={createAlbumSubmit}
            {...layout}
            name="createAlbum"
          >
            <IntlMessages id="antInput.label.albumName">
              {(placeholder) => (
                <Form.Item
                  name="album_name"
                  rules={[
                    {
                      required: true,
                      message:<IntlMessages id="albumNameValidation"/>,
                    },
                  ]}
                  label={<IntlMessages id="antInput.label.albumName" />}
                >
                  <Input placeholder={placeholder} />
                </Form.Item>
              )}
            </IntlMessages>

            <CatAndSubCat form={createAlbumForm} />

            <Form.Item className="w-100 btn-wrapper">
              <BtnWrapper>
                <ButtonLink
                  className="btn"
                  style={{ width: "auto" }}
                  onClick={createAlbumForm.submit}
                  disabled={userStatus===3}
                >
                  <IntlMessages id="page.createButton" />
                </ButtonLink>
                <ButtonLink
                  style={{ width: "auto" }}
                  className="btn btn-cancel"
                  disabled={userStatus===3}
                  onClick={handleClear}
                >
                  <IntlMessages id="button.cancel" />
                </ButtonLink>
              </BtnWrapper>
            </Form.Item>
          </Form>
        </FormWrapper>
      </Content>

      <Modal
        width={887}
        title="Add Type of Service"
        centered={true}
        visible={Modals.addServiceModal}
        onCancel={() => {
        addAlbumServiceForm.resetFields();
          changeModalStatus({ addServiceModal: false });
        }}
        footer={false}
      >
        <ServiceType
          form={addAlbumServiceForm}
          category={albumData.createAlbumForm.category}
          sub_category={albumData.createAlbumForm.sub_category}
          onFinish={submitCreateAlbumForm}
          serviceUploadmodel={() => changeModalStatus({ addMediaModal: true })}
          modalCancel={(type) => {
            addAlbumServiceForm.resetFields();
            setNumberOfServices([
              { type: type },
            ])
            changeModalStatus({ addServiceModal: false });
          }}
          setNumberOfServices={setNumberOfServices}
          NumberOfServices={NumberOfServices}
        >
          <UploadComponent
            viewMode={true}
            uploadError={uploadError}
            onSubmit={submitAlbumMedia}
            onPreview={onPreview}
            title={false}
            showTextarea={false}
            fileList={fileList.fileList}
            handlePreview={handlerPreview}
            handleChange={handlerChange}
          />
        </ServiceType>
      </Modal>

      <Modal
        className="create-album"
        width={887}
        title={<IntlMessages id="Upload Photos/Videoss" />}
        centered={true}
        visible={Modals.addMediaModal}
        onCancel={() => {
          setfileList(fileLists);
          setSelectedImage("");
          changeModalStatus({ addMediaModal: false });
        }}
        footer={[
          <ButtonLink
            className="btn blue-btn-border"
            onClick={submitAlbumMedia}
          >
            <IntlMessages id="button.Upload" />
          </ButtonLink>,
        ]}
      >
        {selectedImage && (
          <ImagePriviewer>
            {selectedImage.type.includes("video") ? 
             <video controls autoPlay loop muted>
             <source  src={selectedImage.src} type="video/mp4"></source>
           </video>
          : <Figure>
            <img src={selectedImage.src} alt="img" />
           
          </Figure>}
           
          </ImagePriviewer>
        )}
        <FormWrapper>
          <Form form={photoSubmitForm} {...layout} name="control-hooks">
            <Form.Item name="description" className="w-100">
              <Input placeholder="Photo description" />
            </Form.Item>
          </Form>
        </FormWrapper>
        <UploadComponent
          uploadError={uploadError}
          onSubmit={submitAlbumMedia}
          onPreview={onPreview}
          title={false}
          showTextarea={false}
          fileList={fileList.fileList}
          handlePreview={handlerPreview}
          handleChange={handlerChange}
        />
      </Modal>
    </>
  );
}

export default CreateAlbum;
