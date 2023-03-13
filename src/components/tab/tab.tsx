import React, { useEffect, useState } from 'react';
import { BorderDirection } from '../../core/types/directions';
import { SizeType } from '../../core/types/size';
import IonBadge, { BadgeProps } from '../badge/badge';
import IonIcon from '../icons/icons';
import { iconType } from '../icons/svgs/icons';
import { TabStyles } from './styles';

type StitchesTabProps = React.ComponentProps<typeof TabStyles>;

type TabSizes = Exclude<SizeType, 'xs'>;

export type TabProps = {
  label: string;
  direction?: BorderDirection;
  size?: TabSizes;
  selected?: boolean;
  disabled?: boolean;
  icon?: iconType;
  badge?: BadgeProps;
  handleClick?: () => void;
} & StitchesTabProps;

const IonTab = ({
  label,
  icon,
  size = 'sm',
  direction = 'bottom',
  selected = false,
  disabled = false,
  handleClick,
  badge,
}: TabProps) => {
  const [selectedState, setSelectedState] = useState<boolean>(selected);

  /**
   * If the @component IonTab is used individually outside
   * the @param handleClick function that changes the
   * 'selected' status will be defined to support individual IonTabs
   */
  if (handleClick === undefined) {
    handleClick = () => {
      setSelectedState(true);
    };
  }

  useEffect(() => {
    setSelectedState(selected);
  }, [selected]);

  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <>
      <TabStyles
        size={size}
        direction={direction}
        onClick={handleClick}
        selected={selectedState}
        disabled={disabled}
        data-testid="ion-tab"
      >
        <div>
          {icon && <IonIcon type={icon} size={iconSize[`${size}`]} />}
          <span>{label}</span>
          {badge && <IonBadge label={badge.label} type={badge.type} />}
        </div>
      </TabStyles>
    </>
  );
};

export default IonTab;
