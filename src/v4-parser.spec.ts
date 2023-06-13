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
      expect(err).toEqual(
        Error(`Expected a ProPresenter 4 file with versionNumber="400" but got versionNumber="500"`)
      );
    }
  });

  it('should get the data from "Be Near.pro4"', () => {
    const testFile = readFileSync('./sample-files/v4 - Be Near.pro4').toString();
    const parsedSong = parser.parse(testFile);

    expect(parsedSong.properties).toEqual({
      CCLIArtistCredits: '',
      CCLICopyrightInfo: 2003,
      CCLIDisplay: 0,
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
      CCLIDisplay: 0,
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
      CCLIDisplay: 0,
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
      CCLIDisplay: 0,
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
