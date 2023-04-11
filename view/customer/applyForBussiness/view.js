import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { Row, Col } from '@/roanuz/layout';
import { DisplayBold20 } from '@/roanuz/typopgraphy';
import { ApplyForBussinessLayout } from '@/roanuz/layout/customer/applyForBussiness';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { FormSuccessView } from '@/roanuz/view/enquiryFormFieldsView';
import { ApplyForBussinessFormView } from './form';
import { ApplyForBussinessFailureView } from './status';

export const BaseApplyForBussinessViewWrapper = styled.div`

  >.rz-row {
    flex-direction: column;
    @media screen and (min-width: ${Breakpoint.md}) {
      flex-direction: row;
    }
  }

  .page-section-main {
    flex: 1;
    margin: ${asRem(60)} ${asRem(20)};
    max-width: ${asRem(720)};

    @media screen and (min-width: ${Breakpoint.sm}) {
      margin: ${asRem(60)} auto;
      padding: 0 ${asRem(20)};
    }
    
    .form-title {
      margin-bottom: ${asRem(40)};
    }
  }
`;

export const BaseApplyForBussinessView = ({
  onSave,
  saving, saveError,
  customerCreatedComplete,
  docsContainer,
}) => {
  const { showDocumentErrorView } = docsContainer;

  const leftContent = (
    <div className="rz-section-content">
      <Row className="content-inner">
        <Col className="page-section-main">
          {customerCreatedComplete ? (
            <FormSuccessView msg="Customer Created Successfully 🎉" />
          ) : (
            <div>
              <DisplayBold20 as="h1">Sækja um fyrirtækjaaðgang</DisplayBold20>
              {showDocumentErrorView ? (
                <ApplyForBussinessFailureView
                  docsContainer={docsContainer}
                />
              ) : (
                <ApplyForBussinessFormView
                  onSave={onSave}
                  saving={saving}
                  saveError={saveError}
                  docsContainer={docsContainer}
                />
              )}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );

  return (
    <ApplyForBussinessViewWrapper>
      <ApplyForBussinessLayout
        leftContent={leftContent}
      />
    </ApplyForBussinessViewWrapper>
  );
};

BaseApplyForBussinessView.propTypes = {
  onSave: PropTypes.func,
  saving: PropTypes.bool,
  saveError: PropTypes.object,
  customerCreatedComplete: PropTypes.bool,
  docsContainer: PropTypes.object,
};

export const ApplyForBussinessViewWrapper = withDependencySupport(BaseApplyForBussinessViewWrapper, 'ApplyForBussinessViewWrapper');
export const ApplyForBussinessView = withDependencySupport(BaseApplyForBussinessView, 'ApplyForBussinessView');
