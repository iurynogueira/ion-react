import stitches from '../../stitches.config';
import { spacing } from '../utils/spacing';

const { styled } = stitches;

export const ValueStyle = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: spacing(0.5),
  backgroundColor: '$primary2',
  color: '$primaryColor',
  padding: '2px 8px',
  borderRadius: '8px',

  '.icon': {
    display: 'flex',
    alignItens: 'center',
  },
});

export const ValuesContainerStyle = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: spacing(0.5),
  alignItems: 'center',
});

export const SelectStyle = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: spacing(1),
  fontWeight: '600',
  cursor: 'pointer',
  gap: spacing(1),
  background: '$neutral1',
  color: '$primaryColor',
  border: '1px solid $neutral4',
  userSelect: 'none',

  '.arrow-icon, .clean-icon': {
    display: 'flex',
    alignItems: 'center',
  },

  svg: {
    fill: '$primaryColor',
  },

  '&:disabled': {
    background: '$neutral2 ',
    color: '$neutral5 ',
    border: '1px solid $neutral5 ',
    cursor: 'not-allowed',

    svg: {
      fill: '$neutral5',
    },
  },

  defaultVariants: {
    size: 'sm',
  },
  variants: {
    allowClear: {
      true: {
        '.clean-icon': {
          display: 'none',
        },
        '&:hover, &:active': {
          '.clean-icon': {
            display: 'block',
          },
          '.arrow-icon': {
            display: 'none',
          },
        },
      },
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
        borderColor: '$neutral5',
        backgroundColor: '$neutral3',
        color: '$neutral5',

        svg: {
          fill: '$neutral5',
        },
      },
    },
    size: {
      sm: {
        minWidth: '24px',
        height: '24px',
        padding: '0px 12px',
        fontSize: '12px',
      },
      md: {
        minWidth: '32px',
        height: '32px',
        padding: '6px 16px',
        fontSize: '14px',
      },
    },
    status: {
      error: {
        borderColor: '$negative6',
      },
      warning: {
        borderColor: '$warning6',
      },
    },
  },
});

export const OptionsContainerStyle = styled('div', {
  marginTop: spacing(1),
});
