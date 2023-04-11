import React from 'react';
import PropTypes from 'prop-types';
import { Text14 } from '@/roanuz/typopgraphy';
import { translateV2 } from '@/roanuz/lib/utils';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseQuickFilterButtonViewV1 = ({ expandFilterGroup, filterItem }) => {
  return (
    <Text14
      as="span"
      className="quick-filter"
      role="presentation"
      onClick={() => expandFilterGroup(filterItem.attribute_code)}
      onKeyPress={() => expandFilterGroup(filterItem.attribute_code)}
    >
      {translateV2(`filter.${filterItem.label}`, filterItem.label)}
    </Text14>
  );
};

BaseQuickFilterButtonViewV1.propTypes = {
  expandFilterGroup: PropTypes.func,
  filterItem: PropTypes.array,
};

export const QuickFilterButtonViewV1 = withDependencySupport(BaseQuickFilterButtonViewV1, 'QuickFilterButtonViewV1');
