import React from 'react';
import PropTypes from 'prop-types';
import { SearchBox } from 'react-instantsearch-dom';

export const SearchBoxViewV2 = ({
  translations,
  onFocus,
  onBlur,
  onChange,
  onSubmit,
  onClick,
  autoFocus,
}) => {
  const onSubmitEvent = (event) => {
    event.preventDefault();
    onSubmit(event.currentTarget[0].value);
  };

  return (
    <SearchBox
      translations={translations}
      onFocus={(event) => onFocus(event)}
      onBlur={onBlur}
      onChange={onChange}
      onSubmit={onSubmitEvent}
      onClick={onClick}
      autoFocus={autoFocus}
    />
  );
};

SearchBoxViewV2.propTypes = {
  translations: PropTypes.object,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onClick: PropTypes.func,
  autoFocus: PropTypes.bool,
};
