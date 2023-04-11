import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import {
  TextMedium16,
} from '@/roanuz/typopgraphy';
import { FormItem } from '@/roanuz/view/input';

const BorgunLoanMethodViewWrapper = styled.div`
  .selection {
    >div {
      margin-bottom: 0;
    }
    >p {
      padding-left: ${asRem(28)};
    }
  }
  .type-radio {
    padding: 0;
    margin-bottom: 0;
    label {
      justify-content: flex-end;
      align-items: center;
    }
  }
`;

export const BorgunLoanMethodView = ({
  loan, selectFormField,
}) => {
  return (
    <BorgunLoanMethodViewWrapper radio={selectFormField}>
      <div className="selection">
        {selectFormField && (
          <FormItem
            field={selectFormField}
          />
        )}
        <TextMedium16>{loan.loanInfo}</TextMedium16>
      </div>
    </BorgunLoanMethodViewWrapper>
  );
};

BorgunLoanMethodView.propTypes = {
  selectFormField: PropTypes.shape(FormItem.propTypes.field),
  loan: PropTypes.object,
};
