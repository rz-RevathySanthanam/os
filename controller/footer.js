import React from 'react';
import PropTypes from 'prop-types';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { FooterView } from '@/roanuz/view/footer/footer';
import { useRouter } from 'next/router';

import { NewsLetterSubscriptionController } from './newsLetterSubscription';
import { hideComponentView } from '../lib/utils';

export const BaseFooterController = ({ dontRenderComponentOn }) => {
  const router = useRouter();
  const shouldHideFooterView = hideComponentView(router, dontRenderComponentOn);
  if (shouldHideFooterView) {
    return null;
  }
  return (
    <FooterView
      newsLetter={(<NewsLetterSubscriptionController />)}
    />
  );
};

BaseFooterController.propTypes = {
  dontRenderComponentOn: PropTypes.array,
};

export const FooterController = withDependencySupport(BaseFooterController, 'FooterController');
