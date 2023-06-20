import * as Utils from './utils';

describe('Utils', () => {
  describe('RTF', () => {
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
        expect(Utils.formatRtf(`test\ninput\nstring with some words`)).toEqual(
          `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320',{\\fonttbl\\f0\\fswiss\\fcharset0 Arial;}{\\colortbl;\\red255\\green255\\blue255;}\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural\\f0\\fs120 \\cf1 test\\\rinput\\\rstring with some words}`
        );
      });

      it('should use the options provided', () => {
        expect(
          Utils.formatRtf(`test\ninput\nstring with some words`, 'Helvetica', 30, {
            r: 50,
            g: 100,
            b: 150,
          })
        ).toEqual(
          `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320',{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}{\\colortbl;\\red50\\green100\\blue150;}\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural\\f0\\fs60 \\cf1 test\\\rinput\\\rstring with some words}`
        );
      });
    });

    describe('getTextPropsFromRtf()', () => {
      it('should get the text properties when they are all present', () => {
        const testProps = Utils.getTextPropsFromRtf(`{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Impact;}
{\\colortbl;\\red200\\green201\\blue202;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural
\\f0\\fs120 \\cf1 every knee will bow\\
to bless Your name}`);

        expect(testProps).toEqual({ color: { r: 200, g: 201, b: 202 }, font: 'Impact', size: 60 });
      });

      it('should get a multi-word font name', () => {
        const testProps = Utils.getTextPropsFromRtf(`{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
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

      it('should get only the last font name when there are multiples', () => {
        const testProps = Utils.getTextPropsFromRtf(
          `{\\rtf1\\prortf1\\ansi\\ansicpg1252\\uc1\\htmautsp\\deff2{\\fonttbl{\\f0\\fcharset0 Times New Roman;}{\\f2\\fcharset0 Georgia;}{\\f3\\fcharset0 Arial;}{\\f4\\fcharset0 Impact;}}{\\colortbl;\\red0\\green0\\blue0;\\red255\\green255\\blue255;}\\loch\\hich\\dbch\\pard\\slleading0\\plain\\ltrpar\\itap0{\\lang1033\\fs120\\f3\\cf1 \\cf1\\qc{\\fs149\\f4 {\\cf2\\ltrch Twas grace that taught my heart to fear}\\li0\\sa0\\sb0\\fi0\\qc\\par}\r\n{\\fs149\\f4 {\\cf2\\ltrch And grace my fears relieved}\\li0\\sa0\\sb0\\fi0\\qc\\par}\r\n}\r\n}`
        );

        expect(testProps.font).toEqual('Impact');
      });

      it('should get only the last font colors when there are multiples', () => {
        const testProps = Utils.getTextPropsFromRtf(
          `{\\rtf1\\prortf1\\ansi\\ansicpg1252\\uc1\\htmautsp\\deff2{\\fonttbl{\\f0\\fcharset0 Times New Roman;}{\\f2\\fcharset0 Georgia;}{\\f3\\fcharset0 Arial;}{\\f4\\fcharset0 Impact;}}{\\colortbl;\\red0\\green0\\blue0;\\red255\\green254\\blue253;}\\loch\\hich\\dbch\\pard\\slleading0\\plain\\ltrpar\\itap0{\\lang1033\\fs120\\f3\\cf1 \\cf1\\qc{\\fs149\\f4 {\\cf2\\ltrch Twas grace that taught my heart to fear}\\li0\\sa0\\sb0\\fi0\\qc\\par}\r\n{\\fs149\\f4 {\\cf2\\ltrch And grace my fears relieved}\\li0\\sa0\\sb0\\fi0\\qc\\par}\r\n}\r\n}`
        );

        expect(testProps.color).toEqual({ r: 255, g: 254, b: 253 });
      });

      it('should return default properties when missing', () => {
        const testProps = Utils.getTextPropsFromRtf(`{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
          {\\fonttbl}
          }`);

        expect(testProps).toEqual({ color: { r: 0, g: 0, b: 0 }, font: '', size: 0 });
      });
    });
  });

  describe('getIsoDateString()', () => {
    it('should return a date string without milliseconds', () => {
      expect(Utils.getIsoDateString()).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/);
    });
  });

  describe('getUniqueID()', () => {
    it('should generate a unique ID that matches a specific pattern', () => {
      expect(Utils.getUniqueID()).toMatch(/[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}/);
    });
  });

  describe('Colors', () => {
    describe('hexToRgb()', () => {
      it('should parse hex codes to RGB with a starting #', () => {
        expect(Utils.hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
        expect(Utils.hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
        expect(Utils.hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
        expect(Utils.hexToRgb('#00FF00')).toEqual({ r: 0, g: 255, b: 0 });
        expect(Utils.hexToRgb('#0000FF')).toEqual({ r: 0, g: 0, b: 255 });
        expect(Utils.hexToRgb('#14c183')).toEqual({ r: 20, g: 193, b: 131 });
        expect(Utils.hexToRgb('#3f2938')).toEqual({ r: 63, g: 41, b: 56 });
      });
      it('should parse hex codes to RGB without a starting #', () => {
        expect(Utils.hexToRgb('000000')).toEqual({ r: 0, g: 0, b: 0 });
        expect(Utils.hexToRgb('FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
        expect(Utils.hexToRgb('FF0000')).toEqual({ r: 255, g: 0, b: 0 });
        expect(Utils.hexToRgb('00FF00')).toEqual({ r: 0, g: 255, b: 0 });
        expect(Utils.hexToRgb('0000FF')).toEqual({ r: 0, g: 0, b: 255 });
        expect(Utils.hexToRgb('14c183')).toEqual({ r: 20, g: 193, b: 131 });
        expect(Utils.hexToRgb('3f2938')).toEqual({ r: 63, g: 41, b: 56 });
      });
      it('should throw an error when something else is passed in', () => {
        try {
          Utils.hexToRgb('000');

          //cause the test to fail is no error is thrown
          expect(true).toBe(false);
        } catch (err: unknown) {
          expect(err).toEqual(Error(`Input color '000' could not be parsed! Are you sure this is a hex color?`));
        }
      });
    });

    describe('normalizeColorToRgbaString()', () => {
      it('should pass RGBA float strings straight through', () => {
        expect(Utils.normalizeColorToRgbaString('0 0 0 1')).toEqual('0 0 0 1');
        expect(Utils.normalizeColorToRgbaString('1 1 1 1')).toEqual('1 1 1 1');
        expect(Utils.normalizeColorToRgbaString('1 0 0 1')).toEqual('1 0 0 1');
        expect(Utils.normalizeColorToRgbaString('0 1 0 1')).toEqual('0 1 0 1');
        expect(Utils.normalizeColorToRgbaString('0 0 1 1')).toEqual('0 0 1 1');
        expect(Utils.normalizeColorToRgbaString('0.5 0 0.5 1')).toEqual('0.5 0 0.5 1');
        expect(Utils.normalizeColorToRgbaString('0.5 0.5 0.5 1')).toEqual('0.5 0.5 0.5 1');
        expect(Utils.normalizeColorToRgbaString('0.5019607843137255 0.5019607843137255 0.5019607843137255 1')).toEqual(
          '0.5019607843137255 0.5019607843137255 0.5019607843137255 1'
        );
      });
      it('should parse hex codes to RGBA float string', () => {
        expect(Utils.normalizeColorToRgbaString('#000000')).toEqual('0 0 0 1');
        expect(Utils.normalizeColorToRgbaString('#FFFFFF')).toEqual('1 1 1 1');
        expect(Utils.normalizeColorToRgbaString('#FF0000')).toEqual('1 0 0 1');
        expect(Utils.normalizeColorToRgbaString('#00FF00')).toEqual('0 1 0 1');
        expect(Utils.normalizeColorToRgbaString('#808080')).toEqual('0.5019607843137255 0.5019607843137255 0.5019607843137255 1');
        expect(Utils.normalizeColorToRgbaString('#14c183')).toEqual('0.0784313725490196 0.7568627450980392 0.5137254901960784 1');
        expect(Utils.normalizeColorToRgbaString('#3f2938')).toEqual(
          '0.24705882352941178 0.1607843137254902 0.2196078431372549 1'
        );
      });

      it('should parse RGB objects to RGBA float string', () => {
        expect(Utils.normalizeColorToRgbaString({ r: 0, g: 0, b: 0 })).toEqual('0 0 0 1');
        expect(Utils.normalizeColorToRgbaString({ r: 255, g: 255, b: 255 })).toEqual('1 1 1 1');
        expect(Utils.normalizeColorToRgbaString({ r: 255, g: 0, b: 0 })).toEqual('1 0 0 1');
        expect(Utils.normalizeColorToRgbaString({ r: 0, g: 255, b: 0 })).toEqual('0 1 0 1');
        expect(Utils.normalizeColorToRgbaString({ r: 0, g: 0, b: 255 })).toEqual('0 0 1 1');
        expect(Utils.normalizeColorToRgbaString({ r: 127.5, g: 0, b: 127.5 })).toEqual('0.5 0 0.5 1');
        expect(Utils.normalizeColorToRgbaString({ r: 128, g: 128, b: 128 })).toEqual(
          '0.5019607843137255 0.5019607843137255 0.5019607843137255 1'
        );
      });
      it('should throw an errors when something else is passed in', () => {
        try {
          Utils.normalizeColorToRgbaString('000');

          //cause the test to fail is no error is thrown
          expect(true).toBe(false);
        } catch (err: unknown) {
          expect(err).toEqual(Error(`Input color '000' could not be parsed to an RGBA color string!`));
        }

        try {
          Utils.normalizeColorToRgbaString('0 0 0');

          //cause the test to fail is no error is thrown
          expect(true).toBe(false);
        } catch (err: unknown) {
          expect(err).toEqual(Error(`Input color '0 0 0' could not be parsed to an RGBA color string!`));
        }

        try {
          Utils.normalizeColorToRgbaString('9999 9999 9999 1');

          //cause the test to fail is no error is thrown
          expect(true).toBe(false);
        } catch (err: unknown) {
          expect(err).toEqual(Error(`Input color '9999 9999 9999 1' could not be parsed to an RGBA color string!`));
        }
      });
    });

    describe('normalizeColorToRgbObj()', () => {
      it('should parse RGBA float strings to RGA objects', () => {
        expect(Utils.normalizeColorToRgbObj('0 0 0 1')).toEqual({ r: 0, g: 0, b: 0 });
        expect(Utils.normalizeColorToRgbObj('1 1 1 1')).toEqual({ r: 255, g: 255, b: 255 });
        expect(Utils.normalizeColorToRgbObj('1 0 0 1')).toEqual({ r: 255, g: 0, b: 0 });
        expect(Utils.normalizeColorToRgbObj('0 1 0 1')).toEqual({ r: 0, g: 255, b: 0 });
        expect(Utils.normalizeColorToRgbObj('0 0 1 1')).toEqual({ r: 0, g: 0, b: 255 });
        expect(Utils.normalizeColorToRgbObj('0.5 0 0.5 1')).toEqual({ r: 127.5, g: 0, b: 127.5 });
      });
      it('should parse hex codes to RGB objects', () => {
        expect(Utils.normalizeColorToRgbObj('#000000')).toEqual({ r: 0, g: 0, b: 0 });
        expect(Utils.normalizeColorToRgbObj('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
        expect(Utils.normalizeColorToRgbObj('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
        expect(Utils.normalizeColorToRgbObj('#00FF00')).toEqual({ r: 0, g: 255, b: 0 });
        expect(Utils.normalizeColorToRgbObj('#0000FF')).toEqual({ r: 0, g: 0, b: 255 });
        expect(Utils.normalizeColorToRgbObj('#14c183')).toEqual({ r: 20, g: 193, b: 131 });
        expect(Utils.normalizeColorToRgbObj('#3f2938')).toEqual({ r: 63, g: 41, b: 56 });
      });
      it('should pass RGB objects to straight through', () => {
        // prettier-ignore
        expect(Utils.normalizeColorToRgbObj({ r: 0, g: 0, b: 0 })).toEqual({ r: 0, g: 0, b: 0 });
        // prettier-ignore
        expect(Utils.normalizeColorToRgbObj({ r: 255, g: 255, b: 255 })).toEqual({ r: 255, g: 255, b: 255 });
        // prettier-ignore
        expect(Utils.normalizeColorToRgbObj({ r: 255, g: 0, b: 0 })).toEqual({ r: 255, g: 0, b: 0 });
        // prettier-ignore
        expect(Utils.normalizeColorToRgbObj({ r: 0, g: 255, b: 0 })).toEqual({ r: 0, g: 255, b: 0 });
        // prettier-ignore
        expect(Utils.normalizeColorToRgbObj({ r: 0, g: 0, b: 255 })).toEqual({ r: 0, g: 0, b: 255 });
      });
      it('should throw an errors when something else is passed in', () => {
        try {
          Utils.normalizeColorToRgbObj('000');

          //cause the test to fail is no error is thrown
          expect(true).toBe(false);
        } catch (err: unknown) {
          expect(err).toEqual(Error(`Input color '000' could not be parsed to an RGB color object!`));
        }

        try {
          Utils.normalizeColorToRgbObj('0 0 0');

          //cause the test to fail is no error is thrown
          expect(true).toBe(false);
        } catch (err: unknown) {
          expect(err).toEqual(Error(`Input color '0 0 0' could not be parsed to an RGB color object!`));
        }

        try {
          Utils.normalizeColorToRgbObj('9999 9999 9999 1');

          //cause the test to fail is no error is thrown
          expect(true).toBe(false);
        } catch (err: unknown) {
          expect(err).toEqual(Error(`Input color '9999 9999 9999 1' could not be parsed to an RGB color object!`));
        }
      });
    });

    describe('normalizeColorToHex()', () => {
      it('should parse RGBA float strings to HEX colors', () => {
        expect(Utils.normalizeColorToHex('0 0 0 1')).toEqual('000000');
        expect(Utils.normalizeColorToHex('1 1 1 1')).toEqual('FFFFFF');
        expect(Utils.normalizeColorToHex('1 0 0 1')).toEqual('FF0000');
        expect(Utils.normalizeColorToHex('0 1 0 1')).toEqual('00FF00');
        expect(Utils.normalizeColorToHex('0 0 1 1')).toEqual('0000FF');
        expect(Utils.normalizeColorToHex('0.5 0 0.5 1')).toEqual('800080');
        expect(Utils.normalizeColorToHex('0.5019607843137255 0.5019607843137255 0.5019607843137255 1')).toEqual('808080');
        expect(Utils.normalizeColorToHex('0.0784313725490196 0.7568627450980392 0.5137254901960784 1')).toEqual('14C183');
        expect(Utils.normalizeColorToHex('0.24705882352941178 0.1607843137254902 0.2196078431372549 1')).toEqual('3F2938');
      });
      it('should pass hex colors straight through', () => {
        expect(Utils.normalizeColorToHex('#000000')).toEqual('000000');
        expect(Utils.normalizeColorToHex('#FFFFFF')).toEqual('FFFFFF');
        expect(Utils.normalizeColorToHex('#FF0000')).toEqual('FF0000');
        expect(Utils.normalizeColorToHex('#00FF00')).toEqual('00FF00');
        expect(Utils.normalizeColorToHex('#0000FF')).toEqual('0000FF');
        expect(Utils.normalizeColorToHex('#14c183')).toEqual('14c183');
        expect(Utils.normalizeColorToHex('#3f2938')).toEqual('3f2938');
      });
      it('should parse RGB objects to hex colors', () => {
        expect(Utils.normalizeColorToHex({ r: 0, g: 0, b: 0 })).toEqual('000000');
        expect(Utils.normalizeColorToHex({ r: 255, g: 255, b: 255 })).toEqual('FFFFFF');
        expect(Utils.normalizeColorToHex({ r: 255, g: 0, b: 0 })).toEqual('FF0000');
        expect(Utils.normalizeColorToHex({ r: 0, g: 255, b: 0 })).toEqual('00FF00');
        expect(Utils.normalizeColorToHex({ r: 0, g: 0, b: 255 })).toEqual('0000FF');
      });
      it('should throw an errors when something else is passed in', () => {
        try {
          Utils.normalizeColorToHex('000');

          //cause the test to fail is no error is thrown
          expect(true).toBe(false);
        } catch (err: unknown) {
          expect(err).toEqual(Error(`Input color '000' could not be parsed to a HEX color!`));
        }

        try {
          Utils.normalizeColorToHex('0 0 0');

          //cause the test to fail is no error is thrown
          expect(true).toBe(false);
        } catch (err: unknown) {
          expect(err).toEqual(Error(`Input color '0 0 0' could not be parsed to a HEX color!`));
        }

        try {
          Utils.normalizeColorToHex('9999 9999 9999 1');

          //cause the test to fail is no error is thrown
          expect(true).toBe(false);
        } catch (err: unknown) {
          expect(err).toEqual(Error(`Input color '9999 9999 9999 1' could not be parsed to a HEX color!`));
        }
      });
    });
  });
});
