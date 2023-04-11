import React, { useEffect, useState } from 'react';
import SiminnImage from '@/roanuz/view/imgs/PaymentMethodSimminLett.png';
import { formatCurrency as fc } from '@/roanuz/lib/cart';
import {
  DisplayBold20,
  LabelMedium12,
} from '@/roanuz/typopgraphy';
import { ReactComponent as DownArrow } from '@/roanuz/view/imgs/DownArrowLineIcon.svg';
import { Button } from '@/roanuz/view/button';
import { ImageView } from '@/roanuz/view/image';
import { translateV2 } from '@/roanuz/lib/utils';
import { SiminnLoanOptions } from './siminnLoanOptions';
import { SiminnLoanOptionsDailogView } from './siminnLoanOptionsDailogVIew';

export const SiminnLoanOptionsV2 = ({
  loading, options, product,
}) => {
  const [selectedOption, setSelectedOption] = useState(options.recommended);
  const [showAllOptions, setShowAllOptions] = useState(false);

  useEffect(() => {
    setSelectedOption(options.recommended);
  }, [options]);

  if (!loading && !selectedOption) {
    return null;
  }

  return (
    <>
      {loading && (
        <div>
          {translateV2('loadingMsg.LOADING')}
          ...
        </div>
      )}
      {!loading && (
        <>
          <SiminnLoanOptionsDailogView
            SiminnImage={SiminnImage}
            showAllOptions={showAllOptions}
            product={product}
            options={options}
            selectedOption={selectedOption}
            setShowAllOptions={setShowAllOptions}
          />
          <div className="recommended">
            <div
              className="amount-section"
            >
              <Button
                noborder
                onClick={() => setShowAllOptions(true)}
                onKeyDown={() => setShowAllOptions(true)}
                ariaLabel="Nánar"
              >
                <div className="amount-container">
                  <div className="amount">
                    <DisplayBold20 as="span" className="amount-part">
                      {fc(selectedOption.averagePaymentAmount)}
                    </DisplayBold20>
                    <LabelMedium12 as="span" className="month-part">
                      /mán
                    </LabelMedium12>
                  </div>
                  <DownArrow />
                </div>
                <div className="brand">
                  <ImageView src={SiminnImage} alt="Siminn Logo" />
                </div>
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

SiminnLoanOptionsV2.propTypes = {
  ...SiminnLoanOptions.propTypes,
};
