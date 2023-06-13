import { readFileSync } from 'fs';
import { v5Parser } from './v5-parser';
import { IPro5Arrangement, IPro5Properties } from './v5-parser.model';

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
      CCLIDisplay: false,
      CCLILicenseNumber: '',
      CCLIPublisher: 'Waiting Room Music',
      CCLISongTitle: 'Be Near',
      album: '',
      artist: 'Shane Bernard',
      author: '',
      backgroundColor: '0 0 0 1',
      category: 'Song',
      creatorCode: 1349676880,
      chordChartPath: '',
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

    expect(parsedSong.arrangements).toEqual([
      {
        name: 'Worship',
        color: '0 0 0 0',
        slideGroups: [
          {
            groupId: '72801056-2a83-7531-0a6b-c038601f3a57',
            groupName: '',
          },
          {
            groupId: '879b9305-3db4-7632-b826-715a1c7284cd',
            groupName: '',
          },
          {
            groupId: 'A8499FCB-AF89-40D8-9671-E85706B8EA0B',
            groupName: '',
          },
          {
            groupId: '319f1463-3c59-9268-623b-be2da570f476',
            groupName: '',
          },
          {
            groupId: '319f1463-3c59-9268-623b-be2da570f476',
            groupName: '',
          },
          {
            groupId: 'E5052FF3-7B57-42A7-A348-E5C52C770AED',
            groupName: '',
          },
          {
            groupId: '0173b2d0-7137-58b2-1903-67def417faac',
            groupName: '',
          },
          {
            groupId: 'A8499FCB-AF89-40D8-9671-E85706B8EA0B',
            groupName: '',
          },
          {
            groupId: '319f1463-3c59-9268-623b-be2da570f476',
            groupName: '',
          },
          {
            groupId: '319f1463-3c59-9268-623b-be2da570f476',
            groupName: '',
          },
          {
            groupId: '319f1463-3c59-9268-623b-be2da570f476',
            groupName: '',
          },
          {
            groupId: '319f1463-3c59-9268-623b-be2da570f476',
            groupName: '',
          },
          {
            groupId: '26520F92-9B90-4CB6-BBB6-65958B7AECDA',
            groupName: '',
          },
          {
            groupId: 'cba67af7-515f-5048-79f8-155a2f1ca390',
            groupName: '',
          },
        ],
      },
    ] as IPro5Arrangement[]);

    // expect(parsedSong.slides).toEqual([] as IPro5Slide[]);
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
      backgroundColor: '0 0 0 1',
      category: 'Song',
      creatorCode: 1349676880,
      chordChartPath: '',
      docType: 0,
      drawingBackgroundColor: 0,
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
        name: 'Worship',
        color: '0 0 0 0',
        slideGroups: [
          {
            groupId: 'f47699e5-16ee-dd17-2d1b-d1e0b273bd17',
            groupName: '',
          },
          {
            groupId: '4247fa5c-7356-d364-f50c-687c3f4f0311',
            groupName: '',
          },
          {
            groupId: 'aab101ba-6d12-524d-a896-91c8e3c936ce',
            groupName: '',
          },
          {
            groupId: 'aab101ba-6d12-524d-a896-91c8e3c936ce',
            groupName: '',
          },
          {
            groupId: 'B8A48E6A-3FBF-444D-B8A8-FBF350C619C8',
            groupName: '',
          },
          {
            groupId: 'B8A48E6A-3FBF-444D-B8A8-FBF350C619C8',
            groupName: '',
          },
          {
            groupId: '4247fa5c-7356-d364-f50c-687c3f4f0311',
            groupName: '',
          },
          {
            groupId: 'aab101ba-6d12-524d-a896-91c8e3c936ce',
            groupName: '',
          },
          {
            groupId: 'aab101ba-6d12-524d-a896-91c8e3c936ce',
            groupName: '',
          },
          {
            groupId: 'B8A48E6A-3FBF-444D-B8A8-FBF350C619C8',
            groupName: '',
          },
          {
            groupId: 'B8A48E6A-3FBF-444D-B8A8-FBF350C619C8',
            groupName: '',
          },
          {
            groupId: 'e3972cf2-6527-314f-b423-040244fc089a',
            groupName: '',
          },
        ],
      },
    ] as IPro5Arrangement[]);

    // expect(parsedSong.slides).toEqual([] as IPro5Slide[]);
  });
});
