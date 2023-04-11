import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import {
  Display24,
  Text16,
} from '@/roanuz/typopgraphy';
import { SVGIcon } from '@/roanuz/view/icon';
import { ReactComponent as DownArrowIcon } from '@/roanuz/view/imgs/DownArrowLineIcon.svg';
import { Row } from '@/roanuz/layout';
import { withDependencySupport } from '@/roanuz/lib/dep';
import Link from 'next/link';
import { testIfMatchedSpecifiedModelType } from '@/roanuz/view/datocms/types';
import { FaqLayout } from '@/roanuz/layout/faqLayout';

export const BaseFaqViewWrapper = styled.div`
  margin: ${asRem(80)} auto;
  @media screen and (min-width: ${Breakpoint.sm}) {
    margin: ${asRem(120)} auto;
  }
  .faq-section-title {
    position: relative;
    span {
      display: inline-block;
      max-width: ${asRem(1020)};
    }
  }
`;

export const FaqItemsWrapper = styled.div`
  .faq-items {
    a:hover {
      color: inherit;
      .item-title {
        text-decoration: underline;
      }
    }

    .faq-item {
      padding: ${asRem(30)} 0;
      justify-content: space-between;
      border-bottom: ${asRem(1)} solid var(--color-border);
      align-items: flex-start;
      gap: ${asRem(10)};
      
      .item-title {
        margin-bottom: ${asRem(10)};
        line-height: ${asRem(28)};

        @media screen and (min-width: ${Breakpoint.sm}) {
          font-size: ${asRem(30)};
          line-height: ${asRem(36)};
        }
      }
      .right-arrow {
        transform: rotate(-90deg);
        margin-top: ${asRem(10)};
      }
    }
  }
`;

export const FaqItems = ({ article }) => {
  return (
    <FaqItemsWrapper>
      <div className="faq-items">
        {article?.model?.slice()
          .sort((x, y) => x.sortOrder - y.sortOrder)
          .filter((item) => {
            return (
              testIfMatchedSpecifiedModelType(item, article.specifiedModelType)
            );
          })
          .map((data, dataIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <Link href={data.faqLink} key={dataIndex}>
              <a className="plain">
                <Row className="faq-item">
                  <div className="faq-item-content">
                    <Display24 className="item-title">{data.title}</Display24>
                    <Text16 className="item-desc">{data.description}</Text16>
                  </div>
                  <div className="right-arrow">
                    <SVGIcon heightPx={25}>
                      <DownArrowIcon />
                    </SVGIcon>
                  </div>
                </Row>
              </a>
            </Link>
          ))}
      </div>
    </FaqItemsWrapper>
  );
};

FaqItems.propTypes = {
  article: PropTypes.object,
};

export const BaseFaqView = ({ article }) => {
  return (
    <FaqViewWrapper>
      <FaqLayout
        titleContent={article.title}
        leftContent={<FaqItems article={article} />}
      />
    </FaqViewWrapper>
  );
};

BaseFaqView.propTypes = {
  article: PropTypes.object,
};

export const FaqViewWrapper = withDependencySupport(BaseFaqViewWrapper, 'FaqViewWrapper');
export const FaqView = withDependencySupport(BaseFaqView, 'FaqView');
