import React from 'react';
import styled from 'styled-components';
import { Display18, Text14 } from '@/roanuz/typopgraphy';
import { Row, Col } from '@/roanuz/layout';
import { Button } from '@/roanuz/view/button';
import { asRem, Breakpoint } from '@/roanuz/lib/css';

// Moview View to biew folder later after ingrating with controllers.
const OrderPageActionButton = styled.div`
  .order-section-header {
    margin: ${asRem(40)} auto;
    padding-bottom: ${asRem(20)};
    border-bottom: ${asRem(1)} solid var(--color-border);
    .order-action-button {
      gap: ${asRem(15)};
      .order-print-btn {
        display: none;
        @media screen and (min-width: ${Breakpoint.sm}) {
          display: block;
        }
      }
    }
  }
`;

export function printOrderInvoice() {
  window.print();
}

export const OrderPageActionButtonController = () => {
  return (
    <OrderPageActionButton>
      <Row alignCenter spaceBetween className="order-section-header">
        <Col>
          <Display18 className="title">
            Pöntun
          </Display18>
        </Col>
        <Col>
          <Row className="order-action-button">
            <Col>
              <Button
                mode="primary"
                ariaLabel="Print"
                className="order-print-btn"
                onClick={() => printOrderInvoice()}
              >
                <Text14>Print</Text14>
              </Button>
            </Col>
            {/* <Col>
              <Button
                mode="primary"
                filled
                ariaLabel="Reorder all"
              >
                <Text14>Reorder all</Text14>
              </Button>
            </Col> */}
          </Row>
        </Col>
      </Row>
    </OrderPageActionButton>
  );
};

OrderPageActionButtonController.propTypes = {
};
