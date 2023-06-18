import { readFileSync } from 'fs';
import { v6Parser } from './v6-parser';
import { IPro6Arrangement, IPro6Properties } from './v6-parser.model';

describe('v6Parser', (): void => {
  let parser: v6Parser;

  beforeEach(() => {
    parser = new v6Parser();
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
      expect(err).toEqual(Error(`Expected a ProPresenter 6 file with versionNumber="600" but got versionNumber="400"`));
    }
  });

  it('should get the data from "Amazing Grace.pro6', () => {
    const testFile = readFileSync('./sample-files/v6 - Amazing Grace.pro6').toString();
    const parsedSong = parser.parse(testFile);

    expect(parsedSong.properties).toEqual({
      CCLIArtistCredits: 'John Newton',
      CCLIAuthor: '',
      CCLICopyrightYear: '',
      CCLIDisplay: false,
      CCLIPublisher: '',
      CCLISongNumber: '',
      CCLISongTitle: 'Amazing Grace',
      backgroundColor: { r: 0, g: 0, b: 0 },
      buildNumber: 6016,
      category: 'Song',
      chordChartPath: '',
      docType: 0,
      drawingBackgroundColor: false,
      height: 1080,
      lastDateUsed: new Date('2023-06-16T02:27:25+00:00'),
      notes: '',
      os: 1,
      resourcesDirectory: '',
      selectedArrangementID: '',
      usedCount: 0,
      versionNumber: 600,
      width: 1920,
    } as IPro6Properties);

    expect(parsedSong.arrangements).toEqual([
      {
        color: { b: 255, g: 255, r: 255 },
        groupOrder: [
          { groupId: '5CB33287-B7EC-37BF-46E4-64DF8B619FD5', groupLabel: 'Blank' },
          { groupId: '1E80B87B-831A-A1D5-7D5F-0F42AE338C89', groupLabel: 'Verse 1' },
          { groupId: 'C7CE935F-2321-48C2-BBCA-5DEC88557BBF', groupLabel: 'Verse 2' },
          { groupId: 'C8430423-1BEC-4713-8589-F91DE89A2721', groupLabel: 'Verse 3' },
          { groupId: 'DC7B53AF-F36F-4119-BDFA-F9BC398CBB94', groupLabel: 'Verse 4' },
          { groupId: '5CB33287-B7EC-37BF-46E4-64DF8B619FD5', groupLabel: 'Blank' },
        ],
        label: 'Worship',
      },
    ] as IPro6Arrangement[]);
  });

  it('should get the data from "Be Near.pro6', () => {
    const testFile = readFileSync('./sample-files/v6 - Be Near.pro6').toString();
    const parsedSong = parser.parse(testFile);

    expect(parsedSong.properties).toEqual({
      CCLIArtistCredits: 'Shane Bernard',
      CCLIAuthor: '',
      CCLICopyrightYear: 2003,
      CCLIDisplay: false,
      CCLIPublisher: 'Waiting Room Music',
      CCLISongNumber: '',
      CCLISongTitle: 'Be Near',
      backgroundColor: { r: 0, g: 0, b: 0 },
      buildNumber: 6016,
      category: 'Song',
      chordChartPath: '',
      docType: 0,
      drawingBackgroundColor: false,
      height: 1080,
      lastDateUsed: new Date('2023-05-18T00:03:20+00:00'),
      notes: '',
      os: 1,
      resourcesDirectory: '',
      selectedArrangementID: '',
      usedCount: 0,
      versionNumber: 600,
      width: 1920,
    } as IPro6Properties);

    expect(parsedSong.arrangements).toEqual([] as IPro6Arrangement[]);
  });
});
