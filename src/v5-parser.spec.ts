import { readFileSync } from 'fs';
import { v5Parser } from './v5-parser';
import { IPro5Properties } from './v5-parser.model';

describe('v5Parser', (): void => {
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
      expect(err).toEqual(
        Error(`Expected a ProPresenter 5 file with versionNumber="500" but got versionNumber="400"`)
      );
    }
  });

  it('should get the data from "Be Near.pro5"', () => {
    const testFile = readFileSync('./sample-files/v5 - Be Near.pro5').toString();
    const parsedSong = parser.parse(testFile);

    expect(parsedSong.properties).toEqual({
      CCLIArtistCredits: '',
      CCLICopyrightInfo: 2003,
      CCLIDisplay: 0,
      CCLILicenseNumber: '',
      CCLIPublisher: 'Waiting Room Music',
      CCLISongTitle: 'Be Near',
      album: '',
      artist: 'Shane Bernard',
      author: '',
      backgroundColor: '0 0 0 1',
      category: 'Song',
      creatorCode: 1349676880,
      docType: 0,
      drawingBackgroundColor: 0,
      height: 1050,
      lastDateUsed: new Date('2014-10-12T20:44:32'),
      notes: '',
      resourcesDirectory: '',
      usedCount: 0,
      versionNumber: 500,
      width: 1680,
    } as IPro5Properties);

    // expect(parsedSong.slides).toEqual([] as IPro5Slide[]);
  });
});
