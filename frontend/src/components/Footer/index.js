import React ,{useState, useEffect}from 'react';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';

import {
  FooterWrapper,
  FooterLogo,
  MenuLinkWrapper,
  MenuLink,
  MenuLinkItem,
  MenuLinkText,
  Title,
  SocialLinkWrapper,
  SocialLink,
} from './style';
import logo from '../../assets/images/logo.svg';
import IntlMessages from '@iso/components/utility/intlMessages';

const Footer = () => {
  const [visible, setVisible] = useState(false)
  const [scrolling, setScrolling] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    function onScroll() {
      let currentPosition = window.pageYOffset; // or use document.documentElement.scrollTop;
  

      if (currentPosition > 300) {
        // downscroll code
        setScrolling(false);
      } else {
        // upscroll code
        setScrolling(true);
      }
      setScrollTop(currentPosition <= 0 ? 0 : currentPosition);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  return (
    <footer>
      <FooterWrapper className='footerwrapper'>
        <button
          className='scrollToTop'
          style={{ display: scrolling ? 'none' : ' block' }}
          onClick={scrollToTop}
        >
          <i class='arrow up'></i>
        </button>
        <Link to='/client/home'>
          <FooterLogo src={logo} alt='logo' />
        </Link>
        <MenuLinkWrapper>
          <MenuLink>
            <MenuLinkItem>
              <MenuLinkText>
                <Link to='/client/create-task'>
                  {' '}
                  <IntlMessages id='Footer.CreateTask' />
                </Link>
              </MenuLinkText>
            </MenuLinkItem>
            <MenuLinkItem>
              <MenuLinkText>
                <Link to='/client/find-task'>
                  {' '}
                  <IntlMessages id='Footer.FindTask' />
                </Link>
              </MenuLinkText>
            </MenuLinkItem>
          </MenuLink>
          <MenuLink>
            <MenuLinkItem>
              <MenuLinkText>
                <Link to='/about-us' target='_blank'>
                  {' '}
                  <IntlMessages id='Footer.AboutUs' />
                </Link>
              </MenuLinkText>
            </MenuLinkItem>
            <MenuLinkItem>
              <MenuLinkText>
                <Link to='/FAQ' target='_blank'>
                  {' '}
                  <IntlMessages id='Footer.FAQ' />
                </Link>
              </MenuLinkText>
            </MenuLinkItem>
            <MenuLinkItem>
              <MenuLinkText>
                <Link to='/contact-us' target='_blank'>
                  {' '}
                  <IntlMessages id='Footer.ContactUs' />
                </Link>
              </MenuLinkText>
            </MenuLinkItem>
          </MenuLink>
          <MenuLink>
            <MenuLinkItem>
              <MenuLinkText>
                <Link to='/termsAndConditions' target='_blank'>
                  {' '}
                  <IntlMessages id='Footer.Terms&Condition' />
                </Link>
              </MenuLinkText>
            </MenuLinkItem>
            <MenuLinkItem>
              <MenuLinkText>
                <Link to='/privacy-policy' target='_blank'>
                  {' '}
                  <IntlMessages id='Footer.PrivacyPolicy' />
                </Link>
              </MenuLinkText>
            </MenuLinkItem>
          </MenuLink>
        </MenuLinkWrapper>
        <SocialLinkWrapper>
          <Title className='title'>
            <IntlMessages id='Footer.FollowUs' />
          </Title>
          <SocialLink>
            <MenuLinkItem>
              <MenuLinkText>
                <a
                  href='https://www.facebook.com/marketplacedk-104854671569255/'
                  target='_blank'
                >
                  <span className='icon-facebook'></span>
                </a>
              </MenuLinkText>
            </MenuLinkItem>
            <MenuLinkItem>
              <MenuLinkText>
                <a
                  href='https://www.instagram.com/marketplace.dk/?utm_medium=copy_link'
                  target='_blank'
                >
                  <span className='icon-instagram'></span>{' '}
                </a>
              </MenuLinkText>
            </MenuLinkItem>
          </SocialLink>
        </SocialLinkWrapper>
      </FooterWrapper>
    </footer>
  );
};

export default Footer;
