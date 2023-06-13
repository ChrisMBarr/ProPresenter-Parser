import { v5Builder } from './v5-builder';

function normalizeDatesAndIdsForTesting(xmlStr: string): string {
  return xmlStr
    .replace(/lastDateUsed=".+?"/, 'lastDateUsed="2023-01-01T01:01:01"')
    .replace(/uuid=".+?"/g, 'uuid="00001111-2222-3333-4444-555566667777"')
    .trim();
}

describe('v5Builder', (): void => {
  let builder: v5Builder;

  beforeEach(() => {
    builder = new v5Builder();
  });

  it('should exist', () => {
    expect(builder).toBeDefined();
  });

  it('should create an song with minimal options provided', () => {
    const builtSong = builder.build({
      properties: {
        title: 'My Test Song',
      },
      slideGroups: [
        {
          label: 'Verse 1',
          slides: [],
        },
      ],
    });

    const expectedOutput = normalizeDatesAndIdsForTesting(`
<RVPresentationDocument CCLIArtistCredits="" CCLICopyrightInfo="" CCLIDisplay="0" CCLILicenseNumber="" CCLIPublisher="" CCLISongTitle="My Test Song" album="" artist="" author="" backgroundColor="0 0 0 1" category="Song" creatorCode="0" chordChartPath="" docType="0" drawingBackgroundColor="0" height="720" width="1280" lastDateUsed="2023-06-13T18:41:15" notes="" resourcesDirectory="" usedCount="0" versionNumber="500">
  <timeline timeOffSet="0" selectedMediaTrackIndex="0" unitOfMeasure="60" duration="0" loop="0">
    <timeCues containerClass="NSMutableArray"></timeCues>
    <mediaTracks containerClass="NSMutableArray"></mediaTracks>
  </timeline>
  <bibleReference containerClass="NSMutableDictionary"></bibleReference>
  <_-RVProTransitionObject-_transitionObject transitionType="-1" transitionDuration="1" motionEnabled="0" motionDuration="20" motionSpeed="100"></_-RVProTransitionObject-_transitionObject>
  <groups containerClass="NSMutableArray">
    <RVSlideGrouping name="Verse 1" color="0 0 0 0" uuid="16062178-4336-B335-82FC-F4463E715951">
      <slides></slides>
    </RVSlideGrouping>
  </groups>
  <arrangements containerClass="NSMutableArray"></arrangements>
</RVPresentationDocument>`);

    expect(normalizeDatesAndIdsForTesting(builtSong)).toEqual(expectedOutput);
  });
});
