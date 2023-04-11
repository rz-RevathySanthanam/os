import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { CreateAccountView } from '@/roanuz/view/customer/createAccount';
import { CreateCustomerMuation } from '@/roanuz/store/customer/query';
import { useCustomerNewSessoin } from '@/roanuz/store/customer/customer';

export const CreateAccountController = ({
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
    nextRoutePath, nextRouteParams, nextUrl,
  });

  useEffect(() => {
    setSaving(sessionLoding);
  }, [sessionLoding]);

  const [createCustomer, { error }] = useMutation(CreateCustomerMuation, {
    onCompleted: (data) => {
      // Ensure customer is created
      if (data.createCustomerV2) {
        console.log('✅ Customer created', data.createCustomerV2, error);
        handleNewSession(data.generateCustomerToken.token);
      } else {
        setSaving(false);
      }
    },
  });

  const onSave = (variables) => {
    setSaving(true);
    createCustomer({ variables });
  };

  return (
    <CreateAccountView
      onSave={onSave}
      saving={saving}
      saveError={error || sessionError}
      isQuickProcessView={isQuickProcessView}
    />
  );
};

CreateAccountController.propTypes = {
  nextUrl: PropTypes.string,
  nextRoutePath: PropTypes.string,
  nextRouteParams: PropTypes.object,
  isQuickProcessView: PropTypes.bool,
};
