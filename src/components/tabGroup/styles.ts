import stitches from '../../stitches.config';

const { styled } = stitches;

export const TabGroupStyles = styled('div', {
  display: 'flex',

  div: {
    display: 'flex',
  },

  variants: {
    align: {
      horizontal: {
        div: {
          flexDirection: 'row',
        },
      },
      vertical: {
        width: '100%',

        div: {
          flexDirection: 'column',
          textAlign: 'left',
          'button > div': {
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        },
      },
    },
  },
});
