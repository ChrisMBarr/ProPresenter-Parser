import { IRgbColor } from './shared.model';

export const patternHexColor = /^#?[a-f\d]{6}$/i;
export const patternRgbaStrAsString = '[10](?:\\.\\d+)? [10](?:\\.\\d+)? [10](?:\\.\\d+)? [10](?:\\.\\d+)?';
export const patternRgbaStr = new RegExp('^' + patternRgbaStrAsString + '$');

export const stripRtf = (str: string): string => {
  const basicRtfPattern = /\{\*?\\[^{}]+;}|[{}]|\\[A-Za-z]+\n?(?:-?\d+)?[ ]?/g;
  const newLineSlashesPattern = /\\\n/g;
  const ctrlCharPattern = /\n\\f[0-9]\s/g;

  //Remove RTF Formatting, replace RTF new lines with real line breaks, and remove whitespace
  return str.replace(ctrlCharPattern, '').replace(basicRtfPattern, '').replace(newLineSlashesPattern, '\n').trim();
};

export const formatRtf = (text: string, font = 'Arial', size = 60, color: IRgbColor = { r: 255, g: 255, b: 255 }): string => {
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

export const getTextPropsFromRtf = (str: string): { color: IRgbColor; font: string; size: number } => {
  //defaults
  const color: IRgbColor = { r: 0, g: 0, b: 0 };
  let font = '';
  let size = 0;

  //Might contain multiple fonts, but RTF mutates text by commands, so we only need to get the last font command to get the final applied font
  const fontMatches = Array.from(str.matchAll(/\\fcharset0 (.+?);/gi));
  if (fontMatches.length > 0) {
    font = fontMatches[fontMatches.length - 1][1];
  }

  //Might contain multiple colors, but RTF mutates text by commands, so we only need to get the last color command to get the final applied color
  const colorMatch = /\\red(\d+)\\green(\d+)\\blue(\d+);}/i.exec(str);
  if (colorMatch) {
    color.r = parseInt(colorMatch[1], 10);
    color.g = parseInt(colorMatch[2], 10);
    color.b = parseInt(colorMatch[3], 10);
  }

  //Might contain multiple font sizes, but RTF mutates text by commands, so we only need to get the last font size command to get the final applied size
  const sizeMatch = Array.from(str.matchAll(/\\fs(\d+) ?\\/gi));
  if (sizeMatch.length > 0) {
    //RTF font size is in half-points. Divide by 2 to get size in full points
    size = parseInt(sizeMatch[sizeMatch.length - 1][1], 10) / 2;
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

  throw new Error(`Input color '${color}' could not be parsed to an RGBA color string!`);
};

export const normalizeColorToRgbObj = (color: string | IRgbColor): IRgbColor => {
  //RGB object, RGBA string, or HEX color all get returned as an RGB Object

  if (typeof color !== 'string') {
    return color;
  }

  if (patternRgbaStr.test(color)) {
    const parts = color.split(' ');
    return {
      r: parseFloat(parts[0]) * 255,
      g: parseFloat(parts[1]) * 255,
      b: parseFloat(parts[2]) * 255,
    };
  }

  if (patternHexColor.test(color)) {
    return hexToRgb(color);
  }

  throw new Error(`Input color '${color}' could not be parsed to an RGB color object!`);
};

export const normalizeColorToHex = (color: string | IRgbColor): string => {
  //RGB object, RGBA string, or HEX color all get returned as an HEX color

  const to16Bit = (i: number): string => ('00' + i.toString(16)).slice(-2).toUpperCase();

  if (typeof color !== 'string') {
    return to16Bit(color.r) + to16Bit(color.g) + to16Bit(color.b);
  }

  if (patternRgbaStr.test(color)) {
    const parts = color.split(' ');
    return (
      to16Bit(Math.round(parseFloat(parts[0]) * 255)) +
      to16Bit(Math.round(parseFloat(parts[1]) * 255)) +
      to16Bit(Math.round(parseFloat(parts[2]) * 255))
    );
  }

  if (patternHexColor.test(color)) {
    return color.replace('#', '');
  }

  throw new Error(`Input color '${color}' could not be parsed to a HEX color!`);
};
