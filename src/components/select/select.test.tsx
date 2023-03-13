import { render, screen } from '@testing-library/react';
import IonSelect, { SelectProps } from './select';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { OptionProps } from '../dropdown/dropdown';

const clickEvent = jest.fn();

const sut = (props: SelectProps = defaultProps) => {
  return render(<IonSelect {...props} />);
};

const getDropdownById = (testId: string) => screen.getByTestId(testId);

const defaultOptions: OptionProps[] = [
  {
    label: 'Opção 1',
    value: 1,
  },
  {
    label: 'Opção 2',
    value: 2,
  },
  {
    label: 'Opção 3',
    value: 3,
  },
];

const optionsWithSelected = [
  {
    label: 'Opção 1',
    value: 1,
    selected: true,
  },
];

let defaultProps: SelectProps = {
  passDataFromSelectField: clickEvent,
  options: defaultOptions,
  selectedOptions: [],
};

describe('Basic Select Rendering', () => {
  beforeEach(() => {
    defaultProps = {
      passDataFromSelectField: clickEvent,
      options: [
        {
          label: 'Opção 1',
          value: 1,
        },
        {
          label: 'Opção 2',
          value: 2,
        },
        {
          label: 'Opção 3',
          value: 3,
        },
      ],
      selectedOptions: [],
    };
  });

  it('should render default select', async () => {
    sut();
    expect(screen.getByTestId('ion-select')).toBeTruthy();
  });
  it('should render medium select', async () => {
    sut({ ...defaultProps, size: 'md' });
    const mediumSelect = getDropdownById('ion-select').className;
    expect(mediumSelect).toContain(`${'size-md'}`);
  });
  it('should render select with placeholder', async () => {
    sut({ ...defaultProps, placeholder: 'Selecione aqui' });
    expect(screen.queryByText('Selecione aqui')).toBeTruthy();
  });
  it('should render select with selected options initialized', async () => {
    sut({ ...defaultProps, options: optionsWithSelected });
    expect(screen.queryByText('Opção 1')).toBeTruthy();
  });
  it('should render disabled select', async () => {
    sut({ ...defaultProps, disabled: true });
    const mediumSelect = getDropdownById('ion-select').className;
    expect(mediumSelect).toContain(`${'disabled'}`);
  });
  it('should render Error select', async () => {
    sut({ ...defaultProps, status: 'error' });
    const mediumSelect = getDropdownById('ion-select').className;
    expect(mediumSelect).toContain(`${'status-error'}`);
  });
  it('should render Warning select', async () => {
    sut({ ...defaultProps, status: 'warning' });
    const mediumSelect = getDropdownById('ion-select').className;
    expect(mediumSelect).toContain(`${'status-warning'}`);
  });
});

describe('Selecting Options', () => {
  beforeEach(() => {
    defaultProps = {
      passDataFromSelectField: clickEvent,
      options: [
        {
          label: 'Opção 1',
          value: 1,
        },
        {
          label: 'Opção 2',
          value: 2,
        },
        {
          label: 'Opção 3',
          value: 3,
        },
      ],
      selectedOptions: [],
    };
  });
  it('should select an option', async () => {
    sut();
    await userEvent.click(screen.getByTestId('ion-select'));
    await userEvent.click(screen.getByTestId('ion-option-0'));
    const select = screen.getByText('Opção 1');
    expect(select).toBeTruthy();
  });
  it('should unselect an option', async () => {
    sut();
    await userEvent.click(screen.getByTestId('ion-select'));
    await userEvent.click(screen.getByTestId('ion-option-0'));
    await userEvent.click(screen.getByTestId('ion-select'));
    await userEvent.click(screen.getByTestId('ion-option-0'));
    expect(screen.queryByText('Opção 1')).not.toBeTruthy();
  });
  it('should render select that allow clear options selected', async () => {
    sut({ ...defaultProps, allowClear: true });
    expect(screen.getByTestId('ion-icon-close')).toBeTruthy();
    const mediumSelect = getDropdownById('ion-select').className;
    expect(mediumSelect).toContain(`${'allowClear'}`);
  });
  it('should clean select with allow clear function', async () => {
    sut({ ...defaultProps, allowClear: true });
    await userEvent.click(screen.getByTestId('ion-select'));
    await userEvent.click(screen.getByTestId('ion-option-0'));
    await userEvent.click(screen.getByTestId('ion-icon-close'));
    expect(screen.queryByText('Opção 1')).not.toBeTruthy();
  });
  it('should not clean select with allow clear function when disabled', async () => {
    sut({
      ...defaultProps,
      options: optionsWithSelected,
      allowClear: true,
      disabled: true,
    });
    await userEvent.click(screen.getByTestId('ion-icon-close'));
    expect(screen.queryByText('Opção 1')).toBeTruthy();
  });
  it('should not select an option when disabled', async () => {
    sut({ ...defaultProps, disabled: true });
    await userEvent.click(screen.getByTestId('ion-select'));
    expect(screen.queryByText('Opção 1')).not.toBeTruthy();
  });
  it('should select multiple options and close dropdown', async () => {
    sut({ ...defaultProps, multiple: true });
    await userEvent.click(screen.getByTestId('ion-select'));
    await userEvent.click(screen.getByTestId('ion-option-0'));
    await userEvent.click(screen.getByTestId('ion-option-1'));
    await userEvent.click(screen.getByTestId('ion-select'));
    const firstSelected = screen.getByText('Opção 1');
    const secondSelected = screen.getByText('Opção 2');
    expect(firstSelected && secondSelected).toBeTruthy();
  });
  it('should show extra tag on multiple select mode, when more than 2 options be selected', async () => {
    sut({ ...defaultProps, multiple: true, maxTagCount: 2 });
    await userEvent.click(screen.getByTestId('ion-select'));
    await userEvent.click(screen.getByTestId('ion-option-0'));
    await userEvent.click(screen.getByTestId('ion-option-1'));
    await userEvent.click(screen.getByTestId('ion-option-2'));
    await userEvent.click(screen.getByTestId('ion-select'));
    const tagText = screen.getByText('e mais 1 selecionados');
    expect(tagText).toBeTruthy();
  });
  it('should unselect on multiple mode', async () => {
    sut({ ...defaultProps, multiple: true });
    await userEvent.click(screen.getByTestId('ion-select'));
    await userEvent.click(screen.getByTestId('ion-option-0'));
    await userEvent.click(screen.getByTestId('ion-option-1'));
    await userEvent.click(screen.getByTestId('close-icon-0'));
    await userEvent.click(screen.getByTestId('ion-select'));
    expect(screen.queryByText('Opção 1')).not.toBeTruthy();
  });
  it('should not unselect on multiple mode when disabled', async () => {
    sut({
      ...defaultProps,
      options: optionsWithSelected,
      multiple: true,
      disabled: true,
    });
    await userEvent.click(screen.getByTestId('close-icon-0'));
    await userEvent.click(screen.getByTestId('ion-select'));
    expect(screen.queryByText('Opção 1')).toBeTruthy();
  });
});
