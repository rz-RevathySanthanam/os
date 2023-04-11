import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { asRem } from '@/roanuz/lib/css';
import { DisplayBold40 } from '@/roanuz/typopgraphy';
import { TestimonialController } from '@/roanuz/controller/testimonial';
import { testIfMatchedSpecifiedModelType } from '@/roanuz/view/datocms/types';
import { withDependencySupport } from '../lib/dep';

export const BaseTestimonialViewWrapper = styled.div`
  background-color: var(--color-sticky-bg);
  padding: ${asRem(60)} 0;
`;

export const TestimonialView = ({
  article,
  smallView = false,
}) => {
  return (
    <TestimonialViewWrapper smallView={smallView}>
      <div className="rz-section-content testimonial-view-wrapper">
        <div className="testimonial-title">
          <DisplayBold40 as="span">{article.title}</DisplayBold40>
        </div>
        <TestimonialController
          items={article.model?.filter((item) => {
            return (
              testIfMatchedSpecifiedModelType(item, article.specifiedModelType)
            );
          })}
        />
      </div>
    </TestimonialViewWrapper>
  );
};

TestimonialView.propTypes = {
  article: PropTypes.object,
  smallView: PropTypes.bool,
};

export const TestimonialViewWrapper = withDependencySupport(BaseTestimonialViewWrapper, 'TestimonialViewWrapper');
