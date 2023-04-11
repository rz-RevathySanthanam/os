import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { TextMedium16 } from '@/roanuz/typopgraphy';
import { ReactComponent as BreadCrumbArrowIcon } from '@/roanuz/view/imgs/BreadCrumbArrow.svg';
import { asRem } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { SVGIcon } from '../icon';

export const BaseItemViewWrapper = styled(TextMedium16)`
  max-width: 24ch;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: block;

  ${(p) => p.active && css`
    color: var(--color-grey);
  `};

  ${(p) => p.completed && css`
    color: var(--color-button);
    cursor: pointer;
  `};
`;

const ItemView = ({
  text, href, alt,
  active, completed, onClick,
}) => {
  if (href && completed) {
    return (
      <Link href={href} prefetch={false} shallow>
        <ItemViewWrapper
          as="a"
          alt={alt || text}
          active={active}
          completed={completed}
          href={href}
        >
          {text}
        </ItemViewWrapper>
      </Link>
    );
  }
  return (
    <ItemViewWrapper
      active={active}
      completed={completed}
      onClick={onClick}
    >
      {text}
    </ItemViewWrapper>
  );
};

ItemView.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
  alt: PropTypes.string,
  active: PropTypes.bool,
  completed: PropTypes.bool,
  onClick: PropTypes.func,
};

export const BaseWizardProgressViewWrapper = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  overflow-y: auto;
  align-items: center;
  > li {
    display: flex;
    > span {
      display: block;
      color: var(--color-grey);
    }

    svg {
      color: var(--color-grey);
      padding: 0 ${asRem(7)};
    }

    & :last-child {
      > span {
        display: none;
      }
    }
  }
`;

export const WizardProgressView = ({ items }) => {
  return (
    <WizardProgressViewWrapper>
      {items.map((item) => (
        <li key={item.text}>
          <ItemView {...item} />
          <TextMedium16 as="span">
            <SVGIcon heightPx={10}>
              <BreadCrumbArrowIcon />
            </SVGIcon>
          </TextMedium16>
        </li>
      ))}
    </WizardProgressViewWrapper>
  );
};

WizardProgressView.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(ItemView.propTypes)),
};

export const parseStepsModal = (steps, activeStep) => {
  const checkoutStepsKeys = Object.keys(steps);
  const activeStepIndex = checkoutStepsKeys.indexOf(activeStep);
  return {
    checkoutStepsKeys,
    activeStepIndex,
  };
};

// Re-write the controller in client level if needed.
export const BaseWizardProgressViewController = ({
  activeStep, checkoutSteps, pushTheStateToNext,
}) => {
  const { checkoutStepsKeys, activeStepIndex } = parseStepsModal(checkoutSteps, activeStep);
  const wizardItems = [];
  for (let step = 0; step < checkoutStepsKeys.length; step += 1) {
    const stepDetail = checkoutSteps[checkoutStepsKeys[step]];
    wizardItems.push({
      text: stepDetail.title,
      alt: `Goto Step ${stepDetail.title}`,
      onClick: () => activeStepIndex > checkoutStepsKeys.indexOf(stepDetail.id)
        && pushTheStateToNext(stepDetail.id),
      active: activeStep === stepDetail.id,
      completed: activeStepIndex > checkoutStepsKeys.indexOf(stepDetail.id),
    });
  }
  return (
    <WizardProgressView items={wizardItems} />
  );
};

BaseWizardProgressViewController.propTypes = {
  activeStep: PropTypes.string,
  checkoutSteps: PropTypes.object,
  pushTheStateToNext: PropTypes.func,
};

export const WizardProgressViewController = withDependencySupport(BaseWizardProgressViewController, 'WizardProgressViewController');
export const ItemViewWrapper = withDependencySupport(BaseItemViewWrapper, 'ItemViewWrapper');
export const WizardProgressViewWrapper = withDependencySupport(BaseWizardProgressViewWrapper, 'WizardProgressViewWrapper');
