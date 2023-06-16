import { readFileSync } from 'fs';
import { v4Parser } from './v4-parser';
import { IPro4Properties, IPro4Slide } from './v4-parser.model';

describe('v4Parser', (): void => {
  let parser: v4Parser;

  beforeEach(() => {
    parser = new v4Parser();
  });

  it('should exist', () => {
    expect(parser).toBeDefined();
  });

  it('should throw an error for a ProPresenter file of a different version number', () => {
    try {
      const testFile = readFileSync('./sample-files/v5 - Be Near.pro5').toString();
      parser.parse(testFile);

      //Test should fail if no error is thrown
      expect(true).toBe(false);
    } catch (err: unknown) {
      expect(err).toEqual(Error(`Expected a ProPresenter 4 file with versionNumber="400" but got versionNumber="500"`));
    }
  });

  it('should get the data from "Be Near.pro4"', () => {
    const testFile = readFileSync('./sample-files/v4 - Be Near.pro4').toString();
    const parsedSong = parser.parse(testFile);

    expect(parsedSong.properties).toEqual({
      CCLIArtistCredits: '',
      CCLICopyrightInfo: 2003,
      CCLIDisplay: false,
      CCLILicenseNumber: '',
      CCLIPublisher: 'Waiting Room Music',
      CCLISongTitle: 'Be Near',
      album: '',
      artist: '',
      author: '',
      backgroundColor: '0 0 0 1',
      category: 'Song',
      creatorCode: 1349676880,
      docType: 0,
      drawingBackgroundColor: 0,
      height: 768,
      lastDateUsed: new Date('2010-11-07T00:37:36'),
      notes: '',
      resourcesDirectory: '',
      usedCount: 0,
      versionNumber: 400,
      width: 1024,
    } as IPro4Properties);

    expect(parsedSong.slides).toEqual([
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '26AAF905-8F45-4252-BFAB-4C10CCFE1476',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: '',
            size: 0,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf350
{\\fonttbl}
{\\colortbl;\\red255\\green255\\blue255;}
}`,
            textContent: '',
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: 'Chorus 1',
        id: '9734D050-A3BD-4BD2-A8FE-0C15CC0DF0D3',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 48,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf350
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs96 \\cf1 Be near O God\\
Be near O God of us\\
Your nearness is to us our good\\
Be near O God\\
Be near O God of us\\
Your nearness is to us our good\\
Our good}`,
            textContent: `Be near O God
Be near O God of us
Your nearness is to us our good
Be near O God
Be near O God of us
Your nearness is to us our good
Our good`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: 'Verse 1',
        id: 'C0D4B304-E17E-424F-AF25-A1C4F0E1777E',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 48,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf350
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs96 \\cf1 You are all big and small\\
Beautiful\\
And wonderful\\
To trust in grace through faith\\
But I'm asking to taste}`,
            textContent: `You are all big and small
Beautiful
And wonderful
To trust in grace through faith
But I'm asking to taste`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: 'Verse 2',
        id: 'BBD0F6E3-DEC6-4DAD-9D23-5AFC416F4405',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 48,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf350
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs96 \\cf1 For dark is light to You\\
Depths are height to You\\
Far is near\\
But Lord I need to hear from You}`,
            textContent: `For dark is light to You
Depths are height to You
Far is near
But Lord I need to hear from You`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: 'Verse 3',
        id: 'AFEC5480-72AB-4621-B2B9-507C1216557B',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 48,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf350
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs96 \\cf1 Your fullness is mine\\
Revelation divine\\
But oh to taste\\
To know much more than a page\\
To feel Your embrace}`,
            textContent: `Your fullness is mine
Revelation divine
But oh to taste
To know much more than a page
To feel Your embrace`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: 'Verse 4',
        id: '6A09BC9B-1B9E-43CF-B170-954772243651',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 48,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf350
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs96 \\cf1 For dark is light to You\\
Depths are height to You\\
Far is near\\
But Lord I need to hear from You}`,
            textContent: `For dark is light to You
Depths are height to You
Far is near
But Lord I need to hear from You`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '6C6F7FC2-A5DF-4D7A-8415-F4F9B41AB40F',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 48,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf350
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs96 \\cf1 My good}`,
            textContent: 'My good',
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '01BFD557-5A33-4FBD-B3BC-B88AB38A2AF5',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: '',
            size: 0,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf350
{\\fonttbl}
{\\colortbl;\\red255\\green255\\blue255;}
}`,
            textContent: '',
          },
        ],
      },
    ] as IPro4Slide[]);
  });

  it('should get the data from "Give Us Clean Hands.pro4"', () => {
    const testFile = readFileSync('./sample-files/v4 - Give Us Clean Hands.pro4').toString();
    const parsedSong = parser.parse(testFile);

    expect(parsedSong.properties).toEqual({
      CCLIArtistCredits: '',
      CCLICopyrightInfo: 2000,
      CCLIDisplay: false,
      CCLILicenseNumber: 2060208,
      CCLIPublisher:
        'worshiptogether.com songs | sixsteps Music (Admin. by EMI Christian Music Publishing) | (Admin. by EMI Christian Music Publishing)',
      CCLISongTitle: 'Give Us Clean Hands',
      album: '',
      artist: '',
      author: 'Charlie Hall',
      backgroundColor: '0 0 0 1',
      category: 'Song',
      creatorCode: 1349676880,
      docType: 0,
      drawingBackgroundColor: 0,
      height: 768,
      lastDateUsed: new Date('2010-09-29T23:39:26'),
      notes: '',
      resourcesDirectory: '',
      usedCount: 0,
      versionNumber: 400,
      width: 1024,
    } as IPro4Properties);

    expect(parsedSong.slides).toEqual([
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: 'Verse 1',
        id: '28992D12-9FBA-4233-9618-232DD18CE572',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Impact',
            size: 60,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
{\\fonttbl\\f0\\fswiss\\fcharset0 Impact;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 \\outl0\\strokewidth-40 \\strokec0 We bow our hearts we bend our knees\\
Oh Spirit come make us humble\\
We turn our eyes from evil things\\
Oh Lord we cast down our idols}`,
            textContent: `We bow our hearts we bend our knees
Oh Spirit come make us humble
We turn our eyes from evil things
Oh Lord we cast down our idols`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: 'Chorus 1',
        id: '014F4DF8-3C1A-4768-BF67-21ACDE647BC4',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Impact',
            size: 60,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
{\\fonttbl\\f0\\fswiss\\fcharset0 Impact;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 \\outl0\\strokewidth-40 \\strokec0 Give us clean hands give us pure hearts\\
Let us not lift our souls to another\\
Give us clean hands give us pure hearts\\
Let us not lift our souls to another}`,
            textContent: `Give us clean hands give us pure hearts
Let us not lift our souls to another
Give us clean hands give us pure hearts
Let us not lift our souls to another`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: 'Chorus 1',
        id: 'E3D922CD-B9E4-485E-AE67-E39DEB34A68F',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Impact',
            size: 60,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
{\\fonttbl\\f0\\fswiss\\fcharset0 Impact;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 \\outl0\\strokewidth-40 \\strokec0 Oh God let us be a generation\\
 That seeks\\
That seeks Your face oh God of Jacob\\
Oh God let us be a generation                  That seeks\\
That seeks Your face oh God of Jacob}`,
            textContent: `Oh God let us be a generation
 That seeks
That seeks Your face oh God of Jacob
Oh God let us be a generation                  That seeks
That seeks Your face oh God of Jacob`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: 'CE8ACA29-5F19-4D8E-901D-0104B146FD96',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: '',
            size: 0,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
{\\fonttbl}
{\\colortbl;\\red255\\green255\\blue255;}
}`,
            textContent: '',
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: 'Verse 1',
        id: 'ED90F650-EC28-4299-976E-AE6DA9A92C9B',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Impact',
            size: 60,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
{\\fonttbl\\f0\\fswiss\\fcharset0 Impact;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 \\outl0\\strokewidth-40 \\strokec0 We bow our hearts we bend our knees\\
Oh Spirit come make us humble\\
We turn our eyes from evil things\\
Oh Lord we cast down our idols}`,
            textContent: `We bow our hearts we bend our knees
Oh Spirit come make us humble
We turn our eyes from evil things
Oh Lord we cast down our idols`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: 'Chorus 1',
        id: 'B1E3ADD6-C9B2-44CC-A963-DEA6009FEDC8',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Impact',
            size: 60,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
{\\fonttbl\\f0\\fswiss\\fcharset0 Impact;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 \\outl0\\strokewidth-40 \\strokec0 Give us clean hands give us pure hearts\\
Let us not lift our souls to another\\
Give us clean hands give us pure hearts\\
Let us not lift our souls to another}`,
            textContent: `Give us clean hands give us pure hearts
Let us not lift our souls to another
Give us clean hands give us pure hearts
Let us not lift our souls to another`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: 'Chorus 1',
        id: '349B7A03-B76B-46B5-B185-5E57834E27DD',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Impact',
            size: 60,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
{\\fonttbl\\f0\\fswiss\\fcharset0 Impact;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 \\outl0\\strokewidth-40 \\strokec0 Oh God let us be a generation\\
 That seeks\\
That seeks Your face oh God of Jacob\\
Oh God let us be a generation                  That seeks\\
That seeks Your face oh God of Jacob}`,
            textContent: `Oh God let us be a generation
 That seeks
That seeks Your face oh God of Jacob
Oh God let us be a generation                  That seeks
That seeks Your face oh God of Jacob`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '61CE02D1-4AAD-40E7-93DE-83FEF746B662',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: '',
            size: 0,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
{\\fonttbl}
{\\colortbl;\\red255\\green255\\blue255;}
}`,
            textContent: '',
          },
        ],
      },
    ] as IPro4Slide[]);
  });

  it('should get the data from "Jesus Saves.pro4"', () => {
    const testFile = readFileSync('./sample-files/v4 - Jesus Saves.pro4').toString();
    const parsedSong = parser.parse(testFile);

    expect(parsedSong.properties).toEqual({
      CCLIArtistCredits: '',
      CCLICopyrightInfo: 2008,
      CCLIDisplay: false,
      CCLILicenseNumber: 5322950,
      CCLIPublisher: 'Thankyou Music (Admin. by EMI Christian Music Publishing)',
      CCLISongTitle: 'Jesus Saves',
      album: '',
      artist: '',
      author: 'Nick Herbert, Tim Hughes',
      backgroundColor: '0 0 0 1',
      category: 'Song',
      creatorCode: 1349676880,
      docType: 0,
      drawingBackgroundColor: 0,
      height: 768,
      lastDateUsed: new Date('2010-10-03T13:45:38'),
      notes: '',
      resourcesDirectory: '',
      usedCount: 0,
      versionNumber: 400,
      width: 1024,
    } as IPro4Properties);

    expect(parsedSong.slides).toEqual([
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: 'ABEC9943-D4CC-474E-9C06-944A91307B9B',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: '',
            size: 0,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
{\\fonttbl}
{\\colortbl;\\red255\\green255\\blue255;}
}`,
            textContent: '',
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: 'Verse 1',
        id: '3533F764-B21A-47BF-BB50-263A4BCDF3A0',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Tahoma',
            size: 56,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
{\\fonttbl\\f0\\fnil\\fcharset0 Tahoma;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\b\\fs112 \\cf1 \\outl0\\strokewidth-60 \\strokec0 Hope is here\\
Shout the news to ev'ryone\\
It's a new day peace has come\\
Jesus saves\\
Mercy triumphs at the cross\\
Love has come to rescue us\\
Jesus saves}`,
            textContent: `Hope is here
