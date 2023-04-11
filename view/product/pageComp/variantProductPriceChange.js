import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { Button } from '@/roanuz/view/button';
import { ProductPriceTextView, ProductPriceHeadView } from '@/roanuz/view/product/label';
import { StyledPlainInputbox } from '@/roanuz/layout';
import { LabelMedium12 } from '@/roanuz/typopgraphy';
import { translateV2 } from '@/roanuz/lib/utils';

export const BaseVariantProductPriceChangeWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  gap: ${asRem(10)};
  margin-top: ${asRem(20)};
  flex-direction: column;
  @media screen and (min-width: ${Breakpoint.lg}) {
    margin-top: 0;
    flex-direction: row;
    align-items: center;
    align-items: flex-start;
  }
  >section {
    >p {
      margin-bottom: ${asRem(10)};
    }
  }
  .clearfix {
    padding-bottom: ${asRem(5)};
  }
`;

export const PriceAndQuanityView = styled.div`
  display: flex;
  gap: ${asRem(10)};
  flex-direction: row-reverse;
  justify-content: space-between;
  width: 100%;
  align-items: flex-start;
  @media screen and (min-width: ${Breakpoint.lg}) {
    min-width: ${asRem(150)};
    width: auto;
    flex-direction: row;
    align-items: center;
  }
  .price-val {
    display: flex;
    align-items: center;
    justify-content: right;
    padding-top: ${asRem(45)};
    min-width: initial;
    @media screen and (min-width: ${Breakpoint.lg}) {
      min-width: ${asRem(150)};
      padding-top: 0;
    }
    .discount {
      display: none;
    }
    .regular-price {
      font-size: ${asRem(16)};
      margin-right: ${asRem(10)};
    }
    .price {
      font-size: ${asRem(18)};
    }
    .price-unit {
      @media screen and (min-width: ${Breakpoint.lg}) {
        text-align: right;
      }
    }
  }
  .qty {
    width: ${asRem(60)};
  }
`;

export const PriceAndQuanity = ({ product, quantityModel }) => {
  const {
    qty,
    setQty,
  } = quantityModel;

  const handleOnChange = (value) => {
    if (value > 0) {
      setQty(parseInt(value, 10));
    }
  };

  return (
    <PriceAndQuanityView className="price-qty-wrapper">
      <StyledPlainInputbox>
        <input
          className="qty"
          type="number"
          value={qty}
          onChange={(e) => handleOnChange(e.target.value)}
        />
      </StyledPlainInputbox>
      <div className="price-val">
        <ProductPriceHeadView product={product} />
        <div>
          <ProductPriceTextView product={product} />
          <LabelMedium12 as="p" className="price-unit">{translateV2('labelAndTitle.PER_UNIT')}</LabelMedium12>
        </div>
      </div>
    </PriceAndQuanityView>
  );
};

PriceAndQuanity.propTypes = {
  product: PropTypes.object,
  quantityModel: PropTypes.object,
};

export const BaseVariantProductPriceChange = ({
  product, displayAsButton, onOptionUpdate,
  options, selectedVariantProduct, quantityModel,
}) => {
  const { configOptions } = product;

  return (
    <VariantProductPriceChangeWrapper>
      {configOptions && configOptions
        .slice()
        .sort((x, y) => x.position - y.position)
        .map((config) => (
          <section
            key={config.uid}
            className={config.attribute_code}
          >
            {displayAsButton ? (
              <div>
                {config.values
                  .slice()
                  .sort((x, y) => x.label.localeCompare(y.label, undefined, { numeric: true }))
                  .map((item) => (
                    <div className="clearfix" key={item.uid}>
                      <Button
                        ariaLabel={item.label}
                        onClick={() => {
                          onOptionUpdate({ uid: config.uid, value: item.uid });
                        }}
                        filled={options && options[config.uid] === item.uid}
                      >
                        {/* {item.label} */}
                        {item.swatch_data.value}
                      </Button>
                    </div>
                  ))}
              </div>
            ) : (
              <StyledPlainInputbox width={300}>
                <select
                  onChange={(e) => {
                    onOptionUpdate({ uid: config.uid, value: e.target.value });
                  }}
                >
                  {config.values
                    .slice()
                    .sort((x, y) => x.label.localeCompare(y.label, undefined, { numeric: true }))
                    .map((item) => (
                      <option
                        key={item.uid}
                        value={item.uid}
                        selected={options && options[config.uid] === item.uid}
                      >
                        {/* {item.label} */}
                        {item.swatch_data.value}
                      </option>
                    ))}
                </select>
              </StyledPlainInputbox>
            )}
          </section>
        ))}
      <PriceAndQuanity
        product={!selectedVariantProduct ? product : selectedVariantProduct}
        quantityModel={quantityModel}
      />
    </VariantProductPriceChangeWrapper>
  );
};

BaseVariantProductPriceChange.propTypes = {
  product: PropTypes.object,
  displayAsButton: PropTypes.bool,
  onOptionUpdate: PropTypes.func,
  options: PropTypes.object,
  selectedVariantProduct: PropTypes.object,
  quantityModel: PropTypes.object,
};

export const VariantProductPriceChangeWrapper = withDependencySupport(BaseVariantProductPriceChangeWrapper, 'VariantProductPriceChangeWrapper');
export const VariantProductPriceChange = withDependencySupport(BaseVariantProductPriceChange, 'VariantProductPriceChange');
