import { ComponentStory, ComponentMeta } from '@storybook/react';
import IonDropdown from '../../components/dropdown';
import { DropdownProps } from '../../components/dropdown/dropdown';

export default {
  title: 'Ion/Data Display/Dropdown',
  component: IonDropdown,
  argTypes: { handleClick: { action: 'clicked' } },
} as ComponentMeta<typeof IonDropdown>;

const Template: ComponentStory<typeof IonDropdown> = (args: DropdownProps) => (
  <IonDropdown {...args} />
);

export const DropdownDefault = Template.bind({});
DropdownDefault.args = {
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
  onSelectedOption: () => {},
};

export const DropdownDisabled = Template.bind({});
DropdownDisabled.args = {
  options: [
    {
      label: 'Opção 1',
      value: 1,
      selected: true,
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
  disabled: true,
  onSelectedOption: () => {},
};

export const DropdownWithSomeDisabledOption = Template.bind({});
DropdownWithSomeDisabledOption.args = {
  options: [
    {
      label: 'Opção 1',
      value: 1,
      selected: true,
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
  ],

  onSelectedOption: () => {},
};

export const DropdownWithMultipleSelected = Template.bind({});
DropdownWithMultipleSelected.args = {
  options: [
    {
      label: 'Opção 1',
      value: 1,
      selected: true,
    },
    {
      label: 'Opção 2',
      value: 2,
      selected: true,
    },
    {
      label: 'Opção 3',
      value: 3,
    },
  ],
  multiple: true,
  onSelectedOption: () => {},
};

export const DropdownWithOptionGroups = Template.bind({});
DropdownWithOptionGroups.args = {
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
      ],
    },
    {
      label: 'Grupo 2',
      options: [
        {
          label: 'Opção 3',
          value: 3,
        },
        {
          label: 'Opção 4',
          value: 4,
        },
      ],
    },
    {
      label: 'Grupo 3',
      options: [
        {
          label: 'Opção 5',
          value: 5,
        },
        {
          label: 'Opção 6',
          value: 6,
        },
      ],
    },
  ],
  onSelectedOption: () => {},
};
