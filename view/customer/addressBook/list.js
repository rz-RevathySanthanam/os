import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TextMedium14, DisplayBold24 } from '@/roanuz/typopgraphy';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { AddressDisplayCard } from '@/roanuz/view/customer/addressDisplayCard';
import { Button } from '@/roanuz/view/button';
import { ReactComponent as DeleteIcon } from '@/roanuz/view/imgs/DeleteIcon.svg';
import { ReactComponent as BaseEditIcon } from '@/roanuz/view/imgs/EditIcon.svg';
import { Row, Col } from '@/roanuz/layout';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { translateV2 } from '@/roanuz/lib/utils';

export const BaseAllAddressesListViewWrapper = styled.div`
  .item-address-selection {
    flex-wrap: wrap;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-direction: column;
    gap: ${asRem(32)};
    margin: ${asRem(20)} 0;
    @media screen and (min-width: ${Breakpoint.md}) {
      flex-direction: row;
    }
  }

  .selection-box {
    width: 100%;
    @media screen and (min-width: ${Breakpoint.lg}) {
      width: calc(50% - ${asRem(32 / 2)});
      min-width: ${asRem(350)};
    }
    >div {
      height: 100%;
    }
  }
`;

export const HandlerWrapper = styled.div``;

export const BaseAllAddressesListView = ({
  addresses,
  formInitVal = {},
  selectFormFieldModel = {},
  editButtonText,
  onEditHandler,
  deleteButtonText,
  onDeleteHandler,
  title,
  loading,
}) => {
  console.debug(`Left for future use ${formInitVal}`);
  const { selectFormFieldId, selectFormFieldHandler } = selectFormFieldModel;
  return (
    <AllAddressesListViewWrapper>
      {title && (
        <div className="address-list-title">{title}</div>
      )}
      <Row className="item-address-selection">
        {addresses.map((address) => (
          <Col
            key={address.id}
            className="selection-box"
            // className={`${address.rz_uid === formInitVal && formInitVal.rz_uid ? 'active' : ''}`}
          >
            <AddressDisplayCard
              address={address}
              selectFormField={selectFormFieldId && selectFormFieldHandler ? {
                type: 'radio',
                // name: `${address.firstname} ${address.lastname}`,
                id: selectFormFieldId,
                value: address.id.toString(),
                onChange: () => {
                  selectFormFieldHandler(address);
                },
              } : null}
              actionButtons={(
                <>
                  {onEditHandler && (
                    <HandlerWrapper>
                      <Button
                        icon={<EditIcon />}
                        mode="primary"
                        noborder
                        nomargin
                        ariaLabel={translateV2('button.EDIT')}
                        onClick={() => onEditHandler(parseInt(address.id, 10))}
                        iconHeightPx={16}
                      >
                        <TextMedium14>{editButtonText || translateV2('button.EDIT')}</TextMedium14>
                      </Button>
                    </HandlerWrapper>
                  )}
                  {onDeleteHandler && (
                    <HandlerWrapper>
                      <Button
                        disabled={loading}
                        icon={<DeleteIcon />}
                        mode="primary"
                        noborder
                        nomargin
                        ariaLabel={translateV2('button.REMOVE')}
                        onClick={() => onDeleteHandler(parseInt(address.id, 10))}
                        iconHeightPx={16}
                      >
                        <TextMedium14>{deleteButtonText || translateV2('button.REMOVE')}</TextMedium14>
                      </Button>
                    </HandlerWrapper>
                  )}
                </>
              )}
            />
          </Col>
        ))}
      </Row>
    </AllAddressesListViewWrapper>
  );
};

BaseAllAddressesListView.propTypes = {
  addresses: PropTypes.array,
  formInitVal: PropTypes.object,
  selectFormFieldModel: PropTypes.object,
  editButtonText: PropTypes.string,
  onEditHandler: PropTypes.func,
  deleteButtonText: PropTypes.string,
  onDeleteHandler: PropTypes.func,
  title: PropTypes.element,
  loading: PropTypes.bool,
};

export const AllAddressesListViewWrapper = withDependencySupport(BaseAllAddressesListViewWrapper, 'AllAddressesListViewWrapper');
export const AllAddressesListView = withDependencySupport(BaseAllAddressesListView, 'AllAddressesListView');

