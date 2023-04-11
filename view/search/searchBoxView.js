import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connectSearchBox } from 'react-instantsearch-dom';
import { Button } from '@/roanuz/view/button';
import { ReactComponent as CloseIcon } from '@/roanuz/view/imgs/CloseIcon.svg';
import { ReactComponent as BaseSearchIcon } from '@/roanuz/view/imgs/SearchIcon.svg';
import { SVGIcon } from '@/roanuz/view/icon';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const SearchIcon = withDependencySupport(BaseSearchIcon, 'SearchIcon');

const SearchBox = ({
  currentRefinement,
  refine,
  menuContext,
  translations,
  onFocus,
  onBlur,
  onChange,
  onSubmit,
  onClick,
  autoFocus,
}) => {
  const inputRef = useRef();
  const onSubmitEvent = (event) => {
    event.preventDefault();
    onSubmit(inputRef.current.value);
  };

  return (
    <form noValidate action="" role="search" className="search-form" onSubmit={(event) => onSubmitEvent(event)}>
      <SVGIcon
        heightPx={20}
      >
        <SearchIcon />
      </SVGIcon>
      <input
        ref={inputRef}
        type="search"
        className="search-input-box"
        value={currentRefinement}
        onFocus={(event) => onFocus(event)}
        onBlur={(event) => onBlur(event)}
        onChange={(event) => [
          refine(event.currentTarget.value),
          onChange(event),
        ]}
        onClick={(event) => onClick(event)}
        placeholder={translations.placeholder}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
      />
      <Button
        ariaLabel="Clear search query"
        noborder
        className=""
        iconHeightPx="16"
        onClick={() => {
          refine('');
          menuContext?.toggleSearchModel(false);
        }}
        icon={<CloseIcon />}
      />
    </form>
  );
};

SearchBox.propTypes = {
  currentRefinement: PropTypes.any,
  refine: PropTypes.any,
  menuContext: PropTypes.object,
  translations: PropTypes.object,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onClick: PropTypes.func,
  autoFocus: PropTypes.bool,
};

const CustomSearchBox = connectSearchBox(SearchBox);

export const BaseSearchBoxView = ({
  menuContext,
  translations,
  onFocus,
  onBlur,
  onChange,
  onSubmit,
  onClick,
  autoFocus,
}) => {
  return (
    <CustomSearchBox
      menuContext={menuContext}
      translations={translations}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      onSubmit={onSubmit}
      onClick={onClick}
      autoFocus={autoFocus}
    />
  );
};

BaseSearchBoxView.propTypes = {
  menuContext: PropTypes.object,
  translations: PropTypes.object,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onClick: PropTypes.func,
  autoFocus: PropTypes.bool,
};

export const SearchBoxView = withDependencySupport(BaseSearchBoxView, 'SearchBoxView');
