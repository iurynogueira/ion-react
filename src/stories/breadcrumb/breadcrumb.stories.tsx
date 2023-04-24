import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { IonBreadcrumb, BreadcrumbProps } from '../../components/index';

export default {
  title: 'Ion/Navigation/Breadcrumb',
  component: IonBreadcrumb,
  argTypes: {
    selectedBreadcrumb: {
      action: 'selected',
    },
  },
} as ComponentMeta<typeof IonBreadcrumb>;

const Template: ComponentStory<typeof IonBreadcrumb> = (
  args: BreadcrumbProps
) => <IonBreadcrumb {...args} />;

export const BreadcrumbComp = Template.bind({});
BreadcrumbComp.args = {
  breadcrumb: [
    {
      label: 'Home',
      link: '/home',
    },
    {
      label: 'Recursos',
      link: '/recursos',
    },
    {
      label: 'Técnico',
      link: '/tecniico',
    },
  ],
};
