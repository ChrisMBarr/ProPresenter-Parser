import { readFileSync } from 'fs';
import { v4Parser } from './v4-parser';
import { IPro4Properties } from './v4-parser.model';

describe('v4Parser', (): void => {
  let parser: v4Parser;

  beforeEach(() => {
    parser = new v4Parser();
  });

  it('should exist', () => {
    expect(parser).toBeDefined();
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
  });
});
