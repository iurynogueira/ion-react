import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { iconType } from '../icons/svgs/icons';
import { TabProps } from '../tab/tab';
import IonTabGroup, { IonTabGroupProps, TabGroupSizes } from './tabGroup';

const mockTabs: TabProps[] = [
  {
    label: 'Tab 1',
    selected: true,
  },
  {
    label: 'Tab 2',
  },
  {
    label: 'Tab 3',
  },
];

const sut = (props: IonTabGroupProps = { tabs: mockTabs }) => {
  render(<IonTabGroup {...props} />);
};

const getTabGroup = () => screen.getByTestId('ion-tabGroup');
const getTabs = () => screen.getAllByTestId('ion-tab');
const getBadge = () => screen.getAllByTestId('ion-badge');

describe('IonTabGroup', () => {
  describe('Default', () => {
    it('should render TabGroup in horizontal align by default', async () => {
      sut();
      expect(getTabGroup().className).toContain('align-horizontal');
    });

    it('should render tabs with border bottom by default', async () => {
      sut();
      getTabs().forEach((tab: HTMLElement) => {
        expect(tab.className).toContain('direction-bottom');
      });
    });

    it('should render TabGroup in vertical align by default', async () => {
      sut({ tabs: mockTabs, align: 'vertical' });
      expect(getTabGroup().className).toContain('align-vertical');
    });

    it('should select a Tab when it is clicked', async () => {
      sut();
      const secondTab = getTabs()[1];
      await userEvent.click(secondTab);
      expect(secondTab.className).toContain('selected-true');
    });

    it('should contain first Tab selected by default', async () => {
      sut();
      const firstTab = getTabs()[0];
      expect(firstTab.className).toContain('selected-true');
    });
  });

  describe('Border', () => {
    it('should countain border right when direction is vertical', async () => {
      sut({ tabs: mockTabs, align: 'vertical' });
      getTabs().forEach((tab: HTMLElement) => {
        expect(tab.className).toContain('direction-right');
      });
    });

    it('should contain border left when border and align are defined', async () => {
      sut({ tabs: mockTabs, align: 'vertical', borderDirection: 'left' });
      getTabs().forEach((tab: HTMLElement) => {
        expect(tab.className).toContain('direction-left');
      });
    });

    it('should contain border top when border and align are defined', async () => {
      sut({ tabs: mockTabs, align: 'horizontal', borderDirection: 'top' });
      getTabs().forEach((tab: HTMLElement) => {
        expect(tab.className).toContain('direction-top');
      });
    });

    it('should not contain border top when align is vertical', async () => {
      sut({ tabs: mockTabs, align: 'vertical', borderDirection: 'top' });
      getTabs().forEach((tab: HTMLElement) => {
        expect(tab.className).not.toContain('direction-top');
      });
    });

    it('should not contain border right when align is horizontal', async () => {
      sut({ tabs: mockTabs, align: 'horizontal', borderDirection: 'right' });
      getTabs().forEach((tab: HTMLElement) => {
        expect(tab.className).not.toContain('direction-right');
      });
    });
  });

  describe('Sizes', () => {
    it.each(['sm', 'md', 'lg'])(
      'should render tabs with %s size',
      async (size: string) => {
        sut({
          tabs: mockTabs,
          size: size as TabGroupSizes,
        });

        getTabs().forEach((tab: HTMLElement) => {
          expect(tab.className).toContain(`size-${size}`);
        });
      }
    );
  });

  describe('With icon', () => {
    const icons: iconType[] = ['pencil', 'close', 'access'];
    const tabsWithIcons: TabProps[] = [
      {
        label: 'Tab 1',
        icon: icons[0],
      },
      {
        label: 'Tab 2',
        icon: icons[1],
      },
      {
        label: 'Tab 2',
        icon: icons[2],
      },
    ];

    it('should render tabs with icons', async () => {
      sut({
        tabs: tabsWithIcons,
      });

      icons.forEach((icon: iconType) => {
        expect(screen.getByTestId(`ion-icon-${icon}`)).toBeInTheDocument();
      });
    });
  });

  describe('With Badge', () => {
    const tabsWithIconsAndBadge: TabProps[] = [
      {
        label: 'Tab 1',
        badge: { label: 100 },
        icon: 'calendar',
      },
      {
        label: 'Tab 2',
        badge: { label: 2 },
        icon: 'calendar',
      },
      {
        label: 'Tab 3',
        badge: { label: 'expirado' },
        icon: 'access',
      },
      {
        label: 'Tab 4',
        icon: 'alert',
      },
    ];

    it('should render a tab with badge', async () => {
      sut({ tabs: tabsWithIconsAndBadge });
      expect(getBadge()[0]).toBeTruthy();
    });

    it('should render a tab with 99+ (value > 99)', async () => {
      sut({ tabs: tabsWithIconsAndBadge });
      expect(getBadge()[0].textContent).toBe('99+');
    });

    it('should render a tab with number (value < 99)', async () => {
      sut({ tabs: tabsWithIconsAndBadge });
      expect(getBadge()[1].textContent).toBe('2');
    });

    it('should render a tab with string badge', async () => {
      sut({ tabs: tabsWithIconsAndBadge });
      expect(getBadge()[2].textContent).toBe('expirado');
    });
  });
});
