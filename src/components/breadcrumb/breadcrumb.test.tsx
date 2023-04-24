import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BreadcrumbProps, IonBreadcrumb } from './breadcrumb';
import userEvent from '@testing-library/user-event';

const mockClick = jest.fn();
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
  selectedBreadcrumb: mockClick,
};

function sut(props: BreadcrumbProps = defaultBreadcrumb) {
  return render(<IonBreadcrumb {...props} />);
}

const getBreadcrumb = () => {
  return screen.getByTestId('ion-breadcrumb');
};

describe('Breadcrumb', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the Breadcrumb component', () => {
    const { container } = sut();
    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  it('should render a breadcrumb with a label', () => {
    const { container } = sut();
    const links = container.querySelectorAll('a');
    expect(links).toHaveLength(2);
    expect(links[0].textContent).toEqual('Inicio');
  });

  it('should render a breadcrumb with no links', () => {
    const { container } = sut({ ...defaultBreadcrumb, breadcrumb: [] });
    const links = container.querySelectorAll('a');
    expect(links).toHaveLength(0);
  });

  it('should not execute user click event on last breadcrumb item', async () => {
    const { container } = sut({ ...defaultBreadcrumb });
    const links = container.querySelectorAll('a');
    await userEvent.click(links[2]);
    expect(mockClick).not.toHaveBeenCalled();
  });

  it('should not call the selectedBreadcrumb function when the last breadcrumb is clicked', () => {
    const { getByText } = sut();
    const lastBreadcrumb = getByText('Recursos');
    fireEvent.click(lastBreadcrumb);
    expect(mockClick).not.toHaveBeenCalledWith(lastBreadcrumb);
  });

  it('should call the selectedBreadcrumb function with the correct breadcrumb item', () => {
    const { getByText } = sut();
    const breadcrumb1 = getByText('Inicio');
    fireEvent.click(breadcrumb1);
    expect(mockClick).toHaveBeenCalledWith(defaultBreadcrumb.breadcrumb[0]);
  });
});
