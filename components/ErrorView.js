import React from 'react';
import PropTypes from 'prop-types';
import { PageErrorViewWrapper } from './PageErrorView';
import { translateV2 } from '../lib/utils';

const ErrorView = ({ error }) => {
  console.error(error);
  return (
    <PageErrorViewWrapper className="debug-error-container">
      <div className="debug-error-view">
        <div className="debug-error-message">
          {error ? error.message : `${translateV2('loadingMsg.ERROR')}!`}
        </div>
      </div>
    </PageErrorViewWrapper>
  );
};

ErrorView.propTypes = {
  error: PropTypes.object,
};

export default ErrorView;
