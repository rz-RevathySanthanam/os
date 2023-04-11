import React from 'react';
import { daysContext, translateV2 } from '@/roanuz/lib/utils';

export function displayRzShippingAttributes(data) {
  if (!data) {
    return null;
  }
  return (
    <>
      {(data.deliveryTimeFrom || data.deliveryTimeTo) ? (
        <section>
          <p>
            <strong>
              {translateV2('orders.PROCESSING_TIME')}
              :&nbsp;
              {
                daysContext(
                  data.deliveryTimeFrom,
                  data.deliveryTimeTo,
                )
              }
            </strong>
          </p>
        </section>
      ) : null}
      {/* May required in future */}
      {(data.boxLocation) && (
        <section>
          {Object.keys(data.boxLocation).map((box) => (
            <p>{data.boxLocation[box]}</p>
          ))}
        </section>
      )}
    </>
  );
}