export const BaseAllAddressesTableViewWrapper = styled.div`
  table {
    margin-top: ${asRem(16)};
    margin-bottom: ${asRem(40)};
    width: 100%;
    th, td {
      padding: ${asRem(6)} ${asRem(6)};
      @media screen and (min-width: ${Breakpoint.lg}) {
        padding: ${asRem(10)} ${asRem(10)};
      }
    }
    thead {
      th {
        text-align: left;
        font-weight: bold;
        border-bottom: 2px solid var(--color-disabled);
      }
      tr {
        display: none;
        @media screen and (min-width: ${Breakpoint.lg}) {
          display: table-row;
        }
      }
    }
    tbody {
      .action-button {
        padding: 0;
        border: none;
        font-weight: 400;
        background-color: transparent;
        & :hover {
          background-color: transparent;
          color: var(--colot-text);
        }
      }
      .seperator {
        color: var(--color-grey-light);
      }
      .edit {
        color: var(--color-button);
      }
      .delete {
        color: var(--color-error);
        cursor: pointer;
      }
      tr {
        padding: ${asRem(10)} 0;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid var(--color-disabled-3); 

        & :last-child {
          border-bottom: none;
        }
        
        @media screen and (min-width: ${Breakpoint.lg}) {
          display: table-row;            
        }              
      }
      td {
        width: auto;
        & ::before {
          content: attr(data-th);
          display: inline-block;
          font-weight: 700;
          padding-right: ${asRem(10)};
          @media screen and (min-width: ${Breakpoint.lg}) {
            display: none;
          }
        }
      }
    }
  }
`;

export const BaseAllAddressesTableView = ({
  addresses,
  clickHandler,
  onEdit,
}) => {
  return (
    <AllAddressesTableViewWrapper>
      <DisplayBold24>{translateV2('myPages.ADDRESSES')}</DisplayBold24>
      <table>
        <thead>
          <tr>
            <th>{translateV2('fields.FIRSTNAME')}</th>
            <th>{translateV2('fields.SURNAME')}</th>
            <th>{translateV2('myPages.ADDRESS')}</th>
            <th>{translateV2('fields.PLACE')}</th>
            <th>{translateV2('fields.POSTNUMBER')}</th>
            <th>{translateV2('fields.PHONE')}</th>
            <th>{translateV2('fields.SSN')}</th>
            <th>{translateV2('button.Actions')}</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((address) => (
            <tr key={address.id}>
              <td data-th="Fornafn: ">{address.firstname}</td>
              <td data-th="Eftirnafn: ">{address.lastname}</td>
              <td data-th="Heimilisfang: ">{address.street}</td>
              <td data-th="Staður: ">{address.city}</td>
              <td data-th="Póstnúmer: ">{address.postcode}</td>
              <td data-th="Sími: ">{address.telephone}</td>
              <td data-th="Kennitala: ">{address.rz_is_ssn || '-'}</td>
              <td data-th="Aðgerðir: " id={address.id}>
                <button type="button" className="action-button edit" onClick={() => onEdit(parseInt(address.id, 10))}>
                  <a className="plain" alt={`Goto Pöntun ${address.id}`}>
                    {translateV2('button.EDIT')}
                  </a>
                </button>
                <span className="seperator"> | </span>
                <button
                  type="button"
                  id={address.id}
                  onClick={(e) => clickHandler(parseInt(e.target.id, 10))}
                  className="action-button delete"
                >
                  {translateV2('button.DELETE')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AllAddressesTableViewWrapper>
  );
};

BaseAllAddressesTableView.propTypes = {
  addresses: PropTypes.array,
  clickHandler: PropTypes.func,
  onEdit: PropTypes.func,
};

export const AllAddressesTableViewWrapper = withDependencySupport(BaseAllAddressesTableViewWrapper, 'AllAddressesTableViewWrapper');
export const AllAddressesTableView = withDependencySupport(BaseAllAddressesTableView, 'AllAddressesTableView');
export const EditIcon = withDependencySupport(BaseEditIcon, 'EditIcon');
