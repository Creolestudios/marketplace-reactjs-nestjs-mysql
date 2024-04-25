import React from "react";
import { Modal, Button } from "antd";
import UploadComponent from "@iso/components/UploadComponent";
import IntlMessages from "@iso/components/utility/intlMessages";

const ImageModal = ({
  visible,
  uploadError,
  fileList,
  handlePreview,
  handleChange,
  setisModalVisible,
}) => {
  return (
    <Modal
      className="modal-section"
      width={887}
      title={<IntlMessages id="Upload Photos/Videos" />}
      centered={true}
      visible={visible}
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
          upload
        </Button>,
      ]}
    >
      <UploadComponent
        uploadError={uploadError}
        title={false}
        showTextarea={false}
        fileList={fileList}
        handlePreview={handlePreview}
        cancel={() => setisModalVisible(false)}
        handleChange={handleChange}
      />
    </Modal>
  );
};

export default ImageModal;
