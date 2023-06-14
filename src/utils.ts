import { IRgbColor } from './shared.model';

const patternHexColor = /^#?[a-f\d]{6}$/i;
const patternRgbaStr = /^[10](\.\d+)? [10](\.\d+)? [10](\.\d+)? [10](\.\d+)?$/;

export const stripRtf = (str: string): string => {
  const basicRtfPattern = /\{\*?\\[^{}]+;}|[{}]|\\[A-Za-z]+\n?(?:-?\d+)?[ ]?/g;
  const newLineSlashesPattern = /\\\n/g;
  const ctrlCharPattern = /\n\\f[0-9]\s/g;

  //Remove RTF Formatting, replace RTF new lines with real line breaks, and remove whitespace
  return str
    .replace(ctrlCharPattern, '')
    .replace(basicRtfPattern, '')
    .replace(newLineSlashesPattern, '\n')
    .trim();
};

export const formatRtf = (
  text: string,
  font = 'Arial',
  size = 60,
  color: IRgbColor = { r: 255, g: 255, b: 255 }
): string => {
  //Text will be centered.
  //RTF font size is in half-points. Multiply input size by 2 to get size in half points
  return `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320',{\\fonttbl\\f0\\fswiss\\fcharset0 ${font};}{\\colortbl;\\red${
    color.r
  }\\green${color.g}\\blue${
    color.b
  };}\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural\\f0\\fs${
    size * 2
  } \\cf1 ${text.replace(/\r|\n/g, '\\\r')}}`;
};

export const getTextPropsFromRtf = (
  str: string
): { color: IRgbColor; font: string; size: number } => {
  //defaults
  const color: IRgbColor = { r: 0, g: 0, b: 0 };
  let font = '';
  let size = 0;

  const fontMatch = /\\fcharset0 (.+);/i.exec(str);
  if (fontMatch) {
    font = fontMatch[1];
  }

  const colorMatch = /\\colortbl;\\red(\d+)\\green(\d+)\\blue(\d+);/.exec(str);
  if (colorMatch) {
    color.r = parseInt(colorMatch[1], 10);
    color.g = parseInt(colorMatch[2], 10);
    color.b = parseInt(colorMatch[3], 10);
  }

  const sizeMatch = /\\fs(\d+) \\/i.exec(str);
  if (sizeMatch) {
    //RTF font size is in half-points. Divide by 2 to get size in full points
    size = parseInt(sizeMatch[1], 10) / 2;
  }

  return {
    color,
    font,
    size,
  };
};

export const getIsoDateString = (): string => {
  //Remove the ending milliseconds: '2023-05-17T16:02:23.245Z' --> '2023-05-17T16:02:23'
  return new Date().toISOString().replace(/\.\d{3}Z$/, '');
};

export const getUniqueID = (): string => {
  //Native PP ID Example: 26AAF905-8F45-4252-BFAB-4C10CCFE1476
  function s4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
      .toUpperCase();
  }
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
};

export const hexToRgb = (hex: string): IRgbColor => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  }

  throw new Error(`Input color '${hex}' could not be parsed! Are you sure this is a hex color?`);
};

export const normalizeColorToRgbaString = (color: string | IRgbColor): string => {
  //RGB object, RGBA string, or HEX color all get returned as an RGBA string

  if (typeof color !== 'string') {
    return `${color.r / 255} ${color.g / 255} ${color.b / 255} 1`;
  }

  if (patternRgbaStr.test(color)) {
    return color;
  }

  if (patternHexColor.test(color)) {
    return normalizeColorToRgbaString(hexToRgb(color));
  }

  throw new Error(`Input color '${color}' could not be parsed!`);
};

export const normalizeColorToRgbObj = (color: string | IRgbColor): IRgbColor => {
  //RGB object, RGBA string, or HEX color all get returned as an RGB Object

  if (typeof color !== 'string') {
    return color;
  }

  if (patternRgbaStr.test(color)) {
    const parts = color.split(' ');
    return {
      r: parseInt(parts[0], 10) * 255,
      g: parseInt(parts[1], 10) * 255,
      b: parseInt(parts[2], 10) * 255,
    };
  }

  if (patternHexColor.test(color)) {
    return hexToRgb(color);
  }

  throw new Error(`Input color '${color}' could not be parsed!`);
};
