import React from 'react';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { TextBold16, Text16 } from '@/roanuz/typopgraphy';
import { ContactUsPageLayout } from '@/roanuz/layout/ContactPage';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { CartProductsEnquiryFormView } from '@/roanuz/view/cart/enquiryForm';
import { translateV2 } from '@/roanuz/lib/utils';

export const BaseContactUsFormWrapper = styled.div`
  max-width: ${asRem(720)};
  margin: ${asRem(50)} auto;
  >p {
    margin-bottom: ${asRem(20)};
  }
  .rz-form-item {
    width: 100%;
  }
  .success {
    color: var(--color-active-2);
    padding-bottom: ${asRem(16)};
  }

  >.hide-help-text {
    display: none;
  }

  >.page-main-title {
    font-weight: bold;
  }

  .form-next-step {
    margin-top: ${asRem(20)};
  }

  .left-content {
    form >.rz-row {
      margin-bottom: ${asRem(15)};
    }
  }
`;

export const BaseContactUsView = ({
  onSave,
  saving,
  saveError,
  saveSuccess,
}) => {
  return (
    <ContactUsFormWrapper className="rz-section-content">
      <ContactUsPageLayout
        titleContent={(
          <>
            <TextBold16 className="page-main-title">
              {translateV2('contact.CONTACT_TITLE')}
            </TextBold16>
            {!saveSuccess && (
              <Text16 className="page-desc">
                {translateV2('contact.CONTACT_DESC')}
              </Text16>
            )}
          </>
        )}
        leftContent={(
          <CartProductsEnquiryFormView
            onSave={onSave}
            saving={saving}
            saveError={saveError}
            saveSuccess={saveSuccess}
          />
        )}
      />
    </ContactUsFormWrapper>
  );
};

BaseContactUsView.propTypes = {
  ...CartProductsEnquiryFormView.PropTypes,
};

export const ContactUsView = withDependencySupport(BaseContactUsView, 'ContactUsView');
export const ContactUsFormWrapper = withDependencySupport(BaseContactUsFormWrapper, 'ContactUsFormWrapper');