Shout the news to ev'ryone
It's a new day peace has come
Jesus saves
Mercy triumphs at the cross
Love has come to rescue us
Jesus saves`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '85AE6E7C-008C-454C-9EF6-114F5CE6FFA5',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Tahoma',
            size: 56,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
{\\fonttbl\\f0\\fnil\\fcharset0 Tahoma;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\b\\fs112 \\cf1 \\outl0\\strokewidth-60 \\strokec0 Hope is here\\
What a joyful noise we'll make}`,
            textContent: `Hope is here
What a joyful noise we'll make`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: 'Chorus 1',
        id: '3AF2BD80-7170-4AED-9980-EF820B626120',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Tahoma',
            size: 56,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
{\\fonttbl\\f0\\fnil\\fcharset0 Tahoma;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\b\\fs112 \\cf1 \\outl0\\strokewidth-60 \\strokec0 As we join with heaven's song\\
To let all the world know \\
That Jesus saves\\
Raise a shout to let \\
All the world know\\
That Jesus saves}`,
            textContent: `As we join with heaven's song
To let all the world know \nThat Jesus saves
Raise a shout to let \nAll the world know\nThat Jesus saves`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: 'Verse 2',
        id: 'E61AD8D1-1DB2-4BB9-AD63-1CA1D9294E2D',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Tahoma',
            size: 56,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
{\\fonttbl\\f0\\fnil\\fcharset0 Tahoma;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\b\\fs112 \\cf1 \\outl0\\strokewidth-60 \\strokec0 Free at last\\
Every debt has been repaid\\
Broken hearts can be remade\\
Jesus saves\\
Sing above the storms of life\\
Sing it through the darkest night\\
Jesus saves}`,
            textContent: `Free at last
Every debt has been repaid
Broken hearts can be remade
Jesus saves
Sing above the storms of life
Sing it through the darkest night
Jesus saves`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '99F3FC57-41DB-4A31-9D41-A3B86D9E85A9',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Tahoma',
            size: 56,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
{\\fonttbl\\f0\\fnil\\fcharset0 Tahoma;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\b\\fs112 \\cf1 \\outl0\\strokewidth-60 \\strokec0 Free at last\\
What a joyful noise we'll make}`,
            textContent: `Free at last
What a joyful noise we'll make`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: 'Chorus 1',
        id: 'B9F65FBE-2BAD-4575-8E6B-318F71784FFE',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Tahoma',
            size: 56,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
{\\fonttbl\\f0\\fnil\\fcharset0 Tahoma;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\b\\fs112 \\cf1 \\outl0\\strokewidth-60 \\strokec0 As we join with heaven's song\\
To let all the world know \\
That Jesus saves\\
Raise a shout to let \\
All the world know\\
That Jesus saves}`,
            textContent: `As we join with heaven's song
To let all the world know \nThat Jesus saves
Raise a shout to let \nAll the world know
That Jesus saves`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: 'Chorus 1',
        id: '4ED066AA-6E3C-4D52-A14C-233700ADCF9F',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Tahoma',
            size: 56,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
{\\fonttbl\\f0\\fnil\\fcharset0 Tahoma;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\b\\fs112 \\cf1 \\outl0\\strokewidth-60 \\strokec0 We'll sing it out\\
To let all the world know \\
That Jesus saves\\
Raise a shout to let \\
All the world know\\
That Jesus saves}`,
            textContent: `We'll sing it out
To let all the world know \nThat Jesus saves
Raise a shout to let \nAll the world know
That Jesus saves`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '(BRIDGE)',
        id: 'F79D6820-4F50-4BDB-BBDD-FA48A4C35255',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Tahoma',
            size: 56,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
{\\fonttbl\\f0\\fnil\\fcharset0 Tahoma;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\b\\fs112 \\cf1 \\outl0\\strokewidth-60 \\strokec0 You save You heal restore reveal\\
The Father's heart to us\\
You rose to raise us from the grave\\
Your Spirit lives in us}`,
            textContent: `You save You heal restore reveal
The Father's heart to us
You rose to raise us from the grave
Your Spirit lives in us`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: 'Chorus 2',
        id: 'B5360E51-E581-4D01-9EA2-0F9099CBD995',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Tahoma',
            size: 56,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
{\\fonttbl\\f0\\fnil\\fcharset0 Tahoma;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\b\\fs112 \\cf1 \\outl0\\strokewidth-60 \\strokec0 Sing it out\\
To let all the world know \\
That Jesus saves\\
Raise a shout\\
To let all the world know \\
That Jesus saves}`,
            textContent: `Sing it out
To let all the world know \nThat Jesus saves
Raise a shout
To let all the world know \nThat Jesus saves`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: 'Chorus 2',
        id: '4406766E-F40A-4D2B-823E-FAE6A3126F5E',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Tahoma',
            size: 56,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
{\\fonttbl\\f0\\fnil\\fcharset0 Tahoma;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\b\\fs112 \\cf1 \\outl0\\strokewidth-60 \\strokec0 Shout it out\\
To let all the world know \\
That Jesus saves\\
Raise a shout\\
To let all the world know \\
That Jesus saves}`,
            textContent: `Shout it out
To let all the world know \nThat Jesus saves
Raise a shout
To let all the world know \nThat Jesus saves`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: 'Chorus 2',
        id: '53DEB08B-CEC1-48F4-A180-E97C2BF76AED',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Tahoma',
            size: 56,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
{\\fonttbl\\f0\\fnil\\fcharset0 Tahoma;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\b\\fs112 \\cf1 \\outl0\\strokewidth-60 \\strokec0 Sing it out\\
To let all the world know \\
That Jesus saves\\
Raise a shout\\
To let all the world know \\
That Jesus saves}`,
            textContent: `Sing it out
To let all the world know \nThat Jesus saves
Raise a shout
To let all the world know \nThat Jesus saves`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '6A6AF449-3C33-46DE-93ED-8F2A8463EB90',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Tahoma',
            size: 56,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
{\\fonttbl\\f0\\fnil\\fcharset0 Tahoma;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\b\\fs112 \\cf1 \\outl0\\strokewidth-60 \\strokec0 Oh sing it out\\
We shout 'til the whole world\\
Knows His name Jesus\\
Sing it out\\
We shout for we \\
Will know Your name}`,
            textContent: `Oh sing it out
We shout 'til the whole world
Knows His name Jesus
Sing it out
We shout for we \nWill know Your name`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '3B42AB1A-1B9C-45A4-829C-FE876F751A1B',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Tahoma',
            size: 56,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
{\\fonttbl\\f0\\fnil\\fcharset0 Tahoma;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\b\\fs112 \\cf1 \\outl0\\strokewidth-60 \\strokec0 Jesus}`,
            textContent: 'Jesus',
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: 'D396A088-A9C3-49DD-9856-3E401229A7F6',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: '',
            size: 0,
            position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf320
{\\fonttbl}
{\\colortbl;\\red255\\green255\\blue255;}
}`,
            textContent: '',
          },
        ],
      },
    ] as IPro4Slide[]);
  });

  it('should get the data from "You Are.pro4"', () => {
    const testFile = readFileSync('./sample-files/v4 - You Are.pro4').toString();
    const parsedSong = parser.parse(testFile);

    expect(parsedSong.properties).toEqual({
      CCLIArtistCredits: '',
      CCLICopyrightInfo: 2006,
      CCLIDisplay: true,
      CCLILicenseNumber: '',
      CCLIPublisher: 'Robinson Lane Music/BMI',
      CCLISongTitle: 'You Are',
      album: '',
      artist: 'Todd Fields',
      author: '',
      backgroundColor: '0 0 0 1',
      category: 'Contemporary',
      creatorCode: 1349676880,
      docType: undefined,
      drawingBackgroundColor: undefined,
      height: 768,
      lastDateUsed: new Date('2022-01-01T00:00:00'),
      notes: '',
      resourcesDirectory: '',
      usedCount: 0,
      versionNumber: 400,
      width: 1024,
    } as IPro4Properties);

    expect(parsedSong.slides).toEqual([
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '2EDD17A7-D869-4DFC-A23B-1967DFF79790',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 every knee will bow\\
to bless Your name}`,
            textContent: `every knee will bow
to bless Your name`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '304D6BBF-66A9-45C8-B715-CF894DFBBB06',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 every tongue confess\\
that You are King}`,
            textContent: `every tongue confess
