import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { Button } from '@/roanuz/view/button';
import { TextBold14 } from '@/roanuz/typopgraphy';
import { ImageView } from '@/roanuz/view/image';
import Config from '@/config';

export const BaseVariantSelectionViewWrapper = styled.div`
  >section {
    padding-bottom: ${asRem(20)};
    >.variants-wrapper {
      display: flex;
      gap: ${asRem(8)};
      flex-wrap: wrap;
      margin-top: ${asRem(5)};
      li {
        transition: border .3s ease-in-out;
        padding-bottom: ${asRem(8)};
        border-bottom: ${asRem(2)} solid transparent;
        &.active, &:hover {
          border-bottom: ${asRem(2)} solid var(--color-text);
        }
        .rz-button {
          width: ${asRem(40)};
          height: ${asRem(40)};
          padding: 0;
          border: none;
          border-radius: 0;
          background-color: transparent;
          justify-content: center;
          .rz-image-view {
            height: ${asRem(40)};
            img {
              height: 100%;
              transition: 0.3s ease;
              max-width: 100%;
              max-height: 100%;
            }
          }
          .variant-color {
            display: block;
            width: ${asRem(40)};
            height: ${asRem(40)};
            border: ${asRem(1)} solid var(--color-text);
            transition: 0.3s ease;
          }
          &:not(.disabled):hover {
            color: var(--color-text);
          }
          &:hover {
            color: var(--color-text);
          }
          &.disabled {
            color: var(--color-grey);
          }
        }
        @media screen and (min-width: ${Breakpoint.lg}) {
          &:not(.disabled):hover {
            .variant-color, .rz-image-view img {
              transform: scale(0.8);
            }
          }
        }
      }
    }
    &.attribute-size {
      .variants-wrapper > li {
        border: ${asRem(1)} solid transparent;
        padding-bottom: 0;
        border-radius: 50%;
        > button {
          width: ${asRem(56)};
          height: ${asRem(56)};
        }
        &.active, &:hover {
          border-color: var(--color-text);
        }
        &.active.disabled {
          border-color: var(--color-grey);
        }
      }
    }
  }
`;

export const BaseVariantSelectionView = ({
  configOptions,
  onOptionUpdate,
  options,
  showOutOfStockOptionsAsDisabled,
  showOnlyPrimaryVariantAttribute,
  swatchImages,
  disableSelectionOnHover,
}) => {
  const { ProductDisplaySettings } = Config;
  const isDisbledConfigValue = (itemUid, oosOptions) => {
    console.debug(`Left for future use ${itemUid} / ${oosOptions}`);
    const oosOptionsKeys = Object.keys(oosOptions);
    const selectedOptions = Object.values(options);

    const intersection = oosOptionsKeys?.filter((ele) => selectedOptions.includes(ele));

    if (intersection.length && oosOptions[intersection].includes(itemUid)) {
      return true;
    }
    return false;
  };
  const validatePrimaryAttribute = (code) => {
    let good = true;
    if (showOnlyPrimaryVariantAttribute) {
      good = false;
      if (code === ProductDisplaySettings.VariantAttributeToLink) {
        good = true;
      }
    }
    return good;
  };
  const buildSwatchDisplay = (code, item) => {
    if (ProductDisplaySettings && code === ProductDisplaySettings.VariantAttributeToLink) {
      if (swatchImages && swatchImages[item.uid] && swatchImages[item.uid].url) {
        return (
          <ImageView
            src={swatchImages[item.uid].url}
            alt={item.label}
          />
        );
      }
      if (item.swatch_data && item.swatch_data.value) {
        return (<span className="variant-color" style={{ backgroundColor: item.swatch_data.value }} title={item.label} />);
      }
    }
    return item.label;
  };
  return (
    <VariantSelectionViewWrapper className="variant-selction-view">
      {configOptions && configOptions.map((config) => (
        validatePrimaryAttribute(config.attribute_code) && (
        <section
          key={config.uid}
          className={`attribute-${config.attribute_code}`}
        >
          <TextBold14 className="variant-title">{config.label}</TextBold14>
          <ul className="variants-wrapper">
            {config.values.map((item) => (
              <li
                key={item.uid}
                className={[
                  showOutOfStockOptionsAsDisabled
                    && isDisbledConfigValue(item.uid, showOutOfStockOptionsAsDisabled) ? 'disabled' : '',
                  (options && options[config.uid] === item.uid) ? 'active' : '',
                ].join(' ')}
              >
                <Button
                  ariaLabel={item.label}
                  onClick={() => {
                    onOptionUpdate({ uid: config.uid, value: item.uid }, config.attribute_code);
                  }}
                  onMouseOver={() => !disableSelectionOnHover
                    && onOptionUpdate({ uid: config.uid, value: item.uid }, config.attribute_code)}
                  role="presentation"
                  className={
                    showOutOfStockOptionsAsDisabled
                      && isDisbledConfigValue(item.uid, showOutOfStockOptionsAsDisabled) ? 'disabled' : ''
                  }
                >
                  {buildSwatchDisplay(config.attribute_code, item)}
                </Button>
              </li>
            ))}
          </ul>
        </section>
        )))}
    </VariantSelectionViewWrapper>
  );
};

BaseVariantSelectionView.propTypes = {
  configOptions: PropTypes.array,
  onOptionUpdate: PropTypes.func,
  options: PropTypes.object,
  showOutOfStockOptionsAsDisabled: PropTypes.object,
  showOnlyPrimaryVariantAttribute: PropTypes.bool,
  swatchImages: PropTypes.object,
  disableSelectionOnHover: PropTypes.bool,
};

export const VariantSelectionViewWrapper = withDependencySupport(BaseVariantSelectionViewWrapper, 'VariantSelectionViewWrapper');
export const VariantSelectionView = withDependencySupport(BaseVariantSelectionView, 'VariantSelectionView');
