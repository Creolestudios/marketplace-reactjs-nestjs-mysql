import styled from "styled-components";
import { size } from "../../size";

export const UserDetailWrapper = styled.div`
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid #cdcdcd;
  &:last-child {
    border-bottom: none;
  }
`;
export const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 14px;
  -webkit-border-radius: 14px;
  overflow: hidden;
  margin-right: 28px;
  @media ${size["xs"]} {
    width: 40px;
    height: 40px;
    margin-right: 12px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const AvatarContent = styled.div`
  /* display: flex; */
  /* align-items: center; */
  width: 100%;
  .title {
    margin-bottom: 20px;
    @media ${size["xs"]} {
      margin: 0 0 10px;
    }
  }
  .sub-title {
    margin-bottom: 10px;
  }
  .user-pera {
    color: #758287;
  }
  @media ${size["xs"]} {
    flex-direction: column;
    align-items: flex-start;
    width: calc(100% - 50px);
  }
`;

export const Left = styled.div`
  margin-right: 15px;
  @media ${size["xs"]} {
    margin-right: 0;
  }
`;

export const Right = styled.div`
  @media ${size["xs"]} {
    margin-top: 10px;
  }
`;

export const Description = styled.div`
  display: flex;
  align-items: baseline;
  .rate {
    margin: 0 30px;
    @media ${size["sm"]} {
      margin: 5px 0 0;
    }
  }
  @media ${size["sm"]} {
    flex-direction: column;
  }
`;
