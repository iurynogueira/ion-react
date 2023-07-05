import { DropdownStyle, OptionGroupStyle, OptionStyle } from './styles';
import { SizeType } from '../../core/types/size';
import { IonIcon } from '../icons';
import React, { useState } from 'react';

type SelectSizes = Extract<SizeType, 'sm' | 'md'>;

export interface OptionProps {
  disabled?: boolean;
  label: string;
  selected?: boolean;
  value: string | number;
}

export interface OptionGroupProps {
  options: OptionProps[];
  label: string;
}

export interface DropdownProps {
  multiple?: boolean;
  options?: OptionProps[];
  optionsGroup?: OptionGroupProps[];
  selectedOptions?: OptionProps[];
  size?: SelectSizes;
  onSelectedOption: Function;
}

export interface OptionsConfig extends DropdownProps {
  indexGroup?: number;
}

const Options = ({
  options = [],
  multiple = false,
  onSelectedOption,
  indexGroup,
}: OptionsConfig) => {
  const [optionsCopy, setOptionsCopy] = useState<OptionProps[]>(options);

  const handleClick = (index: number): void => {
    if (optionsCopy[index].disabled) {
      return;
    }

    const { selected } = optionsCopy[index];

    if (!multiple) {
      optionsCopy.forEach((option) => {
        option.selected = false;
      });
    }

    optionsCopy[index].selected = !selected;
    setOptionsCopy([...optionsCopy]);
    onSelectedOption([...optionsCopy]);
  };

  return (
    <ul
      data-testid={
        indexGroup
          ? 'ion-dropdown-options-' + indexGroup
          : 'ion-dropdown-options'
      }
    >
      {options &&
        options.map((option, index) => {
          return (
            <OptionStyle
              key={index}
              data-testid={
                indexGroup
                  ? 'ion-option-' + index + '-' + indexGroup
                  : 'ion-option-' + index
              }
              disabled={option.disabled}
              selected={option.selected}
              onClick={() => handleClick(index)}
            >
              <div className="label">{option.label}</div>
              {option.selected && (
                <>
                  <div className="icon check">
                    <IonIcon type={'check'} size={20} />
                  </div>
                  <div className="icon close">
                    <IonIcon type={'close'} size={20} />
                  </div>
                </>
              )}
            </OptionStyle>
          );
        })}
    </ul>
  );
};

const isSelected = (
  optionToCompare: OptionProps,
  optionsUpdated: OptionProps[]
): boolean => {
  return optionsUpdated.some(
    (option) => option.selected && option.value === optionToCompare.value
  );
};

const OptionsGroup = ({
  optionsGroup = [],
  onSelectedOption,
  multiple = false,
}: DropdownProps) => {
  const [groupCopy, setGroupCopy] = useState<OptionGroupProps[]>(optionsGroup);
  const handleSelect = (event: OptionProps[]) => {
    if (!multiple) {
      let safeCopy: OptionGroupProps[] = [...groupCopy];
      safeCopy.forEach((optionGroup) => {
        optionGroup.options.forEach((option) => {
          option.selected = isSelected(option, event);
        });
      });
      setGroupCopy(safeCopy);
    }

    onSelectedOption(event);
  };

  return (
    <div data-testid="ion-dropdown-options-group">
      {optionsGroup.map((optionGroup, index) => {
        return (
          <OptionGroupStyle key={index}>
            <span className="label">{optionGroup.label}</span>
            <Options
              options={optionGroup.options}
              multiple={multiple}
              indexGroup={index + 1}
              onSelectedOption={handleSelect}
            />
          </OptionGroupStyle>
        );
      })}
    </div>
  );
};

const IonDropdown = ({
  multiple = false,
  options = [],
  optionsGroup,
  onSelectedOption,
}: DropdownProps) => {
  const handleSelect = (event: OptionProps[]) => {
    const onlySelecteds = event.filter((option) => option.selected);
    onSelectedOption(onlySelecteds);
  };

  return (
    <DropdownStyle data-testid="ion-dropdown">
      <Options
        options={options}
        multiple={multiple}
        onSelectedOption={handleSelect}
      />
      <OptionsGroup
        optionsGroup={optionsGroup}
        multiple={multiple}
        onSelectedOption={handleSelect}
      />
    </DropdownStyle>
  );
};

export default IonDropdown;
