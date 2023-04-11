import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import {
  DisplayBold20,
  TextBold14,
} from '@/roanuz/typopgraphy';
import Link from 'next/link';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { CreateAccountFormView } from '@/roanuz/view/customer/createAccountForm';
import { Row, Col } from '@/roanuz/layout';
import { translateV2 } from '@/roanuz/lib/utils';
import { QuickLoginOrSignupProcessView } from '@/roanuz/view/customer/quickLoginOrSignup/view';

export const BaseCreateAccountViewWrapper = styled.div`
  margin: auto;
  @media screen and (min-width: ${Breakpoint.sm}) {
    max-width: ${asRem(704)};
  }

  h1 {
    padding-top: ${asRem(18)};
    padding-bottom: ${asRem(18)};

    @media screen and (min-width: ${Breakpoint.sm}) {
      font-size: ${asRem(30)};
      line-height: ${asRem(37)};
    }    
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  .content-inner {
    padding-top: ${asRem(30)};
    display: block;
    margin: auto;
    @media screen and (min-width: ${Breakpoint.sm}) {
      max-width: ${asRem(704)};
    }
  }

  .login-link {
    margin: ${asRem(32)} 0;
  }
`;

export const CreateAccountView = ({
  onSave,
  saving, saveError,
  isQuickProcessView,
}) => {
  const buildCreateAccountFormView = (
    <QuickLoginOrSignupProcessView>
      <CreateAccountFormView
        onSave={onSave}
        saving={saving}
        saveError={saveError}
      />
      <div className="login-link">
        {translateV2('button.HAS_ACCESS')}
        {' '}
        <Link href="/customer/account/login/">
          <TextBold14 as="a" alt="Goto Login">
            {translateV2('button.CHECK_IN')}
          </TextBold14>
        </Link>
      </div>
    </QuickLoginOrSignupProcessView>
  );
  if (isQuickProcessView) {
    return (
      buildCreateAccountFormView
    );
  }
  return (
    <CreateAccountViewWrapper>
      <div className="rz-section-content">
        <Row className="content-inner">
          <Col className="page-section-main">
            <DisplayBold20 as="h1">{translateV2('myPages.CREATE_ACCESS')}</DisplayBold20>
            {buildCreateAccountFormView}
          </Col>
        </Row>
      </div>
    </CreateAccountViewWrapper>
  );
};

CreateAccountView.propTypes = {
  onSave: PropTypes.func,
  saving: PropTypes.bool,
  saveError: PropTypes.object,
  isQuickProcessView: PropTypes.bool,
};

export const CreateAccountViewWrapper = withDependencySupport(BaseCreateAccountViewWrapper, 'CreateAccountViewWrapper');
