import React from 'react';
import { SEOHead } from '@/roanuz/document';
import { MyPagesController } from '@/roanuz/controller/customer/myPages';

const CustomerLandingPage = () => {
  return (
    <>
      <SEOHead
        title="My Pages"
      />
      <MyPagesController
        className="mypages-landingview"
        isLandingPage
      />
    </>
  );
};

CustomerLandingPage.propTypes = {
};

export default CustomerLandingPage;
