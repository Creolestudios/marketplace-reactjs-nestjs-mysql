import React from "react";
import { Modal } from "antd";
import { ReactComponent as CloseSvg } from "../../assets/images/close.svg";

const CustomModal = ({ children, ...props }) => (
  <Modal {...props} closeIcon={<CloseSvg />}>
    {children}
  </Modal>
);

export default CustomModal;
