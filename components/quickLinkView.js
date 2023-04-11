import { withDependencySupport } from '@/roanuz/lib/dep';
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import { Row, Col } from '@/roanuz/layout';
import { asRem } from '@/roanuz/lib/css';
import { SVGIcon } from '@/roanuz/view/icon';
import { Text16 } from '@/roanuz/typopgraphy';

export const QuickLinkItemWrapper = styled.div`
  a {
    color: var(--color-text);
    font-family: var(--tg-bold-family);
    display: flex;
    align-items: center;
    .rz-svg-icon {
      margin-right: ${asRem(13)};
      vertical-align: middle;
    }
  }

  .rz-svg-icon {
    min-width: ${asRem(20)};
  }

  .right-svg-col {
    max-width: ${asRem(20)};
    max-height: ${asRem(20)};
    margin-right: ${asRem(6)};
  }
`;

const BaseQuickLinkItem = ({ name, href, children }) => {
  let item = (
    <Row alignCenter>
      {children && (
        <Col className="right-svg-col">
          <SVGIcon heightPx={20}>{children}</SVGIcon>
        </Col>
      )}
      <Col>
        <Text16 as="span">{name}</Text16>
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
    <QuickLinkItemWrapper>
      {item}
    </QuickLinkItemWrapper>
  );
};

BaseQuickLinkItem.propTypes = {
  name: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.string.isRequired,
  ]),
  href: PropTypes.string,
  children: PropTypes.element.isRequired,
};

BaseQuickLinkItem.propTypes = {};
export const QuickLinkItem = withDependencySupport(BaseQuickLinkItem, 'QuickLinkItem');
