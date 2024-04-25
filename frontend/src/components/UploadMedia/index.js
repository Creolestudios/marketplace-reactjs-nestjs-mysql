import React, { useState } from "react";
import { Upload, Input, Form } from "antd";
import { ModelContent, UploadTask } from "./style";
import uploadImages from "../../assets/images/upload-img.svg";
import { FormWrapper } from "../../../CommonStyle";
import { ImagePriviewer, Figure } from "./style";
import uploadNew from "../../assets/images/upload-new.svg";
import { SmallTitle } from "../../CommonStyle";

const { TextArea } = Input;
const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const UploadAlbumMediaModal = () => {
  const [selectedImage, setSelectedImage] = useState("");

  const [photoSubmitForm] = Form.useForm;
  let fileLists = { fileList: [], files: [] };

  function handleChange({ fileList, file }) {
    setfileList((ps) => ({
      fileList,
      files: [...ps.files, file],
    }));

    fileList[fileList.length - 1]
      ? onPreview(fileList[fileList.length - 1])
      : setSelectedImage("");
  }

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
    setSelectedImage(src);
  };

  const submitAlbumMedia = () => {};
  const UploadButton = () => (
    <div className="upload-inner">
      <img src={uploadNew} alt="upload-new" className="img-bg" />
      <img src={uploadImages} alt="upload-images" className="img" />
      <div className="upload-text" style={{ marginTop: 8, color: "#423F3F" }}>
      <IntlMessages id="upload.new" />
      </div>
    </div>
  );

  // async function handlePreview(file) {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  // }

  function handleChange({ fileList }) {
    setfileList(fileList);
  }
  function beforeUpload() {
    return false;
  }
  const [fileList, setfileList] = useState(fileLists);
  return (
    <>
      {selectedImage && (
        <ImagePriviewer>
          <Figure>
            <img src={selectedImage} alt="img" />
          </Figure>
        </ImagePriviewer>
      )}
      <FormWrapper>
        <Form form={photoSubmitForm} {...layout} name="control-hooks">
          <Form.Item name="description" className="w-100">
            <Input placeholder={<IntlMessages id="photo.decs" />} />
          </Form.Item>
        </Form>
      </FormWrapper>
      <ModelContent>
        {props.title && (
          <SmallTitle className="title">
            {/* Share your reason for canceling the task: */}
            {props.title}
          </SmallTitle>
        )}
        <UploadTask>
          <Upload
            beforeUpload={beforeUpload}
            listType="picture-card"
            accept="image/*,video/*"
            fileList={fileList.fileList}
            onPreview={onPreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : <UploadButton />}
          </Upload>
        </UploadTask>
        {props.showTextarea && (
          <TextArea
            placeholder={<IntlMessages id="reason.msg" />}
            onChange={(e) => props.data(e.target.value)}
            rows={4}
            autoSize={{ minRows: 4, maxRows: 4 }}
          />
        )}
      </ModelContent>
    </>
  );
};

export default UploadAlbumMediaModal;
