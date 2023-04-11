import React from 'react';
import Head from 'next/head';
import { StoreConfigConsumer } from '@/roanuz/store/core/context';

import { ContactUsPageController } from '@/roanuz/controller/contactUs';
import {
  dependencyRegister,
  // eslint-disable-next-line import/no-unresolved
} from '_WEBSITE_KEY_/dep/cart';
import { translateV2 } from '../lib/utils';

dependencyRegister();

const ContactUsPage = () => {
  const pageTitle = translateV2('contact.BE_IN_TOUCH');

  return (
    <StoreConfigConsumer>
      {() => (
        <div>
          <Head>
            <title>
              {pageTitle}
            </title>
            <meta name="description" content={pageTitle} />
          </Head>
          <ContactUsPageController />
        </div>
      )}
    </StoreConfigConsumer>
  );
};

ContactUsPage.propTypes = {
};

export default ContactUsPage;
