import {
  OptionsContainerStyle,
  SelectStyle,
  ValuesContainerStyle,
  ValueStyle,
} from './styles';
import { SizeType } from '../../core/types/size';
import React, { useEffect, useState } from 'react';
import Dropdown from '../dropdown';
import { IonIcon } from '../icons';
import { OptionGroupProps, OptionProps } from '../dropdown/dropdown';

type SelectSizes = Extract<SizeType, 'sm' | 'md'>;

type SelectStatus = 'error' | 'warning';

export interface SelectProps {
  allowClear?: boolean;
  disabled?: boolean;
  maxTagCount?: number;
  multiple?: boolean;
  options?: OptionProps[];
  optionsGroup?: OptionGroupProps[];
  placeholder?: string;
  size?: SelectSizes;
  status?: SelectStatus;
  selectedOptions: OptionProps[];
  passDataFromSelectField: Function;
}

const iconSize = {
  sm: 16,
  md: 20,
  lg: 24,
  xs: 28,
};

const FormattedValue = ({
  disabled,
  maxTagCount,
  multiple,
  placeholder = '',
  selectedOptions,
  size = 'sm',
  passDataFromSelectField,
}: SelectProps) => {
  const handleUnselect = (option: OptionProps) => {
    let copySelected = [...selectedOptions];
    copySelected?.forEach((opt, index) => {
      if (opt.value === option.value && opt.selected)
        copySelected.splice(index, 1);
    });
    passDataFromSelectField(copySelected);
  };

  const containSelected = selectedOptions.length ? true : false;

  switch (containSelected) {
    case true:
      return (
        <>
          {selectedOptions.map((value, index) => {
            if (!maxTagCount || (maxTagCount && index < maxTagCount)) {
              return (
                <ValueStyle key={value.value} multiple={multiple} size={size}>
                  <span>{value.label}</span>
                  <div
                    data-testid={'close-icon-' + index}
                    className="icon"
                    onClick={() => !disabled && handleUnselect(value)}
                  >
                    <IonIcon type={'close'} size={iconSize[size]} />
                  </div>
                </ValueStyle>
              );
            }
          })}
          {maxTagCount && selectedOptions.length > maxTagCount && (
            <ValueStyle multiple={multiple} size={size}>
              <span>
                e mais {selectedOptions.length - maxTagCount} selecionados
              </span>
            </ValueStyle>
          )}
        </>
      );
    default:
      return <>{placeholder}</>;
  }

  // if (placeholder && !selectedOptions.length) return <>{placeholder}</>;

  /*
  if (multiple) {
    return (
      <>
        {selectedOptions.map((value, index) => {
          if (!maxTagCount || (maxTagCount && index < maxTagCount)) {
            return (
              <ValueStyle key={value.value}>
                <span>{value.label}</span>
                <div
                  data-testid={'close-icon-' + index}
                  className="icon"
                  onClick={() => !disabled && handleUnselect(value)}
                >
                  <IonIcon type={'close'} size={iconSize[size]} />
                </div>
              </ValueStyle>
            );
          }
        })}
        {maxTagCount && selectedOptions.length > maxTagCount && (
          <ValueStyle>
            e mais {selectedOptions.length - maxTagCount} selecionados
          </ValueStyle>
        )}
      </>
    );
  }
  */

  // return <div>{selectedOptions[0] && selectedOptions[0].label}</div>;
};

const isSelected = (
  optionToCompare: OptionProps,
  selecetedArray: OptionProps[],
  cleanAll?: boolean
): boolean => {
  let result = false;
  selecetedArray.forEach((selected) => {
    if (!cleanAll && optionToCompare.value === selected.value) result = true;
  });
  return result;
};

const IonSelect = ({
  allowClear,
  disabled,
  maxTagCount,
  multiple,
  options = [],
  optionsGroup = [],
  placeholder,
  size = 'sm',
  status,
}: SelectProps) => {
  const [valueSelected, setvalueSelected] = useState<OptionProps[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  let isRemoving = false;

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelectedOption = (data: OptionProps[]) => {
    setvalueSelected(data);
    !multiple && setShowDropdown(false);
  };

  const handleRemovingData = (data: OptionProps[], cleanAll?: boolean) => {
    if (disabled) return;
    isRemoving = true;
    options.forEach((option) => {
      option.selected = isSelected(option, data, cleanAll);
    });
    setvalueSelected(data);
  };

  useEffect(() => {
    const onlySelecteds = options.filter((option) => option.selected);
    setvalueSelected(onlySelecteds);
  }, []);

  return (
    <>
      <SelectStyle
        data-testid="ion-select"
        allowClear={allowClear}
        disabled={disabled}
        size={size}
        status={status}
        onClick={() => !(isRemoving || disabled) && handleClick()}
        contentEditable={false}
      >
        <ValuesContainerStyle>
          <FormattedValue
            disabled={disabled}
            maxTagCount={maxTagCount}
            multiple={multiple}
            placeholder={placeholder}
            selectedOptions={valueSelected}
            size={size}
            passDataFromSelectField={handleRemovingData}
          />
        </ValuesContainerStyle>
        <div className="arrow-icon">
          <IonIcon
            type={showDropdown ? 'semi-up' : 'semi-down'}
            size={iconSize[size]}
          />
        </div>
        {allowClear && (
          <div
            data-testid="ion-clear-all"
            className="clean-icon"
            onClick={() => handleRemovingData([], true)}
          >
            <IonIcon type={'close'} size={iconSize[size]} />
          </div>
        )}
      </SelectStyle>
      {showDropdown && (
        <OptionsContainerStyle>
          <Dropdown
            data-testid="ion-dropdown-select"
            options={options}
            optionsGroup={optionsGroup}
            selectedOptions={valueSelected}
            size={size}
            multiple={multiple}
            onSelectedOption={handleSelectedOption}
          />
        </OptionsContainerStyle>
      )}
    </>
  );
};

export default IonSelect;
