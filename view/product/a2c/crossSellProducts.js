import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as ShieldIcon } from '@/roanuz/view/imgs/ShieldIcon.svg';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import {
  Text14, TextMedium16, Bold16,
} from '@/roanuz/typopgraphy';
import { formatCurrency } from '@/roanuz/lib/cart';
// eslint-disable-next-line import/no-cycle
import { AddToCart } from '@/roanuz/controller/product/addToCart';
import Config from '@/config';
import Link from 'next/link';
import { withDependencySupport } from '../../../lib/dep';

export const BaseCrosssellProductViewWrapper = styled.div`
  margin-top: ${asRem(13)};
  .shield {
    display: flex;
    align-items: center;
    svg {
      width: ${asRem(28)};
      height: ${asRem(28)};
      margin-right: ${asRem(10)};
    }
  }
  >.cross-sell-products {
    >.cross-sell-items {
      .item {
        margin-top: ${asRem(12)};
        border: ${asRem(1)} solid var(--color-border-2);
        padding: ${asRem(10)}; 
        border-radius: ${asRem(2)};
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media screen and (min-width: ${Breakpoint.sm}) {
          padding: ${asRem(10)} ${asRem(17)};
        }
        b {
          color: var(--color-button);
        }
        button {
          padding-left: ${asRem(16)};
          padding-right: ${asRem(16)};
          @media screen and (min-width: ${Breakpoint.sm}) {
            padding-left: ${asRem(24)};
            padding-right: ${asRem(24)};
          }
          >div {
            display: inherit;
          }
          span {
            font-size: ${asRem(12)};
            @media screen and (min-width: ${Breakpoint.sm}) {
              font-size: ${asRem(14)};
            }
          }
        }
        a {
          color: var(--color-text);
        }
      }
    }
  }
`;

export const CrosssellProducts = ({
  products,
  onConfirm,
}) => {
  const parseCrosssellProduct = (item) => {
    const available = item.stock_status === 'IN_STOCK';
    const productRef = { ...item };
    productRef.available = available;
    return productRef;
  };

  if (!products || !products.length) {
    return null;
  }
  return (
    <CrosssellProductViewWrapper>
      <div className="cross-sell-products">
        <div className="shield">
          <ShieldIcon />
          <Text14>Tryggðu vöruna þína með viðbótartryggingu</Text14>
        </div>
        <div className="cross-sell-items">
          {products.map((item) => (
            <div className="item" key={item.sku}>
              <div>
                <Link href={Config.InsuranceProductLink}>
                  <a alt="Goto Insurance detail page">
                    <TextMedium16>{item.name}</TextMedium16>
                  </a>
                </Link>
                <Bold16>
                  {
                    formatCurrency(
                      item.price_range.minimum_price.final_price.value,
                      item.price_range.minimum_price.final_price.currency,
                    )
                  }
                </Bold16>
              </div>
              <div>
                <AddToCart
                  key={item.sku}
                  options={{}}
                  product={parseCrosssellProduct(item)}
                  onProductAdded={() => onConfirm(item)}
                  buttonText="Bæta við"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </CrosssellProductViewWrapper>
  );
};

CrosssellProducts.propTypes = {
  products: PropTypes.array,
  onConfirm: PropTypes.func,
};

export const CrosssellProductViewWrapper = withDependencySupport(BaseCrosssellProductViewWrapper, 'CrosssellProductViewWrapper');
