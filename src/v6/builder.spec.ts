import { v6Builder } from './builder';

function normalizeDatesAndIdsForTesting(xmlStr: string): string {
  return xmlStr
    .replace(/lastDateUsed=".+?"/, 'lastDateUsed="2023-01-01T01:01:01"')
    .replace(/uuid=".+?"/gi, 'uuid="00001111-2222-3333-4444-555566667777"')
    .trim();
}

describe('V6 - Builder', (): void => {
  it('should create an song with minimal options, using a string array for slide text', () => {
    const builder = new v6Builder({
      properties: {
        CCLISongTitle: 'My Test Song',
      },
      slideGroups: [
        {
          label: 'Verse 1',
          slides: ['Hello World'],
        },
      ],
    });

    const expectedOutput = normalizeDatesAndIdsForTesting(`
<RVPresentationDocument CCLIArtistCredits="" CCLIAuthor="" CCLICopyrightYear="" CCLIDisplay="false" CCLIPublisher="" CCLISongNumber="" CCLISongTitle="My Test Song" category="Song" notes="" lastDateUsed="2023-06-20T15:29:44" height="720" width="1280" backgroundColor="0 0 0 1" buildNumber="6016" chordChartPath="" docType="0" drawingBackgroundColor="false" resourcesDirectory="" selectedArrangementID="" os="1" usedCount="0" versionNumber="600">
  <RVTransition rvXMLIvarName="transitionObject" transitionType="-1" transitionDirection="0" transitionDuration="1" motionEnabled="false" motionDuration="0" motionSpeed="0" groupIndex="0" orderIndex="0" slideBuildAction="0" slideBuildDelay="0"></RVTransition>
  <RVTimeline rvXMLIvarName="timeline" timeOffset="0" duration="0" selectedMediaTrackIndex="0" loop="false">
    <array rvXMLIvarName="timeCues"/>
    <array rvXMLIvarName="mediaTracks"/>
  </RVTimeline>
  <array rvXMLIvarName="groups">
    <RVSlideGrouping name="Verse 1" uuid="D6E8ADBE-A8EE-1AA7-1700-21AFF600646E" color="0 0 0 0">
      <array rvXMLIvarName="slides">
        <RVDisplaySlide backgroundColor="0 0 0 0" highlightColor="0 0 0 0" drawingBackgroundColor enabled hotKey="" label="" notes="" UUID="9D17FB89-1159-D1EC-E3FD-0E2780FE70CA" chordChartPath="">
          <array rvXMLIvarName="cues"/>
          <array rvXMLIvarName="displayElements">
            <RVTextElement displayName="Default" UUID="B3241B5B-4150-8F52-9725-53436C2F097D" typeID="1" displayDelay="0" locked="false" persistent="0" fromTemplate="false" opacity="1" source="" bezelRadius="0" rotation="0" drawingFill="false" drawingShadow="false" drawingStroke="false" fillColor="1 1 1 0" adjustsHeightToFit="false" verticalAlignment="1" revealType="0">
              <RVRect3D rvXMLIvarName="position"></RVRect3D>
              <shadow rvXMLIvarName="shadow"></shadow>
              <dictionary rvXMLIvarName="stroke">
                <NSColor rvXMLDictionaryKey="RVShapeElementStrokeColorKey"></NSColor>
                <NSNumber rvXMLDictionaryKey="RVShapeElementStrokeWidthKey" hint="double">0</NSNumber>
              </dictionary>
              <NSString rvXMLIvarName="PlainText">SGVsbG8gV29ybGQ=</NSString>
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBBcmlhbDt9e1xjb2xvcnRibDtccmVkMjU1XGdyZWVuMjU1XGJsdWUyNTU7fVxwYXJkXHR4NTYwXHR4MTEyMFx0eDE2ODBcdHgyMjQwXHR4MjgwMFx0eDMzNjBcdHgzOTIwXHR4NDQ4MFx0eDUwNDBcdHg1NjAwXHR4NjE2MFx0eDY3MjBccWNccGFyZGlybmF0dXJhbFxmMFxmczEyMCBcY2YxIEhlbGxvIFdvcmxkfQ==</NSString>
              <NSString rvXMLIvarName="WinFlowData"></NSString>
              <NSString rvXMLIvarName="WinFontData"></NSString>
            </RVTextElement>
          </array>
        </RVDisplaySlide>
      </array>
    </RVSlideGrouping>
  </array>
  <array rvXMLIvarName="arrangements"/>
</RVPresentationDocument>`);

    // console.log(builder.build());

    expect(normalizeDatesAndIdsForTesting(builder.build())).toEqual(expectedOutput);
  });
});
