import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Validate from '@/roanuz/lib/validate';
import { asRem } from '@/roanuz/lib/css';
import { Formik, Form } from 'formik';
import { TextMedium16, LabelMedium12 } from '@/roanuz/typopgraphy';
import LoadingView from '@/roanuz/components/LoadingView';
import ErrorView from '@/roanuz/components/ErrorView';
import { TickIcon } from '@/roanuz/view/icon';
import { FormItem } from '@/roanuz/view/input';
import { Button } from '@/roanuz/view/button';
import { translateV2 } from '../../lib/utils';

const CouponViewWrapper = styled.div`
  .coupons-new-item {
    .rz-form-item {
      margin: ${asRem(15)} 0 0;
      .rz-form-field {
        display: flex;
        gap: ${asRem(15)};
        align-items: center;
        flex-wrap: wrap;
        .input {
          flex: 1;
          label {
            display: none;
          }
        }
        .action span {
          border: ${asRem(1)} solid var(--color-button);
          padding: ${asRem(10)} ${asRem(20)};
          border-radius: ${asRem(40)};
          color: var(--color-button);
        }
      }
    }
  }
  .debug-error-container, .loading-view-wrapper {
    margin: ${asRem(10)} 0;
  }
`;

export const CouponView = ({
  formInitVal, onSubmit, onRemove,
  showSuccessMessage, couponParser,
  cart, showMessage,
}) => {
  const {
    couponLoading,
    couponError,
    couponData,
    couponRemoveLoading,
    couponRemoveError,
    couponRemoveData,
  } = couponParser;
  return (
    <CouponViewWrapper>
      {cart.appliedCoupons && cart.appliedCoupons.length ? (
        <>
          {cart.appliedCoupons.map((code) => (
            <div className="coupons-line-item" key={code.uid}>
              <div className="name-value-line">
                <TextMedium16 className="label">{code.code}</TextMedium16>
                <div>
                  <Button mode="link" onClick={onRemove} ariaLabel="Remove">{translateV2('button.REMOVE')}</Button>
                </div>
              </div>
              <div>
                {couponRemoveLoading && <LoadingView message={translateV2('loadingMsg.LOADING')} />}
                {couponRemoveError && <ErrorView error={couponRemoveError} />}
                {couponRemoveData && couponRemoveData.removeCouponFromCart && showMessage && (
                <LabelMedium12 as="div" className="coupon-success">
                  <TickIcon heightPx={9} />
                  <span>{showMessage}</span>
                </LabelMedium12>
                )}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="coupons-new-item">
          <div>
            <Formik initialValues={formInitVal} onSubmit={onSubmit}>
              {({ values }) => (
                <Form>
                  <FormItem
                    field={{
                      name: translateV2('fields.ENTER_DISCOUNT_CODE'),
                      id: 'coupon',
                      type: 'text',
                      validate: Validate.all([
                        Validate.required,
                      ], { message: translateV2('fields.ENTER_DISCOUNT_CODE') }),
                      action: (
                        <Button
                          mode="link"
                          type="submit"
                          disabled={!values.coupon}
                          ariaLabel={translateV2('button.APPLY')}
                        >
                          {translateV2('button.APPLY')}
                        </Button>
                      ),
                    }}
                  />
                  <LabelMedium12>{translateV2('cart.ONE_DISCOUNT_CODE_ONLY')}</LabelMedium12>
                </Form>
              )}
            </Formik>
            {couponLoading && <LoadingView message={translateV2('cart.USE_DISCOUNT_CODE')} />}
            {couponError && <ErrorView error={couponError} />}
          </div>
        </div>
      )}
      {couponData && couponData.applyCouponToCart
          && showSuccessMessage && !showMessage && !couponRemoveLoading && (
          <LabelMedium12 as="div" className="coupon-success">
            <TickIcon heightPx={9} />
            <span>{showSuccessMessage}</span>
          </LabelMedium12>
      )}
    </CouponViewWrapper>
  );
};

CouponView.propTypes = {
  cart: PropTypes.object,
  formInitVal: PropTypes.object,
  onSubmit: PropTypes.func,
  onRemove: PropTypes.func,
  showSuccessMessage: PropTypes.bool,
  showMessage: PropTypes.bool,
  couponParser: PropTypes.object,
};
