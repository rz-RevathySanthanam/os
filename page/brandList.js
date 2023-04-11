import React from 'react';
import Head from 'next/head';
import { StoreConfigConsumer } from '@/roanuz/store/core/context';
import { translateV2 } from '@/roanuz/lib/utils';
import { BrandListPageController } from '@/roanuz/controller/brandList/brandListPage';
import PropTypes from 'prop-types';
import {
  dependencyRegister,
  // eslint-disable-next-line import/no-unresolved
} from '_WEBSITE_KEY_/dep/brandList';

dependencyRegister();

export const BrandListPage = ({ pageTitle }) => {
  const pageTitleRef = pageTitle || translateV2('labelAndTitle.BRAND');

  return (
    <StoreConfigConsumer>
      {({
        attributeMeta,
      }) => (
        <div>
          <Head>
            <title>
              {pageTitleRef}
            </title>
            <meta name="description" content={pageTitleRef} />
          </Head>
          <BrandListPageController attributeMeta={attributeMeta} pageTitle={pageTitleRef} />
        </div>
      )}
    </StoreConfigConsumer>
  );
};

BrandListPage.propTypes = {
  pageTitle: PropTypes.string,
};
