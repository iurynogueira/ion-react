type ColorStyleResponse = {
  border: string;
  backgroundColor: string;
  color: string;
  svg: {
    fill: string;
  };
};

interface StyleProps {
  svgFillColor: string;
  backgroundColor: string;
  fontColor: string;
  borderColor: string;
}

/**
 * Function to prevent repetition of style blocks.
 *
 * @param svgFillColor - Fill color to be used in SVG
 * @param backgroundColor - Background color
 * @param fontColor - The font color
 * @param borderColor - Border color
 * @returns A Javascript object containing style properties.
 */
export function getFillBgFontBorderColors({
  backgroundColor,
  fontColor,
  borderColor,
  svgFillColor,
}: StyleProps) {
  const styles: ColorStyleResponse = {
    backgroundColor: backgroundColor,
    color: fontColor,
    border: `1px solid ${borderColor}`,
    svg: {
      fill: svgFillColor,
    },
  };

  return styles;
}
