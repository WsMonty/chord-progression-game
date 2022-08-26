import React from 'react';
import Navbar from '../../components/navbar';
import { PageProps } from 'gatsby';

const Layout = ({ children }: PageProps) => {
  return (
    <div id="root">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
