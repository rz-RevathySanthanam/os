import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { ImageView } from '@/roanuz/view/image';
import { ReactComponent as AttachmentIconSvg } from '@/roanuz/view/imgs/AttachmentIcon.svg';
import ArticleIcon from '@/roanuz/view/imgs/ArticleIcon.svg';
import { Button } from '@/roanuz/view/button';
import { Text12, TextMedium16 } from '@/roanuz/typopgraphy';
import { ReactComponent as CloseIcon } from '@/roanuz/view/imgs/CloseIcon.svg';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { translateV2 } from '@/roanuz/lib/utils';

export const BaseDocumentUploaderWrapper = styled.div`
  position: relative;
  input {
    background: none;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
  }

  .preview-images-wrapper {
    display: flex;
    align-items: center;
    gap: ${asRem(20)};
    padding: ${asRem(20)} 0;
    overflow: hidden;
  }

  .preview-image {
    width: ${asRem(120)};
    height: ${asRem(120)};
    position: relative;
    .rz-image-view {
      height: calc(100% - ${asRem(40)});
      margin: ${asRem(23)} 0 ${asRem(5)};
      display: flex;
      align-items: center;
      justify-content: center;
    }
    img {
      max-width: 100%;
      max-height: 100%;
    }

    .preview-title {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
    }

    .cancel-btn {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0;
      .rz-svg-icon {
        margin-right: 0;
      }
    }
  }

  .rz-button {
    position: relative;
    .rz-svg-icon {
      margin-right: ${asRem(10)};
    }
  }

`;

// Take controller in future, if you wants to use the pre signed query action in component level.
export function DocumentUploader({
  container,
}) {
  const {
    selectedDocuments,
    setSelectedDocuments,
    uploading,
  } = container;

  const onHandleDocuments = (event) => {
    const { files } = event.target;
    setSelectedDocuments([
      ...selectedDocuments,
      ...files,
    ]);
  };

  const onRemoveFile = (index) => {
    const revisedDocs = [...selectedDocuments];
    revisedDocs.splice(index, 1);
    setSelectedDocuments([
      ...revisedDocs,
    ]);
  };

  const buildPreviewDocument = (doc) => {
    const path = URL.createObjectURL(doc);
    return (
      <>
        <ImageView
          src={path}
          alt={doc.name}
          fallBackImage={ArticleIcon}
        />
        <Text12 className="preview-title">{doc.name}</Text12>
      </>
    );
  };
  return (
    <DocumentUploaderWrapper>
      <Button
        icon={<AttachmentIconSvg />}
        mode="primary"
        ariaLabel={translateV2('myPages.ADD_ATTACHMENT')}
        filled
        disabled={uploading}
      >
        <TextMedium16>{translateV2('myPages.ADD_ATTACHMENT')}</TextMedium16>
        <input
          type="file"
          accept="application/pdf, image/png, image/jpeg, image/jpg"
          multiple
          onChange={(e) => !uploading && onHandleDocuments(e)}
        />
      </Button>
      {selectedDocuments && selectedDocuments.length > 0 && (
        <div className="preview-images-wrapper">
          {selectedDocuments.map((document, index) => (
            <div className="preview-image">
              {buildPreviewDocument(document)}
              <Button
                icon={<CloseIcon />}
                noborder
                onClick={() => !uploading && onRemoveFile(index)}
                ariaLabel="Cancel Button"
                className="cancel-btn"
                disabled={uploading}
              />
            </div>
          ))}
        </div>
      )}
    </DocumentUploaderWrapper>
  );
}

DocumentUploader.propTypes = {
  container: PropTypes.object.isRequired,
};

export const DocumentUploaderWrapper = withDependencySupport(BaseDocumentUploaderWrapper, 'DocumentUploaderWrapper');
