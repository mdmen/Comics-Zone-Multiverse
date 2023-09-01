export const outerBorderColor = '#fff';
export const innerBorderColor = '#000';
export const innerAccentColor = '#242424';
export const backgroundColor = '#fcfc00';
export const progressBarColor = '#009000';

export interface HudLayout {
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export function scaleLayout(layout: HudLayout, scale: number): HudLayout {
  const { x, y, width, height } = layout;

  return {
    ...layout,
    x: Math.floor(x * scale),
    y: Math.floor(y * scale),
    width: Math.floor(width * scale),
    height: Math.floor(height * scale),
  };
}
