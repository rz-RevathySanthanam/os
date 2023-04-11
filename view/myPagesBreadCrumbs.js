import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { TextMedium14 } from '@/roanuz/typopgraphy';
import Link from 'next/link';
import { translateV2 } from '@/roanuz/lib/utils';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseMyPagesBreadCrumbsWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: var(--size-breadcrumb-margin-top);
  margin-bottom: ${asRem(16)};
  a {
    color: var(--color-text-secondary);
  }
  span {
    color: var(--color-text-secondary);
  }
  .separator {
    color: var(--color-text-primary);
    margin: 0 ${asRem(4)};
  }
`;

export const MyPagesBreadCrumbs = ({ title, slug, subChild }) => {
  return (
    <MyPagesBreadCrumbsWrapper>
      <Link href="/customer/account/">
        <a>
          <TextMedium14 as="span">{translateV2('myPages.MY_ACCOUNT')}</TextMedium14>
        </a>
      </Link>
      <span className="separator">/</span>
      {subChild ? (
        <>
          <Link href={`/customer/account/${slug}`}>
            <a>
              <TextMedium14 as="span">
                {title}
              </TextMedium14>
            </a>
          </Link>
          <span className="separator">/</span>
          <TextMedium14 as="span">
            {subChild}
          </TextMedium14>
          &nbsp;
        </>
      ) : (
        <TextMedium14 as="span">
          {title}
        </TextMedium14>
      )}
    </MyPagesBreadCrumbsWrapper>
  );
};

MyPagesBreadCrumbs.propTypes = {
  title: PropTypes.string,
  slug: PropTypes.string,
  subChild: PropTypes.string,
};

export const MyPagesBreadCrumbsWrapper = withDependencySupport(BaseMyPagesBreadCrumbsWrapper, 'MyPagesBreadCrumbsWrapper');
