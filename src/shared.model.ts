export interface IRgbColor {
  r: number;
  g: number;
  b: number;
}

export interface IProBuilderTextFormatting {
  fontName?: string;
  textColor?: string | IRgbColor;
  textSize?: number;
  textPadding?: number;
  strokeColor?: string | IRgbColor;
  strokeWidth?: number;
  shadowBlurRadius?: number;
  shadowColor?: string | IRgbColor;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
}

export interface IProBuilderTextFormattingDefinite extends IProBuilderTextFormatting {
  textColor: string | IRgbColor;
  textPadding: number;
  strokeColor: string | IRgbColor;
  strokeWidth: number;
  shadowBlurRadius: number;
  shadowColor: string | IRgbColor;
  shadowOffsetX: number;
  shadowOffsetY: number;
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
