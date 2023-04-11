import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from 'react-select';
import { icelandicPinCodes } from '@/roanuz/lib/pincodes';
import { StyledRadio, StyledCheckbox } from '@/roanuz/layout';
import { useField, ErrorMessage } from 'formik';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { asRem, Breakpoint } from '../lib/css';

export const BaseInputFieldWrapper = styled.div`
  cursor: pointer;
  &.type-checkbox, &.type-radio {
    cursor: pointer;
    .input {
      input, textarea {
        &:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }
      }

      label {
        display: flex;
        align-items: center;
        span {
          order: 2;
        }

        gap: ${asRem(8)};
      }
      .input-label, input {
        font-weight: 500;
        font-size: ${asRem(14)};
        line-height: ${asRem(24)};
        color: var(--color-text-primary);
      }

      .rz-custom-checkbox {
        display: flex;
        align-items: center;
      }
    }
  }

  &.is-text-box {
    .input {
      display: flex;
      flex-direction: column;
      gap: ${asRem(8)};

      label, .input-label {
        display: block;
      }
      .input-label {
        margin-bottom: ${asRem(8)};
      }

      input, textarea {
        width: 100%;
        padding: ${asRem(12)} ${asRem(16)};
        color: var(--color-text-secondary);
        outline: none;
        outline-offset: 0px;
        box-shadow: none;
        border: ${asRem(1)} solid var(--color-input-field-border);
        border-radius: ${asRem(4)};
        &:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }
      }

      .input-label, input {
        font-weight: 500;
        font-size: ${asRem(14)};
        line-height: ${asRem(24)};
        color: var(--color-text-primary);
      }

    }

    >.action {
      button {
        padding: 0;
      }
    }
    textarea {
      resize: none;
    }

    
    &.focus-focus {
      border-color: var(--color-button);
    }
    &.focus-blur {
      &+.error-message {
        display: block;
      }
    }
  }

  &.is-number-type {
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
    }

    input[type=number] {
      -moz-appearance: textfield;
    }
  }

  &.rz-form-select {
    padding: 0;
    .input {
      display: flex;
      flex-direction: column;
      gap: ${asRem(8)};
      font-weight: 500;
      font-size: ${asRem(14)};
      line-height: ${asRem(24)};
      color: var(--color-text-primary);
      .select-input {
        border: ${asRem(1)} solid var(--color-input-field-border);
        border-radius: ${asRem(4)};
        border: ${asRem(1)} solid var(--color-input-field-border);
      }
    }
    div[class*="-container"] {
      &:focus-visible {
        outline: 0;
      }
    }
    div[class*="-control"] {
      box-shadow: none;
      border: 0;
      padding: ${asRem(7)} ${asRem(10)};
    }
    &.shrink-content {
      .select-input {
        padding: ${asRem(8)} ${asRem(12)};
      }
      div[class*="-control"] {
        padding: 0;
        max-height: ${asRem(33)};
        min-height: ${asRem(30)};
      }
    }
  }
  .select-input {
    >span {
      color: var(--color-grey);
      position: relative;
      top: ${asRem(4)};
      left: ${asRem(10)};
      font-size: 0.75rem;
      line-height: 1rem;
      font-weight: 500;
      letter-spacing: 0.0125rem;
    }
  }
`;

