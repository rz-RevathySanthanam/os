import React from 'react';
import PropTypes from 'prop-types';
import { SEOHead } from '@/roanuz/document';
import { StoreConfigConsumer } from '@/roanuz/store/core/context';
// import {
//   dependencyRegister,
//   // eslint-disable-next-line import/no-unresolved
// } from '_WEBSITE_KEY_/dep/cart';
import PageLoadingView from '@/roanuz/components/PageLoadingView';
import PageErrorView from '@/roanuz/components/PageErrorView';
import { useQuery } from '@apollo/client';
import { DatoCmsPageQuery } from '@/roanuz/store/cms/datoCmsQuery';
import { NotFound } from '@/roanuz/page/404';
import { DatoCmsPageController } from '@/roanuz/controller/cms/datoCmsPageController';
import { DisplayBold40 } from '@/roanuz/typopgraphy';
import { translateV2 } from '../lib/utils';

// dependencyRegister();

const DatoCmsPage = ({ pageId }) => {
  const {
    loading: datoCmsPageLoading,
    error: datoCmsPageError,
    data: datoCmsPageData,
  } = useQuery(DatoCmsPageQuery, { variables: { pageId } });

  if ((!datoCmsPageData) && datoCmsPageLoading) return (<PageLoadingView message={translateV2('loadingMsg.CMS_PAGE')} />);
  if ((!datoCmsPageData) && datoCmsPageError) return (<PageErrorView error={datoCmsPageError} />);

  const { rzfDatoCmsPage } = datoCmsPageData;

  if (!rzfDatoCmsPage) return (<NotFound />);

  const { seoSet } = rzfDatoCmsPage || {};

  let [seoSetRef] = seoSet;

  if (!seoSetRef) {
    seoSetRef = {};
  }

  return (
    <StoreConfigConsumer>
      {() => (
        <div>
          <SEOHead
            title={seoSetRef.meta_title || rzfDatoCmsPage.title}
            desc={seoSetRef.meta_description}
            keywords={seoSetRef.meta_keywords}
          />
          {rzfDatoCmsPage.pageTitle && (
            <div className="rz-section-content">
              <DisplayBold40 as="h1" className="page-main-title">{rzfDatoCmsPage.pageTitle}</DisplayBold40>
            </div>
          )}
          <DatoCmsPageController
            rzfDatoCmsPage={rzfDatoCmsPage}
          />
        </div>
      )}
    </StoreConfigConsumer>
  );
};

DatoCmsPage.propTypes = {
  pageId: PropTypes.string,
};

export default DatoCmsPage;
