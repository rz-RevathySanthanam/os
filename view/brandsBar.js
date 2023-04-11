import { withDependencySupport } from '@/roanuz/lib/dep';
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import { Row, Col } from '@/roanuz/layout';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { Bold, Small } from '@/roanuz/typopgraphy';
import { SVGIcon } from '@/roanuz/view/icon';
import { ReactComponent as CallIcon } from '@/roanuz/view/imgs/CallIcon.svg';
import { ReactComponent as CardIcon } from '@/roanuz/view/imgs/CardIcon.svg';
import { ReactComponent as UserIcon } from '@/roanuz/view/imgs/UserIcon.svg';
import { ReactComponent as RzLogo } from '@/roanuz/view/imgs/RoanuzLogo.svg';
import { useRouter } from 'next/router';
import { translateV2, hideComponentView } from '@/roanuz/lib/utils';

const QuickLinkItemCss = css`
  .right-svg-col {
    max-width: ${asRem(20)};
    max-height: ${asRem(20)};
    margin-right: ${asRem(6)};
  }
`;

export const SupportLinkItem = ({ name, href, children }) => {
  let item = (
    <Row alignCenter>
      <Col className="right-svg-col">
        <SVGIcon heightPx={20}>{children}</SVGIcon>
      </Col>
      <Col>
        {name}
      </Col>
    </Row>
  );

  if (href) {
    item = (
      <Link href={href}>
        <a className="plain" alt={name}>
          {item}
        </a>
      </Link>
    );
  }

  return (
    <div
      className="rz-quick-link-item"
      css={QuickLinkItemCss}
    >
      {item}
    </div>
  );
};

SupportLinkItem.propTypes = {
  name: PropTypes.string.isRequired,
  href: PropTypes.string,
  children: PropTypes.element.isRequired,
};

const QuickLinksCss = css`
  .rz-quick-link-item {
    margin-right: ${asRem(16)};
    font-family: var(--tg-bold-family);
    font-weight: 500;
    font-size: 0;
    @media (min-width: ${Breakpoint.md}) {
      font-size: ${asRem(14)};
      line-height: ${asRem(20)};
    }
    &:last-child{
      margin-right: 0;
    }
  }
`;

export const BaseSupportLinks = () => {
  return (
    <Row css={QuickLinksCss}>
      <SupportLinkItem name={`${translateV2('fields.PHONE')} +1 (855) 2SPORT4`} href="tel:+18552776784">
        <CallIcon />
      </SupportLinkItem>
      <SupportLinkItem name={translateV2('myPages.INTERNET_CLUB')} href="/netklubbur">
        <CardIcon />
      </SupportLinkItem>
      <SupportLinkItem
        name={translateV2('myPages.MY_PAGES')}
        href="/customer/account/"
      >
        <UserIcon />
      </SupportLinkItem>
    </Row>
  );
};

export const LogoDescCol = styled(Col)`
  display: flex;
  align-items: center;
  margin-right: ${asRem(10)};

  .desc-part {
    text-align: right;
    margin-right: ${asRem(10)};
    ${Small}, ${Bold} {
      display: block;
    }
  }
  .icon-part {
    >.rz-svg-icon {
      vertical-align: inherit;
    }
  }
`;

export const BaseBrandsView = () => {
  return (
    <Row alignCenter>
      <Col className="brand-contaner">
        <Link href="/">
          <a target="_blank">
            <SVGIcon useOriginal fillOnHover heightPx={19}>
              <RzLogo />
            </SVGIcon>
          </a>
        </Link>
      </Col>
    </Row>
  );
};

export const BarRow = styled(Row).attrs({ className: 'rz-section-content' })`
  height: var(--size-brand-nav-height);
  align-items: center;
  .rz-svg-icon {
    vertical-align: middle;
  }
  .seperator {
    border-left: 1px solid var(--color-disabled-3);
    padding: ${asRem(6)} ${asRem(10)};
    padding-right: 0;
    >div {
      vertical-align: baseline;
    }
  }
`;

export const BaseBrandsBarViewWrapper = styled.div`
  background: var(--color-brand-bar-bg);
`;

export const BaseBrandsBarView = ({ dontRenderComponentOn }) => {
  const router = useRouter();
  const shouldHideBrandsBarView = hideComponentView(router, dontRenderComponentOn);
  if (shouldHideBrandsBarView) {
    return null;
  }
  return (
    <BrandsBarViewWrapper>
      <BarRow spaceBetween>
        <Col>
          <BrandsView />
        </Col>
        <Col>
          <SupportLinks />
        </Col>
      </BarRow>
    </BrandsBarViewWrapper>
  );
};

BaseBrandsBarView.propTypes = {
  dontRenderComponentOn: PropTypes.array,
};
export const BrandsBarView = withDependencySupport(BaseBrandsBarView, 'BrandsBarView');
export const BrandsBarViewWrapper = withDependencySupport(BaseBrandsBarViewWrapper, 'BrandsBarViewWrapper');
export const BrandsView = withDependencySupport(BaseBrandsView, 'BrandsView');
export const SupportLinks = withDependencySupport(BaseSupportLinks, 'SupportLinks');
