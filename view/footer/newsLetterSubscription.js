import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import {
  Text16, DisplayBold24, Text14,
} from '@/roanuz/typopgraphy';
import { DailogView } from '@/roanuz/view/dialog';
import { SVGIcon } from '@/roanuz/view/icon';
import MailIcon from '@/roanuz/view/imgs/MailIcon.svg';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { ReactComponent as BaseRightSidedArrowIcon } from '@/roanuz/view/imgs/RightSidedArrowIcon.svg';
import { convertStringToTranslationKey, translateV2 } from '@/roanuz/lib/utils';
import { Row } from '@/roanuz/layout';

export const RightSidedArrowIcon = withDependencySupport(BaseRightSidedArrowIcon, 'RightSidedArrowIcon');

export const BaseNewsLetterSubscriptionWrapper = styled.div`
  @media screen and (min-width: ${Breakpoint.lg}) {
    margin: 0 ${asRem(100)} ${asRem(16)} 0;
  }

  .newsletter-content {
    flex-direction: column;
    @media screen and (min-width: ${Breakpoint.md}) {
      flex-direction: row;
      gap: ${asRem(40)};
    }
  }

  .subscription-error {
    color: var(--color-error);
    margin-top: ${asRem(8)};
    max-width: ${asRem(330)};
  }

  .content-heading {
    margin-bottom: ${asRem(10)};
  }
`;

export const BaseSubscriptionFormWrapper = styled.div`
  .control {
    margin-top: ${asRem(20)};

    input {
      border-radius: ${asRem(5)};
      border: ${asRem(1)} solid var(--color-button);
      padding: ${asRem(12)} ${asRem(19)};
      background-color: var(--color-text-rev);
      height: ${asRem(48)};
      font-size: ${asRem(16)};
      line-height: ${asRem(22)};
      margin: 0;

      &:focus {
        box-shadow: none;
        outline: none;
      }

      &::placeholder {
        color: var(--color-disabled);
      }
    }

    button {
      border: none;
      height: ${asRem(48)};
      padding: ${asRem(13)} ${asRem(18)};
      background-color: var(--color-button);
      border-radius: ${asRem(5)};
      color: var(--color-text-rev);
      font-size: ${asRem(16)};
      line-height: ${asRem(22)};
      cursor: pointer;
      margin: auto;
      svg {
        margin-left: ${asRem(5)};
      }
    }
    button:disabled,
    button[disabled] {
      background-color: var(--color-disabled-2);
      cursor: not-allowed;
    }
  }


  ${(p) => (p.noBorderRadius) && css`
    .control {
      input, button {
        border-radius: 0;
      }
    }
  `}

  ${(p) => (p.pointerIcon) && css`
    .control {
      input {
        width: calc(100% - ${asRem(85)});
      }
    }
  `}

  ${(p) => (p.enableInputIcon) && css`
    .control {
      position: relative;
      gap: ${asRem(16)};
      flex-direction: column;
      @media screen and (min-width: ${Breakpoint.md}) {
        flex-direction: row;
      }

      input {
        padding-left: ${asRem(48)};
        border-radius: ${asRem(4)};
        width: 100%;
        @media screen and (min-width: ${Breakpoint.md}) {
          width: ${asRem(437)};
        }
      }
      &::before {
        content: "";
        width: ${asRem(18)};
        height: ${asRem(18)};
        position: absolute;
        left: ${asRem(16)};
        top: ${asRem(14)};
        background-image: url(${MailIcon});
        background-size: 100%;
      }
    }
  `}

  ${(p) => p.joinedButton && css`
    .control {
      gap: 0;
      flex-direction: row;
      input {
        border-radius: ${asRem(50)};
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      button {
        border-radius: ${asRem(50)};
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  `}
`;

export const NewsLetterSubscription = ({
  roundedCorners,
  noBorderRadius,
  enableInputIcon,
  joinedButton,
  socialLinks,
  pointerIcon,
  onClosePopup,
  showPopup,
  submitHandler,
  formInitValue,
  setFormInitValue,
  error,
}) => {
  return (
    <NewsLetterSubscriptionWrapper>
      <DailogView
        titleText={`${translateV2('footer.THANKS_FOR_SUBSCRIBING')}!`}
        showClose
        onClose={onClosePopup}
        show={showPopup}
        containerWidth="400px"
      >
        <div>Þú færð tölvupóst innan skamms</div>
      </DailogView>
      <Row spaceBetween className="newsletter-content">
        <div>
          <DisplayBold24 className="content-heading">{translateV2('footer.JOIN_SUBSCRIPTION')}</DisplayBold24>
          <Text16 className="subscription-text">
            {translateV2('footer.JOIN_SUBSCRIPTION_BRIEF')}
          </Text16>
        </div>
        <SubscriptionFormWrapper
          roundedCorners={roundedCorners}
          noBorderRadius={noBorderRadius}
          pointerIcon={pointerIcon}
          enableInputIcon={enableInputIcon}
          joinedButton={joinedButton}
        >
          <Row className="control">
            <input
              name="email"
              placeholder={translateV2('fields.EMAIL')}
              type="email"
              id="newsletter"
              value={formInitValue}
              onChange={(e) => setFormInitValue(e.target.value)}
            />
            <button
              title={translateV2('button.REGISTER')}
              type="submit"
              onClick={formInitValue && submitHandler}
              disabled={!formInitValue}
            >
              <Row>
                <Text14>{translateV2('button.REGISTER')}</Text14>
                {pointerIcon && (
                  <SVGIcon
                    heightPx={10}
                  >
                    <RightSidedArrowIcon />
                  </SVGIcon>
                )}
              </Row>
            </button>
          </Row>
        </SubscriptionFormWrapper>
      </Row>
      <div className="subscription-error">
        {error && (
          <div>
            {translateV2(`footer.${convertStringToTranslationKey(error.message)}`)}
          </div>
        )}
      </div>
      {socialLinks && (
        socialLinks
      )}
    </NewsLetterSubscriptionWrapper>
  );
};

NewsLetterSubscription.propTypes = {
  roundedCorners: PropTypes.bool,
  noBorderRadius: PropTypes.bool,
  enableInputIcon: PropTypes.bool,
  joinedButton: PropTypes.bool,
  socialLinks: PropTypes.object,
  pointerIcon: PropTypes.bool,
  onClosePopup: PropTypes.func,
  showPopup: PropTypes.bool,
  submitHandler: PropTypes.func,
  formInitValue: PropTypes.string,
  setFormInitValue: PropTypes.func,
  error: PropTypes.object,
};

export const SubscriptionFormWrapper = withDependencySupport(BaseSubscriptionFormWrapper, 'SubscriptionFormWrapper');
export const NewsLetterSubscriptionWrapper = withDependencySupport(BaseNewsLetterSubscriptionWrapper, 'NewsLetterSubscriptionWrapper');
