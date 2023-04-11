import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { asRem } from '@/roanuz/lib/css';
import { Text16 } from '@/roanuz/typopgraphy';
import { ReactComponent as DownArrowLineIcon } from '@/roanuz/view/imgs/DownArrowLineIcon.svg';
import { SVGIcon } from '@/roanuz/view/icon';
import { FormItem } from '@/roanuz/view/input';
import { translateV2 } from '@/roanuz/lib/utils';

export const BaseCustomerNotesViewWrapper = styled.div`
  margin: ${asRem(30)} 0 0;
  .msg-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }
  .message-wrapper {
    margin-top: ${asRem(10)};
    height: 0;
    overflow: hidden;
    transition:all 0.2s ease;

    .rz-form-item .input textarea {
      background-color: var(--color-text-rev);
      height: ${asRem(100)};
    }
    &.active {
      height: ${asRem(150)};
    }
  }
`;

export const CustomerNotesView = ({
  fields, msgModalActive = false,
}) => {
  const [openMsgModal, setOpenMsgModal] = useState(msgModalActive);
  return (
    <CustomerNotesViewWrapper>
      <Text16
        onClick={() => setOpenMsgModal(!openMsgModal)}
        className="msg-title"
      >
        <span>{translateV2('orders.ORDER_NOTE')}</span>
        <SVGIcon heightPx={17}>
          <DownArrowLineIcon />
        </SVGIcon>
      </Text16>
      <div className={`message-wrapper ${openMsgModal ? 'active' : ''}`}>
        {fields.customerNotes && (
          <FormItem field={fields.customerNotes} />
        )}
      </div>
    </CustomerNotesViewWrapper>
  );
};

CustomerNotesView.propTypes = {
  fields: PropTypes.object,
  msgModalActive: PropTypes.bool,
};

export const CustomerNotesViewWrapper = withDependencySupport(BaseCustomerNotesViewWrapper, 'CustomerNotesViewWrapper');
