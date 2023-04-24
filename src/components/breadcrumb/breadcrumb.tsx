import React, { useCallback } from 'react';
import { BreadcrumbStyles } from './styles';
import { IonIcon } from '../index';

type StitchesBreadcrumbProps = React.ComponentProps<typeof BreadcrumbStyles>;

export type BreadcrumbItem = {
  label: string;
  link: string;
};

export type BreadcrumbProps = {
  breadcrumb: Array<BreadcrumbItem>;
  selectedBreadcrumb: (breadcrumbItem: BreadcrumbItem) => void;
} & StitchesBreadcrumbProps;

export const IonBreadcrumb = ({
  breadcrumb,
  selectedBreadcrumb,
}: BreadcrumbProps) => {
  const handleBreadcrumbClick = useCallback(
    (breadcrumbItem: BreadcrumbItem) => {
      if (breadcrumbItem !== breadcrumb[breadcrumb.length - 1]) {
        selectedBreadcrumb(breadcrumbItem);
      }
    },
    [breadcrumb, selectedBreadcrumb]
  );

  return (
    <BreadcrumbStyles data-testid="ion-breadcrumb">
      <ol role="navigation">
        {breadcrumb.map((breadcrumbItem, index) => {
          return (
            <li key={index}>
              <a
                onClick={() => handleBreadcrumbClick(breadcrumbItem)}
                data-testid="ion-breadcrumb-link"
              >
                {breadcrumbItem.label}
              </a>
              <IonIcon type="right2" size={16} />
            </li>
          );
        })}
      </ol>
    </BreadcrumbStyles>
  );
};
