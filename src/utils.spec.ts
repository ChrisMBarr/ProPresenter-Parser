import * as Utils from './utils';

describe('Utils', () => {
  describe('stripRtf()', () => {
    it('should get single line plain text from an RTF string', () => {
      expect(
        Utils.stripRtf(
          '{\\rtf1\\ansi\\ansicpg1252\\cocoartf1343\\cocoasubrtf140\n\\cocoascreenfonts1{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}\n{\\colortbl;\\red255\\green255\\blue255;}\n\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc\n\n\\f0\\fs260 \\cf1 \\expnd0\\expndtw0\\kerning0\n\\outl0\\strokewidth0 \\strokec0 Our Good }'
        )
      ).toEqual(`Our Good`);
    });

    it('should get multiline plain text from an RTF string 1', () => {
      expect(
        Utils.stripRtf(
          '{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320\n{\\fonttbl\\f0\\fswiss\\fcharset0 Impact;}\n{\\colortbl;\\red255\\green255\\blue255;}\n\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural\n\n\\f0\\fs120 \\cf1 \\outl0\\strokewidth-40 \\strokec0 We bow our hearts we bend our knees\\\nOh Spirit come make us humble\\\nWe turn our eyes from evil things\\\nOh Lord we cast down our idols}'
        )
      ).toEqual(`We bow our hearts we bend our knees
Oh Spirit come make us humble
We turn our eyes from evil things
Oh Lord we cast down our idols`);
    });

    it('should get multiline plain text from an RTF string 2', () => {
      expect(
        Utils.stripRtf(
          '{\\rtf1\\ansi\\ansicpg1252\\cocoartf1343\\cocoasubrtf140\n\\cocoascreenfonts1{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}\n{\\colortbl;\\red255\\green255\\blue255;}\n\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc\n\n\\f0\\fs260 \\cf1 \\outl0\\strokewidth0 \\strokec1 Give us clean hands\\\nGive us pure hearts\\\nLet us not lift our\\\nSouls to another}'
        )
      ).toEqual(`Give us clean hands
Give us pure hearts
Let us not lift our
Souls to another`);
    });
  });

  describe('formatRtf', () => {
    it('should use the defaults', () => {
      expect(Utils.formatRtf(`test\ninput\nstring with some words`))
        .toEqual(`{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320',
{\\fonttbl\\f0\\fswiss\\fcharset0 Arial;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 \\\rtest\\\rinput\\\rstring with some words}`);
    });

    it('should use the options provided', () => {
      expect(
        Utils.formatRtf(`test\ninput\nstring with some words`, 'Helvetica', 30, {
          r: 50,
          g: 100,
          b: 150,
        })
      ).toEqual(`{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320',
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red50\\green100\\blue150;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs60 \\cf1 \\\rtest\\\rinput\\\rstring with some words}`);
    });
  });

  describe('getTextPropsFromRtf', () => {
    it('should get the text properties when they are all present', () => {
      const testProps =
        Utils.getTextPropsFromRtf(`{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Impact;}
{\\colortbl;\\red200\\green200\\blue200;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 every knee will bow\\
to bless Your name}`);

      expect(testProps).toEqual({ color: { r: 200, g: 200, b: 200 }, font: 'Impact', size: 60 });
    });

    it('should get a multi-word font name', () => {
      const testProps =
        Utils.getTextPropsFromRtf(`{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica Neue;}
{\\colortbl;\\red0\\green0\\blue0;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs96 \\cf1 every knee will bow\\
to bless Your name}`);

      expect(testProps).toEqual({
        color: { r: 0, g: 0, b: 0 },
        font: 'Helvetica Neue',
        size: 48,
      });
    });

    it('should return default properties when missing', () => {
      const testProps =
        Utils.getTextPropsFromRtf(`{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
          {\\fonttbl}
          {\\colortbl;\\red255\\green255\\blue255;}
          }`);

      expect(testProps).toEqual({ color: { r: 255, g: 255, b: 255 }, font: '', size: 0 });
    });
  });

  describe('getIsoDateString', () => {
    it('should return a date string without milliseconds', () => {
      expect(Utils.getIsoDateString()).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/);
    });
  });

  describe('mergeArraysByProp()', () => {
    it('should only combine arrays of objects together when all values of the same key are unique', () => {
      const obj1 = [{ foo: 'fooVal' }];
      const obj2 = [{ foo: 'barVal' }];
      expect(Utils.mergeArraysByProp(obj1, obj2, 'foo')).toEqual([
        { foo: 'fooVal' },
        { foo: 'barVal' },
      ]);
    });

    it('should merge identical arrays of objects together, overwriting values for the same key', () => {
      const obj1 = [{ foo: 'fooVal' }];
      const obj2 = [{ foo: 'fooVal' }];
      expect(Utils.mergeArraysByProp(obj1, obj2, 'foo')).toEqual([{ foo: 'fooVal' }]);
    });

    it('should merge different arrays of objects together, overwriting values for the same key', () => {
      const obj1 = [
        { foo: 'fooVal1', other: 'originalValue' },
        { foo: 'fooVal2', other: 'newValue1' },
        { foo: 'fooVal3', other: 'newValue2' },
      ];
      const obj2 = [{ foo: 'fooVal2', other: 'MyOverwrittenValue' }];

      expect(Utils.mergeArraysByProp(obj1, obj2, 'foo')).toEqual([
        { foo: 'fooVal1', other: 'originalValue' },
        { foo: 'fooVal3', other: 'newValue2' },
        { foo: 'fooVal2', other: 'MyOverwrittenValue' },
      ]);
    });
  });

  describe('normalizeLineEndings()', () => {
    it('should replace all line ending combinations with \\n', () => {
      //Single instances
      expect(Utils.normalizeLineEndings('\n\r')).toEqual('\n');
      expect(Utils.normalizeLineEndings('\r\n')).toEqual('\n');

      //Multiple instances
      expect(Utils.normalizeLineEndings('\n\r\n\r')).toEqual('\n\n');
      expect(Utils.normalizeLineEndings('\r\n\r\n')).toEqual('\n\n');

      //No changes expected here
      expect(Utils.normalizeLineEndings('\n')).toEqual('\n');
      expect(Utils.normalizeLineEndings('\n\n')).toEqual('\n\n');
    });
  });
});
