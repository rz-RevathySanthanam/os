import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { LoginAccountView } from '@/roanuz/view/customer/loginAccount';
import { CustomerTokenMutation } from '@/roanuz/store/customer/query';
import { useCustomerNewSessoin } from '@/roanuz/store/customer/customer';

export const LoginAccountController = ({
  nextUrl,
  nextRoutePath,
  nextRouteParams,
  isQuickProcessView = false,
}) => {
  const [saving, setSaving] = useState(false);
  const [
    handleNewSession,
    { loading: sessionLoding, error: sessionError },
  ] = useCustomerNewSessoin({
    nextRoutePath, nextRouteParams, nextUrl, allowCustomerSessionExtend: true,
  });

  useEffect(() => {
    setSaving(sessionLoding);
  }, [sessionLoding]);

  const [createToken, { error }] = useMutation(CustomerTokenMutation, {
    onCompleted: (data) => {
      if (data.generateCustomerToken) {
        console.log('✅ Customer Login');
        handleNewSession(data.generateCustomerToken.token);
      } else {
        setSaving(false);
      }
    },
  });

  const onSave = (variables) => {
    setSaving(true);
    createToken({ variables });
  };

  return (
    <LoginAccountView
      onSave={onSave}
      saving={saving}
      saveError={error || sessionError}
      isQuickProcessView={isQuickProcessView}
    />
  );
};

LoginAccountController.propTypes = {
  nextUrl: PropTypes.string,
  nextRoutePath: PropTypes.string,
  nextRouteParams: PropTypes.object,
  isQuickProcessView: PropTypes.bool,
};
