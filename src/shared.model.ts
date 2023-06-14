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