that You are King`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '0FEE7CA8-FFD6-4FBC-893E-92B61928C677',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 all for Your glory\\
all for Your glory}`,
            textContent: `all for Your glory
all for Your glory`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '000716DE-7F24-40FB-A168-8045982BDC28',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 every tear will soon\\
be wiped away}`,
            textContent: `every tear will soon
be wiped away`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: 'FB02B41A-E406-4B38-90E3-6BCE7AB1A4E3',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 every longing heart\\
will see Your face}`,
            textContent: `every longing heart
will see Your face`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '28DA8ACD-FE5B-4F28-9500-DE55E5F23A30',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 all for Your glory\\
all for Your name}`,
            textContent: `all for Your glory
all for Your name`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '73C9F594-5CF8-4BFD-A434-2E203F374661',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 You are God Jesus\\
Majesty}`,
            textContent: `You are God Jesus
Majesty`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: 'A88A77BC-ED0E-4DE2-9EC5-712146CE43D5',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 You are life Jesus\\
saving Me}`,
            textContent: `You are life Jesus
saving Me`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '9A826672-AA6A-414A-B2CF-4F86C493C2A5',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 You are King Jesus}`,
            textContent: `You are King Jesus`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '8EC73805-F251-4F47-8222-62DA92E0A4C7',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 all will see that\\
