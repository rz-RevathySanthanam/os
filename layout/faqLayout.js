import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { DisplayBold40 } from '@/roanuz/typopgraphy';

export const FaqLayoutWrapper = styled.div`
  .content {
    display: flex;
    flex-direction: column;
    gap: ${asRem(10)};
    margin-top: ${asRem(10)};

    @media screen and (min-width: ${Breakpoint.sm}) {
      padding: 0 ${asRem(60)};
    }

    @media screen and (min-width: ${Breakpoint.md}) {
      flex-direction: row;
      gap: ${asRem(60)};
      margin-top: ${asRem(30)};
    }

    @media screen and (min-width: ${Breakpoint.lg}) {
      padding: 0 ${asRem(100)};
    }
    .left-wrapper {
      flex: 1;
    }
  }
`;

export const FaqLayout = ({
  titleContent,
  leftContent,
  rightContent,
}) => {
  return (
    <FaqLayoutWrapper className="rz-section-content">
      <DisplayBold40 className="faq-section-title">
        <span>{titleContent}</span>
      </DisplayBold40>
      <section className="content">
        <div className="left-wrapper">
          {leftContent}
        </div>
        <div className="right-wrapper">
          {rightContent}
        </div>
      </section>
    </FaqLayoutWrapper>
  );
};

FaqLayout.propTypes = {
  titleContent: PropTypes.element,
  leftContent: PropTypes.element,
  rightContent: PropTypes.element,
};
