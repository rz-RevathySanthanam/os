import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseContactUsPageLayoutWrapper = styled.div`
  > .content {
    padding-top: ${asRem(20)};
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    @media screen and (min-width: ${Breakpoint.md}) {
      padding-top: ${asRem(30)};
      flex-direction: row;
    }
    > div:not(:empty) {
      flex: 1;
    }
  }
`;

export const BaseContactUsPageLayout = ({
  titleContent,
  leftContent,
  rightContent,
}) => {
  return (
    <ContactUsPageLayoutWrapper>
      {titleContent}
      <section className="content">
        <div className="left-content">
          {leftContent}
        </div>
        <div className="right-content">
          {rightContent}
        </div>
      </section>
    </ContactUsPageLayoutWrapper>
  );
};

BaseContactUsPageLayout.propTypes = {
  titleContent: PropTypes.element.isRequired,
  leftContent: PropTypes.element.isRequired,
  rightContent: PropTypes.element.isRequired,
};

export const ContactUsPageLayout = withDependencySupport(BaseContactUsPageLayout, 'ContactUsPageLayout');
export const ContactUsPageLayoutWrapper = withDependencySupport(BaseContactUsPageLayoutWrapper, 'ContactUsPageLayoutWrapper');