You are God}`,
            textContent: `all will see that
You are God`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '4E1F2E44-E6F7-4F63-BCCB-6463D6A806A0',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 every knee will bow\\
to bless Your name}`,
            textContent: `every knee will bow
to bless Your name`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '29D05B99-AAF3-44EF-8511-814DBF655ABD',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 every tongue confess\\
that You are King}`,
            textContent: `every tongue confess
that You are King`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '7E78A383-CED1-4636-88FB-290F303B7722',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 all for Your glory\\
all for Your name}`,
            textContent: `all for Your glory
all for Your name`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '6A1D70C9-9C61-47EA-A79C-9C1D86568A7E',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 You are God Jesus\\
Majesty}`,
            textContent: `You are God Jesus
Majesty`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: 'E76C66D2-A009-4BB2-992D-DF3CE01B1F17',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 You are life Jesus\\
saving Me}`,
            textContent: `You are life Jesus
saving Me`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '2B2A5315-5B41-424F-86A8-77DA559D7C27',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 You are King, Jesus}`,
            textContent: `You are King, Jesus`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '502B8E0F-D8E4-4ADA-AFD0-EF7A142FF164',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 all will see that\\
You are God}`,
            textContent: `all will see that
You are God`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: 'CC38D59A-C6AA-4C7E-9666-7DDAD458741E',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 death could not keep You}`,
            textContent: `death could not keep You`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '67E6A506-AD79-4906-9155-CC07C1CD0B7F',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 the grave could not \\
hold You}`,
            textContent: `the grave could not \nhold You`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: 'ECD278EB-6FD9-40C7-8367-702CE9F3C7AF',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 You are alive\\
