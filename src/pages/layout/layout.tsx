import React from 'react';
import Navbar from '../../components/navbar';
import { PageProps } from 'gatsby';
import CookieConsent from 'react-cookie-consent';

const Layout = ({ children }: PageProps) => {
  return (
    <div id="root">
      <CookieConsent
        cookieName="Google Analytics"
        buttonStyle={{ backgroundColor: '##ffd427', fontSize: '13px' }}
        style={{ background: '#191919' }}
      >
        This website uses cookies to improve user experience!
      </CookieConsent>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
