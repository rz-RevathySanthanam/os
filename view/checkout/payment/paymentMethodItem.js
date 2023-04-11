import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { FormItem } from '@/roanuz/view/input';
import { useRouter } from 'next/router';
import { TextMedium16 } from '@/roanuz/typopgraphy';
import Config from '@/config';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { ImageView } from '../../image';
import { Button } from '../../button';

export const BasePaymentMethodItemViewWrapper = styled.div`
  margin-bottom: ${asRem(20)};
  padding: ${asRem(23)} ${asRem(16)};
  border: ${asRem(1)} solid var(--color-disabled-3);
  border-radius: ${asRem(6)};

  &:first-child {
    margin-top: 0;
  }

  >.selection {
    display: flex;
    align-items: center;

    >div {
      margin-right: 0;
    }

    .rz-image-view {
      order: 3;
      width: ${asRem(100)};
      margin-left: auto;
      img {
        max-width: 100%;
      }
    }

    >.method-title {
      font-weight: 500;
      line-height: ${asRem(20)};
      font-size: 14px;
      width: ${asRem(100)};
      @media screen and (min-width: ${Breakpoint.sm}) {
        font-size: 16px;
        width: initial;
      }
    }

    .rz-form-field {
      padding: 0;
    }

    .rz-form-field, .rz-form-item {
      margin-bottom: 0;
    }
    .type-radio label {
      justify-content: left;
      align-items: center;
      font-weight: bold;
    }
  }
  >.method-content:not(:empty) {
    padding-top: ${asRem(20)};
    margin-top: ${asRem(10)};
    margin-bottom: 0;
    border-top: ${asRem(1)} solid var(--color-disabled-3);

    p {
      padding-top: ${asRem(6)};
      strong {
        font-weight: bold;
      }
    }

    .transfer-details {
      margin-bottom: ${asRem(20)};
      p {
        padding-top: 0;
        margin-bottom: ${asRem(8)};
      }
    }

    @media screen and (min-width: ${Breakpoint.sm}) {
      .action > button {
        min-width: ${asRem(100)};
        justify-content: center;

        span {
          margin: 0;
        }
      }
    }
    .action {
      margin-top: ${asRem(20)};
    }
  }

  .payment-error {
    color: var(--color-focus);
    padding: 0 0 ${asRem(10)};
  }
`;

export const PaymentMethodItemView = ({
  field, saving,
  method,
  image,
  selected,
  children,
  buttonText,
  buttonType,
  saveError,
  onClick,
  // eslint-disable-next-line no-unused-vars
  onOrderStatus,
  showButtonOnEveryMethod,
}) => {
  const router = useRouter();
  const isRetryPayment = router.query && router.query.isRetry;
  const isMethodTriedEarlier = router.query && router.query.method;
  const config = (Config.cart && Config.cart.paymentMethods[method.code]) || {};
  const title = config.title || method.title;
  return (
    <PaymentMethodItemViewWrapper>
      <div className="selection">
        <FormItem
          field={field}
          disabled={saving}
        />
        {image && (<ImageView {...image} />)}
        <p className="method-title">{title}</p>
      </div>
      {selected && (
        <div className="method-content">
          {children}
          {saveError && (
            <div>
              Villa:
              {saveError.message}
            </div>
          )}
          {isRetryPayment && (isMethodTriedEarlier === method.code) && (
            <TextMedium16 className="payment-error">
              Villa: Greiðslu er ólokið, vinsamlegast reynið aftur
            </TextMedium16>
          )}
          {showButtonOnEveryMethod && (
            <div className="action">
              <Button
                disabled={saving}
                mode="primary"
                type={buttonType || 'submit'}
                large
                filled
                onClick={onClick}
                ariaLabel={buttonText || 'Borga'}
              >
                {buttonText || 'Borga'}
              </Button>
            </div>
          )}
        </div>
      )}
    </PaymentMethodItemViewWrapper>
  );
};

PaymentMethodItemView.propTypes = {
  cart: PropTypes.object.isRequired,
  field: PropTypes.shape(FormItem.propTypes.field),
  method: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  saving: PropTypes.bool,
  image: PropTypes.shape(ImageView.propTypes),
  children: PropTypes.element,
  buttonText: PropTypes.string,
  buttonType: PropTypes.string,
  saveError: PropTypes.object,
  onClick: PropTypes.func,
  onOrderStatus: PropTypes.func,
  showButtonOnEveryMethod: PropTypes.bool,
};

export const PaymentMethodItemViewWrapper = withDependencySupport(BasePaymentMethodItemViewWrapper, 'PaymentMethodItemViewWrapper');
