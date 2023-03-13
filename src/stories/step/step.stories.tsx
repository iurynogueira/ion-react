import { ComponentMeta, ComponentStory } from '@storybook/react';
import IonSteps, { StepConfig } from '../../components/steps/steps';

export default {
  title: 'Ion/Navigation/Steps',
  component: IonSteps,
  argTypes: { handleClick: { action: 'clicked' } },
} as ComponentMeta<typeof IonSteps>;

const Template: ComponentStory<typeof IonSteps> = (args: StepConfig) => (
  <IonSteps {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  steps: [
    {
      label: 'Step 1',
    },
    {
      label: 'Step 2',
    },
    {
      label: 'Step 3',
    },
  ],
};

export const Disabled = Template.bind({});
Disabled.args = {
  steps: [
    {
      label: 'First',
      status: 'checked',
    },
    {
      label: 'Second',
    },
    {
      label: 'Third',
    },
  ],
  disabled: true,
};

export const Checked = Template.bind({});
Checked.args = {
  steps: [
    {
      label: 'First',
      status: 'checked',
    },
    {
      label: 'Second',
      status: 'checked',
    },
    {
      label: 'Third',
    },
    {
      label: 'Fourty',
    },
  ],
};

export const WithError = Template.bind({});
WithError.args = {
  steps: [
    {
      label: 'First',
      status: 'checked',
    },
    {
      label: 'Second',
      status: 'error',
      description: 'Atenção neste passo',
    },
    {
      label: 'Third',
    },
    {
      label: 'Fourty',
    },
  ],
};

export const Clickable = Template.bind({});
Clickable.args = {
  steps: [
    {
      label: 'First',
      status: 'checked',
    },
    {
      label: 'Second',
    },
    {
      label: 'Third',
    },
    {
      label: 'Fourty',
    },
  ],
  clickable: true,
};
