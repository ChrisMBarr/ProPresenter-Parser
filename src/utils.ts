export interface IRtfColor {
  r: number;
  g: number;
  b: number;
}

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
  color: IRtfColor = { r: 255, g: 255, b: 255 }
): string => {
  //Text will be centered.
  //RTF font size is in half-points. Multiply input size by 2 to get size in half points
  return `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320',
{\\fonttbl\\f0\\fswiss\\fcharset0 ${font};}
{\\colortbl;\\red${color.r}\\green${color.g}\\blue${color.b};}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs${size * 2} \\cf1 \\\r${text.replace(/\r|\n/g, '\\\r')}}`;
};

export const getTextPropsFromRtf = (
  str: string
): { color: IRtfColor; font: string; size: number } => {
  //defaults
  const color: IRtfColor = { r: 0, g: 0, b: 0 };
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

export const normalizeLineEndings = (inputStr: string): string => {
  //replace all adjacent \n\r or \r\n characters with just \n to simplify
  return inputStr.replace(/(\r\n)|(\n\r)/g, '\n');
};

export const getIsoDateString = (): string => {
  //Remove the ending milliseconds: '2023-05-17T16:02:23.245Z' --> '2023-05-17T16:02:23'
  return new Date().toISOString().replace(/\.\d{3}Z$/, '');
};

//https://stackoverflow.com/a/41919138/79677
export const mergeArraysByProp = <T>(a: T[], b: T[], propName: string): T[] => {
  // We need to ignore the TS compile error since there's no good way to write a typedef for this!
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const reduced = a.filter((aItem) => !b.find((bItem) => aItem[propName] === bItem[propName]));
  return reduced.concat(b);
};
