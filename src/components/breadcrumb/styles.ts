import stitches from '../../stitches.config';
import { spacing } from '../utils/spacing';
const { styled } = stitches;

export const BreadcrumbStyles = styled('nav', {
  padding: `${spacing(0.6)} ${spacing(0.9)}`,
  textDecoration: 'none',
  fontFamily: 'sans-serif',
  fontSize: '15px',

  '& > ol': {
    display: 'inline-flex',
    margin: '0',
    padding: `${spacing(1.25)}`,

    '& li': {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',

      svg: {
        fill: '$neutral6',
      },

      a: {
        padding: `${spacing(1.25)}`,
        textDecoration: 'none',
        color: '$neutral6',
        fontFamily: 'sans-serif',
        fontSize: '14px',
        fontWeight: '400',
        cursor: 'pointer',
        '&:hover': {
          color: '$primary6',
        },
        '&:active': {
          fontWeight: '600',
          fontSize: '14px',
          color: '$primary6',
        },
      },

      '&:last-child': {
        a: {
          color: '$primary6',
          fontWeight: '600',
          cursor: 'default',
        },
        svg: { display: 'none' },
      },
    },
  },
});
