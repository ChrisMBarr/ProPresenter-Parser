import { readFileSync } from 'fs';

import { v7Parser } from './parser';
import { IPro7Arrangement, IPro7Properties, IPro7SlideGroup } from './parser.model';

describe('V7 - Parser', (): void => {
  let parser: v7Parser;

  beforeEach(() => {
    parser = new v7Parser();
  });

  it('should exist', () => {
    expect(parser).toBeDefined();
  });

  it('should throw an error for an invalid ProPresenter file', () => {
    try {
      const emptyData = new Uint8Array(0);
      parser.parse(emptyData);

      //Test should fail if no error is thrown
      expect(true).toBe(false);
    } catch (err: unknown) {
      expect(err).toBeInstanceOf(Error);
    }
  });

  it('should get the data from the empty file "v7 - Empty Single Slide.pro', () => {
    const testFile = readFileSync('./sample-files/v7 - Empty Single Slide.pro');
    const parsedSong = parser.parse(testFile);

    expect(parsedSong.properties).toEqual({
      CCLIArtistCredits: '',
      CCLIAuthor: '',
      CCLICopyrightYear: 0,
      CCLIDisplay: false,
      CCLIPublisher: '',
      CCLISongNumber: 0,
      CCLISongTitle: '',
      backgroundColor: { r: 0, g: 0, b: 0 },
      buildNumber: 335544583,
      category: '',
      chordChartPath: '',
      drawingBackgroundColor: false,
      lastDateUsed: undefined,
      notes: '',
      os: 1,
      selectedArrangementID: '',
    } as IPro7Properties);

    expect(parsedSong.arrangements).toEqual([] as IPro7Arrangement[]);

    expect(parsedSong.slideGroups).toEqual([
      {
        groupLabel: '',
        groupId: '3E120CBF-5021-4F05-9232-A928B5C1B856',
        groupColor: { r: 0, g: 0, b: 0 },
        slides: [
          {
            backgroundColor: {
              b: 0,
              g: 0,
              r: 0,
            },
            chordChartPath: '',
            drawingBackgroundColor: false,
            enabled: true,
            hotKey: '',
            id: '9FE98FD2-3987-4694-BF07-C982E4DC025E',
            label: '',
            notes: '',
            textElements: [
              {
                adjustsHeightToFit: false,
                displayDelay: 0,
                displayName: '',
                drawingFill: false,
                fillColor: {
                  b: 242,
                  g: 150,
                  r: 33,
                },
                fontName: 'HelveticaNeue',
                fromTemplate: false,
                id: '800AA521-B943-4E48-974E-138E9C7E93C8',
                locked: false,
                opacity: 1,
                outline: {
                  color: {
                    b: 255,
                    g: 255,
                    r: 255,
                  },
                  enabled: false,
                  size: 3,
                },
                plainText: '',
                position: {
                  height: 880,
                  width: 1620,
                  x: 150,
                  y: 100,
                  z: 0,
                },
                revealType: 0,
                rotation: 0,
                rtfData: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf2865\n\\cocoatextscaling0\\cocoaplatform0{\\fonttbl}\n{\\colortbl;\\red255\\green255\\blue255;}\n{\\*\\expandedcolortbl;;}\n}`,
                textColor: {
                  b: 255,
                  g: 255,
                  r: 255,
                },
                textShadow: {
                  angle: 315,
                  color: {
                    b: 0,
                    g: 0,
                    r: 0,
                  },
                  enabled: false,
                  length: 5,
                  radius: 5,
                },
                textSize: 42,
                verticalAlignment: 1,
              },
            ],
          },
        ],
      },
    ] as IPro7SlideGroup[]);
  });

  it('should get the data from "v7 - At the Cross.pro', () => {
    const testFile = readFileSync('./sample-files/v7 - At the Cross.pro');
    const parsedSong = parser.parse(testFile);

    expect(parsedSong.properties).toEqual({
      CCLIArtistCredits: 'Hymn',
      CCLIAuthor: '',
      CCLICopyrightYear: 0,
      CCLIDisplay: false,
      CCLIPublisher: '',
      CCLISongNumber: 0,
      CCLISongTitle: 'At the Cross',
      backgroundColor: { r: 0, g: 0, b: 0 },
      buildNumber: 335544583,
      category: '',
      chordChartPath: '',
      drawingBackgroundColor: false,
      notes: '',
      os: 1,
      selectedArrangementID: '',
    } as IPro7Properties);

    expect(parsedSong.arrangements).toEqual([] as IPro7Arrangement[]);

    expect(parsedSong.slideGroups).toEqual([
      {
        groupLabel: 'Blank',
        groupId: '30CB2E4D-5A6D-2A78-F661-ADA6D9EF889B',
        groupColor: { r: 255, g: 0, b: 0 },
        slides: [
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            drawingBackgroundColor: false,
            enabled: true,
            hotKey: '',
            id: 'C65BD9FF-1069-7098-C489-C11D6D1A98C6',
            label: '',
            notes: '',
            textElements: [
              {
                adjustsHeightToFit: false,
                displayDelay: 0,
                displayName: 'Default',
                drawingFill: false,
                fillColor: { r: 255, g: 255, b: 255 },
                fromTemplate: false,
                id: 'A250A309-4AD6-46A0-8071-0083FBA286FC',
                locked: false,
                opacity: 1,
                revealType: 0,
                rotation: 360,
                verticalAlignment: 1,
                fontName: 'Helvetica',
                textColor: { r: 0, g: 0, b: 0 },
                textSize: 12,
                plainText: "',",
                rtfData:
                  "{\\rtf1\\ansi\\ansicpg1252\\cocoartf2865\n\\cocoatextscaling0\\cocoaplatform0{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}\n{\\colortbl;\\red255\\green255\\blue255;}\n{\\*\\expandedcolortbl;;}\n\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\partightenfactor0\n\n\\f0\\fs24 \\cf0 ',}",
                outline: { enabled: false, color: { r: 0, g: 0, b: 0 }, size: 1 },
                position: { x: 20, y: 20, z: 0, width: 1880, height: 1040 },
                textShadow: { enabled: false, color: { r: 0, g: 0, b: 0 }, angle: 0, length: 0, radius: 0 },
              },
            ],
          },
        ],
      },
      {
        groupLabel: 'Song',
        groupId: '5123FEB1-FEF1-F110-05F7-27D83956B49C',
        groupColor: { r: 0, g: 0, b: 255 },
        slides: [
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            drawingBackgroundColor: false,
            enabled: true,
            hotKey: '',
            id: '95898949-1924-EBA2-3331-ADA226036EF5',
            label: 'Verse',
            notes: '',
            textElements: [
              {
                adjustsHeightToFit: false,
                displayDelay: 0,
                displayName: 'Default',
                drawingFill: false,
                fillColor: { r: 255, g: 255, b: 255 },
                fromTemplate: false,
                id: 'BDEF3F27-ECF4-4335-8C31-CEAFFBA960F1',
                locked: false,
                opacity: 1,
                revealType: 0,
                rotation: 360,
                verticalAlignment: 1,
                fontName: 'HelveticaNeue',
                textColor: { r: 0, g: 0, b: 0 },
                textSize: 42,
                plainText:
                  "',\nI know a place\nA wonderful place\nWhere accused and condemned\nFind mercy and grace\nWhere the wrongs we have done\nAnd the wrongs done to us\nWere nailed there with him \nThere on the cross",
                rtfData:
                  "{\\rtf1\\ansi\\ansicpg1252\\cocoartf2865\n\\cocoatextscaling0\\cocoaplatform0{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;\\f1\\fswiss\\fcharset0 ArialMT;}\n{\\colortbl;\\red255\\green255\\blue255;}\n{\\*\\expandedcolortbl;;}\n\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc\\partightenfactor0\n\n\\f0\\fs24 \\cf0 ',\n\\f1\\fs120 \\cf1 I know a place\\\nA wonderful place\\\nWhere accused and condemned\\\nFind mercy and grace\\\nWhere the wrongs we have done\\\nAnd the wrongs done to us\\\nWere nailed there with him \\\nThere on the cross}",
                outline: { enabled: false, color: { r: 0, g: 0, b: 0 }, size: 1 },
                position: { x: 20, y: 20, z: 0, width: 1880, height: 1040 },
                textShadow: { enabled: false, color: { r: 0, g: 0, b: 0 }, angle: 0, length: 0, radius: 0 },
              },
            ],
          },
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            drawingBackgroundColor: false,
            enabled: true,
            hotKey: '',
            id: '42992599-BD02-E964-45B1-492EDE07C9BB',
            label: 'Chorus',
            notes: '',
            textElements: [
              {
                adjustsHeightToFit: false,
                displayDelay: 0,
                displayName: 'Default',
                drawingFill: false,
                fillColor: { r: 255, g: 255, b: 255 },
                fromTemplate: false,
                id: 'CF2BDF0E-A222-4DE4-A508-39050305686C',
                locked: false,
                opacity: 1,
                revealType: 0,
                rotation: 360,
                verticalAlignment: 1,
                fontName: 'HelveticaNeue',
                textColor: { r: 0, g: 0, b: 0 },
                textSize: 42,
                plainText: "',\nAt the cross \nHe died for our sins\nAt the cross \nHe gave us life again",
                rtfData:
                  "{\\rtf1\\ansi\\ansicpg1252\\cocoartf2865\n\\cocoatextscaling0\\cocoaplatform0{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;\\f1\\fswiss\\fcharset0 ArialMT;}\n{\\colortbl;\\red255\\green255\\blue255;}\n{\\*\\expandedcolortbl;;}\n\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc\\partightenfactor0\n\n\\f0\\fs24 \\cf0 ',\n\\f1\\fs120 \\cf1 At the cross \\\nHe died for our sins\\\nAt the cross \\\nHe gave us life again}",
                outline: { enabled: false, color: { r: 0, g: 0, b: 0 }, size: 1 },
                position: { x: 20, y: 20, z: 0, width: 1880, height: 1040 },
                textShadow: { enabled: false, color: { r: 0, g: 0, b: 0 }, angle: 0, length: 0, radius: 0 },
              },
            ],
          },
        ],
      },
    ] as IPro7SlideGroup[]);
  });

  it('should get the data from "v7 - Come Thou Fount.pro', () => {
    const testFile = readFileSync('./sample-files/v7 - Come Thou Fount.pro');
    const parsedSong = parser.parse(testFile);

    expect(parsedSong.properties).toEqual({
      CCLIArtistCredits: '',
      CCLIAuthor: 'Robert Robinson | John Wyeth',
      CCLICopyrightYear: 0,
      CCLIDisplay: false,
      CCLIPublisher: '',
      CCLISongNumber: 108389,
      CCLISongTitle: 'Come Thou Fount',
      backgroundColor: { r: 0, g: 0, b: 0 },
      buildNumber: 335544583,
      category: '',
      chordChartPath: '',
      drawingBackgroundColor: false,
      notes: '',
      os: 1,
      selectedArrangementID: '',
    } as IPro7Properties);

    expect(parsedSong.arrangements).toEqual([] as IPro7Arrangement[]);

    expect(parsedSong.slideGroups).toEqual([
      {
        groupLabel: 'Blank',
        groupId: '1E2DCFBE-E19D-1A64-50DC-EB927D7DF8C7',
        groupColor: { r: 255, g: 0, b: 0 },
        slides: [
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            drawingBackgroundColor: false,
            enabled: true,
            hotKey: '',
            id: '8A5AB259-9B82-8AC4-CBAB-CEE4BC24F5E8',
            label: '',
            notes: '',
            textElements: [
              {
                adjustsHeightToFit: false,
                displayDelay: 0,
                displayName: 'Default',
                drawingFill: false,
                fillColor: { r: 255, g: 255, b: 255 },
                fromTemplate: false,
                id: '6E2DF3B0-4220-0505-ED0C-E3D11424DEFE',
                locked: false,
                opacity: 1,
                revealType: 0,
                rotation: 360,
                verticalAlignment: 1,
                fontName: 'Helvetica',
                textColor: { r: 0, g: 0, b: 0 },
                textSize: 12,
                plainText: "',",
                rtfData:
                  "{\\rtf1\\ansi\\ansicpg1252\\cocoartf2865\n\\cocoatextscaling0\\cocoaplatform0{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}\n{\\colortbl;\\red255\\green255\\blue255;}\n{\\*\\expandedcolortbl;;}\n\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\partightenfactor0\n\n\\f0\\fs24 \\cf0 ',}",
                outline: { enabled: false, color: { r: 0, g: 0, b: 0 }, size: 0 },
                position: { x: 20, y: 20, z: 0, width: 1880, height: 1040 },
                textShadow: { enabled: false, color: { r: 0, g: 0, b: 0 }, angle: 0, length: 0, radius: 0 },
              },
            ],
          },
        ],
      },
      {
        groupLabel: 'Song',
        groupId: '0AF551B1-6DA5-9878-1756-FB28C6680389',
        groupColor: { r: 0, g: 0, b: 255 },
        slides: [
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            drawingBackgroundColor: false,
            enabled: true,
            hotKey: '',
            id: '9D7461C5-3D81-A498-5167-E11735E99C49',
            label: 'v1',
            notes: '',
            textElements: [
              {
                adjustsHeightToFit: false,
                displayDelay: 0,
                displayName: 'Default',
                drawingFill: false,
                fillColor: { r: 255, g: 255, b: 255 },
                fromTemplate: false,
                id: 'A3082249-0F63-4111-8796-90390F4FF80B',
                locked: false,
                opacity: 1,
                revealType: 0,
                rotation: 360,
                verticalAlignment: 1,
                fontName: 'HelveticaNeue',
                textColor: { r: 0, g: 0, b: 0 },
                textSize: 42,
                plainText:
                  "',\nCome, Thou Fount of every blessing,Tune my heart to sing Thy grace;\nStreams of mercy, never ceasing, Call for songs of loudest praise.\nTeach me some melodious sonnet, Sung by flaming tongues above;\nPraise the mount, I'm fixed upon it, Mount of Thy redeeming love.",
                rtfData:
                  "{\\rtf1\\ansi\\ansicpg1252\\cocoartf2865\n\\cocoatextscaling0\\cocoaplatform0{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;\\f1\\fswiss\\fcharset0 ArialMT;}\n{\\colortbl;\\red255\\green255\\blue255;}\n{\\*\\expandedcolortbl;;}\n\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc\\partightenfactor0\n\n\\f0\\fs24 \\cf0 ',\n\\f1\\fs120 \\cf1 Come, Thou Fount of every blessing,Tune my heart to sing Thy grace;\\\nStreams of mercy, never ceasing, Call for songs of loudest praise.\\\nTeach me some melodious sonnet, Sung by flaming tongues above;\\\nPraise the mount, I'm fixed upon it, Mount of Thy redeeming love.}",
                outline: { enabled: false, color: { r: 0, g: 0, b: 0 }, size: 0 },
                position: { x: 20, y: 20, z: 0, width: 1880, height: 1040 },
                textShadow: { enabled: false, color: { r: 0, g: 0, b: 0 }, angle: 0, length: 0, radius: 0 },
              },
            ],
          },
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            drawingBackgroundColor: false,
            enabled: true,
            hotKey: '',
            id: '6D37AA84-4DF0-7181-B24E-AB564B24E323',
            label: 'v2',
            notes: '',
            textElements: [
              {
                adjustsHeightToFit: false,
                displayDelay: 0,
                displayName: 'Default',
                drawingFill: false,
                fillColor: { r: 255, g: 255, b: 255 },
                fromTemplate: false,
                id: '1DC668A7-8A07-836F-FC6C-DCAA8A5FD8B3',
                locked: false,
                opacity: 1,
                revealType: 0,
                rotation: 360,
                verticalAlignment: 1,
                fontName: 'HelveticaNeue',
                textColor: { r: 0, g: 0, b: 0 },
                textSize: 42,
                plainText:
                  "',\nHere I raise mine Ebenezer, Hither by Thy great help I come;\nAnd I hope by Thy good pleasure, Safely to arrive at home.\nJesus sought me when a stranger, Wandering from the fold of God;\nHe to rescue me from danger, Interposed His precious blood.",
                rtfData:
                  "{\\rtf1\\ansi\\ansicpg1252\\cocoartf2865\n\\cocoatextscaling0\\cocoaplatform0{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;\\f1\\fswiss\\fcharset0 ArialMT;}\n{\\colortbl;\\red255\\green255\\blue255;}\n{\\*\\expandedcolortbl;;}\n\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc\\partightenfactor0\n\n\\f0\\fs24 \\cf0 ',\n\\f1\\fs120 \\cf1 Here I raise mine Ebenezer, Hither by Thy great help I come;\\\nAnd I hope by Thy good pleasure, Safely to arrive at home.\\\nJesus sought me when a stranger, Wandering from the fold of God;\\\nHe to rescue me from danger, Interposed His precious blood.}",
                outline: { enabled: false, color: { r: 0, g: 0, b: 0 }, size: 0 },
                position: { x: 20, y: 20, z: 0, width: 1880, height: 1040 },
                textShadow: { enabled: false, color: { r: 0, g: 0, b: 0 }, angle: 0, length: 0, radius: 0 },
              },
            ],
          },
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            drawingBackgroundColor: false,
            enabled: true,
            hotKey: '',
            id: 'C5F28290-0395-50FD-02EC-74339C4445A8',
            label: 'v3',
            notes: '',
            textElements: [
              {
                adjustsHeightToFit: false,
                displayDelay: 0,
                displayName: 'Default',
                drawingFill: false,
                fillColor: { r: 255, g: 255, b: 255 },
                fromTemplate: false,
                id: 'C1EA00AE-5EA9-DC82-BA11-2C184296D15F',
                locked: false,
                opacity: 1,
                revealType: 0,
                rotation: 360,
                verticalAlignment: 1,
                fontName: 'HelveticaNeue',
                textColor: { r: 0, g: 0, b: 0 },
                textSize: 42,
                plainText:
                  "',\nOh to grace how great a debtor, Daily I'm constrained to be;\nLet Thy goodness, like a fetter, Bind my wandering heart to Thee.\nProne to wander, Lord I feel it, Prone to leave the God I love;\nHere's my heart, Oh take and seal it, Seal it for Thy courts above.",
                rtfData:
                  "{\\rtf1\\ansi\\ansicpg1252\\cocoartf2865\n\\cocoatextscaling0\\cocoaplatform0{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;\\f1\\fswiss\\fcharset0 ArialMT;}\n{\\colortbl;\\red255\\green255\\blue255;}\n{\\*\\expandedcolortbl;;}\n\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc\\partightenfactor0\n\n\\f0\\fs24 \\cf0 ',\n\\f1\\fs120 \\cf1 Oh to grace how great a debtor, Daily I'm constrained to be;\\\nLet Thy goodness, like a fetter, Bind my wandering heart to Thee.\\\nProne to wander, Lord I feel it, Prone to leave the God I love;\\\nHere's my heart, Oh take and seal it, Seal it for Thy courts above.}",
                outline: { enabled: false, color: { r: 0, g: 0, b: 0 }, size: 0 },
                position: { x: 20, y: 20, z: 0, width: 1880, height: 1040 },
                textShadow: { enabled: false, color: { r: 0, g: 0, b: 0 }, angle: 0, length: 0, radius: 0 },
              },
            ],
          },
        ],
      },
    ] as IPro7SlideGroup[]);
  });
});
