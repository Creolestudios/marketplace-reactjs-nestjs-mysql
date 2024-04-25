import styled from "styled-components";
import { size } from "../../size";

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  background: #fff;
  height: 70px;
  box-shadow: 0px 1px 0px #CDCDCD;
  position: relative;
  z-index: 999;
  @media ${size["md"]} {
    padding: 0 15px;
    justify-content: unset;
  }
  @media ${size["sm"]} {
    height: 56px;
  }
  .ant-menu {
    display: flex;
    align-items: center;
    list-style-type: none;
    margin: 0;
    padding: 0;
    height: 100%;
    border:none;
    .ant-menu-item{
      display: flex;
      align-items: center;
      height: 100%;
      border-bottom: 3px solid transparent !important;
      position: relative;
      margin: 0 10px;
      top:0 !important;
      margin-top: 0 !important;
      background-color: transparent;
      & + li {
        margin-left: 20px;
      }
      a {
        line-height: 23px;
      }
      &:after {
        content:'';
        position: absolute;
        bottom: -3px;
        width: 100%;
        background: #2AABE1;
        height: 3px;
        border-radius: 5px 5px 0px 0px;
        opacity: 0;
        transition: all 0.3s linear;
      }
      &.active {
        a {
          color: #2aabe1 !important;
          text-shadow: 0 0 0.85px #2aabe1;
        }
        &:after {
          opacity: 1;
        }
      }
      & a {
        color: black;
      }
    }
  }
`;

export const Logo = styled.img`
  max-width: 132px;
  width: 100%;
  @media ${size["sm"]} {
    max-width: 105px;
  }
`;

export const HumbergerMenu = styled.div`
  display: none;
  cursor: pointer;
  margin: 0 23px 0 0;
  width: 16px;
  .bar {
    transition: all 0.3s linear;
    height: 2px;
    background: #423f3f;
    display: block;
    width: 20px;
    margin-bottom: 4px;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    &:nth-child(2) {
      width: 12px;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  @media ${size["md"]} {
    display: block;
    position: relative;
    z-index: 10000;
    .bar {
      width: 16px;
      &:nth-child(2) {
        width: 10px;
      }
    }
  }
  &.active-humberger-menu {
    .bar {
      width:20px;
      transition: all 0.3s linear;
      &:first-child {
        transform: rotate(45deg) translateY(4px);
      }
      &:last-child {
        transform: rotate(-45deg) translateY(-4px);
      }
      &:nth-child(2) {
        display: none;
      }
    }
  }
`;

export const MenuWrapper = styled.div`
  height: 100%;
  @media ${size["md"]} {
    display: none;
  }
  &.mobile-menu {
    position: fixed;
    bottom: -1px;
    left: 0;
    z-index: 10;
    height: 100%;
    width: 100%;
    background: #fff;
    height: calc(100% - 70px);
    padding: 35px 22px 15px;
    ul {
      flex-direction: column;
      align-items: start;
      li {
        height: auto !important;
        margin: 0 0 15px !important;
        &.active:after {
          background: none;
        }
      }
    }
    @media ${size["sm"]} {
      height: calc(100% - 56px);
    }
  }
`;

export const HeaderRightBlock = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  @media ${size["md"]} {
    margin-left: auto;
  }

  > ul {
    height: 100%;
    display: flex;
    align-items: center;
    list-style-type: none;
    padding: 0;
    margin: 0;
    border:none;
    > li {
      height: 100%;
      display: flex;
      align-items: center;
      position: relative;
      padding: 0 !important;
      overflow: visible !important;
      margin: 0 !important;
      & + li {
        margin-left: 25px !important;
        margin-right: 0 !important;
        @media ${size["sm"]} {
          margin-left: 20px !important;
        }
        @media ${size["xs"]} {
          margin-left: 15px !important;
        }
      }
      .icon-message {
        i {
          font-size: 16px;  
          @media ${size["sm"]} {
            font-size: 14px; 
          }
        }
      }
      .ant-badge {
        position: absolute;
        top: 18px;
        right: -8px;
        @media ${size["sm"]} {
          top: 15px;
          right: -2px;
        }
        .ant-badge-count {
          width: 14px;
          height: 14px;
          background: #fcae1d;
          border-radius: 50%;
          padding: 0;
          line-height: 13px;
          font-size: 8px;
          text-align: center;
          min-width: auto;
          box-shadow: none;
          @media ${size["sm"]} {
            width: 6px;
            height: 6px;
            padding: 3px;
            top: 2px;
            right: -1px;
          }
        }
        .ant-scroll-number-only {
          display: block;
          line-height: 14px;
          @media ${size["sm"]} {
            display: none;
          }
        }
      }
      i {
        font-size: 22px;
        cursor: pointer;
        @media ${size["sm"]} {
          font-size: 20px;
        }
      }
      a {
        color: #423f3f;
        display: flex;
        transition: all 0.3s linear;
        
      }
      &:hover {
        i {
          color: #2aabe1;
          transition: all 0.3s linear;
        }
        /* ul {
          display: block;
        } */
      }

      > ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 100%;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: end;
        background: #fff;
        border-radius: 14px;
        -webkit-border-radius: 14px;
        box-shadow: 0px 0px 8px rgba(42, 171, 225, 0.1);
        padding: 20px;
        /* display: none; */
        height: fit-content;
        z-index: 1010;
        transition: 0.2s all;
        li {
          text-align: left;
          margin: 0 0 15px;
          width: 100%;
          transition: all 0.3s linear;
          a {
            color: #423f3f;
            text-transform: uppercase;
            white-space: nowrap;
            text-align: left;
            font-size: 16px;
            transition: all 0.3s linear;
            @media ${size["xxl"]} {
              font-size: 15px;
            }
            @media ${size["sm"]} {
              font-size: 14px;
            }
            &:hover {
              color: #2aabe1;
            }
          }

          &:last-child {
            margin: 0;
          }
        }
      }
    }
  }
`;
