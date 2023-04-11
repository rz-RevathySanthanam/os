import React from 'react';
import PropTypes from 'prop-types';
import { PageLoadingViewWrapper } from './PageLoadingView';
import { translateV2 } from '../lib/utils';

const LoadingView = ({ message, style }) => (
  <PageLoadingViewWrapper className="loading-view-wrapper">
    <div className="container">
      <div className="row" style={style}>
        <div className="text-center">
          {message || `${translateV2('loadingMsg.LOADING')}...`}
        </div>
      </div>
    </div>
  </PageLoadingViewWrapper>
);

LoadingView.propTypes = {
  message: PropTypes.string,
  style: PropTypes.object,
};

export default LoadingView;
