import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default Spin;

export const SpinCustom = (props) => (
  <Spin
    className="isoSpinCustom"
    indicator={
      <LoadingOutlined
        style={{
          fontSize: props.fontSize ? props.fontSize : 50,
          color: '#4FB263',
        }}
        spin
      />
    }
    {...props}
  />
);
