import { readFileSync } from 'fs';
import { v5Parser } from './parser';
import { IPro5Arrangement, IPro5Properties, IPro5SlideGroup } from './parser.model';

describe('V5 - Parser', (): void => {
  let parser: v5Parser;

  beforeEach(() => {
    parser = new v5Parser();
  });

  it('should exist', () => {
    expect(parser).toBeDefined();
  });

  it('should throw an error for a ProPresenter file of a different version number', () => {
    try {
      const testFile = readFileSync('./sample-files/v4 - Be Near.pro4').toString();
      parser.parse(testFile);

      //Test should fail if no error is thrown
      expect(true).toBe(false);
    } catch (err: unknown) {
      expect(err).toEqual(Error(`Expected a ProPresenter 5 file with versionNumber="500" but got versionNumber="400"`));
    }
  });

  it('should get the data from "Be Near.pro5"', () => {
    const testFile = readFileSync('./sample-files/v5 - Be Near.pro5').toString();
    const parsedSong = parser.parse(testFile);

    expect(parsedSong.properties).toEqual({
      CCLIArtistCredits: '',
      CCLICopyrightInfo: 2003,
      CCLIDisplay: false,
      CCLILicenseNumber: '',
      CCLIPublisher: 'Waiting Room Music',
      CCLISongTitle: 'Be Near',
      album: '',
      artist: 'Shane Bernard',
      author: '',
      backgroundColor: { r: 0, g: 0, b: 0 },
      category: 'Song',
      creatorCode: 1349676880,
      chordChartPath: '',
      docType: 0,
      drawingBackgroundColor: false,
      height: 1050,
      lastDateUsed: new Date('2014-10-12T20:44:32'),
      notes: '',
      resourcesDirectory: '',
      usedCount: 0,
      versionNumber: 500,
      width: 1680,
    } as IPro5Properties);

    expect(parsedSong.arrangements).toEqual([
      {
        label: 'Worship',
        color: { r: 0, g: 0, b: 0 },
        groupOrder: [
          { groupLabel: 'Background', groupId: '72801056-2a83-7531-0a6b-c038601f3a57' },
          { groupLabel: 'Verse 1', groupId: '879b9305-3db4-7632-b826-715a1c7284cd' },
          { groupLabel: 'Bridge 1', groupId: 'A8499FCB-AF89-40D8-9671-E85706B8EA0B' },
          { groupLabel: 'Chorus', groupId: '319f1463-3c59-9268-623b-be2da570f476' },
          { groupLabel: 'Chorus', groupId: '319f1463-3c59-9268-623b-be2da570f476' },
          { groupLabel: 'Post-Chorus', groupId: 'E5052FF3-7B57-42A7-A348-E5C52C770AED' },
          { groupLabel: 'Verse 2', groupId: '0173b2d0-7137-58b2-1903-67def417faac' },
          { groupLabel: 'Bridge 1', groupId: 'A8499FCB-AF89-40D8-9671-E85706B8EA0B' },
          { groupLabel: 'Chorus', groupId: '319f1463-3c59-9268-623b-be2da570f476' },
          { groupLabel: 'Chorus', groupId: '319f1463-3c59-9268-623b-be2da570f476' },
          { groupLabel: 'Chorus', groupId: '319f1463-3c59-9268-623b-be2da570f476' },
          { groupLabel: 'Chorus', groupId: '319f1463-3c59-9268-623b-be2da570f476' },
          { groupLabel: 'Ending', groupId: '26520F92-9B90-4CB6-BBB6-65958B7AECDA' },
          { groupLabel: '*blank*', groupId: 'cba67af7-515f-5048-79f8-155a2f1ca390' },
        ],
      },
    ] as IPro5Arrangement[]);

    expect(parsedSong.slideGroups).toEqual([
      {
        groupColor: { r: 0, g: 0, b: 0 },
        groupId: '72801056-2a83-7531-0a6b-c038601f3a57',
        groupLabel: 'Background',
        slides: [
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            enabled: true,
            highlightColor: { r: 0, g: 0, b: 0 },
            id: '56c44c88-cfb9-196f-a5fa-40d1b478bb8a',
            label: '',
            notes: '',
            mediaCues: [
              {
                displayName: 'VideoSample.mov',
                source: 'file://localhost/Users/FiniteLooper/Renewed%20Vision%20Media/Video/VideoSample.mov',
              },
            ],
            textElements: [],
          },
        ],
      },
      {
        groupColor: { r: 0, g: 0, b: 255 },
        groupId: '879b9305-3db4-7632-b826-715a1c7284cd',
        groupLabel: 'Verse 1',
        slides: [
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            enabled: true,
            highlightColor: { r: 0, g: 0, b: 0 },
            id: '349b10c2-362d-06b9-ea34-2b938900f526',
            label: '',
            notes: '',
            mediaCues: [],
            textElements: [
              {
                color: { b: 255, g: 255, r: 255 },
                font: 'Helvetica',
                position: { height: 995.3125, width: 1614.375, x: 32.8125, y: 27.34375, z: 0 },
                // cspell:disable
                rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1343\\cocoasubrtf140
\\cocoascreenfonts1{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc

\\f0\\fs260 \\cf1 \\outl0\\strokewidth0 \\strokec1 You are all\\
Big and small\\
Beautiful}`,
                // cspell:enable
                size: 130,
                textContent: `You are all
Big and small
Beautiful`,
              },
            ],
          },
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            enabled: true,
            highlightColor: { r: 0, g: 0, b: 0 },
            id: 'b458c19d-19c5-9ca1-0730-34dc0d5de9fa',
            label: '',
            notes: '',
            mediaCues: [],
            textElements: [
              {
                color: { b: 255, g: 255, r: 255 },
                font: 'Helvetica',
                position: { height: 995.3125, width: 1614.375, x: 32.8125, y: 27.34375, z: 0 },
                // cspell:disable
                rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1343\\cocoasubrtf140
\\cocoascreenfonts1{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc

\\f0\\fs260 \\cf1 \\outl0\\strokewidth0 \\strokec1 And wonderful to \\
Trust in grace\\
Through faith\\
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc
\\cf1 \\outl0\\strokewidth0 \\strokec1 But I'm asking to taste}`,
                // cspell:enable
                size: 130,
                textContent: `And wonderful to \nTrust in grace
Through faith
But I'm asking to taste`,
              },
            ],
          },
        ],
      },
      {
        groupColor: { r: 0, g: 255, b: 255 },
        groupId: 'A8499FCB-AF89-40D8-9671-E85706B8EA0B',
        groupLabel: 'Bridge 1',
        slides: [
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            enabled: true,
            highlightColor: null,
            id: 'E952B056-FF18-4CE6-8911-C1424EDEF86A',
            label: '',
            notes: '',
            mediaCues: [],
            textElements: [
              {
                color: { b: 255, g: 255, r: 255 },
                font: 'Helvetica',
                position: { height: 967.9688, width: 1581.562, x: 49.21875, y: 41.01562, z: 0 },
                // cspell:disable
                rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1343\\cocoasubrtf140
\\cocoascreenfonts1{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc

\\f0\\fs260 \\cf1 \\expnd0\\expndtw0\\kerning0
\\outl0\\strokewidth0 \\strokec0 For dark is light to You\\
Depths are Height to you\\
Far is near\\
But Lord I need to hear from You }`,
                // cspell:enable
                size: 130,
                textContent: `For dark is light to You
Depths are Height to you
Far is near
But Lord I need to hear from You`,
              },
            ],
          },
        ],
      },
      {
        groupColor: { r: 255, g: 0, b: 0 },
        groupId: '319f1463-3c59-9268-623b-be2da570f476',
        groupLabel: 'Chorus',
        slides: [
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            enabled: true,
            highlightColor: { r: 0, g: 0, b: 0 },
            id: '88d6773f-ce06-db85-49d6-914bef01fee3',
            label: '',
            notes: '',
            mediaCues: [],
            textElements: [
              {
                color: { b: 255, g: 255, r: 255 },
                font: 'Helvetica',
                position: { height: 995.3125, width: 1614.375, x: 32.8125, y: 27.34375, z: 0 },
                // cspell:disable
                rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1343\\cocoasubrtf140
\\cocoascreenfonts1{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc

\\f0\\fs260 \\cf1 \\outl0\\strokewidth0 \\strokec1 Be near O God\\
Be near O God of us\\
Your nearness is\\
To us our good}`,
                // cspell:enable
                size: 130,
                textContent: `Be near O God
Be near O God of us
Your nearness is
To us our good`,
              },
            ],
          },
        ],
      },
      {
        groupColor: { r: 127.5, g: 0, b: 127.5 },
        groupId: 'E5052FF3-7B57-42A7-A348-E5C52C770AED',
        groupLabel: 'Post-Chorus',
        slides: [
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            enabled: true,
            highlightColor: null,
            id: 'C7EECDD4-DD7B-48B2-A67A-8FAA86CB5D0C',
            label: '',
            notes: '',
            mediaCues: [],
            textElements: [
              {
                color: { b: 255, g: 255, r: 255 },
                font: 'Helvetica',
                position: { height: 967.9688, width: 1581.562, x: 49.21875, y: 41.01562, z: 0 },
                // cspell:disable
                rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1343\\cocoasubrtf140
\\cocoascreenfonts1{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc

\\f0\\fs260 \\cf1 \\expnd0\\expndtw0\\kerning0
\\outl0\\strokewidth0 \\strokec0 Our Good }`,
                // cspell:enable
                size: 130,
                textContent: `Our Good`,
              },
            ],
          },
        ],
      },
      {
        groupColor: { r: 0, g: 255, b: 0 },
        groupId: '0173b2d0-7137-58b2-1903-67def417faac',
        groupLabel: 'Verse 2',
        slides: [
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            enabled: true,
            highlightColor: { r: 0, g: 0, b: 0 },
            id: 'f33a84de-2def-d59b-f989-c777daaa3807',
            label: '',
            notes: '',
            mediaCues: [],
            textElements: [
              {
                color: { b: 255, g: 255, r: 255 },
                font: 'Helvetica',
                position: { height: 995.3125, width: 1614.375, x: 32.8125, y: 27.34375, z: 0 },
                // cspell:disable
                rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1343\\cocoasubrtf140
\\cocoascreenfonts1{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc

\\f0\\fs260 \\cf1 \\outl0\\strokewidth0 \\strokec1 Your fullness is mine\\
Revelation Divine}`,
                // cspell:enable
                size: 130,
                textContent: `Your fullness is mine
Revelation Divine`,
              },
            ],
          },
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            enabled: true,
            highlightColor: { r: 0, g: 0, b: 0 },
            id: 'd16e1cad-12f2-53b1-d259-7a0e5bf4a57c',
            label: '',
            notes: '',
            mediaCues: [],
            textElements: [
              {
                color: { b: 255, g: 255, r: 255 },
                font: 'Helvetica',
                position: { height: 995.3125, width: 1614.375, x: 32.8125, y: 27.34375, z: 0 },
                // cspell:disable
                rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1343\\cocoasubrtf140
\\cocoascreenfonts1{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc

\\f0\\fs260 \\cf1 \\outl0\\strokewidth0 \\strokec1 But oh to taste\\outl0\\strokewidth0 \\strokec1 \\
To know much\\
More than a page\\
To feel Your embrace}`,
                // cspell:enable
                size: 130,
                textContent: `But oh to taste
To know much
More than a page
To feel Your embrace`,
              },
            ],
          },
        ],
      },
      {
        groupColor: { r: 255, g: 127.5, b: 0 },
        groupId: '26520F92-9B90-4CB6-BBB6-65958B7AECDA',
        groupLabel: 'Ending',
        slides: [
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            enabled: true,
            highlightColor: { r: 0, g: 0, b: 0 },
            id: '1B38B80D-C0EA-4680-806D-92126655A963',
            label: '',
            notes: '',
            mediaCues: [],
            textElements: [
              {
                color: { b: 255, g: 255, r: 255 },
                font: 'Helvetica',
                position: { height: 967.9688, width: 1581.562, x: 49.21875, y: 41.01562, z: 0 },
                // cspell:disable
                rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1343\\cocoasubrtf140
\\cocoascreenfonts1{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc

\\f0\\fs260 \\cf1 \\expnd0\\expndtw0\\kerning0
\\outl0\\strokewidth0 \\strokec0 My Good }`,
                // cspell:enable
                size: 130,
                textContent: `My Good`,
              },
            ],
          },
        ],
      },
      {
        groupColor: { r: 0, g: 0, b: 0 },
        groupId: 'cba67af7-515f-5048-79f8-155a2f1ca390',
        groupLabel: '*blank*',
        slides: [
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            enabled: true,
            highlightColor: { r: 0, g: 0, b: 0 },
            id: 'f6b2050c-8255-f69d-20d3-39b6611de714',
            label: '',
            notes: '',
            mediaCues: [],
            textElements: [],
          },
        ],
      },
    ] as IPro5SlideGroup[]);
  });

  it('should get the data from "Give Us Clean Hands.pro5"', () => {
    const testFile = readFileSync('./sample-files/v5 - Give Us Clean Hands.pro5').toString();
    const parsedSong = parser.parse(testFile);

    expect(parsedSong.properties).toEqual({
      CCLIArtistCredits: '',
      CCLICopyrightInfo: 2000,
      CCLIDisplay: true,
      CCLILicenseNumber: 2060208,
      CCLIPublisher: '',
      CCLISongTitle: 'Give Us Clean Hands',
      album: '',
      artist: 'Charlie Hall',
      author: 'Charlie Hall',
      backgroundColor: { r: 0, g: 0, b: 0 },
      category: 'Song',
      creatorCode: 1349676880,
      chordChartPath: '',
      docType: 0,
      drawingBackgroundColor: false,
      height: 1050,
      lastDateUsed: new Date('2014-09-27T20:44:26'),
      notes: '',
      resourcesDirectory: '',
      usedCount: 0,
      versionNumber: 500,
      width: 1680,
    } as IPro5Properties);

    expect(parsedSong.arrangements).toEqual([
      {
        label: 'Worship',
        color: { r: 0, g: 0, b: 0 },
        groupOrder: [
          { groupLabel: 'background', groupId: 'f47699e5-16ee-dd17-2d1b-d1e0b273bd17' },
          { groupLabel: 'Verse 1', groupId: '4247fa5c-7356-d364-f50c-687c3f4f0311' },
          { groupLabel: 'Pre-Chorus', groupId: 'aab101ba-6d12-524d-a896-91c8e3c936ce' },
          { groupLabel: 'Pre-Chorus', groupId: 'aab101ba-6d12-524d-a896-91c8e3c936ce' },
          { groupLabel: 'Chorus', groupId: 'B8A48E6A-3FBF-444D-B8A8-FBF350C619C8' },
          { groupLabel: 'Chorus', groupId: 'B8A48E6A-3FBF-444D-B8A8-FBF350C619C8' },
          { groupLabel: 'Verse 1', groupId: '4247fa5c-7356-d364-f50c-687c3f4f0311' },
          { groupLabel: 'Pre-Chorus', groupId: 'aab101ba-6d12-524d-a896-91c8e3c936ce' },
          { groupLabel: 'Pre-Chorus', groupId: 'aab101ba-6d12-524d-a896-91c8e3c936ce' },
          { groupLabel: 'Chorus', groupId: 'B8A48E6A-3FBF-444D-B8A8-FBF350C619C8' },
          { groupLabel: 'Chorus', groupId: 'B8A48E6A-3FBF-444D-B8A8-FBF350C619C8' },
          { groupLabel: '*blank*', groupId: 'e3972cf2-6527-314f-b423-040244fc089a' },
        ],
      },
    ] as IPro5Arrangement[]);

    expect(parsedSong.slideGroups).toEqual([
      {
        groupColor: { r: 0, g: 0, b: 0 },
        groupId: 'f47699e5-16ee-dd17-2d1b-d1e0b273bd17',
        groupLabel: 'background',
        slides: [
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            enabled: true,
            highlightColor: { r: 0, g: 0, b: 0 },
            id: '3878e231-5b4f-c100-3a75-cf25d0519f72',
            label: '',
            notes: '',
            mediaCues: [],
            textElements: [],
          },
        ],
      },
      {
        groupColor: { r: 0, g: 0, b: 255 },
        groupId: '4247fa5c-7356-d364-f50c-687c3f4f0311',
        groupLabel: 'Verse 1',
        slides: [
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            enabled: true,
            highlightColor: { r: 0, g: 0, b: 0 },
            id: 'f21863f2-4032-4cd0-dcb6-306031eadd27',
            label: '',
            notes: '',
            mediaCues: [],
            textElements: [
              {
                color: { b: 255, g: 255, r: 255 },
                font: 'Helvetica',
                position: {
                  height: 995.3125,
                  width: 1614.375,
                  x: 32.8125,
                  y: 27.34375,
                  z: 0,
                },
                // cspell:disable
                rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1343\\cocoasubrtf140
\\cocoascreenfonts1{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc

\\f0\\fs260 \\cf1 \\outl0\\strokewidth0 \\strokec1 We bow our hearts\\
We bend our knees\\
Oh Spirit come\\
Make us humble}`,
                // cspell:enable
                size: 130,
                textContent: `We bow our hearts
We bend our knees
Oh Spirit come
Make us humble`,
              },
            ],
          },
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            enabled: true,
            highlightColor: null,
            id: 'CF606D3B-7002-413E-BE9D-057795EDF74D',
            label: '',
            notes: '',
            mediaCues: [],
            textElements: [
              {
                color: { b: 255, g: 255, r: 255 },
                font: 'Helvetica',
                position: {
                  height: 995.3125,
                  width: 1614.375,
                  x: 42.8125,
                  y: 37.34375,
                  z: 0,
                },
                // cspell:disable
                rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1343\\cocoasubrtf140
\\cocoascreenfonts1{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc

\\f0\\fs260 \\cf1 We turn our eyes\\
From evil things\\
Oh Lord we cast\\
Down our idols}`,
                // cspell:enable
                size: 130,
                textContent: `We turn our eyes
From evil things
Oh Lord we cast
Down our idols`,
              },
            ],
          },
        ],
      },
      {
        groupColor: { r: 0, g: 0, b: 0 },
        groupId: 'aab101ba-6d12-524d-a896-91c8e3c936ce',
        groupLabel: 'Pre-Chorus',
        slides: [
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            enabled: true,
            highlightColor: { r: 0, g: 0, b: 0 },
            id: '25918239-3112-ba21-bb2f-29b4ed6501e5',
            label: '',
            notes: '',
            mediaCues: [],
            textElements: [
              {
                color: { b: 255, g: 255, r: 255 },
                font: 'Helvetica',
                position: {
                  height: 995.3125,
                  width: 1614.375,
                  x: 32.8125,
                  y: 27.34375,
                  z: 0,
                },
                // cspell:disable
                rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1343\\cocoasubrtf140
\\cocoascreenfonts1{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc

\\f0\\fs260 \\cf1 \\outl0\\strokewidth0 \\strokec1 Give us clean hands\\
Give us pure hearts\\
Let us not lift our\\
Souls to another}`,
                // cspell:enable
                size: 130,
                textContent: `Give us clean hands
Give us pure hearts
Let us not lift our
Souls to another`,
              },
            ],
          },
        ],
      },
      {
        groupColor: { r: 255, g: 0, b: 0 },
        groupId: 'B8A48E6A-3FBF-444D-B8A8-FBF350C619C8',
        groupLabel: 'Chorus',
        slides: [
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            enabled: true,
            highlightColor: { r: 0, g: 0, b: 0 },
            id: 'c245cc4d-fa57-34ed-0e9a-4d1cffae386d',
            label: '',
            notes: '',
            mediaCues: [],
            textElements: [
              {
                color: { b: 255, g: 255, r: 255 },
                font: 'Helvetica',
                position: {
                  height: 995.3125,
                  width: 1614.375,
                  x: 32.8125,
                  y: 27.34375,
                  z: 0,
                },
                // cspell:disable
                rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1343\\cocoasubrtf140
\\cocoascreenfonts1{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc

\\f0\\fs260 \\cf1 \\outl0\\strokewidth0 \\strokec1 Oh God let us be\\
A generation that seeks\\
That seeks Your face\\
Oh God of Jacob}`,
                // cspell:enable
                size: 130,
                textContent: `Oh God let us be
A generation that seeks
That seeks Your face
Oh God of Jacob`,
              },
            ],
          },
        ],
      },
      {
        groupColor: null,
        groupId: 'e3972cf2-6527-314f-b423-040244fc089a',
        groupLabel: '*blank*',
        slides: [
          {
            backgroundColor: { r: 0, g: 0, b: 0 },
            chordChartPath: '',
            enabled: true,
            highlightColor: { r: 0, g: 0, b: 0 },
            id: '0b96003c-bdf7-7ba7-603e-cbf82bcdac8c',
            label: '',
            notes: '',
            mediaCues: [],
            textElements: [
              {
                color: { b: 255, g: 255, r: 255 },
                font: '',
                position: {
                  height: 995.3125,
                  width: 1614.375,
                  x: 32.8125,
                  y: 27.34375,
                  z: 0,
                },
                // cspell:disable
                rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1343\\cocoasubrtf140
\\cocoascreenfonts1{\\fonttbl}
{\\colortbl;\\red255\\green255\\blue255;}
}`,
                // cspell:enable
                size: 0,
                textContent: ``,
              },
            ],
          },
        ],
      },
    ] as IPro5SlideGroup[]);
  });
});
