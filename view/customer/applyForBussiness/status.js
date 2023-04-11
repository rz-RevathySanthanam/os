import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DisplayBold20, DisplayBold18, Text16 } from '@/roanuz/typopgraphy';
import { Button } from '@/roanuz/view/button';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { translateV2 } from '@/roanuz/lib/utils';
import { DocumentUploader } from './documentUploader';

const ApplyForBussinessFailureViewWrapper = styled.div`
`;

export const BaseApplyForBussinessFailureView = ({
  docsContainer,
}) => {
  const {
    selectedDocuments,
    errorDocuments,
    setSelectedDocuments,
    reUploadDocumentsHandler,
    uploading,
  } = docsContainer;

  useEffect(() => {
    if (errorDocuments && errorDocuments.length > 0) {
      setSelectedDocuments([
        ...errorDocuments,
      ]);
    }
  }, [docsContainer.errorDocuments]);

  const reUploadDocuments = () => {
    if (errorDocuments && errorDocuments.length > 0) {
      reUploadDocumentsHandler();
    }
  };
  return (
    <ApplyForBussinessFailureViewWrapper>
      <DisplayBold20 as="h3">{translateV2('myPages.SUPPORTING_DOCUMENTS')}</DisplayBold20>
      <Text16 as="p">Error in uploading following documents. Please try again</Text16>
      <DocumentUploader
        container={docsContainer}
      />
      <Button
        disabled={uploading || selectedDocuments.length === 0}
        mode="primary"
        type="submit"
        filled
        className="button"
        ariaLabel="Submit the documents"
        onClick={() => reUploadDocuments()}
      >
        <DisplayBold18 as="span">
          Submit the documents
        </DisplayBold18>
      </Button>
    </ApplyForBussinessFailureViewWrapper>
  );
};

BaseApplyForBussinessFailureView.propTypes = {
  docsContainer: PropTypes.object,
};

export const ApplyForBussinessFailureView = withDependencySupport(BaseApplyForBussinessFailureView, 'ApplyForBussinessFailureView');
