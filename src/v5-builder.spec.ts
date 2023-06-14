import { v5Builder } from './v5-builder';

function normalizeDatesAndIdsForTesting(xmlStr: string): string {
  return xmlStr
    .replace(/lastDateUsed=".+?"/, 'lastDateUsed="2023-01-01T01:01:01"')
    .replace(/uuid=".+?"/gi, 'uuid="00001111-2222-3333-4444-555566667777"')
    .trim();
}

describe('v5Builder', (): void => {
  it('should create an song with minimal options, using a string array for slide text', () => {
    const builder = new v5Builder({
      properties: {
        title: 'My Test Song',
      },
      slideGroups: [
        {
          label: 'Verse 1',
          slides: ['Hello World'],
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
    <RVSlideGrouping name="Verse 1" uuid="16062178-4336-B335-82FC-F4463E715951" color="0 0 0 0" serialization-array-index="0">
      <slides containerClass="NSMutableArray">
        <RVDisplaySlide backgroundColor="0 0 0 0" enabled="1" highlightColor="0 0 0 0" hotKey="" label="" notes="" slideType="1" sort_index="0" uuid="00001111-2222-3333-4444-555566667777" drawingBackgroundColor="0" chordChartPath="" serialization-array-index="0">
          <cues containerClass="NSMutableArray"></cues>
          <displayElements containerClass="NSMutableArray">
            <RVTextElement displayDelay="0" displayName="Default" locked="0" persistent="0" typeID="0" fromTemplate="0" bezelRadius="0" drawingFill="0" drawingShadow="1" drawingStroke="0" fillColor="1 1 1 1" rotation="0" source="" adjustsHeightToFit="0" verticalAlignment="0" RTFData="e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJywKe1xmb250dGJsXGYwXGZzd2lzc1xmY2hhcnNldDAgQXJpYWw7fQp7XGNvbG9ydGJsO1xyZWQyNTVcZ3JlZW4yNTVcYmx1ZTI1NTt9ClxwYXJkXHR4NTYwXHR4MTEyMFx0eDE2ODBcdHgyMjQwXHR4MjgwMFx0eDMzNjBcdHgzOTIwXHR4NDQ4MFx0eDUwNDBcdHg1NjAwXHR4NjE2MFx0eDY3MjBccWNccGFyZGlybmF0dXJhbAoKXGYwXGZzMTIwIFxjZjEgXA1IZWxsbyBXb3JsZH0=" revealType="0" serialization-array-index="0">
              <stroke>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="RVShapeElementStrokeColorKey"></NSColor>
                <NSNumber serialization-native-value="1" serialization-dictionary-key="RVShapeElementStrokeWidthKey"></NSNumber>
              </stroke>
              <_-D-_serializedShadow>
                <NSMutableString serialization-native-value="{3.4641016, -2}" serialization-dictionary-key="shadowOffset"></NSMutableString>
                <NSNumber serialization-native-value="4" serialization-dictionary-key="shadowBlurRadius"></NSNumber>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="shadowColor"></NSColor>
              </_-D-_serializedShadow>
              <_-RVRect3D-_position x="20" y="20" z="0" width="1240" height="680"></_-RVRect3D-_position>
            </RVTextElement>
          </displayElements>
          <_-RVProTransitionObject-_transitionObject transitionType="-1" transitionDuration="1" motionEnabled="0" motionDuration="20" motionSpeed="100"></_-RVProTransitionObject-_transitionObject>
        </RVDisplaySlide>
      </slides>
    </RVSlideGrouping>
  </groups>
  <arrangements containerClass="NSMutableArray"></arrangements>
</RVPresentationDocument>`);

    expect(normalizeDatesAndIdsForTesting(builder.build())).toEqual(expectedOutput);
  });
});
