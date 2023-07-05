import { render, screen } from '@testing-library/react';
import IonDropdown, { DropdownProps, OptionProps } from './dropdown';
import userEvent from '@testing-library/user-event';
import React from 'react';

const clickEvent = jest.fn();

const sut = (props: DropdownProps = defaultProps) => {
  return render(<IonDropdown {...props} />);
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

let defaultProps: DropdownProps = {
  onSelectedOption: clickEvent,
  options: defaultOptions,
};

describe('Dropdown with Options', () => {
  beforeEach(() => {
    defaultProps = {
      onSelectedOption: clickEvent,
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
    };
  });

  const optionDisabled: OptionProps[] = [
    {
      label: 'Opção 1',
      value: 1,
      disabled: true,
    },
    {
      label: 'Opção 2',
      value: 2,
      disabled: true,
    },
    {
      label: 'Opção 3',
      value: 3,
      disabled: true,
    },
  ];

  it('should render default dropdown', async () => {
    sut();
    expect(screen.getByTestId('ion-dropdown')).toBeTruthy();
  });
  it('should render disabled dropdown', async () => {
    sut({ ...defaultProps, options: optionDisabled });
    const classDisabled = getDropdownById('ion-option-0').className;
    expect(classDisabled).toContain(`${'disabled'}`);
  });
  it('should select an option at default dropdown', async () => {
    sut(defaultProps);
    await userEvent.click(screen.getByTestId('ion-option-0'));
    const classSelected = getDropdownById('ion-option-0').className;
    expect(classSelected).toContain(`${'selected'}`);
  });
  it('should unselect an option at default dropdown', async () => {
    sut(defaultProps);
    await userEvent.click(screen.getByTestId('ion-option-0'));
    await userEvent.click(screen.getByTestId('ion-option-0'));
    const classUnSelected = getDropdownById('ion-option-0').className;
    expect(classUnSelected).not.toContain(`${'selected'}`);
  });
  it('should not select an disabled option', async () => {
    sut({ ...defaultProps, options: optionDisabled });
    await userEvent.click(screen.getByTestId('ion-option-0'));
    const classSelected = getDropdownById('ion-option-0').className;
    expect(classSelected).not.toContain(`${'selected'}`);
  });
  it('should not unselect an disabled option', async () => {
    const propsWithSelected: DropdownProps = {
      onSelectedOption: clickEvent,
      options: [
        {
          label: 'Opção 1',
          value: 1,
          selected: true,
          disabled: true,
        },
      ],
    };
    sut(propsWithSelected);
    await userEvent.click(screen.getByTestId('ion-option-0'));
    const classUnselected = getDropdownById('ion-option-0').className;
    expect(classUnselected).toContain(`${'selected'}`);
  });
  it('should select multiple options at multiple dropdown', async () => {
    sut({ ...defaultProps, multiple: true });
    await userEvent.click(screen.getByTestId('ion-option-0'));
    await userEvent.click(screen.getByTestId('ion-option-1'));
    const firstSelected = getDropdownById('ion-option-0').className;
    const secondSelected = getDropdownById('ion-option-1').className;
    expect(firstSelected).toContain(`${'selected'}`);
    expect(secondSelected).toContain(`${'selected'}`);
  });
});

describe('Dropdown with Group of Options', () => {
  let defaultGroup = {
    onSelectedOption: clickEvent,
    optionsGroup: [
      {
        label: 'Grupo 1',
        options: defaultOptions,
      },
    ],
  };

  beforeEach(() => {
    defaultGroup = {
      onSelectedOption: clickEvent,
      optionsGroup: [
        {
          label: 'Grupo 1',
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
        },
      ],
    };
  });

  it('should render dropdown with group of options', async () => {
    sut(defaultGroup);
    expect(screen.getByTestId('ion-dropdown-options-group')).toBeTruthy();
    expect(
      screen.getByText(defaultGroup.optionsGroup[0].label)
    ).toBeInTheDocument();
  });
  it('should select an option', async () => {
    sut(defaultGroup);
    await userEvent.click(screen.getByTestId('ion-option-0-1'));
    const classSelected = getDropdownById('ion-option-0-1').className;
    expect(classSelected).toContain(`${'selected'}`);
  });
  it('should select multiple options at multiple variant', async () => {
    sut({ ...defaultGroup, multiple: true });
    await userEvent.click(screen.getByTestId('ion-option-0-1'));
    await userEvent.click(screen.getByTestId('ion-option-1-1'));
    const firstSelected = getDropdownById('ion-option-0-1').className;
    const secondSelected = getDropdownById('ion-option-1-1').className;
    expect(firstSelected).toContain(`${'selected'}`);
    expect(secondSelected).toContain(`${'selected'}`);
  });
  it('should unselect an option', async () => {
    sut(defaultGroup);
    await userEvent.click(screen.getByTestId('ion-option-0-1'));
    await userEvent.click(screen.getByTestId('ion-option-0-1'));
    const classUnSelected = getDropdownById('ion-option-0-1').className;
    expect(classUnSelected).not.toContain(`${'selected'}`);
  });
});
