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

  it('should get the data from "v7 - Feature Test.pro', () => {
    const testFile = readFileSync('./sample-files/v7 - Feature Test.pro');
    const parsedSong = parser.parse(testFile);

    expect(parsedSong.properties).toEqual({
      CCLIArtistCredits: '',
      CCLIAuthor: '',
      CCLICopyrightYear: 0,
      CCLIDisplay: false,
      CCLIPublisher: '',
      CCLISongNumber: 0,
      CCLISongTitle: '',
      backgroundColor: { r: 44, g: 164, b: 156 },
      buildNumber: 118292999,
      category: '',
      chordChartPath: '',
      drawingBackgroundColor: true,
      lastDateUsed: new Date('2023-06-19T23:11:43.000Z'),
      notes: '',
      os: 2,
      selectedArrangementID: 'ce9e9fd7-a553-4cfc-968d-886679fd3794',
    } as IPro7Properties);

    expect(parsedSong.arrangements).toEqual([] as IPro7Arrangement[]);

    expect(parsedSong.slideGroups).toEqual([
      {
        groupLabel: '',
        groupId: 'acfd5281-a303-4e73-8b54-63beab7d85c9',
        groupColor: { r: 255, g: 255, b: 255 },
        slides: [
          {
            backgroundColor: { r: 65, g: 74, b: 130 },
            chordChartPath: '',
            drawingBackgroundColor: true,
            enabled: true,
            hotKey: '',
            id: 'f92126f4-1aec-435f-bb14-e3864254643e',
            label: 'Spoken Word',
            notes: '\\*\\*',
            textElements: [
              {
                adjustsHeightToFit: false,
                displayDelay: 0,
                displayName: '2nd box',
                drawingFill: true,
                fillColor: { r: 180, g: 22, b: 22 },
                fromTemplate: false,
                id: '508bc84b-6107-4a04-a74a-8b88d959d65a',
                locked: false,
                opacity: 1,
                revealType: 1,
                rotation: 14,
                verticalAlignment: 1,
                fontName: 'Helvetica',
                textColor: { r: 255, g: 255, b: 255 },
                textSize: 70,
                plainText: '\\*\\*two',
                rtfData:
                  '{\\rtf0\\ansi\\ansicpg1252{\\fonttbl\\f0\\fnil Helvetica;}{\\colortbl;\\red255\\green255\\blue255;\\red151\\green238\\blue21;\\red255\\green255\\blue255;\\red0\\green0\\blue0;}{\\*\\expandedcolortbl;\\csgenericrgb\\c100000\\c100000\\c100000\\c100000;\\csgenericrgb\\c59215\\c93333\\c8235\\c100000;\\csgenericrgb\\c100000\\c100000\\c100000\\c0;\\csgenericrgb\\c0\\c0\\c0\\c100000;}{\\*\\listtable}{\\*\\listoverridetable}\\uc1\\paperw12240\\margl0\\margr0\\margt0\\margb0\\pard\\li0\\fi0\\ri0\\qc\\sb0\\sa0\\sl20\\slmult0\\slleading0\\f0\\b0\\i0\\ul0\\strike0\\fs140\\expnd0\\expndtw0\\cf1\\strokewidth100\\strokec2\\nosupersub\\ulc0\\highlight3\\cb3 two\\par\\pard\\li0\\fi0\\ri0\\qc\\sb0\\sa0\\sl20\\slmult0\\slleading0\\f0\\b0\\i0\\ul0\\strike0\\fs140\\expnd0\\expndtw0\\cf4\\strokewidth100\\strokec2\\nosupersub\\ulc0\\highlight3\\cb3}',
                outline: { enabled: true, color: { r: 16, g: 234, b: 70 }, size: 12 },
                position: { x: 117, y: 520.0668, z: 0, width: 900, height: 399 },
                textShadow: { enabled: false, color: { r: 0, g: 0, b: 0 }, angle: 315, length: 5, radius: 5 },
              },
              {
                adjustsHeightToFit: false,
                displayDelay: 0,
                displayName: 'first box',
                drawingFill: true,
                fillColor: { r: 180, g: 22, b: 22 },
                fromTemplate: false,
                id: '4cd99311-f8b8-4353-809c-839fcdec73c6',
                locked: true,
                opacity: 1,
                revealType: 1,
                rotation: 354,
                verticalAlignment: 1,
                fontName: 'Helvetica',
                textColor: { r: 255, g: 255, b: 255 },
                textSize: 100,
                plainText: '\\*\\*one',
                rtfData:
                  '{\\rtf0\\ansi\\ansicpg1252{\\fonttbl\\f0\\fnil Helvetica;}{\\colortbl;\\red255\\green255\\blue255;\\red0\\green0\\blue0;\\red255\\green255\\blue255;\\red0\\green0\\blue0;\\red0\\green0\\blue0;}{\\*\\expandedcolortbl;\\csgenericrgb\\c100000\\c100000\\c100000\\c100000;\\csgenericrgb\\c0\\c0\\c0\\c100000;\\csgenericrgb\\c100000\\c100000\\c100000\\c0;\\csgenericrgb\\c0\\c0\\c0\\c100000;\\csgenericrgb\\c0\\c0\\c0\\c100000;}{\\*\\listtable}{\\*\\listoverridetable}\\uc1\\paperw12240\\margl0\\margr0\\margt0\\margb0\\pard\\li0\\fi0\\ri0\\qc\\sb0\\sa0\\sl20\\slmult0\\slleading0\\f0\\b0\\i0\\ul0\\strike0\\fs200\\expnd0\\expndtw0\\cf1\\strokewidth200\\strokec2\\nosupersub\\ulc0\\highlight3\\cb3 one\\par\\pard\\li0\\fi0\\ri0\\qc\\sb0\\sa0\\sl20\\slmult0\\slleading0\\f0\\b0\\i0\\ul0\\strike0\\fs200\\expnd0\\expndtw0\\cf4\\strokewidth200\\strokec5\\nosupersub\\ulc0\\highlight3\\cb3}',
                outline: { enabled: true, color: { r: 16, g: 236, b: 70 }, size: 12 },
                position: { x: 948, y: 126.0668, z: 0, width: 900, height: 399 },
                textShadow: { enabled: false, color: { r: 0, g: 0, b: 0 }, angle: 315, length: 5, radius: 5 },
              },
            ],
          },
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            drawingBackgroundColor: false,
            enabled: true,
            hotKey: '',
            id: '89ed8dad-307b-4ece-83b5-410a54a67e36',
            label: '',
            notes: '\\*\\*',
            textElements: [
              {
                adjustsHeightToFit: false,
                displayDelay: 0,
                displayName: 'Bible Text',
                drawingFill: false,
                fillColor: { r: 0, g: 0, b: 0 },
                fromTemplate: false,
                id: '1b17a4b9-7845-42d1-9263-4dc4f84a0df5',
                locked: false,
                opacity: 1,
                revealType: 0,
                rotation: 0,
                verticalAlignment: 1,
                fontName: 'Georgia',
                textColor: { r: 255, g: 255, b: 255 },
                textSize: 46,
                plainText: '\\*\\*Lower 3rd text',
                rtfData:
                  '{\\rtf0\\ansi\\ansicpg1252{\\fonttbl\\f0\\fnil Georgia;}{\\colortbl;\\red255\\green255\\blue255;\\red255\\green255\\blue255;}{\\*\\expandedcolortbl;\\csgenericrgb\\c100000\\c100000\\c100000\\c100000;\\csgenericrgb\\c100000\\c100000\\c100000\\c0;}{\\*\\listtable}{\\*\\listoverridetable}\\uc1\\paperw12240\\margl0\\margr0\\margt0\\margb0\\pard\\li0\\fi0\\ri0\\ql\\sb0\\sa0\\sl20\\slmult0\\slleading0\\f0\\b0\\i\\ul0\\strike0\\fs92\\expnd0\\expndtw0\\cf1\\strokewidth0\\strokec1\\nosupersub\\ulc0\\highlight2\\cb2 Lower 3rd text}',
                outline: { enabled: false, color: { r: 0, g: 0, b: 0 }, size: 0 },
                position: { x: 105, y: 757.9332, z: 0, width: 1685, height: 167 },
                textShadow: { enabled: false, color: { r: 0, g: 0, b: 0 }, angle: 315, length: 5, radius: 5 },
              },
              {
                adjustsHeightToFit: false,
                displayDelay: 0,
                displayName: 'Bible Reference',
                drawingFill: false,
                fillColor: { r: 0, g: 0, b: 0 },
                fromTemplate: false,
                id: 'ab1588e9-adb5-47a6-b53a-4e21a2641acb',
                locked: false,
                opacity: 1,
                revealType: 0,
                rotation: 0,
                verticalAlignment: 1,
                fontName: 'Georgia',
                textColor: { r: 255, g: 255, b: 255 },
                textSize: 34,
                plainText: '\\*\\*Other text in lower 3rd',
                rtfData:
                  '{\\rtf0\\ansi\\ansicpg1252{\\fonttbl\\f0\\fnil Georgia;}{\\colortbl;\\red255\\green255\\blue255;\\red255\\green255\\blue255;\\red0\\green0\\blue0;}{\\*\\expandedcolortbl;\\csgenericrgb\\c100000\\c100000\\c100000\\c100000;\\csgenericrgb\\c100000\\c100000\\c100000\\c0;\\csgenericrgb\\c0\\c0\\c0\\c100000;}{\\*\\listtable}{\\*\\listoverridetable}\\uc1\\paperw12240\\margl0\\margr0\\margt0\\margb0\\pard\\li0\\fi0\\ri0\\qr\\sb0\\sa0\\sl20\\slmult0\\slleading0\\f0\\b0\\i0\\ul0\\strike0\\fs68\\expnd0\\expndtw0\\cf1\\strokewidth0\\strokec1\\nosupersub\\ulc0\\highlight2\\cb2 Other text in lower 3rd\\par\\pard\\li0\\fi0\\ri0\\qr\\sb0\\sa0\\sl20\\slmult0\\slleading0\\f0\\b0\\i0\\ul0\\strike0\\fs68\\expnd0\\expndtw0\\cf3\\strokewidth0\\strokec1\\nosupersub\\ulc0\\highlight2\\cb2}',
                outline: { enabled: false, color: { r: 0, g: 0, b: 0 }, size: 0 },
                position: { x: 928, y: 936, z: 0, width: 825, height: 55 },
                textShadow: { enabled: false, color: { r: 0, g: 0, b: 0 }, angle: 315, length: 5, radius: 5 },
              },
              {
                adjustsHeightToFit: false,
                displayDelay: 0,
                displayName: 'Divider Line',
                drawingFill: true,
                fillColor: { r: 0, g: 0, b: 0 },
                fromTemplate: true,
                id: 'de01d28d-f769-4a41-b3d0-01c15968a803',
                locked: false,
                opacity: 1,
                revealType: 0,
                rotation: 0,
                verticalAlignment: 1,
                fontName: 'ArialMT',
                textColor: { r: 0, g: 0, b: 0 },
                textSize: 50,
                plainText: '\\*\\*',
                rtfData:
                  '{\\rtf0\\ansi\\ansicpg1252{\\fonttbl\\f0\\fnil ArialMT;}{\\colortbl;\\red0\\green0\\blue0;\\red255\\green255\\blue255;\\red255\\green255\\blue255;}{\\*\\expandedcolortbl;\\csgenericrgb\\c0\\c0\\c0\\c100000;\\csgenericrgb\\c100000\\c100000\\c100000\\c100000;\\csgenericrgb\\c100000\\c100000\\c100000\\c0;}{\\*\\listtable}{\\*\\listoverridetable}\\uc1\\paperw8840\\margl0\\margr0\\margt0\\margb0\\pard\\li0\\fi0\\ri0\\qc\\sb0\\sa0\\sl240\\slmult1\\slleading0\\f0\\b0\\i0\\ul0\\strike0\\fs100\\expnd0\\expndtw0\\cf1\\strokewidth0\\strokec2\\nosupersub\\ulc0\\highlight3\\cb3}',
                outline: { enabled: false, color: { r: 0, g: 0, b: 0 }, size: 0 },
                position: { x: 1359, y: 923, z: 0, width: 442, height: 5 },
                textShadow: {
                  enabled: false,
                  color: { r: 0, g: 0, b: 0 },
                  angle: 315.00000247078003,
                  length: 5.656854249492381,
                  radius: 0,
                },
              },
              {
                adjustsHeightToFit: false,
                displayDelay: 0,
                displayName: 'Background Image',
                drawingFill: true,
                fillColor: { r: 0, g: 0, b: 0 },
                fromTemplate: true,
                id: '7daa7633-e9bc-4f41-bda2-351875617936',
                locked: true,
                opacity: 1,
                revealType: 0,
                rotation: 0,
                verticalAlignment: 1,
                fontName: 'ArialMT',
                textColor: { r: 0, g: 0, b: 0 },
                textSize: 50,
                plainText: '\\*\\*',
                rtfData:
                  '{\\rtf0\\ansi\\ansicpg1252{\\fonttbl\\f0\\fnil ArialMT;}{\\colortbl;\\red0\\green0\\blue0;\\red255\\green255\\blue255;\\red255\\green255\\blue255;}{\\*\\expandedcolortbl;\\csgenericrgb\\c0\\c0\\c0\\c100000;\\csgenericrgb\\c100000\\c100000\\c100000\\c100000;\\csgenericrgb\\c100000\\c100000\\c100000\\c0;}{\\*\\listtable}{\\*\\listoverridetable}\\uc1\\paperw38400\\margl0\\margr0\\margt0\\margb0\\pard\\li0\\fi0\\ri0\\qc\\sb0\\sa0\\sl240\\slmult1\\slleading0\\f0\\b0\\i0\\ul0\\strike0\\fs100\\expnd0\\expndtw0\\cf1\\strokewidth0\\strokec2\\nosupersub\\ulc0\\highlight3\\cb3}',
                outline: { enabled: false, color: { r: 0, g: 0, b: 0 }, size: 0 },
                position: { x: 0, y: 741, z: 0, width: 1920, height: 262 },
                textShadow: {
                  enabled: false,
                  color: { r: 0, g: 0, b: 0 },
                  angle: 315.00000247078003,
                  length: 5.656854249492381,
                  radius: 0,
                },
              },
            ],
          },
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            drawingBackgroundColor: false,
            enabled: true,
            hotKey: '',
            id: '6077f608-7c14-4422-93af-5ed2ca992d5c',
            label: '',
            notes: '\\*\\*',
            textElements: [
              {
                adjustsHeightToFit: false,
                displayDelay: 0,
                displayName: 'Default',
                drawingFill: false,
                fillColor: { r: 255, g: 255, b: 255 },
                fromTemplate: false,
                id: 'df8b69e6-cdf3-4218-8bc3-050798ceadf3',
                locked: false,
                opacity: 1,
                revealType: 0,
                rotation: 0,
                verticalAlignment: 1,
                fontName: 'Helvetica',
                textColor: { r: 255, g: 255, b: 255 },
                textSize: 71,
                plainText: '\\*\\*',
                rtfData:
                  '{\\rtf0\\ansi\\ansicpg1252{\\fonttbl\\f0\\fnil Helvetica;}{\\colortbl;\\red255\\green255\\blue255;\\red0\\green0\\blue0;\\red255\\green255\\blue255;\\red0\\green0\\blue0;\\red0\\green0\\blue0;}{\\*\\expandedcolortbl;\\csgenericrgb\\c100000\\c100000\\c100000\\c100000;\\csgenericrgb\\c0\\c0\\c0\\c100000;\\csgenericrgb\\c100000\\c100000\\c100000\\c0;\\csgenericrgb\\c0\\c0\\c0\\c100000;\\csgenericrgb\\c0\\c0\\c0\\c100000;}{\\*\\listtable}{\\*\\listoverridetable}\\uc1\\paperw12240\\margl0\\margr0\\margt0\\margb0\\pard\\li0\\fi0\\ri0\\qc\\sb0\\sa0\\sl20\\slmult0\\slleading0\\f0\\b0\\i0\\ul0\\strike0\\fs142\\expnd0\\expndtw0\\cf1\\strokewidth20\\strokec2\\nosupersub\\ulc0\\highlight3\\cb3\\par\\pard\\li0\\fi0\\ri0\\qc\\sb0\\sa0\\sl20\\slmult0\\slleading0\\f0\\b0\\i0\\ul0\\strike0\\fs142\\expnd0\\expndtw0\\cf4\\strokewidth20\\strokec5\\nosupersub\\ulc0\\highlight3\\cb3}',
                outline: { enabled: false, color: { r: 255, g: 255, b: 255 }, size: 0 },
                position: { x: 56, y: 42, z: 0, width: 1808, height: 996 },
                textShadow: { enabled: false, color: { r: 0, g: 0, b: 0 }, angle: 315, length: 5, radius: 5 },
              },
            ],
          },
        ],
      },
      {
        groupLabel: 'Tag',
        groupId: 'a5dd037e-58a4-4629-984d-8186a43ac684',
        groupColor: { r: 204, g: 41, b: 41 },
        slides: [
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            drawingBackgroundColor: false,
            enabled: true,
            hotKey: '',
            id: 'db551011-32e0-4a2f-9ee5-0e29f72d72d9',
            label: '',
            notes: '\\*\\*',
            textElements: [
              {
                adjustsHeightToFit: false,
                displayDelay: 0,
                displayName: 'web content',
                drawingFill: true,
                fillColor: { r: 0, g: 0, b: 0 },
                fromTemplate: false,
                id: 'cf0bff01-58a7-451a-9a79-82d83e8ffd2b',
                locked: false,
                opacity: 1,
                revealType: 0,
                rotation: 0,
                verticalAlignment: 1,
                fontName: 'ArialMT',
                textColor: { r: 0, g: 0, b: 0 },
                textSize: 50,
                plainText: '\\*\\*',
                rtfData:
                  '{\\rtf0\\ansi\\ansicpg1252{\\fonttbl\\f0\\fnil ArialMT;}{\\colortbl;\\red0\\green0\\blue0;\\red255\\green255\\blue255;\\red255\\green255\\blue255;}{\\*\\expandedcolortbl;\\csgenericrgb\\c0\\c0\\c0\\c100000;\\csgenericrgb\\c100000\\c100000\\c100000\\c100000;\\csgenericrgb\\c100000\\c100000\\c100000\\c0;}{\\*\\listtable}{\\*\\listoverridetable}\\uc1\\paperw17720\\margl0\\margr0\\margt0\\margb0\\pard\\li0\\fi0\\ri0\\qc\\sb0\\sa0\\sl240\\slmult1\\slleading0\\f0\\b0\\i0\\ul0\\strike0\\fs100\\expnd0\\expndtw0\\cf1\\strokewidth0\\strokec2\\nosupersub\\ulc0\\highlight3\\cb3}',
                outline: { enabled: false, color: { r: 255, g: 255, b: 255 }, size: 0 },
                position: { x: 978, y: 570.9332, z: 0, width: 886, height: 480 },
                textShadow: {
                  enabled: false,
                  color: { r: 0, g: 0, b: 0 },
                  angle: 315.00000247078003,
                  length: 6.9999999999999964,
                  radius: 0,
                },
              },
              {
                adjustsHeightToFit: false,
                displayDelay: 0,
                displayName: 'image',
                drawingFill: true,
                fillColor: { r: 0, g: 0, b: 0 },
                fromTemplate: false,
                id: 'b394e5a5-23a4-4ff1-a866-4e23e0829e07',
                locked: false,
                opacity: 1,
                revealType: 0,
                rotation: 0,
                verticalAlignment: 1,
                fontName: 'ArialMT',
                textColor: { r: 0, g: 0, b: 0 },
                textSize: 50,
                plainText: '\\*\\*',
                rtfData:
                  '{\\rtf0\\ansi\\ansicpg1252{\\fonttbl\\f0\\fnil ArialMT;}{\\colortbl;\\red0\\green0\\blue0;\\red255\\green255\\blue255;\\red255\\green255\\blue255;}{\\*\\expandedcolortbl;\\csgenericrgb\\c0\\c0\\c0\\c100000;\\csgenericrgb\\c100000\\c100000\\c100000\\c100000;\\csgenericrgb\\c100000\\c100000\\c100000\\c0;}{\\*\\listtable}{\\*\\listoverridetable}\\uc1\\paperw6000\\margl0\\margr0\\margt0\\margb0\\pard\\li0\\fi0\\ri0\\qc\\sb0\\sa0\\sl240\\slmult1\\slleading0\\f0\\b0\\i0\\ul0\\strike0\\fs100\\expnd0\\expndtw0\\cf1\\strokewidth0\\strokec2\\nosupersub\\ulc0\\highlight3\\cb3}',
                outline: { enabled: false, color: { r: 0, g: 0, b: 0 }, size: 0 },
                position: { x: 177.1337, y: 689.9332, z: 0, width: 300, height: 300 },
                textShadow: {
                  enabled: false,
                  color: { r: 0, g: 0, b: 0 },
                  angle: 315.00000247078003,
                  length: 6.9999999999999964,
                  radius: 0,
                },
              },
              {
                adjustsHeightToFit: false,
                displayDelay: 0,
                displayName: 'shape',
                drawingFill: true,
                fillColor: { r: 255, g: 255, b: 255 },
                fromTemplate: false,
                id: '09d4c7ac-9090-465c-b790-2fe8bbaa1c74',
                locked: false,
                opacity: 1,
                revealType: 0,
                rotation: 0,
                verticalAlignment: 1,
                fontName: 'ArialMT',
                textColor: { r: 0, g: 0, b: 0 },
                textSize: 50,
                plainText: '\\*\\*',
                rtfData:
                  '{\\rtf0\\ansi\\ansicpg1252{\\fonttbl\\f0\\fnil ArialMT;}{\\colortbl;\\red0\\green0\\blue0;\\red255\\green255\\blue255;\\red255\\green255\\blue255;}{\\*\\expandedcolortbl;\\csgenericrgb\\c0\\c0\\c0\\c100000;\\csgenericrgb\\c100000\\c100000\\c100000\\c100000;\\csgenericrgb\\c100000\\c100000\\c100000\\c0;}{\\*\\listtable}{\\*\\listoverridetable}\\uc1\\paperw38400\\margl0\\margr0\\margt0\\margb0\\pard\\li0\\fi0\\ri0\\qc\\sb0\\sa0\\sl240\\slmult1\\slleading0\\f0\\b0\\i0\\ul0\\strike0\\fs100\\expnd0\\expndtw0\\cf1\\strokewidth0\\strokec2\\nosupersub\\ulc0\\highlight3\\cb3}',
                outline: { enabled: true, color: { r: 0, g: 0, b: 0 }, size: 1 },
                position: { x: 0, y: 0, z: 0, width: 1920, height: 1080 },
                textShadow: {
                  enabled: false,
                  color: { r: 0, g: 0, b: 0 },
                  angle: 315.00000247078003,
                  length: 6.9999999999999964,
                  radius: 0,
                },
              },
              {
                adjustsHeightToFit: false,
                displayDelay: 0,
                displayName: 'a box',
                drawingFill: true,
                fillColor: { r: 234, g: 191, b: 11 },
                fromTemplate: false,
                id: 'e959a6cd-a195-45d1-9e5d-9c64e9973b75',
                locked: false,
                opacity: 0.7567568,
                revealType: 0,
                rotation: 0,
                verticalAlignment: 1,
                fontName: 'ArialMT',
                textColor: { r: 0, g: 0, b: 0 },
                textSize: 50,
                plainText: '\\*\\*',
                rtfData:
                  '{\\rtf0\\ansi\\ansicpg1252{\\fonttbl\\f0\\fnil ArialMT;}{\\colortbl;\\red0\\green0\\blue0;\\red255\\green255\\blue255;\\red255\\green255\\blue255;}{\\*\\expandedcolortbl;\\csgenericrgb\\c0\\c0\\c0\\c100000;\\csgenericrgb\\c100000\\c100000\\c100000\\c100000;\\csgenericrgb\\c100000\\c100000\\c100000\\c0;}{\\*\\listtable}{\\*\\listoverridetable}\\uc1\\paperw11680\\margl0\\margr0\\margt0\\margb0\\pard\\li0\\fi0\\ri0\\qc\\sb0\\sa0\\sl240\\slmult1\\slleading0\\f0\\b0\\i0\\ul0\\strike0\\fs100\\expnd0\\expndtw0\\cf1\\strokewidth0\\strokec2\\nosupersub\\ulc0\\highlight3\\cb3}',
                outline: { enabled: true, color: { r: 0, g: 0, b: 0 }, size: 12 },
                position: { x: 159.0668, y: 123, z: 0, width: 584, height: 188 },
                textShadow: {
                  enabled: false,
                  color: { r: 0, g: 0, b: 0 },
                  angle: 315.00000247078003,
                  length: 6.9999999999999964,
                  radius: 0,
                },
              },
              {
                adjustsHeightToFit: false,
                displayDelay: 0,
                displayName: 'Default',
                drawingFill: false,
                fillColor: { r: 255, g: 255, b: 255 },
                fromTemplate: false,
                id: 'c0597894-4398-4bf4-8204-a6c401e9e48f',
                locked: false,
                opacity: 1,
                revealType: 0,
                rotation: 0,
                verticalAlignment: 1,
                fontName: 'Helvetica',
                textColor: { r: 255, g: 255, b: 255 },
                textSize: 70,
                plainText: '\\*\\*',
                rtfData:
                  '{\\rtf0\\ansi\\ansicpg1252{\\fonttbl\\f0\\fnil Helvetica;}{\\colortbl;\\red255\\green255\\blue255;\\red0\\green0\\blue0;\\red255\\green255\\blue255;\\red0\\green0\\blue0;\\red0\\green0\\blue0;}{\\*\\expandedcolortbl;\\csgenericrgb\\c100000\\c100000\\c100000\\c100000;\\csgenericrgb\\c0\\c0\\c0\\c100000;\\csgenericrgb\\c100000\\c100000\\c100000\\c0;\\csgenericrgb\\c0\\c0\\c0\\c100000;\\csgenericrgb\\c0\\c0\\c0\\c100000;}{\\*\\listtable}{\\*\\listoverridetable}\\uc1\\paperw12240\\margl0\\margr0\\margt0\\margb0\\pard\\li0\\fi0\\ri0\\qc\\sb0\\sa0\\sl20\\slmult0\\slleading0\\f0\\b0\\i0\\ul0\\strike0\\fs140\\expnd0\\expndtw0\\cf1\\strokewidth20\\strokec2\\nosupersub\\ulc0\\highlight3\\cb3\\par\\pard\\li0\\fi0\\ri0\\qc\\sb0\\sa0\\sl20\\slmult0\\slleading0\\f0\\b0\\i0\\ul0\\strike0\\fs140\\expnd0\\expndtw0\\cf4\\strokewidth20\\strokec5\\nosupersub\\ulc0\\highlight3\\cb3}',
                outline: { enabled: false, color: { r: 255, g: 255, b: 255 }, size: 0 },
                position: { x: 56, y: 42, z: 0, width: 1808, height: 996 },
                textShadow: { enabled: false, color: { r: 0, g: 0, b: 0 }, angle: 315, length: 5, radius: 5 },
              },
            ],
          },
        ],
      },
    ] as IPro7SlideGroup[]);
  });
});
