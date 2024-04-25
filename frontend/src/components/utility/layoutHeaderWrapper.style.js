import styled from 'styled-components';
import { palette } from 'styled-theme';

const LayoutHeaderContentWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;
  width: 100%;
  padding: 30px 30px ${(props) => (props.isTab ? '0px' : '30px')} 60px;
  background-color: #ffffff;
  border-bottom: 1px solid ${palette('border', 0)};

  h2.ant-typography,
  .ant-typography h2 {
    margin-bottom: 0px;
    line-height: normal;
  }

  @media (max-width: 767px) {
    padding: 25px 25px ${(props) => (props.isTab ? '0px' : '25px')} 25px;

    h2.ant-typography,
    .ant-typography h2 {
      font-size: 28px;
    }
  }

  @media (max-width: 575px) {
    padding: 15px 15px ${(props) => (props.isTab ? '0px' : '15px')} 15px;

    h2.ant-typography,
    .ant-typography h2 {
      font-size: 26px;
    }
  }
`;

export { LayoutHeaderContentWrapper };
