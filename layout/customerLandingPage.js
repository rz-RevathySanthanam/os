import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '@/roanuz/layout';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { Display30 } from '@/roanuz/typopgraphy';

export const BaseMyPageLayoutWrapper = styled.div`
  .account-page-title {
    @media screen and (min-width: ${Breakpoint.md}) {
      font-size: ${asRem(48)};
      line-height: ${asRem(72)};
    }
  }
  .mypages-container {
    max-width: var(--space-page-max-width);
    margin: auto;
    .mypages-sidebar {
      background-color: var(--color-mypages-sidebar);
      padding: ${asRem(70)} ${asRem(20)} ${asRem(80)} var(--space-page-side-padding);
      display: none;
      padding-left: var(--space-page-side-padding);
      @media screen and (min-width: ${Breakpoint.md}) {
        display: block;
        min-width: var(--size-mypages-side-width);
      }
    }
    .content-wrap {
      padding: 0 var(--space-page-side-padding) ${asRem(50)};
      width: 100%;
      @media screen and (min-width: ${Breakpoint.md}) {
        padding: 0 var(--space-page-side-padding) ${asRem(50)} var(--space-page-side-padding);
        flex-grow: 1;
      }
    }
  }
  &.mypages-landingview {
    .mypages-container {
      .mypages-sidebar {
        flex: 1;
        display: block;
      }
      .content-wrap {
        display: none;
      }
    }
  }
  .section-content {
    margin-top: ${asRem(10)};
  }
`;

export const MyPageLayout = ({
  className,
  sideBar,
  content,
  breadCrumbs,
  title,
}) => {
  return (
    <MyPageLayoutWrapper className={className}>
      <Row className="mypages-container">
        <Col className="mypages-sidebar">{sideBar}</Col>
        <Col className="content-wrap">
          {breadCrumbs && (
            <section className="hide-on-print section-breadCrumbs">{breadCrumbs}</section>
          )}
          {title && (
            <Display30 className="hide-on-print account-page-title">{title}</Display30>
          )}
          {content && (
            <section className="section-content">{content}</section>
          )}
        </Col>
      </Row>
    </MyPageLayoutWrapper>
  );
};

MyPageLayout.propTypes = {
  className: PropTypes.string,
  sideBar: PropTypes.element,
  content: PropTypes.element,
  title: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  breadCrumbs: PropTypes.element,
};

export const MyPageLayoutWrapper = withDependencySupport(BaseMyPageLayoutWrapper, 'MyPageLayoutWrapper');
