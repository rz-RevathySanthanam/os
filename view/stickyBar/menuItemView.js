import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withDependencySupport } from '@/roanuz/lib/dep';
import styled from 'styled-components';
import { Row, Col } from '@/roanuz/layout';
import { asRem } from '@/roanuz/lib/css';
import { TextMedium14 } from '@/roanuz/typopgraphy';
import { SVGIcon } from '@/roanuz/view/icon';
import { ReactComponent as DownArrowLineIcon } from '@/roanuz/view/imgs/DownArrowLineIcon.svg';

export const BaseMenuItemWrapper = styled(Row)`
  padding: 0 ${asRem(15)};
  & :hover {
    .arrow-svg {
      transform: translateX(30%) rotate(-180deg);
    }
  }
  & .arrow-svg {
    padding-left: ${asRem(6)}; 
    transform: translateY(15%);
    transition: all 0.3s ease-in-out;
  }
  &.item-link {
    &:hover{
      text-decoration: underline;
    }
  }
`;

const BaseMenuItem = ({
  children, onClick, href, showDropDown,
  className, target,
}) => {
  let item = (
    <TextMedium14>{children}</TextMedium14>
  );
  if (href) {
    item = (
      <Link href={href}>
        <a target={target}>{item}</a>
      </Link>
    );
  }

  const clickHandler = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <MenuItemWrapper
      className={`${className} menu-item`}
      alignCenter
      onClick={clickHandler}
    >
      <Col>{item}</Col>
      {showDropDown && (
        <Col>
          <SVGIcon heightPx={17}>
            <DownArrowLineIcon className="arrow-svg" />
          </SVGIcon>
        </Col>
      )}
    </MenuItemWrapper>
  );
};

BaseMenuItem.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  href: PropTypes.string,
  showDropDown: PropTypes.bool,
  className: PropTypes.string,
  target: PropTypes.string,
};

export const MenuItem = withDependencySupport(BaseMenuItem, 'BaseMenuItem');
export const MenuItemWrapper = withDependencySupport(BaseMenuItemWrapper, 'MenuItemWrapper');
