export interface IRgbColor {
  r: number;
  g: number;
  b: number;
}

//TODO: Use this when parsing from RGBA colors!
export interface IRgbaColor extends IRgbColor {
  a: number;
}

export interface IProBuilderTextFormatting {
  fontName?: string;
  textColor?: string | IRgbColor;
  textSize?: number;
  textPadding?: number;
}

export interface IProBuilderTextFormattingDefinite extends IProBuilderTextFormatting {
  textColor: string | IRgbColor;
  textPadding: number;
}

export interface IProElementPosition {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
}

export interface IXmlProElementPosition {
  '@x': number;
  '@y': number;
  '@z': number;
  '@width': number;
  '@height': number;
}

export enum IProTransitionType {
  /* eslint-disable no-unused-vars */
  Dissolve = 0,
  Cube = 1,
  Flip = 2,
  Door = 3,
  Swap = 4,
  Ripple = 6,
  FadeToBlack = 7,
  Iris = 8,
  Cut = 10,
  FlyInDiagonalToBottomRight = 91,
  FlyInDown = 92,
  FlyInDiagonalToBottomLeft = 93,
  FlyInRight = 94,
  FlyInCenter = 95,
  FlyInLeft = 96,
  FlyInDiagonalToTopRight = 97,
  FlyInUp = 98,
  FlyInDiagonalToTopLeft = 99,
  ZoomInDiagonalToBottomRight = 101,
  ZoomInDown = 102,
  ZoomInDiagonalToBottomLeft = 103,
  ZoomInRight = 104,
  ZoomInCenter = 105,
  ZoomInLeft = 106,
  ZoomInDiagonalToTopRight = 107,
  ZoomInUp = 108,
  ZoomInDiagonalToTopLeft = 109,
  WipeDiagonalToBottomRight = 110,
  WipeDown = 111,
  WipeDiagonalToBottomLeft = 112,
  WipeRight = 113,
  WipeLeft = 114,
  WipeDiagonalToTopRight = 115,
  WipeUp = 116,
  WipeDiagonalToTopLeft = 117,
  CoverDiagonalToBottomRight = 120,
  CoverDown = 121,
  CoverDiagonalToBottomLeft = 122,
  CoverRight = 123,
  CoverLeft = 124,
  CoverDiagonalToTopRight = 125,
  CoverUp = 126,
  CoverDiagonalToTopLeft = 127,
  PushRight = 130,
  PushLeft = 131,
  PushDown = 132,
  PushUp = 133,
  RevealDiagonalToBottomRight = 140,
  RevealDown = 141,
  RevealDiagonalToBottomLeft = 142,
  RevealRight = 143,
  RevealLeft = 144,
  RevealDiagonalToTopRight = 145,
  RevealUp = 146,
  RevealDiagonalToTopLeft = 147,
  /* eslint-enable no-unused-vars */
}
