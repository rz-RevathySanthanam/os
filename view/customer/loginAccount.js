import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col } from '@/roanuz/layout';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { Button } from '@/roanuz/view/button';
import {
  DisplayBold20,
  DisplayMedium20,
  Text16,
  DisplayBold18,
} from '@/roanuz/typopgraphy';
import Link from 'next/link';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { LoginAccountFormView } from '@/roanuz/view/customer/loginAccountForm';
import { translateV2 } from '@/roanuz/lib/utils';
import { QuickLoginOrSignupProcessView } from '@/roanuz/view/customer/quickLoginOrSignup/view';

export const BaseLoginAccountViewWrapper = styled.div`
  padding: ${asRem(30)} 0 ${asRem(50)};
  h1 {
    padding: ${asRem(18)} 0;
  }


  @media screen and (min-width: ${Breakpoint.sm}) {
    h1 {
      font-size: ${asRem(24)};
      line-height: ${asRem(37)};
    }

    .title {
      font-size: ${asRem(30)};
      line-height: ${asRem(37)};
    }
  }

  .field-text {
    margin-bottom: ${asRem(18)};

    @media screen and (min-width: ${Breakpoint.sm}) {
      font-size: ${asRem(18)};
      line-height: ${asRem(26)};
    }
  }

  .rz-col {
    h1 {
      padding-top: 0;
    }
  }

  >.content-inner {
    display: block;
    padding-left: 0;
    padding-right: 0;
    
    @media screen and (min-width: ${Breakpoint.sm}) {
      display: flex;
      justify-content: space-between;
    }

    >.page-section-main {

      @media screen and (min-width: ${Breakpoint.sm}) {
        width: ${asRem(380)};     
      }

      @media screen and (min-width: ${Breakpoint.md}) {
        width: ${asRem(480)};      
      }
      .rz-button {
        width: 100%;
        justify-content: center;
        padding: ${asRem(10)} ${asRem(24)};

        @media screen and (min-width: ${Breakpoint.sm}) {
          width: auto;      
        }
      }
    }
    >.page-section-quick-links {
      margin-top: ${asRem(40)};      

      @media screen and (min-width: ${Breakpoint.sm}) {
        margin-top: 0;      
      }

      a {
        text-decoration: none;
        color: var(--color-text-rev);

        button {
          width: 100%;
          justify-content: center;
          padding: ${asRem(10)} ${asRem(24)};

          @media screen and (min-width: ${Breakpoint.sm}) {
            width: auto;      
          }
        }
      }

      @media screen and (min-width: ${Breakpoint.sm}) {
        width: ${asRem(320)};      
      }
      @media screen and (min-width: ${Breakpoint.md}) {
        width: ${asRem(480)};      
      }

      h4 {
        padding-bottom: ${asRem(10)};
      }
    }
  }

  .rz-row {
    .rz-form-item {
      flex: 1;
    }
  }

  .form-next-step {
    margin-top: ${asRem(38)};
    text-align: center;

    @media screen and (min-width: ${Breakpoint.sm}) {
      text-align: left;   
    }
  }
`;

export const LoginAccountView = ({
  onSave,
  saving, saveError,
  isQuickProcessView,
}) => {
  if (isQuickProcessView) {
    return (
      <QuickLoginOrSignupProcessView>
        <LoginAccountFormView
          onSave={onSave}
          saving={saving}
          saveError={saveError}
        />
      </QuickLoginOrSignupProcessView>
    );
  }
  return (
    <LoginAccountViewWrapper>
      <DisplayBold20 as="h1" className="title">{translateV2('login.CUSTOMER_LOGIN')}</DisplayBold20>
      <Row className="content-inner">
        <Col className="page-section-main">
          <DisplayMedium20 as="h1">{translateV2('login.REGISTERED_CUSTOMER')}</DisplayMedium20>
          <Text16 className="field-text">{translateV2('login.SIGN_IN_BRIEF')}</Text16>
          <LoginAccountFormView
            onSave={onSave}
            saving={saving}
            saveError={saveError}
          />
        </Col>
        <Col className="page-section-quick-links">
          <DisplayMedium20 as="h1">{translateV2('login.NEW_CUSTOMER')}</DisplayMedium20>
          <Text16 className="field-text">
            {translateV2('login.NEW_CUSTOMER_BRIEF')}
          </Text16>
          <div className="form-next-step">
            <Link href="/customer/account/create/">
              <a>
                <Button
                  mode="primary"
                  filled
                >
                  <DisplayBold18 as="span">
                    {translateV2('myPages.CREATE_ACCESS')}
                  </DisplayBold18>
                </Button>
              </a>
            </Link>
          </div>
        </Col>
      </Row>
    </LoginAccountViewWrapper>
  );
};

LoginAccountView.propTypes = {
  onSave: PropTypes.func,
  saving: PropTypes.bool,
  saveError: PropTypes.object,
  isQuickProcessView: PropTypes.bool,
};

export const LoginAccountViewWrapper = withDependencySupport(BaseLoginAccountViewWrapper, 'LoginAccountViewWrapper');
