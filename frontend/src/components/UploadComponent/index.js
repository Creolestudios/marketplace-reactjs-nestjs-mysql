import React, { useState } from "react";
import { Upload, Input, Form, Button, Alert } from "antd";
import { ModelContent, UploadTask } from "./style";
import uploadImages from "../../assets/images/upload-img.svg";
import uploadNew from "../../assets/images/upload-new.svg";
import { SmallTitle, ButtonLink } from "../../CommonStyle";
import IntlMessages from "@iso/components/utility/intlMessages";
import { VideoCameraTwoTone} from "@ant-design/icons";

const { TextArea } = Input;

// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// }
let fileLists = [
  // {
  //   uid: "-1",
  //   name: "image.png",
  //   status: "done",
  //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  // },
  // {
  //   uid: "-2",
  //   name: "image.png",
  //   status: "done",
  //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  // },
  // {
  //   uid: "-3",
  //   name: "image.png",
  //   status: "done",
  //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  // },
];

const Model = (props) => {
  const UploadButton = () => (
    <div className="upload-inner">
      <img src={uploadNew} alt="upload-new" className="img-bg" />
      <img src={uploadImages} alt="upload-images" className="img" />
      <div className="upload-text" style={{ marginTop: 8, color: "#423F3F" }}>
        <IntlMessages id="upload.new" />
      </div>
    </div>
  );

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    if (file.type.includes("video")) {

      const videoPlayerElement = document.createElement("video");
      const source = document.createElement("source");
      source.setAttribute("src", props.thumbnail ||src);
      videoPlayerElement.setAttribute("controls", "controls");
      videoPlayerElement.innerHTML = source.outerHTML;
      const imgWindow = window.open(props.thumbnail ||src);
      imgWindow.document.write(videoPlayerElement.outerHTML);
    }
    if(file.type.includes("image")){
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
    }
  };
  // async function handlePreview(file) {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  // }

  function handleChange({ fileList }) {
    setfileList(fileList);
  }

  function beforeUpload(file) {
    return false
  }


  
  const [fileList, setfileList] = useState(fileLists);
  return (
    <ModelContent>
      {props.title && (
        <SmallTitle className="title">
          {/* Share your reason for canceling the task: */}
          {props.title}
        </SmallTitle>
      )}
      <UploadTask>
        {props.uploadError && (
          <div>
            <Alert
              style={{ borderRadius: "40px", marginTop: "20px" }}
              message={props.uploadError}
              type="warning"
              showIcon
            />
          </div>
        )}
        <Upload
          onRemove={props.onRemove}
          beforeUpload={beforeUpload}
          listType="picture-card"
          accept="image/*,video/*, audio/*"
          fileList={props.fileList ? props.fileList : fileList}
          onPreview={props.onPreview ? props.onPreview : onPreview}
          onChange={props.handleChange ? props.handleChange : handleChange}
          iconRender={(file ,listType) => <VideoCameraTwoTone />}
          //thumbUrl={props.thumbnail}
          //previewFile={previewFile}
          //{<VideoCameraOutlined />}
        >
          {fileList.length >= 8 ? null : props.viewMode ? null : (
            <UploadButton />
          )}
        </Upload>

        {/* <Button onClick = {() => props.cancel(false)}>Submit</Button> */}
      </UploadTask>
      {props.showTextarea && (
        <Form form={props.form} name={props.formName} onFinish={props.onFinish}>
          <IntlMessages id="review.placeholder">
            {(placeholder) => (
              <Form.Item
                name={props.fieldName}
                rules={[
                  {
                    required: true,
                    message: <IntlMessages id="reason.msg" />,
                  },
                ]}
              >
                <TextArea
                  // value = {reviewText}

                  placeholder={placeholder}
                  rows={4}
                  autoSize={{ minRows: 4, maxRows: 4 }}
                />
              </Form.Item>
            )}
          </IntlMessages>
        </Form>
      )}
    </ModelContent>
  );
};

export default Model;
