import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { DisplayBold24, Bold16, Text16 } from '@/roanuz/typopgraphy';
import LoadingView from '@/roanuz/components/LoadingView';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { translateV2 } from '@/roanuz/lib/utils';
import { FormItem } from '../input';

export const BaseAdddressCardViewWrapper = styled.div.attrs(() => ({
  className: 'rz-address-card',
}))`
  padding: ${asRem(10)};
  @media screen and (min-width: ${Breakpoint.sm}) {
    padding: ${asRem(16)};
  }
  border: ${asRem(1)} solid var(--color-border);
  border-radius: ${asRem(8)};

  .selection {
    display: flex;
    flex-direction: column;
    height: 100%;
    // justify-content: flex-start;
    justify-content: space-between;
  }
  ${(props) => props && props.styleProps && !props.styleProps.border && css`
    border: 0;
  `}

  ${(props) => props && props.styleProps && !props.styleProps.padding && css`
    padding: 0 !important;
  `}

  > .name {
    font-weight: bold;
  }
  b {
    padding-bottom: ${asRem(4)};
    display: block;
  }
  .address {
    padding-bottom: ${asRem(16)};
  }
  .container-actions {
    margin-top: auto;
    padding-top: ${asRem(24)};
    display: flex;
    margin-left: auto;

    .rz-button {
      gap: ${asRem(10)};
      padding: ${asRem(16)} ${asRem(24)};
      color: var(--color-button-2);
      &:hover {
        color: var(--color-button);
      }
    }
  }
  .container-heading {
    ${(props) => props.styleProps?.titleBorder && css`
      border-bottom: 1px solid var(--color-border);
    `}
    display: flex;
    align-items: stretch;
    margin-bottom: ${asRem(12)};
    padding-bottom: ${asRem(12)};
    gap: ${asRem(15)};

    .title-icon {
      display: none;
      svg {
        width: ${asRem(25)};
        height: ${asRem(25)};
        fill: var(--color-button);
        path {
          fill: var(--color-button);
        }
      }
    }
  }
  ${({ radio }) => radio && css`
    >.selection {
      >p {
        display: block;
      }

      .rz-form-field {
        padding: 0;
      }

      .rz-form-field, .rz-form-item {
        margin-bottom: 0;
        margin-right: 0;
      }
      .rz-form-field {
        .input {
          label {
            flex-direction: row-reverse;
            justify-content: flex-end;
            align-items: center;
            font-weight: bold;
            // gap: ${asRem(20)};
            span {
              padding: 0;
              margin: 0;
            }
          }
        }
      }
      .address-container, .container-actions {
        margin-left: ${asRem(38)};
      }
    }
  `}

  ${(props) => props && props.styleProps && props.styleProps.hideLables && css`
    .address-container .label {
      display: none;
    }
  `}
`;

export const AddressDisplayCard = ({
  address,
  title,
  titleIcon,
  actionButtons,
  selectFormField,
  className,
  noDataMessage,
  styleProps,
}) => {
  if (!address || address.length === 0) {
    return (
      <AdddressCardViewWrapper
        className={className}
        styleProps={styleProps}
      >
        {title && (
          <div className="container-heading">
            {titleIcon && <span className="title-icon">{titleIcon}</span>}
            <DisplayBold24>
              {title}
            </DisplayBold24>
          </div>
        )}
        <LoadingView message={noDataMessage} />
      </AdddressCardViewWrapper>
    );
  }
  return (
    <AdddressCardViewWrapper
      radio={selectFormField}
      className={className}
      styleProps={styleProps}
    >
      <div className={`selection ${selectFormField ? 'input-selection' : ''}`}>
        {selectFormField && (
          <FormItem
            field={selectFormField}
          />
        )}
        {title && (
          <div className="container-heading">
            {titleIcon && <span className="title-icon">{titleIcon}</span>}
            <DisplayBold24>
              {title}
            </DisplayBold24>
          </div>
        )}
        <address className="address-container">
          {address.firstname && (
            <Bold16 className="name">
              {address.firstname}
              {' '}
              {address.lastname && address.lastname !== '-' && address.lastname}
            </Bold16>
          )}
          {address.email && (
            <Text16 className="email">
              <span className="label">
                {translateV2('fields.EMAIL')}
                :&nbsp;
              </span>
              <a className="plain" href={`mailto:${address.email}`}>{address.email}</a>
            </Text16>
          )}
          {address.street && (
            <Text16 className="address street-details">
              {address.street}
              ,&nbsp;
              {address.city}
              ,&nbsp;
              {address.postcode}
            </Text16>
          )}
          {address.rz_is_ssn && (
            <Text16 className="ssn">
              <span className="label">
                {translateV2('fields.SSN')}
                :&nbsp;
              </span>
              {address.rz_is_ssn}
            </Text16>
          )}
          {address.telephone && (
            <Text16 className="phone">
              <span className="label">
                {translateV2('fields.PHONE')}
                :&nbsp;
              </span>
              <a className="plain" href={`tel:${address.telephone}`}>{address.telephone}</a>
            </Text16>
          )}
        </address>
        {actionButtons && (
          <div className="container-actions">
            {actionButtons}
          </div>
        )}
      </div>
    </AdddressCardViewWrapper>
  );
};

AddressDisplayCard.propTypes = {
  address: PropTypes.object,
  title: PropTypes.string,
  actionButtons: PropTypes.element,
  selectFormField: PropTypes.shape(FormItem.propTypes.field),
  titleIcon: PropTypes.element,
  className: PropTypes.string,
  noDataMessage: PropTypes.string,
  styleProps: PropTypes.object,
};

export const AdddressCardViewWrapper = withDependencySupport(BaseAdddressCardViewWrapper, 'AdddressCardViewWrapper');
