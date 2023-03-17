import React from 'react';
import { render } from '@testing-library/react';
import IonBreadcrumb, { BreadcrumbProps } from './breadcrumb';

const defaultBreadcrumb: BreadcrumbProps = {
  breadcrumb: [
    {
      label: 'Inicio',
      link: '/home',
    },
    {
      label: 'Recursos',
      link: '/recursos',
    },
  ],
};

function sut(props: BreadcrumbProps = defaultBreadcrumb) {
  return render(<IonBreadcrumb {...props} />);
}

describe('Breadcrumb', () => {
  it('should render the Breadcrumb component', () => {
    const { container } = sut();
    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  it('should render a breadcrumb with a link and a label', () => {
    const { container } = sut();
    const links = container.querySelectorAll('a');
    expect(links).toHaveLength(2);
    expect(links[0].getAttribute('href')).toEqual('/home');
    expect(links[0].textContent).toEqual('Inicio');
  });

  it('should render a breadcrumb with no links', () => {
    const { container } = sut({ breadcrumb: [] });
    const links = container.querySelectorAll('a');
    expect(links).toHaveLength(0);
  });
});