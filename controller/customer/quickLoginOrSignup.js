import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { QuickLoginOrSignupView } from '@/roanuz/view/customer/quickLoginOrSignup/view';
import { AccessTypeSwitchView } from '@/roanuz/view/customer/quickLoginOrSignup/switch';
import { SliderModal } from '@/roanuz/components/SliderType';
import { LoginAccountController } from '@/roanuz/controller/customer/loginAccount';
import { CreateAccountController } from '@/roanuz/controller/customer/createAccount';
import { useRouter } from 'next/router';
import { translateV2 } from '@/roanuz/lib/utils';
import Validate from '@/roanuz/lib/validate';
import { changeContentAnimation } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseQuickLoginOrSignupControllerWrap = styled.div`
  transition: all .3s ease-in-out;
  animation: ${changeContentAnimation} .5s ease-in;
`;

export const AccessTypes = {
  QuickLogin: 'QuickLogin',
  QuickSignup: 'QuickSignup',
};

export const QuickLoginOrSignupController = ({
  userContext,
  cartEmail,
  passEmail,
  displayEmailField = false,
  contentKey,
}) => {
  const [fields] = useState({
    email: {
      type: 'email',
      name: translateV2('fields.EMAIL'),
      id: 'email',
      validateFn: Validate.all([
        Validate.required,
        Validate.email,
      ]),
    },
  });

  const [formInitVal] = useState({
    email: cartEmail || '',
  });

  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [hideTheView, setHideTheView] = useState(false);
  const [selectedAccessType, setSelectedAccessType] = useState(AccessTypes.QuickLogin);

  useEffect(() => {
    if (userContext && userContext.token) {
      setHideTheView(true);
    }
  }, [router]);

  if (hideTheView) {
    return null;
  }

  const setSelectedAccessTypeHandler = (val) => {
    setSelectedAccessType(val);
    setShowLoginModal(true);
  };

  return (
    <>
      <QuickLoginOrSignupView
        modalSwitch={{
          setSelectedAccessTypeHandler,
          accessTypes: AccessTypes,
        }}
        fields={fields}
        formInitVal={formInitVal}
        passEmail={passEmail}
        displayEmailField={displayEmailField}
        contentKey={contentKey}
      />
      <SliderModal
        showSliderModal={showLoginModal}
        closeModal={() => setShowLoginModal(false)}
        titleSection={(
          <AccessTypeSwitchView
            accessTypes={AccessTypes}
            selectedAccessType={selectedAccessType}
            setSelectedAccessType={setSelectedAccessType}
          />
        )}
        showClose={false}
      >
        <QuickLoginOrSignupControllerWrap>
          {selectedAccessType === AccessTypes.QuickLogin ? (
            <LoginAccountController nextRoutePath={router.asPath} isQuickProcessView />
          ) : (
            <CreateAccountController nextRoutePath={router.asPath} isQuickProcessView />
          )}
        </QuickLoginOrSignupControllerWrap>
      </SliderModal>
    </>
  );
};

QuickLoginOrSignupController.propTypes = {
  userContext: PropTypes.object.isRequired,
  cartEmail: PropTypes.string,
  passEmail: PropTypes.func,
  displayEmailField: PropTypes.bool,
  contentKey: PropTypes.string,
};

export const QuickLoginOrSignupControllerWrap = withDependencySupport(BaseQuickLoginOrSignupControllerWrap, 'QuickLoginOrSignupControllerWrap');