export const InputField = ({
  name, id, type, validateFn,
  value, action, disabled,
  onBlur, onChange, onSmartChange,
}) => {
  const fieldOptions = {
    name: id,
    type,
    value,
  };
  const inferType = type || 'text';
  const [field, meta] = useField({
    validate: validateFn,
    ...fieldOptions,
  });

  const [notifiedValue, setNotifiedValue] = useState(meta.value);
  const [focusState, setFocusState] = useState();

  useEffect(() => {
    if (!onSmartChange) return;
    if (meta.error) return;
    const newValue = meta.value;
    // console.log('SM', newValue, notifiedValue, focusState);

    if (newValue !== notifiedValue) {
      setNotifiedValue(newValue);
      onSmartChange(newValue);
    }
  }, [focusState, meta.value, meta.error]);

  const onFocus = () => {
    setFocusState('focus');
  };

  const onBlurEvent = (...args) => {
    field.onBlur(...args);
    setFocusState('blur');

    if (onBlur) {
      onBlur(...args);
    }
  };

  const onChangeEvent = (...args) => {
    field.onChange(...args);
    // Doing this to fix validation on autofill.
    if (!focusState || focusState === 'undefined') {
      onBlurEvent(...args);
    }
    if (onChange) {
      onChange(...args);
    }
  };

  const showOnlyLabel = (
    focusState !== 'focus'
    && !meta.value);

  const isTextbox = (inferType !== 'checkbox' && inferType !== 'radio' && inferType !== 'textarea');
  const isTextAreaBox = inferType === 'textarea';
  const isNumberType = type === 'number';
  const classNames = [
    'rz-form-field',
    showOnlyLabel ? 'show-only-label' : 'show-with-value',
    (isTextbox || isTextAreaBox) ? 'is-text-box' : '',
    isNumberType ? 'is-number-type' : '',
    `type-${inferType}`,
    `focus-${focusState}`,
  ].join(' ');

  return (
    <InputFieldWrapper
      focusState={focusState}
      showOnlyLabel={showOnlyLabel}
      isTextbox={isTextbox}
      type={inferType}
      className={classNames}
    >
      <div className="input">
        <label>
          <span className="input-label">{name}</span>
          {inferType === 'radio' && (
            <StyledRadio>
              <input
                {...fieldOptions}
                {...field}
                onFocus={onFocus}
                onBlur={onBlurEvent}
                onChange={onChangeEvent}
                disabled={disabled}
              />
            </StyledRadio>
          )}
          {inferType === 'checkbox' && (
            <StyledCheckbox>
              <input
                {...fieldOptions}
                {...field}
                onFocus={onFocus}
                onBlur={onBlurEvent}
                onChange={onChangeEvent}
                disabled={disabled}
              />
            </StyledCheckbox>
          )}
          {isTextAreaBox && (
            <textarea
              {...fieldOptions}
              {...field}
              onFocus={onFocus}
              onBlur={onBlurEvent}
              onChange={onChangeEvent}
              disabled={disabled}
              rows="3"
              placeholder={name}
            />
          )}
          {isTextbox && (
            <input
              {...fieldOptions}
              {...field}
              onFocus={onFocus}
              onBlur={onBlurEvent}
              onChange={onChangeEvent}
              disabled={disabled}
              placeholder={name}
            />
          )}
        </label>
      </div>
      {action && (
        <div className="action">{action}</div>
      )}
    </InputFieldWrapper>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'text',
    'email',
    'password',
    'checkbox',
    'radio',
    'number',
    'textarea',
  ]),
  disabled: PropTypes.bool,
  validateFn: PropTypes.func,
  value: PropTypes.string,
  helpText: PropTypes.string,
  action: PropTypes.element,
  onSmartChange: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export const SelectField = ({
  name, id,
  value, onSmartChange,
  optionsList,
  displayBy = 'label',
  valueBy = 'value',
  accessEntireObj = false,
  showLabelName = true,
}) => {
  const fieldOptions = {
    name: id,
    value,
  };
  const [field, meta, helpers] = useField({ ...fieldOptions });
  // eslint-disable-next-line no-param-reassign
  value = meta;
  const { setValue } = helpers;
  const [notifiedValue, setNotifiedValue] = useState(meta.value);

  // TEMP FIX: Need to check still issue.
  const [initNotified, setInitNotified] = useState(false);
  useEffect(() => {
    if (accessEntireObj && meta && meta.value) {
      const newValue = meta.value;
      if (newValue === notifiedValue && (!initNotified)) {
        onSmartChange(newValue);
        setInitNotified(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!onSmartChange) return;
    if (meta.error) return;
    const newValue = meta.value;
    // console.log('SM', newValue, notifiedValue);

    if (newValue !== notifiedValue) {
      setNotifiedValue(newValue);
      onSmartChange(newValue);
    }
  }, [meta.value, meta.error]);

  const listOfPincodeOptions = optionsList || icelandicPinCodes;

  const onSelectFromSuggestion = (option) => {
    setValue(option);
  };

  let defaultValueRef = null;
  if (notifiedValue) {
    defaultValueRef = { label: notifiedValue, valye: notifiedValue };
    if (accessEntireObj) {
      defaultValueRef = {
        [displayBy]: notifiedValue[displayBy],
        [valueBy]: notifiedValue[valueBy],
      };
    }
  }

  return (
    <InputFieldWrapper
      className={`rz-form-select ${(notifiedValue && showLabelName) ? 'shrink-content' : ''}`}
    >
      <div className="input">
        <span className="input-label">{name}</span>
        <div className="select-input">
          <Select
            {...fieldOptions}
            placeholder={name}
            defaultValue={
              notifiedValue ? defaultValueRef : null
            }
            onChange={(selectedOption) => {
              onSelectFromSuggestion(accessEntireObj ? selectedOption : selectedOption.value);
            }}
            isSearchable
            options={listOfPincodeOptions}
            getOptionLabel={(option) => option[displayBy]}
            getOptionValue={(option) => option[valueBy]}
            noOptionsMessage={() => 'Vinsamlegast veljið póstnúmer af listanum'}
          />
        </div>
      </div>
    </InputFieldWrapper>
  );
};

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onSmartChange: PropTypes.func,
  optionsList: PropTypes.array,
  displayBy: PropTypes.string,
  valueBy: PropTypes.string,
  accessEntireObj: PropTypes.bool,
  showLabelName: PropTypes.bool,
};

export const BaseFormItemWrapper = styled.div`
  margin-bottom: ${asRem(24)};
  // @media screen and (min-width: ${Breakpoint.sm}) {
  //   margin-right: ${asRem(18)};
  // }

  .rz-form-field {
    margin-bottom: ${asRem(8)};
  }

  .error-message {
    font-size: ${asRem(14)};
    line-height: ${asRem(18)};
    color: var(--color-error);
    font-style: italic;
    &:not(.always) {
      display: none;
    }
  }
`;

export const FormItem = ({ field, showInitialError }) => {
  return (
    <FormItemWrapper className="rz-form-item">
      {field.isSelect ? (
        <SelectField {...field} />
      ) : (<InputField {...field} />
      )}
      {field.helpText && (
        <p>{field.helpText}</p>
      )}
      <ErrorMessage
        name={field.id}
        component="div"
        className="error-message"
      />
      <p className="error-message always">
        {showInitialError}
      </p>
    </FormItemWrapper>
  );
};

FormItem.propTypes = {
  field: PropTypes.shape(InputField.propTypes),
  showInitialError: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
};

export const InputFieldWrapper = withDependencySupport(BaseInputFieldWrapper, 'InputFieldWrapper');
export const FormItemWrapper = withDependencySupport(BaseFormItemWrapper, 'FormItemWrapper');
