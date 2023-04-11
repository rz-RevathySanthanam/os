import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DatoCMSPageSectionsView } from '@/roanuz/view/datocms/datocmsSections';

export const DatoCmsPageWrapper = styled.div`
`;

export const DatoCmsPageController = ({ rzfDatoCmsPage }) => {
  const { pageDetail } = rzfDatoCmsPage || {};
  return (
    <DatoCmsPageWrapper>
      {pageDetail?.map((article, aIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <DatoCMSPageSectionsView article={article} key={aIndex} />
      ))}
    </DatoCmsPageWrapper>
  );
};

DatoCmsPageController.propTypes = {
  rzfDatoCmsPage: PropTypes.object.isRequired,
};
