import stitches from '../../stitches.config';
import { spacing } from '../utils/spacing';

const { styled } = stitches;

export const StepsContainerStyle = styled('div', {
  display: 'flex',
});

export const StepDrawStyle = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

export const LineStyle = styled('div', {
  width: '64.5px',
  height: '1px',
  backgroundColor: '$neutral4',

  variants: {
    bolded: {
      true: {
        backgroundColor: '$primary6',
      },
    },
  },
});

export const CircleStyle = styled('div', {
  boxSizing: 'content-box',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: spacing(1),
  padding: spacing(0.5),
  minWidth: '28px',
  height: '28px',
  borderRadius: '20px',
  border: '1px solid',
  fontFamily: '"Source Sans Pro", sans-serif',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '20px',
});

export const DetailsStyle = styled('div', {
  textAlign: 'center',
  color: '$neutral6',
  fontFamily: '"Inter", sans-serif',
  fontStyle: 'normal',
  fontWeight: '400',
  wordBreak: 'break-all',
  padding: '3px 8px',
  maxWidth: '183px',
  boxSizing: 'border-box',

  '.label': {
    fontSize: '14px',
    lineHeight: '20px',
  },

  '.description': {
    fontSize: '12px',
    lineHeight: '16px',
  },
});

export const StepStyle = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  '&:first-child': {
    [`& ${DetailsStyle}`]: {
      '.label, .description': {
        textAlign: 'left',
        maxWidth: '118.5px',
      },
    },
  },
  '&:last-child': {
    [`& ${DetailsStyle}`]: {
      '.label, .description': {
        textAlign: 'right',
        maxWidth: '118.5px',
      },
    },
  },

  defaultVariants: {
    status: 'default',
  },

  variants: {
    status: {
      default: {
        [`& ${CircleStyle}`]: {
          borderColor: '$neutral6',
          backgroundColor: '$neutral1',
          color: '$neutral8',
        },
      },
      selected: {
        [`& ${CircleStyle}`]: {
          borderColor: '$primary6',
          backgroundColor: '$primary6',
          color: '$neutral1',
        },

        [`& ${DetailsStyle}`]: {
          '.label': {
            color: '$neutral7',
          },
        },
      },
      checked: {
        [`& ${CircleStyle}`]: {
          borderColor: '$primary6',
          backgroundColor: '$primary1',
          color: '$primary6',

          svg: {
            marginTop: '5px',
            fill: '$primary6',
          },
        },
      },
      error: {
        [`& ${CircleStyle}`]: {
          borderColor: '$negative6',
          backgroundColor: '$negative6',
          color: '$neutral1',
        },
      },
    },
    clickable: {
      true: {
        cursor: 'pointer',
        '&:hover, &:active': {
          [`& ${DetailsStyle}`]: {
            '.label, .description': {
              color: '$primary5',
            },
          },
        },
      },
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
        [`& ${LineStyle}`]: {
          backgroundColor: '#ced2db',
        },

        [`& ${CircleStyle}`]: {
          borderColor: '$neutral4',
          backgroundColor: '$neutral4',
          color: '$neutral5',

          svg: {
            marginTop: '5px',
            fill: '$neutral5',
          },
        },

        [`& ${DetailsStyle}`]: {
          '.label, .description': {
            color: '$neutral5',
          },
        },
      },
    },
  },

  compoundVariants: [
    {
      clickable: true,
      status: 'default',
      disabled: false,
      css: {
        '&:hover': {
          [`& ${CircleStyle}`]: {
            borderColor: '$primary4',
            backgroundColor: '$neutral1',
            color: '$primary7',
          },
        },
        '&:active': {
          [`& ${CircleStyle}`]: {
            borderColor: '$primary6',
            backgroundColor: '$primary1',
            color: '$primary7',
          },
        },
      },
    },
    {
      clickable: true,
      status: 'selected',
      disabled: false,
      css: {
        '&:hover': {
          [`& ${CircleStyle}`]: {
            borderColor: '$primary5',
            backgroundColor: '$primary5',
            color: '$neutral1',
          },
        },
        '&:active': {
          [`& ${CircleStyle}`]: {
            borderColor: '$primary7',
            backgroundColor: '$primary7',
            color: '$neutral1',
          },
        },
      },
    },
    {
      clickable: true,
      status: 'checked',
      disabled: false,
      css: {
        '&:hover': {
          [`& ${CircleStyle}`]: {
            borderColor: '$primary6',
            backgroundColor: '$primary2',
            color: '$primary6',

            svg: {
              marginTop: '5px',
              fill: '$primary6',
            },
          },
        },
        '&:active': {
          [`& ${CircleStyle}`]: {
            borderColor: '$primary6',
            backgroundColor: '$primary2',
            color: '$primary7',

            svg: {
              marginTop: '5px',
              fill: '$primary7',
            },
          },
        },
      },
    },
    {
      clickable: true,
      status: 'error',
      disabled: false,
      css: {
        '&:hover': {
          [`& ${CircleStyle}`]: {
            borderColor: '$negative5',
            backgroundColor: '$negative5',
            color: '$neutral1',
          },
        },
        '&:active': {
          [`& ${CircleStyle}`]: {
            borderColor: '$negative7',
            backgroundColor: '$negative7',
            color: '$neutral1',
          },
        },
      },
    },
  ],
});
