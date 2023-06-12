import { readFileSync } from 'fs';
import { v4Parser } from './v4-parser';

describe('v4Parser', (): void => {
  let parser: v4Parser;

  beforeEach(() => {
    parser = new v4Parser();
  });

  it('should exist', () => {
    expect(parser).toBeDefined();
  });

  it('should get the data from "Be Neat.pro4"', () => {
    const testFile = readFileSync('./sample-files/v4 - Be Near.pro4').toString();
    const parsedSong = parser.parse(testFile);

    expect(parsedSong).toEqual({});
  });
});
