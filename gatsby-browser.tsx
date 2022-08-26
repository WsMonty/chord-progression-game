import React from 'react';
import Layout from './src/pages/layout/layout';
import './src/styles/main.scss';

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
