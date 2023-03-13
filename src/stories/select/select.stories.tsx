import { ComponentStory, ComponentMeta } from '@storybook/react';
import IonSelect from '../../components/select';
import { SelectProps } from '../../components/select/select';

export default {
  title: 'Ion/Data Display/Select',
  component: IonSelect,
  argTypes: { handleClick: { action: 'clicked' } },
} as ComponentMeta<typeof IonSelect>;

const Template: ComponentStory<typeof IonSelect> = (args: SelectProps) => (
  <IonSelect {...args} />
);

export const SelectDefault = Template.bind({});
SelectDefault.args = {
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
};

export const SelectMedium = Template.bind({});
SelectMedium.args = {
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
  size: 'md',
  placeholder: 'Selecione',
};

export const SelectDisabled = Template.bind({});
SelectDisabled.args = {
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
  placeholder: 'Selecione aqui',
  disabled: true,
};

export const SelectWithAllowClear = Template.bind({});
SelectWithAllowClear.args = {
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
  allowClear: true,
};

export const SelectStatusError = Template.bind({});
SelectStatusError.args = {
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
  status: 'error',
  placeholder: 'Selecione',
};

export const SelectStatusWarning = Template.bind({});
SelectStatusWarning.args = {
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
  status: 'warning',
  placeholder: 'Selecione',
};

export const SelectWithOptionGroups = Template.bind({});
SelectWithOptionGroups.args = {
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
};

export const SelectMultiple = Template.bind({});
SelectMultiple.args = {
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
  multiple: true,
  placeholder: 'Selecione AKY',
  allowClear: true,
};

export const SelectMultipleAndExtraTag = Template.bind({});
SelectMultipleAndExtraTag.args = {
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
    {
      label: 'Opção 4',
      value: 4,
    },
    {
      label: 'Opção 5',
      value: 5,
    },
  ],
  multiple: true,
  placeholder: 'Selecione AKY',
  allowClear: true,
  maxTagCount: 3,
};
