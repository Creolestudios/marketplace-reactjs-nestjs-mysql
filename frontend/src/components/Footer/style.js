import styled from "styled-components";
import { size } from "../../size";

export const FooterWrapper = styled.div`
  display: flex;
  background: #fff;
  max-width: 1302px;
  padding: 80px 15px;
  margin: 0 auto;
  flex-wrap: wrap;
  @media ${size["xl"]} {
    justify-content: space-around;
  }
  @media ${size["lg"]} {
    justify-content: space-around;
    padding: 50px 15px;
  }
  @media ${size["md"]} {
    flex-direction: column;
    padding: 30px 10px;
    justify-content: space-around;
  }
  .scrollToTop{
    position:fixed;
    width:100px ;
    height: 100px;
    right: 15px;
    background-color: transparent;
    padding: 16px 0;
    border-radius: 25%;
    height: 50px;
    text-align: center;
    width: 50px;
    cursor: pointer;
    z-index: 9999;
    right: 20px;
    bottom: 68px;
    color: #27c3ef;
    border: 2px solid #27c3ef;
    background-color: rgba(0,0,0,.68);
  }
  .arrow {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}
.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}
`;

export const FooterLogo = styled.img`
  max-width: 132px;
  width: 100%;
  display: block;
  height: auto;
  object-fit: contain;
  margin: 0 0 auto 0;
  @media ${size["md"]} {
    margin: 0px auto 20px;
  }
`;

export const MenuLinkWrapper = styled.div`
  display: flex;
  @media ${size["md"]} {
    margin: 0 auto;
  }
  @media ${size["xs"]} {
    justify-content: space-between;
    margin: 0;
  }
`;

export const MenuLink = styled.ul`
  list-style-type: none;
  margin: 0 45px;
  @media ${size["xl"]} {
    margin: 0 40px;
  }
  @media ${size["lg"]} {
    margin: 0;
  }
  @media ${size["md"]} {
    margin: 0 20px;
  }
  @media ${size["sm"]} {
    margin: 0;
  }
  @media ${size["xs"]} {
    width: auto;
    padding: 0;
  }
`;

export const MenuLinkItem = styled.li`
  text-align: left;
  line-height: 2;
  a {
    span {
      &:before {
        color: #758287;
        transition: all 0.3s linear;
      }
      &:hover {
        &:before {
          color: #fcae1d;
        }
      }
    }
  }
`;

export const MenuLinkText = styled.a`
  text-decoration: none;
  font-size: 16px;
  text-transform: capitalize;
  color: #758287;
  font-weight: 400;
  transition: all 0.3s linear;
  @media ${size["xxl"]} {
    font-size: 14px;
  }
  @media ${size["xs"]} {
    font-size: 12px;
  }

  &:hover {
    color: #fcae1d;
  }
`;

export const SocialLinkWrapper = styled.div`
  margin: 0 0 0 190px;
  padding: 0 0 0 65px;
  ul {
    li {
      margin-left: 0;
      a { font-size: 18px; }
      &+li {
        margin-left: 8px;
      }
      @media ${size["md"]} {
        line-height: normal;
        margin-bottom : 0;
        margin-top: 15px;
      }
    }
  }
  @media ${size["xl"]} {
    padding: 0;
    margin: 0 0 0 70px;
  }
  @media ${size["md"]} {
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .title {
    @media ${size["md"]} {
      display: none;
    }
  }
`;

export const Title = styled.div`
  font-size: 16px;
  text-transform: capitalize;
  color: #758287;
  font-weight: 400;
  @media ${size["xxl"]} {
    font-size: 14px;
  }
  @media ${size["xs"]} {
    font-size: 12px;
  }
`;

export const SocialLink = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  @media ${size["md"]} {
    justify-content: center;
  }
  li {
    margin: 8px;
  }
  a {
    .anticon {
      font-size: 18px;
    }
  }
`;
