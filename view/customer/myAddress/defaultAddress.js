import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { DisplayBold18, Text14, TextMedium14 } from '@/roanuz/typopgraphy';
import LoadingView from '@/roanuz/components/LoadingView';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { ReactComponent as BaseEditIcon } from '@/roanuz/view/imgs/EditIcon.svg';
import { AddressDisplayCard } from '@/roanuz/view/customer/addressDisplayCard';
import { translateV2 } from '@/roanuz/lib/utils';
import { ReactComponent as BaseDeliveryIcon } from '@/roanuz/view/imgs/DeliveryIcon.svg';
import { ReactComponent as BaseFormIcon } from '@/roanuz/view/imgs/FormIcon.svg';
import { Button } from '@/roanuz/view/button';

export const BaseDefaultAddressWrapper = styled.div`
  width: 100%;
  max-width: ${asRem(450)};
  border: 1px solid var(--color-disabled-4);
  border-radius: ${asRem(3)};
  padding: ${asRem(10)} ${asRem(20)};

  &:first-child {
    margin-bottom: ${asRem(20)};
  } 
  .header {
    display: flex;
    align-items: center;
    .title-icon {
      padding-right: ${asRem(15)};
      svg {
        width: ${asRem(25)};
        height: ${asRem(25)};
      }
    }
  }

  .main-content {
    padding-bottom: ${asRem(20)};
  }

   .main-content {
    padding: ${asRem(10)} 0 ${asRem(20)};
  }

  .header {
    border-bottom: 1px solid var(--color-disabled-4);
  }

  @media screen and (min-width: ${Breakpoint.md}) {
    &:first-child {
      margin-right: ${asRem(20)};
      margin-bottom: 0;
    } 
  }

  .button {
    padding-left: ${asRem(15)};
    svg {
      width: ${asRem(20)};
      height: ${asRem(20)};
    }
  }
`;

export const DefaultAddress = ({
  title, titleIcon, data, buttonText, loadingMessage,
  onEdit, className, onDelete,
}) => {
  return (
    <DefaultAddressWrapper className={className}>
      {title && (
        <div className="header">
          {titleIcon && <span className="title-icon">{titleIcon}</span>}
          <DisplayBold18>{title}</DisplayBold18>
        </div>
      )}
      {data
        ? (
          <>
            <div className="main-content">
              <address>
                <Text14 className="user-name">
                  {data.firstname || ''}
                  {' '}
                  {data.lastname || ''}
                </Text14>
                <Text14>{data.rz_is_ssn || ''}</Text14>
                <Text14>{data.street || ''}</Text14>
                <Text14>{data.city || ''}</Text14>
                <Text14><a href={`tel:${data.telephone}`}>{data.telephone || ''}</a></Text14>
              </address>
            </div>
            <div className="button">
              <Button
                mode="primary"
                filled
                alt="Change shipping address"
                href={{}}
                ariaLabel={buttonText}
                onClick={() => onEdit(data.id)}
              >
                <EditIcon />
                <span className="button-text">
                  {buttonText}
                </span>
              </Button>
            </div>
            <div className="button">{onDelete && onDelete}</div>
          </>
        ) : (<LoadingView message={loadingMessage} />)}
    </DefaultAddressWrapper>
  );
};

DefaultAddress.propTypes = {
  title: PropTypes.string,
  titleIcon: PropTypes.element,
  data: PropTypes.object,
  buttonText: PropTypes.string,
  loadingMessage: PropTypes.string,
  onEdit: PropTypes.func,
  className: PropTypes.string,
  onDelete: PropTypes.element,
};

const DefaultAddressesBlockWrapper = styled.div`
  width: 100%;
  margin-bottom: ${asRem(30)};
`;

export const BaseDefaultAddressGroupWrapper = styled.div`
  margin-top: ${asRem(16)};
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  gap: ${asRem(32)};
  flex-wrap: wrap;
  @media screen and (min-width: ${Breakpoint.md}) {
    flex-direction: row;
    .default-address-payer, .default-address-recipient {
      width: calc(50% - ${asRem(32 / 2)});
      min-width: ${asRem(350)};
      flex-grow: 1;
    }
  }
`;

export const DefaultAddressesBlock = ({
  defaultShipping,
  defaultBilling,
  onEdit,
}) => {
  return (
    <DefaultAddressesBlockWrapper>
      <DefaultAddressGroupWrapper>
        <AddressDisplayCard
          title={translateV2('myPages.BILLING_ADDRESS')}
          titleIcon={<FormIcon />}
          address={defaultShipping}
          className="default-address-payer"
          noDataMessage="Þú ert ekki með sjálfgefið heimilisfang"
          actionButtons={(
            <Button
              icon={<EditIcon />}
              mode="primary"
              noborder
              nomargin
              ariaLabel={translateV2('button.EDIT')}
              onClick={() => onEdit(parseInt(defaultShipping.id, 10))}
              iconHeightPx={16}
            >
              <TextMedium14>{translateV2('button.EDIT')}</TextMedium14>
            </Button>
          )}
        />
        <AddressDisplayCard
          title={translateV2('myPages.SHIPPING_ADDRESS')}
          titleIcon={<DeliveryIcon />}
          address={defaultBilling}
          className="default-address-recipient"
          noDataMessage="Þú ert ekki með sjálfgefið innheimtu heimilisfang"
          actionButtons={(
            <Button
              icon={<EditIcon />}
              mode="primary"
              noborder
              nomargin
              ariaLabel={translateV2('button.EDIT')}
              onClick={() => onEdit(parseInt(defaultBilling.id, 10))}
              iconHeightPx={16}
            >
              <TextMedium14>{translateV2('button.EDIT')}</TextMedium14>
            </Button>
          )}
          styleProps={{
            padding: true, border: true, titleBorder: false,
          }}
        />
      </DefaultAddressGroupWrapper>
    </DefaultAddressesBlockWrapper>
  );
};

DefaultAddressesBlock.propTypes = {
  defaultShipping: PropTypes.object,
  defaultBilling: PropTypes.object,
  onEdit: PropTypes.func,
};

export const DefaultAddressWrapper = withDependencySupport(BaseDefaultAddressWrapper, 'DefaultAddressWrapper');
export const DefaultAddressGroupWrapper = withDependencySupport(BaseDefaultAddressGroupWrapper, 'DefaultAddressGroupWrapper');
export const EditIcon = withDependencySupport(BaseEditIcon, 'EditIcon');
export const DeliveryIcon = withDependencySupport(BaseDeliveryIcon, 'DeliveryIcon');
export const FormIcon = withDependencySupport(BaseFormIcon, 'FormIcon');
