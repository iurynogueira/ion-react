import stitches from '../../stitches.config';
import { spacing } from '../utils/spacing';

const { styled } = stitches;

export const DropdownStyle = styled('div', {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(0.5),
  boxSizing: 'border-box',
  padding: '12px 8px',
  maxHeight: '244px',
  minWidth: '182px',
  width: 'max-content',
  overflowY: 'auto',

  backgroundColor: '$neutral1',
  boxShadow:
    ' 0px 8px 6px -4px rgba(0, 0, 0, 0.15), 0px 0px 2px rgba(0, 0, 0, 0.15)',
  borderRadius: spacing(1),

  ul: {
    margin: '0',
    padding: '0',
    listStyle: 'none',
  },

  '&::-webkit-scrollbar': {
    width: '24px',
    background: '$neutral1',
  },

  '&::-webkit-scrollbar-thumb': {
    background: '$neutral6',
    border: '8px solid $neutral1',
    borderRadius: '16px',
  },
});

export const OptionStyle = styled('li', {
  cursor: 'pointer',
  paddingTop: spacing(1),
  paddingBottom: spacing(1),
  paddingLeft: spacing(2),
  paddingRight: spacing(2),
  marginTop: spacing(0.5),
  marginBottom: spacing(0.5),
  backgroundColor: '$neutral1',
  borderRadius: spacing(1),
  fontFamily: 'Source Sans Pro, sans-serif',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '20px',
  color: '$neutral7',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '.icon': {
    display: 'flex',
    alignItems: 'center',
  },

  '&:hover': {
    backgroundColor: '$primary1',
    color: '$neutral7',
  },

  '&:active': {
    backgroundColor: '$primary2',
    color: '$primary6',
  },

  variants: {
    selected: {
      true: {
        color: '$primary6',
        backgroundColor: '$primary1',

        svg: {
          fill: '$primary6',
        },

        '.icon.close': {
          display: 'none',
        },
        '&:hover, &:active': {
          '.icon.close': {
            display: 'flex',
          },
          '.icon.check': {
            display: 'none',
          },
        },

        '&:hover': {
          backgroundColor: '$primary1',
          color: '$primary4',

          svg: {
            fill: '$primary4',
          },
        },

        '&:active': {
          backgroundColor: '$primary2',
          color: '$primary7',
          svg: {
            fill: '$primary7',
          },
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
    disabled: {
      true: {
        cursor: 'not-allowed',
        borderColor: '$neutral5',
        backgroundColor: '$neutral3',
        color: '$neutral5',

        '&:hover,&:active': {
          backgroundColor: '$neutral3',
          color: '$neutral5',
          svg: {
            fill: '$neutral5',
          },
        },
      },
    },
  },

  compoundVariants: [
    {
      selected: true,
      disabled: true,
      css: {
        svg: {
          fill: '$neutral5',
        },

        '&:hover, &:active': {
          '.icon.close': {
            display: 'none',
          },
          '.icon.check': {
            display: 'flex',
          },
        },
      },
    },
  ],
});

export const OptionGroupStyle = styled('div', {
  fontFamily: 'Source Sans Pro, sans-serif',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '12px',
  lineHeight: '20px',
  color: '$neutral7',
});
