import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { MyPagesSideBarView } from '@/roanuz/view/customer/sideBar';
import { UserContext } from '@/roanuz/store/core/context';
import { MyPagesLoadingView } from '@/roanuz/components/floatingPlaceholders/myPages';
import { MyPageLayout } from '@/roanuz/layout/customerLandingPage';

export const MyPagesController = ({
  className,
  activeSlug,
  content,
  breadCrumbs,
  title,
  isLandingPage = false,
}) => {
  const userContext = useContext(UserContext);
  if (!userContext.customerName) {
    return <MyPagesLoadingView isLandingPage={isLandingPage} />;
  }
  return (
    <MyPageLayout
      title={title}
      className={className}
      breadCrumbs={breadCrumbs}
      sideBar={(
        <MyPagesSideBarView
          title={userContext.customerName}
          activeSlug={activeSlug}
          isB2BUser={userContext.isB2B}
        />
      )}
      content={content}
    />
  );
};

MyPagesController.propTypes = {
  className: PropTypes.string,
  activeSlug: PropTypes.string,
  content: PropTypes.element,
  title: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  breadCrumbs: PropTypes.element,
  isLandingPage: PropTypes.bool,
};
