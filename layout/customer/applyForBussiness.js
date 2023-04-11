import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '@/roanuz/layout';

export const ApplyForBussinessLayout = ({ leftContent, rightContent }) => {
  return (
    <Row className="content-inner" spaceBetween>
      <Col className="page-section-main">
        {leftContent}
      </Col>
      <Col className="additional-section">
        {rightContent}
      </Col>
    </Row>
  );
};

ApplyForBussinessLayout.propTypes = {
  leftContent: PropTypes.element,
  rightContent: PropTypes.element,
};