You are alive}`,
            textContent: `You are alive
You are alive`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '39EB68E2-E926-4055-A567-9FB29345EE53',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 death could not keep You}`,
            textContent: `death could not keep You`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: 'AC0478A4-F4DE-4D4A-8138-91C703CCB17D',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 the grave could not \\
hold You}`,
            textContent: `the grave could not \nhold You`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '817904D5-B740-4A45-8806-24ECD307F865',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 You are alive\\
You are alive}`,
            textContent: `You are alive
You are alive`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '443BF1DD-0647-442C-8DD9-8CD51E91B010',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 You are God Jesus\\
Majesty}`,
            textContent: `You are God Jesus
Majesty`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: 'B4C90763-F9B0-4400-95C9-F315CBB6699A',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 You are life Jesus\\
saving Me}`,
            textContent: `You are life Jesus
saving Me`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '944FB294-7BE8-480B-8A92-AE4692BA24E2',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 You are King Jesus\\
all will see that}`,
            textContent: `You are King Jesus
all will see that`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '77ED5AB3-51D4-4A97-9F80-933F91242D9E',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 You are God Jesus\\
Majesty}`,
            textContent: `You are God Jesus
Majesty`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: 'B55FB30C-724F-420E-8F22-27A99E905EE5',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 You are life Jesus\\
saving Me}`,
            textContent: `You are life Jesus
saving Me`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: 'D956DABC-FCB0-4176-AA36-7982E703607D',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 You are King Jesus}`,
            textContent: `You are King Jesus`,
          },
        ],
      },
      {
        backgroundColor: '0 0 0 0',
        highlightColor: '0 0 0 0',
        label: '',
        id: '473D3A44-8A2A-4726-9D5E-0C06F4EF917B',
        textElements: [
          {
            color: { b: 255, g: 255, r: 255 },
            font: 'Helvetica',
            size: 60,
            position: { height: 748, width: 1004, x: 10, y: 10, z: 0 },
            rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf949\\cocoasubrtf540
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs120 \\cf1 all will see that\\
You are God}`,
            textContent: `all will see that
You are God`,
          },
        ],
      },
    ] as IPro4Slide[]);
  });
});
