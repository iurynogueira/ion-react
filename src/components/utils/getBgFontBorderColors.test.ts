import { getBgFontBorderColors } from './getBgFontBorderColors';

describe('getBgFontBorderColors', () => {
  it('should return object with correct background, color and border properties', () => {
    const expected = {
      background: 'red',
      color: 'white',
      border: '1px solid black',
    };
    const result = getBgFontBorderColors({
      background: 'red',
      color: 'white',
      border: '1px solid black',
    });
    expect(result).toMatchObject(expected);
  });

  it('should return object without border property when not specified', () => {
    const expected = { background: 'red', color: 'white' };
    const result = getBgFontBorderColors({ background: 'red', color: 'white' });
    expect(result).toMatchObject(expected);
  });
});
