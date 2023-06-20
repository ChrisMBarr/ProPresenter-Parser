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
          slides: ['Hello World\nline 2'],
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
        <RVDisplaySlide backgroundColor="0 0 0 0" highlightColor="0 0 0 0" drawingBackgroundColor="false" enabled="true" hotKey="" label="" notes="" UUID="9D17FB89-1159-D1EC-E3FD-0E2780FE70CA" chordChartPath="">
          <array rvXMLIvarName="cues"/>
          <array rvXMLIvarName="displayElements">
            <RVTextElement displayName="Default" UUID="B3241B5B-4150-8F52-9725-53436C2F097D" typeID="0" displayDelay="0" locked="false" persistent="0" fromTemplate="false" opacity="1" source="" bezelRadius="0" rotation="0" drawingFill="false" drawingShadow="false" drawingStroke="false" fillColor="1 1 1 0" adjustsHeightToFit="false" verticalAlignment="0" revealType="0">
              <RVRect3D rvXMLIvarName="position">{20 20 0 1240 680}</RVRect3D>
              <shadow rvXMLIvarName="shadow">10|0 0 0 1|{4.949747468305833, -4.949747468305832}</shadow>
              <dictionary rvXMLIvarName="stroke">
                <NSColor rvXMLDictionaryKey="RVShapeElementStrokeColorKey">0 0 0 1</NSColor>
                <NSNumber rvXMLDictionaryKey="RVShapeElementStrokeWidthKey" hint="double">0</NSNumber>
              </dictionary>
              <NSString rvXMLIvarName="PlainText">SGVsbG8gV29ybGQKbGluZSAy</NSString>
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBBcmlhbDt9e1xjb2xvcnRibDtccmVkMjU1XGdyZWVuMjU1XGJsdWUyNTU7fVxwYXJkXHR4NTYwXHR4MTEyMFx0eDE2ODBcdHgyMjQwXHR4MjgwMFx0eDMzNjBcdHgzOTIwXHR4NDQ4MFx0eDUwNDBcdHg1NjAwXHR4NjE2MFx0eDY3MjBccWNccGFyZGlybmF0dXJhbFxmMFxmczEyMCBcY2YxIEhlbGxvIFdvcmxkXA1saW5lIDJ9</NSString>
              <NSString rvXMLIvarName="WinFlowData">PEZsb3dEb2N1bWVudCBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIFBhZ2VQYWRkaW5nPSI1LDAsNSwwIiBBbGxvd0Ryb3A9IlRydWUiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dpbmZ4LzIwMDYveGFtbC9wcmVzZW50YXRpb24iPjxQYXJhZ3JhcGggTWFyZ2luPSIwLDAsMCwwIiBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIEZvbnRGYW1pbHk9IkFyaWFsIiBGb250U2l6ZT0iNjAiPjxSdW4gRm9udEZhbWlseT0iQXJpYWwiIEZvbnRTaXplPSI2MCIgRm9yZWdyb3VuZD0iI0ZGRkZGRkZGIiBCbG9jay5UZXh0QWxpZ25tZW50PSJDZW50ZXIiPkhlbGxvIFdvcmxkPC9SdW4+PC9QYXJhZ3JhcGg+PFBhcmFncmFwaCBNYXJnaW49IjAsMCwwLDAiIFRleHRBbGlnbm1lbnQ9IkNlbnRlciIgRm9udEZhbWlseT0iQXJpYWwiIEZvbnRTaXplPSI2MCI+PFJ1biBGb250RmFtaWx5PSJBcmlhbCIgRm9udFNpemU9IjYwIiBGb3JlZ3JvdW5kPSIjRkZGRkZGRkYiIEJsb2NrLlRleHRBbGlnbm1lbnQ9IkNlbnRlciI+bGluZSAyPC9SdW4+PC9QYXJhZ3JhcGg+PC9GbG93RG9jdW1lbnQ+</NSString>
              <NSString rvXMLIvarName="WinFontData">PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTE2Ij8+PFJWRm9udCB4bWxuczppPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9Qcm9QcmVzZW50ZXIuQ29tbW9uIj48S2VybmluZz4wPC9LZXJuaW5nPjxMaW5lU3BhY2luZz4wPC9MaW5lU3BhY2luZz48T3V0bGluZUNvbG9yIHhtbG5zOmQycDE9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9TeXN0ZW0uV2luZG93cy5NZWRpYSI+PGQycDE6QT4yNTU8L2QycDE6QT48ZDJwMTpCPjA8L2QycDE6Qj48ZDJwMTpHPjA8L2QycDE6Rz48ZDJwMTpSPjA8L2QycDE6Uj48ZDJwMTpTY0E+MTwvZDJwMTpTY0E+PGQycDE6U2NCPjA8L2QycDE6U2NCPjxkMnAxOlNjRz4wPC9kMnAxOlNjRz48ZDJwMTpTY1I+MDwvZDJwMTpTY1I+PC9PdXRsaW5lQ29sb3I+PE91dGxpbmVXaWR0aD4wPC9PdXRsaW5lV2lkdGg+PFZhcmlhbnRzPk5vcm1hbDwvVmFyaWFudHM+PC9SVkZvbnQ+</NSString>
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
