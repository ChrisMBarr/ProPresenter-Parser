import { IProTransitionType } from '../shared.model';
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
<?xml version="1.0" encoding="utf-8"?>
<RVPresentationDocument CCLIArtistCredits="" CCLIAuthor="" CCLICopyrightYear="" CCLIDisplay="false" CCLIPublisher="" CCLISongNumber="" CCLISongTitle="My Test Song" category="Song" notes="" lastDateUsed="2023-06-20T15:29:44" height="720" width="1280" backgroundColor="0 0 0 1" buildNumber="6016" chordChartPath="" docType="0" drawingBackgroundColor="false" resourcesDirectory="" selectedArrangementID="" os="1" usedCount="0" versionNumber="600">
  <RVTransition rvXMLIvarName="transitionObject" transitionType="-1" transitionDirection="0" transitionDuration="1" motionEnabled="false" motionDuration="0" motionSpeed="0" groupIndex="0" orderIndex="0" slideBuildAction="0" slideBuildDelay="0"/>
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
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwe1xmb250dGJsXGYwXGZzd2lzc1xmY2hhcnNldDAgQXJpYWw7fXtcY29sb3J0Ymw7XHJlZDI1NVxncmVlbjI1NVxibHVlMjU1O31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxMjAgXGNmMSBIZWxsbyBXb3JsZFwNbGluZSAyfQ==</NSString>
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

    expect(normalizeDatesAndIdsForTesting(builder.build())).toEqual(expectedOutput);
  });

  it('should create an song with lots of options using mixed string and object for slide text', () => {
    const builder = new v6Builder({
      properties: {
        CCLIArtistCredits: 'Chris Tomlin',
        CCLIAuthor: 'John Newton, Chris Tomlin',
        CCLICopyrightYear: 2006,
        CCLIDisplay: true,
        // cspell:disable-next-line
        CCLIPublisher: 'worshiptogether.com Songs/sixsteps Music, Vamos Publishing, admin. Capitol CMG Publishing',
        CCLISongNumber: 12345678,
        CCLISongTitle: 'My Test Song',
        category: 'Hymn',
        notes: 'Pastor Bill loves this one',
        height: 1080,
        width: 1920,
      },
      slideTextFormatting: {
        fontName: 'Impact',
        textColor: '#FAFAFA',
        textSize: 80,
        textPadding: 40,
        textShadow: {
          angle: 45,
          color: { r: 128, g: 128, b: 128 },
          enabled: true,
          length: 4,
          radius: 8,
        },
      },
      transitions: {
        duration: 0.4, //400ms
        type: IProTransitionType.ZoomInLeft,
      },
      slideGroups: [
        {
          label: 'Blank',
          slides: [''], //Add a blank slide group with 1 slide that has no text. Good for setting a BG image on
        },
        {
          label: 'Verse 1',
          groupColor: { r: 0, g: 0, b: 255 },
          slides: [
            'Amazing grace, How sweet the sound\nThat saved a wretch like me',
            'I once was lost, but now I am found,\nWas blind, but now I see',
          ],
        },
        {
          label: 'Verse 2',
          groupColor: { r: 0, g: 100, b: 255 },
          slides: [
            "'Twas Grace that taught my heart to fear\nAnd Grace, my fears relieved",
            'How precious did that Grace appear\nThe hour I first believed',
          ],
        },
        {
          label: 'Verse 3',
          groupColor: { r: 0, g: 200, b: 255 },
          slides: [
            'The Lord has promised good to me\nHis word my hope secures',
            'He will my shield and portion be\nAs long as life endures',
          ],
        },
        {
          label: 'Verse 4',
          groupColor: { r: 0, g: 255, b: 255 },
          slides: [
            'The earth shall soon dissolve like snow\nThe sun forbear to shine',
            'But God, Who called me here below\nWill be forever mine\nWill be forever mine',
            { text: 'You are forever mine', label: 'Might repeat 2-3x', slideColor: '#FFA500' },
          ],
        },
        {
          label: 'Chorus',
          groupColor: { r: 255, g: 100, b: 100 },
          slides: [
            { text: "My chains are gone, I've been set free\nMy God, my Savior has ransomed me" },
            { text: 'And like a flood His mercy reigns\nUnending love, amazing grace' },
          ],
        },
        {
          label: 'Ending',
          slides: [{ text: 'Amazing grace', label: 'Leave on screen' }],
        },
      ],
    });

    const expectedOutput = normalizeDatesAndIdsForTesting(`
<?xml version="1.0" encoding="utf-8"?>
<RVPresentationDocument CCLIArtistCredits="Chris Tomlin" CCLIAuthor="John Newton, Chris Tomlin" CCLICopyrightYear="2006" CCLIDisplay="true" CCLIPublisher="worshiptogether.com Songs/sixsteps Music, Vamos Publishing, admin. Capitol CMG Publishing" CCLISongNumber="12345678" CCLISongTitle="My Test Song" category="Hymn" notes="Pastor Bill loves this one" lastDateUsed="2023-06-21T01:33:21" height="1080" width="1920" backgroundColor="0 0 0 1" buildNumber="6016" chordChartPath="" docType="0" drawingBackgroundColor="false" resourcesDirectory="" selectedArrangementID="" os="1" usedCount="0" versionNumber="600">
  <RVTransition rvXMLIvarName="transitionObject" transitionType="106" transitionDirection="0" transitionDuration="0.4" motionEnabled="false" motionDuration="0" motionSpeed="0" groupIndex="0" orderIndex="0" slideBuildAction="0" slideBuildDelay="0"/>
  <RVTimeline rvXMLIvarName="timeline" timeOffset="0" duration="0" selectedMediaTrackIndex="0" loop="false">
    <array rvXMLIvarName="timeCues"/>
    <array rvXMLIvarName="mediaTracks"/>
  </RVTimeline>
  <array rvXMLIvarName="groups">
    <RVSlideGrouping name="Blank" uuid="AAD34AAA-093F-66E4-A0AD-3AD4FBED977D" color="0 0 0 0">
      <array rvXMLIvarName="slides">
        <RVDisplaySlide backgroundColor="0 0 0 0" highlightColor="0 0 0 0" drawingBackgroundColor="false" enabled="true" hotKey="" label="" notes="" UUID="B0F34284-68D9-E4B5-8EB7-30189697D988" chordChartPath="">
          <array rvXMLIvarName="cues"/>
          <array rvXMLIvarName="displayElements">
            <RVTextElement displayName="Default" UUID="F4C246D1-A924-8FC5-21BB-8F601A77D0EC" typeID="0" displayDelay="0" locked="false" persistent="0" fromTemplate="false" opacity="1" source="" bezelRadius="0" rotation="0" drawingFill="false" drawingShadow="true" drawingStroke="false" fillColor="1 1 1 0" adjustsHeightToFit="false" verticalAlignment="0" revealType="0">
              <RVRect3D rvXMLIvarName="position">{40 40 0 1840 1000}</RVRect3D>
              <shadow rvXMLIvarName="shadow">8|0.5019607843137255 0.5019607843137255 0.5019607843137255 1|{2.82842712474619, 2.8284271247461903}</shadow>
              <dictionary rvXMLIvarName="stroke">
                <NSColor rvXMLDictionaryKey="RVShapeElementStrokeColorKey">0 0 0 1</NSColor>
                <NSNumber rvXMLDictionaryKey="RVShapeElementStrokeWidthKey" hint="double">0</NSNumber>
              </dictionary>
              <NSString rvXMLIvarName="PlainText"></NSString>
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwe1xmb250dGJsXGYwXGZzd2lzc1xmY2hhcnNldDAgSW1wYWN0O317XGNvbG9ydGJsO1xyZWQyNTBcZ3JlZW4yNTBcYmx1ZTI1MDt9XHBhcmRcdHg1NjBcdHgxMTIwXHR4MTY4MFx0eDIyNDBcdHgyODAwXHR4MzM2MFx0eDM5MjBcdHg0NDgwXHR4NTA0MFx0eDU2MDBcdHg2MTYwXHR4NjcyMFxxY1xwYXJkaXJuYXR1cmFsXGYwXGZzMTYwIFxjZjEgfQ==</NSString>
              <NSString rvXMLIvarName="WinFlowData">PEZsb3dEb2N1bWVudCBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIFBhZ2VQYWRkaW5nPSI1LDAsNSwwIiBBbGxvd0Ryb3A9IlRydWUiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dpbmZ4LzIwMDYveGFtbC9wcmVzZW50YXRpb24iPjwvRmxvd0RvY3VtZW50Pg==</NSString>
              <NSString rvXMLIvarName="WinFontData">PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTE2Ij8+PFJWRm9udCB4bWxuczppPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9Qcm9QcmVzZW50ZXIuQ29tbW9uIj48S2VybmluZz4wPC9LZXJuaW5nPjxMaW5lU3BhY2luZz4wPC9MaW5lU3BhY2luZz48T3V0bGluZUNvbG9yIHhtbG5zOmQycDE9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9TeXN0ZW0uV2luZG93cy5NZWRpYSI+PGQycDE6QT4yNTU8L2QycDE6QT48ZDJwMTpCPjA8L2QycDE6Qj48ZDJwMTpHPjA8L2QycDE6Rz48ZDJwMTpSPjA8L2QycDE6Uj48ZDJwMTpTY0E+MTwvZDJwMTpTY0E+PGQycDE6U2NCPjA8L2QycDE6U2NCPjxkMnAxOlNjRz4wPC9kMnAxOlNjRz48ZDJwMTpTY1I+MDwvZDJwMTpTY1I+PC9PdXRsaW5lQ29sb3I+PE91dGxpbmVXaWR0aD4wPC9PdXRsaW5lV2lkdGg+PFZhcmlhbnRzPk5vcm1hbDwvVmFyaWFudHM+PC9SVkZvbnQ+</NSString>
            </RVTextElement>
          </array>
        </RVDisplaySlide>
      </array>
    </RVSlideGrouping>
    <RVSlideGrouping name="Verse 1" uuid="833D9D2B-E381-CE5A-159A-078BF011388D" color="0 0 1 1">
      <array rvXMLIvarName="slides">
        <RVDisplaySlide backgroundColor="0 0 0 0" highlightColor="0 0 0 0" drawingBackgroundColor="false" enabled="true" hotKey="" label="" notes="" UUID="334EF0D4-F6AB-7C0F-AF35-64DD5E35CC67" chordChartPath="">
          <array rvXMLIvarName="cues"/>
          <array rvXMLIvarName="displayElements">
            <RVTextElement displayName="Default" UUID="E46C7C53-8BF6-FF2F-F5DD-508B53E2DB82" typeID="0" displayDelay="0" locked="false" persistent="0" fromTemplate="false" opacity="1" source="" bezelRadius="0" rotation="0" drawingFill="false" drawingShadow="true" drawingStroke="false" fillColor="1 1 1 0" adjustsHeightToFit="false" verticalAlignment="0" revealType="0">
              <RVRect3D rvXMLIvarName="position">{40 40 0 1840 1000}</RVRect3D>
              <shadow rvXMLIvarName="shadow">8|0.5019607843137255 0.5019607843137255 0.5019607843137255 1|{2.82842712474619, 2.8284271247461903}</shadow>
              <dictionary rvXMLIvarName="stroke">
                <NSColor rvXMLDictionaryKey="RVShapeElementStrokeColorKey">0 0 0 1</NSColor>
                <NSNumber rvXMLDictionaryKey="RVShapeElementStrokeWidthKey" hint="double">0</NSNumber>
              </dictionary>
              <NSString rvXMLIvarName="PlainText">QW1hemluZyBncmFjZSwgSG93IHN3ZWV0IHRoZSBzb3VuZApUaGF0IHNhdmVkIGEgd3JldGNoIGxpa2UgbWU=</NSString>
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwe1xmb250dGJsXGYwXGZzd2lzc1xmY2hhcnNldDAgSW1wYWN0O317XGNvbG9ydGJsO1xyZWQyNTBcZ3JlZW4yNTBcYmx1ZTI1MDt9XHBhcmRcdHg1NjBcdHgxMTIwXHR4MTY4MFx0eDIyNDBcdHgyODAwXHR4MzM2MFx0eDM5MjBcdHg0NDgwXHR4NTA0MFx0eDU2MDBcdHg2MTYwXHR4NjcyMFxxY1xwYXJkaXJuYXR1cmFsXGYwXGZzMTYwIFxjZjEgQW1hemluZyBncmFjZSwgSG93IHN3ZWV0IHRoZSBzb3VuZFwNVGhhdCBzYXZlZCBhIHdyZXRjaCBsaWtlIG1lfQ==</NSString>
              <NSString rvXMLIvarName="WinFlowData">PEZsb3dEb2N1bWVudCBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIFBhZ2VQYWRkaW5nPSI1LDAsNSwwIiBBbGxvd0Ryb3A9IlRydWUiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dpbmZ4LzIwMDYveGFtbC9wcmVzZW50YXRpb24iPjxQYXJhZ3JhcGggTWFyZ2luPSIwLDAsMCwwIiBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIj48UnVuIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIiBGb3JlZ3JvdW5kPSIjRkFGQUZBRkYiIEJsb2NrLlRleHRBbGlnbm1lbnQ9IkNlbnRlciI+QW1hemluZyBncmFjZSwgSG93IHN3ZWV0IHRoZSBzb3VuZDwvUnVuPjwvUGFyYWdyYXBoPjxQYXJhZ3JhcGggTWFyZ2luPSIwLDAsMCwwIiBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIj48UnVuIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIiBGb3JlZ3JvdW5kPSIjRkFGQUZBRkYiIEJsb2NrLlRleHRBbGlnbm1lbnQ9IkNlbnRlciI+VGhhdCBzYXZlZCBhIHdyZXRjaCBsaWtlIG1lPC9SdW4+PC9QYXJhZ3JhcGg+PC9GbG93RG9jdW1lbnQ+</NSString>
              <NSString rvXMLIvarName="WinFontData">PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTE2Ij8+PFJWRm9udCB4bWxuczppPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9Qcm9QcmVzZW50ZXIuQ29tbW9uIj48S2VybmluZz4wPC9LZXJuaW5nPjxMaW5lU3BhY2luZz4wPC9MaW5lU3BhY2luZz48T3V0bGluZUNvbG9yIHhtbG5zOmQycDE9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9TeXN0ZW0uV2luZG93cy5NZWRpYSI+PGQycDE6QT4yNTU8L2QycDE6QT48ZDJwMTpCPjA8L2QycDE6Qj48ZDJwMTpHPjA8L2QycDE6Rz48ZDJwMTpSPjA8L2QycDE6Uj48ZDJwMTpTY0E+MTwvZDJwMTpTY0E+PGQycDE6U2NCPjA8L2QycDE6U2NCPjxkMnAxOlNjRz4wPC9kMnAxOlNjRz48ZDJwMTpTY1I+MDwvZDJwMTpTY1I+PC9PdXRsaW5lQ29sb3I+PE91dGxpbmVXaWR0aD4wPC9PdXRsaW5lV2lkdGg+PFZhcmlhbnRzPk5vcm1hbDwvVmFyaWFudHM+PC9SVkZvbnQ+</NSString>
            </RVTextElement>
          </array>
        </RVDisplaySlide>
        <RVDisplaySlide backgroundColor="0 0 0 0" highlightColor="0 0 0 0" drawingBackgroundColor="false" enabled="true" hotKey="" label="" notes="" UUID="4E77FEC4-0B35-C2AD-AF67-44D35ABC2B2E" chordChartPath="">
          <array rvXMLIvarName="cues"/>
          <array rvXMLIvarName="displayElements">
            <RVTextElement displayName="Default" UUID="5107F092-E914-41CD-5B30-0F8F62DF9E55" typeID="0" displayDelay="0" locked="false" persistent="0" fromTemplate="false" opacity="1" source="" bezelRadius="0" rotation="0" drawingFill="false" drawingShadow="true" drawingStroke="false" fillColor="1 1 1 0" adjustsHeightToFit="false" verticalAlignment="0" revealType="0">
              <RVRect3D rvXMLIvarName="position">{40 40 0 1840 1000}</RVRect3D>
              <shadow rvXMLIvarName="shadow">8|0.5019607843137255 0.5019607843137255 0.5019607843137255 1|{2.82842712474619, 2.8284271247461903}</shadow>
              <dictionary rvXMLIvarName="stroke">
                <NSColor rvXMLDictionaryKey="RVShapeElementStrokeColorKey">0 0 0 1</NSColor>
                <NSNumber rvXMLDictionaryKey="RVShapeElementStrokeWidthKey" hint="double">0</NSNumber>
              </dictionary>
              <NSString rvXMLIvarName="PlainText">SSBvbmNlIHdhcyBsb3N0LCBidXQgbm93IEkgYW0gZm91bmQsCldhcyBibGluZCwgYnV0IG5vdyBJIHNlZQ==</NSString>
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwe1xmb250dGJsXGYwXGZzd2lzc1xmY2hhcnNldDAgSW1wYWN0O317XGNvbG9ydGJsO1xyZWQyNTBcZ3JlZW4yNTBcYmx1ZTI1MDt9XHBhcmRcdHg1NjBcdHgxMTIwXHR4MTY4MFx0eDIyNDBcdHgyODAwXHR4MzM2MFx0eDM5MjBcdHg0NDgwXHR4NTA0MFx0eDU2MDBcdHg2MTYwXHR4NjcyMFxxY1xwYXJkaXJuYXR1cmFsXGYwXGZzMTYwIFxjZjEgSSBvbmNlIHdhcyBsb3N0LCBidXQgbm93IEkgYW0gZm91bmQsXA1XYXMgYmxpbmQsIGJ1dCBub3cgSSBzZWV9</NSString>
              <NSString rvXMLIvarName="WinFlowData">PEZsb3dEb2N1bWVudCBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIFBhZ2VQYWRkaW5nPSI1LDAsNSwwIiBBbGxvd0Ryb3A9IlRydWUiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dpbmZ4LzIwMDYveGFtbC9wcmVzZW50YXRpb24iPjxQYXJhZ3JhcGggTWFyZ2luPSIwLDAsMCwwIiBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIj48UnVuIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIiBGb3JlZ3JvdW5kPSIjRkFGQUZBRkYiIEJsb2NrLlRleHRBbGlnbm1lbnQ9IkNlbnRlciI+SSBvbmNlIHdhcyBsb3N0LCBidXQgbm93IEkgYW0gZm91bmQsPC9SdW4+PC9QYXJhZ3JhcGg+PFBhcmFncmFwaCBNYXJnaW49IjAsMCwwLDAiIFRleHRBbGlnbm1lbnQ9IkNlbnRlciIgRm9udEZhbWlseT0iSW1wYWN0IiBGb250U2l6ZT0iODAiPjxSdW4gRm9udEZhbWlseT0iSW1wYWN0IiBGb250U2l6ZT0iODAiIEZvcmVncm91bmQ9IiNGQUZBRkFGRiIgQmxvY2suVGV4dEFsaWdubWVudD0iQ2VudGVyIj5XYXMgYmxpbmQsIGJ1dCBub3cgSSBzZWU8L1J1bj48L1BhcmFncmFwaD48L0Zsb3dEb2N1bWVudD4=</NSString>
              <NSString rvXMLIvarName="WinFontData">PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTE2Ij8+PFJWRm9udCB4bWxuczppPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9Qcm9QcmVzZW50ZXIuQ29tbW9uIj48S2VybmluZz4wPC9LZXJuaW5nPjxMaW5lU3BhY2luZz4wPC9MaW5lU3BhY2luZz48T3V0bGluZUNvbG9yIHhtbG5zOmQycDE9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9TeXN0ZW0uV2luZG93cy5NZWRpYSI+PGQycDE6QT4yNTU8L2QycDE6QT48ZDJwMTpCPjA8L2QycDE6Qj48ZDJwMTpHPjA8L2QycDE6Rz48ZDJwMTpSPjA8L2QycDE6Uj48ZDJwMTpTY0E+MTwvZDJwMTpTY0E+PGQycDE6U2NCPjA8L2QycDE6U2NCPjxkMnAxOlNjRz4wPC9kMnAxOlNjRz48ZDJwMTpTY1I+MDwvZDJwMTpTY1I+PC9PdXRsaW5lQ29sb3I+PE91dGxpbmVXaWR0aD4wPC9PdXRsaW5lV2lkdGg+PFZhcmlhbnRzPk5vcm1hbDwvVmFyaWFudHM+PC9SVkZvbnQ+</NSString>
            </RVTextElement>
          </array>
        </RVDisplaySlide>
      </array>
    </RVSlideGrouping>
    <RVSlideGrouping name="Verse 2" uuid="8E7D9B62-5B22-4D5E-C167-4F08164DFD48" color="0 0.39215686274509803 1 1">
      <array rvXMLIvarName="slides">
        <RVDisplaySlide backgroundColor="0 0 0 0" highlightColor="0 0 0 0" drawingBackgroundColor="false" enabled="true" hotKey="" label="" notes="" UUID="3B1C388E-2A40-FC14-4449-762FBE8C0DFC" chordChartPath="">
          <array rvXMLIvarName="cues"/>
          <array rvXMLIvarName="displayElements">
            <RVTextElement displayName="Default" UUID="4A449405-B7FF-A0CD-0057-F1AAD54C34AB" typeID="0" displayDelay="0" locked="false" persistent="0" fromTemplate="false" opacity="1" source="" bezelRadius="0" rotation="0" drawingFill="false" drawingShadow="true" drawingStroke="false" fillColor="1 1 1 0" adjustsHeightToFit="false" verticalAlignment="0" revealType="0">
              <RVRect3D rvXMLIvarName="position">{40 40 0 1840 1000}</RVRect3D>
              <shadow rvXMLIvarName="shadow">8|0.5019607843137255 0.5019607843137255 0.5019607843137255 1|{2.82842712474619, 2.8284271247461903}</shadow>
              <dictionary rvXMLIvarName="stroke">
                <NSColor rvXMLDictionaryKey="RVShapeElementStrokeColorKey">0 0 0 1</NSColor>
                <NSNumber rvXMLDictionaryKey="RVShapeElementStrokeWidthKey" hint="double">0</NSNumber>
              </dictionary>
              <NSString rvXMLIvarName="PlainText">J1R3YXMgR3JhY2UgdGhhdCB0YXVnaHQgbXkgaGVhcnQgdG8gZmVhcgpBbmQgR3JhY2UsIG15IGZlYXJzIHJlbGlldmVk</NSString>
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwe1xmb250dGJsXGYwXGZzd2lzc1xmY2hhcnNldDAgSW1wYWN0O317XGNvbG9ydGJsO1xyZWQyNTBcZ3JlZW4yNTBcYmx1ZTI1MDt9XHBhcmRcdHg1NjBcdHgxMTIwXHR4MTY4MFx0eDIyNDBcdHgyODAwXHR4MzM2MFx0eDM5MjBcdHg0NDgwXHR4NTA0MFx0eDU2MDBcdHg2MTYwXHR4NjcyMFxxY1xwYXJkaXJuYXR1cmFsXGYwXGZzMTYwIFxjZjEgJ1R3YXMgR3JhY2UgdGhhdCB0YXVnaHQgbXkgaGVhcnQgdG8gZmVhclwNQW5kIEdyYWNlLCBteSBmZWFycyByZWxpZXZlZH0=</NSString>
              <NSString rvXMLIvarName="WinFlowData">PEZsb3dEb2N1bWVudCBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIFBhZ2VQYWRkaW5nPSI1LDAsNSwwIiBBbGxvd0Ryb3A9IlRydWUiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dpbmZ4LzIwMDYveGFtbC9wcmVzZW50YXRpb24iPjxQYXJhZ3JhcGggTWFyZ2luPSIwLDAsMCwwIiBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIj48UnVuIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIiBGb3JlZ3JvdW5kPSIjRkFGQUZBRkYiIEJsb2NrLlRleHRBbGlnbm1lbnQ9IkNlbnRlciI+J1R3YXMgR3JhY2UgdGhhdCB0YXVnaHQgbXkgaGVhcnQgdG8gZmVhcjwvUnVuPjwvUGFyYWdyYXBoPjxQYXJhZ3JhcGggTWFyZ2luPSIwLDAsMCwwIiBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIj48UnVuIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIiBGb3JlZ3JvdW5kPSIjRkFGQUZBRkYiIEJsb2NrLlRleHRBbGlnbm1lbnQ9IkNlbnRlciI+QW5kIEdyYWNlLCBteSBmZWFycyByZWxpZXZlZDwvUnVuPjwvUGFyYWdyYXBoPjwvRmxvd0RvY3VtZW50Pg==</NSString>
              <NSString rvXMLIvarName="WinFontData">PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTE2Ij8+PFJWRm9udCB4bWxuczppPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9Qcm9QcmVzZW50ZXIuQ29tbW9uIj48S2VybmluZz4wPC9LZXJuaW5nPjxMaW5lU3BhY2luZz4wPC9MaW5lU3BhY2luZz48T3V0bGluZUNvbG9yIHhtbG5zOmQycDE9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9TeXN0ZW0uV2luZG93cy5NZWRpYSI+PGQycDE6QT4yNTU8L2QycDE6QT48ZDJwMTpCPjA8L2QycDE6Qj48ZDJwMTpHPjA8L2QycDE6Rz48ZDJwMTpSPjA8L2QycDE6Uj48ZDJwMTpTY0E+MTwvZDJwMTpTY0E+PGQycDE6U2NCPjA8L2QycDE6U2NCPjxkMnAxOlNjRz4wPC9kMnAxOlNjRz48ZDJwMTpTY1I+MDwvZDJwMTpTY1I+PC9PdXRsaW5lQ29sb3I+PE91dGxpbmVXaWR0aD4wPC9PdXRsaW5lV2lkdGg+PFZhcmlhbnRzPk5vcm1hbDwvVmFyaWFudHM+PC9SVkZvbnQ+</NSString>
            </RVTextElement>
          </array>
        </RVDisplaySlide>
        <RVDisplaySlide backgroundColor="0 0 0 0" highlightColor="0 0 0 0" drawingBackgroundColor="false" enabled="true" hotKey="" label="" notes="" UUID="AADFCFB8-E1EB-F2A7-4634-D7881256C84C" chordChartPath="">
          <array rvXMLIvarName="cues"/>
          <array rvXMLIvarName="displayElements">
            <RVTextElement displayName="Default" UUID="45508B5D-3BDD-8CB1-3D6E-1C934C19E46A" typeID="0" displayDelay="0" locked="false" persistent="0" fromTemplate="false" opacity="1" source="" bezelRadius="0" rotation="0" drawingFill="false" drawingShadow="true" drawingStroke="false" fillColor="1 1 1 0" adjustsHeightToFit="false" verticalAlignment="0" revealType="0">
              <RVRect3D rvXMLIvarName="position">{40 40 0 1840 1000}</RVRect3D>
              <shadow rvXMLIvarName="shadow">8|0.5019607843137255 0.5019607843137255 0.5019607843137255 1|{2.82842712474619, 2.8284271247461903}</shadow>
              <dictionary rvXMLIvarName="stroke">
                <NSColor rvXMLDictionaryKey="RVShapeElementStrokeColorKey">0 0 0 1</NSColor>
                <NSNumber rvXMLDictionaryKey="RVShapeElementStrokeWidthKey" hint="double">0</NSNumber>
              </dictionary>
              <NSString rvXMLIvarName="PlainText">SG93IHByZWNpb3VzIGRpZCB0aGF0IEdyYWNlIGFwcGVhcgpUaGUgaG91ciBJIGZpcnN0IGJlbGlldmVk</NSString>
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwe1xmb250dGJsXGYwXGZzd2lzc1xmY2hhcnNldDAgSW1wYWN0O317XGNvbG9ydGJsO1xyZWQyNTBcZ3JlZW4yNTBcYmx1ZTI1MDt9XHBhcmRcdHg1NjBcdHgxMTIwXHR4MTY4MFx0eDIyNDBcdHgyODAwXHR4MzM2MFx0eDM5MjBcdHg0NDgwXHR4NTA0MFx0eDU2MDBcdHg2MTYwXHR4NjcyMFxxY1xwYXJkaXJuYXR1cmFsXGYwXGZzMTYwIFxjZjEgSG93IHByZWNpb3VzIGRpZCB0aGF0IEdyYWNlIGFwcGVhclwNVGhlIGhvdXIgSSBmaXJzdCBiZWxpZXZlZH0=</NSString>
              <NSString rvXMLIvarName="WinFlowData">PEZsb3dEb2N1bWVudCBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIFBhZ2VQYWRkaW5nPSI1LDAsNSwwIiBBbGxvd0Ryb3A9IlRydWUiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dpbmZ4LzIwMDYveGFtbC9wcmVzZW50YXRpb24iPjxQYXJhZ3JhcGggTWFyZ2luPSIwLDAsMCwwIiBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIj48UnVuIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIiBGb3JlZ3JvdW5kPSIjRkFGQUZBRkYiIEJsb2NrLlRleHRBbGlnbm1lbnQ9IkNlbnRlciI+SG93IHByZWNpb3VzIGRpZCB0aGF0IEdyYWNlIGFwcGVhcjwvUnVuPjwvUGFyYWdyYXBoPjxQYXJhZ3JhcGggTWFyZ2luPSIwLDAsMCwwIiBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIj48UnVuIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIiBGb3JlZ3JvdW5kPSIjRkFGQUZBRkYiIEJsb2NrLlRleHRBbGlnbm1lbnQ9IkNlbnRlciI+VGhlIGhvdXIgSSBmaXJzdCBiZWxpZXZlZDwvUnVuPjwvUGFyYWdyYXBoPjwvRmxvd0RvY3VtZW50Pg==</NSString>
              <NSString rvXMLIvarName="WinFontData">PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTE2Ij8+PFJWRm9udCB4bWxuczppPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9Qcm9QcmVzZW50ZXIuQ29tbW9uIj48S2VybmluZz4wPC9LZXJuaW5nPjxMaW5lU3BhY2luZz4wPC9MaW5lU3BhY2luZz48T3V0bGluZUNvbG9yIHhtbG5zOmQycDE9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9TeXN0ZW0uV2luZG93cy5NZWRpYSI+PGQycDE6QT4yNTU8L2QycDE6QT48ZDJwMTpCPjA8L2QycDE6Qj48ZDJwMTpHPjA8L2QycDE6Rz48ZDJwMTpSPjA8L2QycDE6Uj48ZDJwMTpTY0E+MTwvZDJwMTpTY0E+PGQycDE6U2NCPjA8L2QycDE6U2NCPjxkMnAxOlNjRz4wPC9kMnAxOlNjRz48ZDJwMTpTY1I+MDwvZDJwMTpTY1I+PC9PdXRsaW5lQ29sb3I+PE91dGxpbmVXaWR0aD4wPC9PdXRsaW5lV2lkdGg+PFZhcmlhbnRzPk5vcm1hbDwvVmFyaWFudHM+PC9SVkZvbnQ+</NSString>
            </RVTextElement>
          </array>
        </RVDisplaySlide>
      </array>
    </RVSlideGrouping>
    <RVSlideGrouping name="Verse 3" uuid="F0CD37BA-3115-2616-B40A-B63C097D40F9" color="0 0.7843137254901961 1 1">
      <array rvXMLIvarName="slides">
        <RVDisplaySlide backgroundColor="0 0 0 0" highlightColor="0 0 0 0" drawingBackgroundColor="false" enabled="true" hotKey="" label="" notes="" UUID="E6B43EBB-B714-E384-AD50-104243716566" chordChartPath="">
          <array rvXMLIvarName="cues"/>
          <array rvXMLIvarName="displayElements">
            <RVTextElement displayName="Default" UUID="10EB63F2-1783-3501-1BD8-F74A6CE46308" typeID="0" displayDelay="0" locked="false" persistent="0" fromTemplate="false" opacity="1" source="" bezelRadius="0" rotation="0" drawingFill="false" drawingShadow="true" drawingStroke="false" fillColor="1 1 1 0" adjustsHeightToFit="false" verticalAlignment="0" revealType="0">
              <RVRect3D rvXMLIvarName="position">{40 40 0 1840 1000}</RVRect3D>
              <shadow rvXMLIvarName="shadow">8|0.5019607843137255 0.5019607843137255 0.5019607843137255 1|{2.82842712474619, 2.8284271247461903}</shadow>
              <dictionary rvXMLIvarName="stroke">
                <NSColor rvXMLDictionaryKey="RVShapeElementStrokeColorKey">0 0 0 1</NSColor>
                <NSNumber rvXMLDictionaryKey="RVShapeElementStrokeWidthKey" hint="double">0</NSNumber>
              </dictionary>
              <NSString rvXMLIvarName="PlainText">VGhlIExvcmQgaGFzIHByb21pc2VkIGdvb2QgdG8gbWUKSGlzIHdvcmQgbXkgaG9wZSBzZWN1cmVz</NSString>
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwe1xmb250dGJsXGYwXGZzd2lzc1xmY2hhcnNldDAgSW1wYWN0O317XGNvbG9ydGJsO1xyZWQyNTBcZ3JlZW4yNTBcYmx1ZTI1MDt9XHBhcmRcdHg1NjBcdHgxMTIwXHR4MTY4MFx0eDIyNDBcdHgyODAwXHR4MzM2MFx0eDM5MjBcdHg0NDgwXHR4NTA0MFx0eDU2MDBcdHg2MTYwXHR4NjcyMFxxY1xwYXJkaXJuYXR1cmFsXGYwXGZzMTYwIFxjZjEgVGhlIExvcmQgaGFzIHByb21pc2VkIGdvb2QgdG8gbWVcDUhpcyB3b3JkIG15IGhvcGUgc2VjdXJlc30=</NSString>
              <NSString rvXMLIvarName="WinFlowData">PEZsb3dEb2N1bWVudCBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIFBhZ2VQYWRkaW5nPSI1LDAsNSwwIiBBbGxvd0Ryb3A9IlRydWUiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dpbmZ4LzIwMDYveGFtbC9wcmVzZW50YXRpb24iPjxQYXJhZ3JhcGggTWFyZ2luPSIwLDAsMCwwIiBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIj48UnVuIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIiBGb3JlZ3JvdW5kPSIjRkFGQUZBRkYiIEJsb2NrLlRleHRBbGlnbm1lbnQ9IkNlbnRlciI+VGhlIExvcmQgaGFzIHByb21pc2VkIGdvb2QgdG8gbWU8L1J1bj48L1BhcmFncmFwaD48UGFyYWdyYXBoIE1hcmdpbj0iMCwwLDAsMCIgVGV4dEFsaWdubWVudD0iQ2VudGVyIiBGb250RmFtaWx5PSJJbXBhY3QiIEZvbnRTaXplPSI4MCI+PFJ1biBGb250RmFtaWx5PSJJbXBhY3QiIEZvbnRTaXplPSI4MCIgRm9yZWdyb3VuZD0iI0ZBRkFGQUZGIiBCbG9jay5UZXh0QWxpZ25tZW50PSJDZW50ZXIiPkhpcyB3b3JkIG15IGhvcGUgc2VjdXJlczwvUnVuPjwvUGFyYWdyYXBoPjwvRmxvd0RvY3VtZW50Pg==</NSString>
              <NSString rvXMLIvarName="WinFontData">PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTE2Ij8+PFJWRm9udCB4bWxuczppPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9Qcm9QcmVzZW50ZXIuQ29tbW9uIj48S2VybmluZz4wPC9LZXJuaW5nPjxMaW5lU3BhY2luZz4wPC9MaW5lU3BhY2luZz48T3V0bGluZUNvbG9yIHhtbG5zOmQycDE9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9TeXN0ZW0uV2luZG93cy5NZWRpYSI+PGQycDE6QT4yNTU8L2QycDE6QT48ZDJwMTpCPjA8L2QycDE6Qj48ZDJwMTpHPjA8L2QycDE6Rz48ZDJwMTpSPjA8L2QycDE6Uj48ZDJwMTpTY0E+MTwvZDJwMTpTY0E+PGQycDE6U2NCPjA8L2QycDE6U2NCPjxkMnAxOlNjRz4wPC9kMnAxOlNjRz48ZDJwMTpTY1I+MDwvZDJwMTpTY1I+PC9PdXRsaW5lQ29sb3I+PE91dGxpbmVXaWR0aD4wPC9PdXRsaW5lV2lkdGg+PFZhcmlhbnRzPk5vcm1hbDwvVmFyaWFudHM+PC9SVkZvbnQ+</NSString>
            </RVTextElement>
          </array>
        </RVDisplaySlide>
        <RVDisplaySlide backgroundColor="0 0 0 0" highlightColor="0 0 0 0" drawingBackgroundColor="false" enabled="true" hotKey="" label="" notes="" UUID="C033A215-828E-A3A9-9A7F-7CF3D9F5606A" chordChartPath="">
          <array rvXMLIvarName="cues"/>
          <array rvXMLIvarName="displayElements">
            <RVTextElement displayName="Default" UUID="622CB69A-883C-6B79-CB11-F8398C48E76F" typeID="0" displayDelay="0" locked="false" persistent="0" fromTemplate="false" opacity="1" source="" bezelRadius="0" rotation="0" drawingFill="false" drawingShadow="true" drawingStroke="false" fillColor="1 1 1 0" adjustsHeightToFit="false" verticalAlignment="0" revealType="0">
              <RVRect3D rvXMLIvarName="position">{40 40 0 1840 1000}</RVRect3D>
              <shadow rvXMLIvarName="shadow">8|0.5019607843137255 0.5019607843137255 0.5019607843137255 1|{2.82842712474619, 2.8284271247461903}</shadow>
              <dictionary rvXMLIvarName="stroke">
                <NSColor rvXMLDictionaryKey="RVShapeElementStrokeColorKey">0 0 0 1</NSColor>
                <NSNumber rvXMLDictionaryKey="RVShapeElementStrokeWidthKey" hint="double">0</NSNumber>
              </dictionary>
              <NSString rvXMLIvarName="PlainText">SGUgd2lsbCBteSBzaGllbGQgYW5kIHBvcnRpb24gYmUKQXMgbG9uZyBhcyBsaWZlIGVuZHVyZXM=</NSString>
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwe1xmb250dGJsXGYwXGZzd2lzc1xmY2hhcnNldDAgSW1wYWN0O317XGNvbG9ydGJsO1xyZWQyNTBcZ3JlZW4yNTBcYmx1ZTI1MDt9XHBhcmRcdHg1NjBcdHgxMTIwXHR4MTY4MFx0eDIyNDBcdHgyODAwXHR4MzM2MFx0eDM5MjBcdHg0NDgwXHR4NTA0MFx0eDU2MDBcdHg2MTYwXHR4NjcyMFxxY1xwYXJkaXJuYXR1cmFsXGYwXGZzMTYwIFxjZjEgSGUgd2lsbCBteSBzaGllbGQgYW5kIHBvcnRpb24gYmVcDUFzIGxvbmcgYXMgbGlmZSBlbmR1cmVzfQ==</NSString>
              <NSString rvXMLIvarName="WinFlowData">PEZsb3dEb2N1bWVudCBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIFBhZ2VQYWRkaW5nPSI1LDAsNSwwIiBBbGxvd0Ryb3A9IlRydWUiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dpbmZ4LzIwMDYveGFtbC9wcmVzZW50YXRpb24iPjxQYXJhZ3JhcGggTWFyZ2luPSIwLDAsMCwwIiBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIj48UnVuIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIiBGb3JlZ3JvdW5kPSIjRkFGQUZBRkYiIEJsb2NrLlRleHRBbGlnbm1lbnQ9IkNlbnRlciI+SGUgd2lsbCBteSBzaGllbGQgYW5kIHBvcnRpb24gYmU8L1J1bj48L1BhcmFncmFwaD48UGFyYWdyYXBoIE1hcmdpbj0iMCwwLDAsMCIgVGV4dEFsaWdubWVudD0iQ2VudGVyIiBGb250RmFtaWx5PSJJbXBhY3QiIEZvbnRTaXplPSI4MCI+PFJ1biBGb250RmFtaWx5PSJJbXBhY3QiIEZvbnRTaXplPSI4MCIgRm9yZWdyb3VuZD0iI0ZBRkFGQUZGIiBCbG9jay5UZXh0QWxpZ25tZW50PSJDZW50ZXIiPkFzIGxvbmcgYXMgbGlmZSBlbmR1cmVzPC9SdW4+PC9QYXJhZ3JhcGg+PC9GbG93RG9jdW1lbnQ+</NSString>
              <NSString rvXMLIvarName="WinFontData">PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTE2Ij8+PFJWRm9udCB4bWxuczppPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9Qcm9QcmVzZW50ZXIuQ29tbW9uIj48S2VybmluZz4wPC9LZXJuaW5nPjxMaW5lU3BhY2luZz4wPC9MaW5lU3BhY2luZz48T3V0bGluZUNvbG9yIHhtbG5zOmQycDE9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9TeXN0ZW0uV2luZG93cy5NZWRpYSI+PGQycDE6QT4yNTU8L2QycDE6QT48ZDJwMTpCPjA8L2QycDE6Qj48ZDJwMTpHPjA8L2QycDE6Rz48ZDJwMTpSPjA8L2QycDE6Uj48ZDJwMTpTY0E+MTwvZDJwMTpTY0E+PGQycDE6U2NCPjA8L2QycDE6U2NCPjxkMnAxOlNjRz4wPC9kMnAxOlNjRz48ZDJwMTpTY1I+MDwvZDJwMTpTY1I+PC9PdXRsaW5lQ29sb3I+PE91dGxpbmVXaWR0aD4wPC9PdXRsaW5lV2lkdGg+PFZhcmlhbnRzPk5vcm1hbDwvVmFyaWFudHM+PC9SVkZvbnQ+</NSString>
            </RVTextElement>
          </array>
        </RVDisplaySlide>
      </array>
    </RVSlideGrouping>
    <RVSlideGrouping name="Verse 4" uuid="3D5E2B18-A19C-C519-F8BC-FAE2FFB7EF3E" color="0 1 1 1">
      <array rvXMLIvarName="slides">
        <RVDisplaySlide backgroundColor="0 0 0 0" highlightColor="0 0 0 0" drawingBackgroundColor="false" enabled="true" hotKey="" label="" notes="" UUID="DEAA47C6-D03B-3350-C566-E0424284A7B3" chordChartPath="">
          <array rvXMLIvarName="cues"/>
          <array rvXMLIvarName="displayElements">
            <RVTextElement displayName="Default" UUID="AABA9CBA-7B92-23C4-A435-094F5CC772EA" typeID="0" displayDelay="0" locked="false" persistent="0" fromTemplate="false" opacity="1" source="" bezelRadius="0" rotation="0" drawingFill="false" drawingShadow="true" drawingStroke="false" fillColor="1 1 1 0" adjustsHeightToFit="false" verticalAlignment="0" revealType="0">
              <RVRect3D rvXMLIvarName="position">{40 40 0 1840 1000}</RVRect3D>
              <shadow rvXMLIvarName="shadow">8|0.5019607843137255 0.5019607843137255 0.5019607843137255 1|{2.82842712474619, 2.8284271247461903}</shadow>
              <dictionary rvXMLIvarName="stroke">
                <NSColor rvXMLDictionaryKey="RVShapeElementStrokeColorKey">0 0 0 1</NSColor>
                <NSNumber rvXMLDictionaryKey="RVShapeElementStrokeWidthKey" hint="double">0</NSNumber>
              </dictionary>
              <NSString rvXMLIvarName="PlainText">VGhlIGVhcnRoIHNoYWxsIHNvb24gZGlzc29sdmUgbGlrZSBzbm93ClRoZSBzdW4gZm9yYmVhciB0byBzaGluZQ==</NSString>
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwe1xmb250dGJsXGYwXGZzd2lzc1xmY2hhcnNldDAgSW1wYWN0O317XGNvbG9ydGJsO1xyZWQyNTBcZ3JlZW4yNTBcYmx1ZTI1MDt9XHBhcmRcdHg1NjBcdHgxMTIwXHR4MTY4MFx0eDIyNDBcdHgyODAwXHR4MzM2MFx0eDM5MjBcdHg0NDgwXHR4NTA0MFx0eDU2MDBcdHg2MTYwXHR4NjcyMFxxY1xwYXJkaXJuYXR1cmFsXGYwXGZzMTYwIFxjZjEgVGhlIGVhcnRoIHNoYWxsIHNvb24gZGlzc29sdmUgbGlrZSBzbm93XA1UaGUgc3VuIGZvcmJlYXIgdG8gc2hpbmV9</NSString>
              <NSString rvXMLIvarName="WinFlowData">PEZsb3dEb2N1bWVudCBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIFBhZ2VQYWRkaW5nPSI1LDAsNSwwIiBBbGxvd0Ryb3A9IlRydWUiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dpbmZ4LzIwMDYveGFtbC9wcmVzZW50YXRpb24iPjxQYXJhZ3JhcGggTWFyZ2luPSIwLDAsMCwwIiBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIj48UnVuIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIiBGb3JlZ3JvdW5kPSIjRkFGQUZBRkYiIEJsb2NrLlRleHRBbGlnbm1lbnQ9IkNlbnRlciI+VGhlIGVhcnRoIHNoYWxsIHNvb24gZGlzc29sdmUgbGlrZSBzbm93PC9SdW4+PC9QYXJhZ3JhcGg+PFBhcmFncmFwaCBNYXJnaW49IjAsMCwwLDAiIFRleHRBbGlnbm1lbnQ9IkNlbnRlciIgRm9udEZhbWlseT0iSW1wYWN0IiBGb250U2l6ZT0iODAiPjxSdW4gRm9udEZhbWlseT0iSW1wYWN0IiBGb250U2l6ZT0iODAiIEZvcmVncm91bmQ9IiNGQUZBRkFGRiIgQmxvY2suVGV4dEFsaWdubWVudD0iQ2VudGVyIj5UaGUgc3VuIGZvcmJlYXIgdG8gc2hpbmU8L1J1bj48L1BhcmFncmFwaD48L0Zsb3dEb2N1bWVudD4=</NSString>
              <NSString rvXMLIvarName="WinFontData">PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTE2Ij8+PFJWRm9udCB4bWxuczppPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9Qcm9QcmVzZW50ZXIuQ29tbW9uIj48S2VybmluZz4wPC9LZXJuaW5nPjxMaW5lU3BhY2luZz4wPC9MaW5lU3BhY2luZz48T3V0bGluZUNvbG9yIHhtbG5zOmQycDE9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9TeXN0ZW0uV2luZG93cy5NZWRpYSI+PGQycDE6QT4yNTU8L2QycDE6QT48ZDJwMTpCPjA8L2QycDE6Qj48ZDJwMTpHPjA8L2QycDE6Rz48ZDJwMTpSPjA8L2QycDE6Uj48ZDJwMTpTY0E+MTwvZDJwMTpTY0E+PGQycDE6U2NCPjA8L2QycDE6U2NCPjxkMnAxOlNjRz4wPC9kMnAxOlNjRz48ZDJwMTpTY1I+MDwvZDJwMTpTY1I+PC9PdXRsaW5lQ29sb3I+PE91dGxpbmVXaWR0aD4wPC9PdXRsaW5lV2lkdGg+PFZhcmlhbnRzPk5vcm1hbDwvVmFyaWFudHM+PC9SVkZvbnQ+</NSString>
            </RVTextElement>
          </array>
        </RVDisplaySlide>
        <RVDisplaySlide backgroundColor="0 0 0 0" highlightColor="0 0 0 0" drawingBackgroundColor="false" enabled="true" hotKey="" label="" notes="" UUID="248C7FE5-0F8A-167D-AB51-20B369166335" chordChartPath="">
          <array rvXMLIvarName="cues"/>
          <array rvXMLIvarName="displayElements">
            <RVTextElement displayName="Default" UUID="BA92AA5F-C98A-814F-71A3-4470234D1B74" typeID="0" displayDelay="0" locked="false" persistent="0" fromTemplate="false" opacity="1" source="" bezelRadius="0" rotation="0" drawingFill="false" drawingShadow="true" drawingStroke="false" fillColor="1 1 1 0" adjustsHeightToFit="false" verticalAlignment="0" revealType="0">
              <RVRect3D rvXMLIvarName="position">{40 40 0 1840 1000}</RVRect3D>
              <shadow rvXMLIvarName="shadow">8|0.5019607843137255 0.5019607843137255 0.5019607843137255 1|{2.82842712474619, 2.8284271247461903}</shadow>
              <dictionary rvXMLIvarName="stroke">
                <NSColor rvXMLDictionaryKey="RVShapeElementStrokeColorKey">0 0 0 1</NSColor>
                <NSNumber rvXMLDictionaryKey="RVShapeElementStrokeWidthKey" hint="double">0</NSNumber>
              </dictionary>
              <NSString rvXMLIvarName="PlainText">QnV0IEdvZCwgV2hvIGNhbGxlZCBtZSBoZXJlIGJlbG93CldpbGwgYmUgZm9yZXZlciBtaW5lCldpbGwgYmUgZm9yZXZlciBtaW5l</NSString>
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwe1xmb250dGJsXGYwXGZzd2lzc1xmY2hhcnNldDAgSW1wYWN0O317XGNvbG9ydGJsO1xyZWQyNTBcZ3JlZW4yNTBcYmx1ZTI1MDt9XHBhcmRcdHg1NjBcdHgxMTIwXHR4MTY4MFx0eDIyNDBcdHgyODAwXHR4MzM2MFx0eDM5MjBcdHg0NDgwXHR4NTA0MFx0eDU2MDBcdHg2MTYwXHR4NjcyMFxxY1xwYXJkaXJuYXR1cmFsXGYwXGZzMTYwIFxjZjEgQnV0IEdvZCwgV2hvIGNhbGxlZCBtZSBoZXJlIGJlbG93XA1XaWxsIGJlIGZvcmV2ZXIgbWluZVwNV2lsbCBiZSBmb3JldmVyIG1pbmV9</NSString>
              <NSString rvXMLIvarName="WinFlowData">PEZsb3dEb2N1bWVudCBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIFBhZ2VQYWRkaW5nPSI1LDAsNSwwIiBBbGxvd0Ryb3A9IlRydWUiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dpbmZ4LzIwMDYveGFtbC9wcmVzZW50YXRpb24iPjxQYXJhZ3JhcGggTWFyZ2luPSIwLDAsMCwwIiBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIj48UnVuIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIiBGb3JlZ3JvdW5kPSIjRkFGQUZBRkYiIEJsb2NrLlRleHRBbGlnbm1lbnQ9IkNlbnRlciI+QnV0IEdvZCwgV2hvIGNhbGxlZCBtZSBoZXJlIGJlbG93PC9SdW4+PC9QYXJhZ3JhcGg+PFBhcmFncmFwaCBNYXJnaW49IjAsMCwwLDAiIFRleHRBbGlnbm1lbnQ9IkNlbnRlciIgRm9udEZhbWlseT0iSW1wYWN0IiBGb250U2l6ZT0iODAiPjxSdW4gRm9udEZhbWlseT0iSW1wYWN0IiBGb250U2l6ZT0iODAiIEZvcmVncm91bmQ9IiNGQUZBRkFGRiIgQmxvY2suVGV4dEFsaWdubWVudD0iQ2VudGVyIj5XaWxsIGJlIGZvcmV2ZXIgbWluZTwvUnVuPjwvUGFyYWdyYXBoPjxQYXJhZ3JhcGggTWFyZ2luPSIwLDAsMCwwIiBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIj48UnVuIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIiBGb3JlZ3JvdW5kPSIjRkFGQUZBRkYiIEJsb2NrLlRleHRBbGlnbm1lbnQ9IkNlbnRlciI+V2lsbCBiZSBmb3JldmVyIG1pbmU8L1J1bj48L1BhcmFncmFwaD48L0Zsb3dEb2N1bWVudD4=</NSString>
              <NSString rvXMLIvarName="WinFontData">PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTE2Ij8+PFJWRm9udCB4bWxuczppPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9Qcm9QcmVzZW50ZXIuQ29tbW9uIj48S2VybmluZz4wPC9LZXJuaW5nPjxMaW5lU3BhY2luZz4wPC9MaW5lU3BhY2luZz48T3V0bGluZUNvbG9yIHhtbG5zOmQycDE9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9TeXN0ZW0uV2luZG93cy5NZWRpYSI+PGQycDE6QT4yNTU8L2QycDE6QT48ZDJwMTpCPjA8L2QycDE6Qj48ZDJwMTpHPjA8L2QycDE6Rz48ZDJwMTpSPjA8L2QycDE6Uj48ZDJwMTpTY0E+MTwvZDJwMTpTY0E+PGQycDE6U2NCPjA8L2QycDE6U2NCPjxkMnAxOlNjRz4wPC9kMnAxOlNjRz48ZDJwMTpTY1I+MDwvZDJwMTpTY1I+PC9PdXRsaW5lQ29sb3I+PE91dGxpbmVXaWR0aD4wPC9PdXRsaW5lV2lkdGg+PFZhcmlhbnRzPk5vcm1hbDwvVmFyaWFudHM+PC9SVkZvbnQ+</NSString>
            </RVTextElement>
          </array>
        </RVDisplaySlide>
        <RVDisplaySlide backgroundColor="0 0 0 0" highlightColor="1 0.6470588235294118 0 1" drawingBackgroundColor="false" enabled="true" hotKey="" label="Might repeat 2-3x" notes="" UUID="5649CCE4-7BB9-A067-B9BC-D93BF8B46BF3" chordChartPath="">
          <array rvXMLIvarName="cues"/>
          <array rvXMLIvarName="displayElements">
            <RVTextElement displayName="Default" UUID="514C7458-448A-1FB0-2312-9254D8940735" typeID="0" displayDelay="0" locked="false" persistent="0" fromTemplate="false" opacity="1" source="" bezelRadius="0" rotation="0" drawingFill="false" drawingShadow="true" drawingStroke="false" fillColor="1 1 1 0" adjustsHeightToFit="false" verticalAlignment="0" revealType="0">
              <RVRect3D rvXMLIvarName="position">{40 40 0 1840 1000}</RVRect3D>
              <shadow rvXMLIvarName="shadow">8|0.5019607843137255 0.5019607843137255 0.5019607843137255 1|{2.82842712474619, 2.8284271247461903}</shadow>
              <dictionary rvXMLIvarName="stroke">
                <NSColor rvXMLDictionaryKey="RVShapeElementStrokeColorKey">0 0 0 1</NSColor>
                <NSNumber rvXMLDictionaryKey="RVShapeElementStrokeWidthKey" hint="double">0</NSNumber>
              </dictionary>
              <NSString rvXMLIvarName="PlainText">WW91IGFyZSBmb3JldmVyIG1pbmU=</NSString>
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwe1xmb250dGJsXGYwXGZzd2lzc1xmY2hhcnNldDAgSW1wYWN0O317XGNvbG9ydGJsO1xyZWQyNTBcZ3JlZW4yNTBcYmx1ZTI1MDt9XHBhcmRcdHg1NjBcdHgxMTIwXHR4MTY4MFx0eDIyNDBcdHgyODAwXHR4MzM2MFx0eDM5MjBcdHg0NDgwXHR4NTA0MFx0eDU2MDBcdHg2MTYwXHR4NjcyMFxxY1xwYXJkaXJuYXR1cmFsXGYwXGZzMTYwIFxjZjEgWW91IGFyZSBmb3JldmVyIG1pbmV9</NSString>
              <NSString rvXMLIvarName="WinFlowData">PEZsb3dEb2N1bWVudCBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIFBhZ2VQYWRkaW5nPSI1LDAsNSwwIiBBbGxvd0Ryb3A9IlRydWUiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dpbmZ4LzIwMDYveGFtbC9wcmVzZW50YXRpb24iPjxQYXJhZ3JhcGggTWFyZ2luPSIwLDAsMCwwIiBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIj48UnVuIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIiBGb3JlZ3JvdW5kPSIjRkFGQUZBRkYiIEJsb2NrLlRleHRBbGlnbm1lbnQ9IkNlbnRlciI+WW91IGFyZSBmb3JldmVyIG1pbmU8L1J1bj48L1BhcmFncmFwaD48L0Zsb3dEb2N1bWVudD4=</NSString>
              <NSString rvXMLIvarName="WinFontData">PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTE2Ij8+PFJWRm9udCB4bWxuczppPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9Qcm9QcmVzZW50ZXIuQ29tbW9uIj48S2VybmluZz4wPC9LZXJuaW5nPjxMaW5lU3BhY2luZz4wPC9MaW5lU3BhY2luZz48T3V0bGluZUNvbG9yIHhtbG5zOmQycDE9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9TeXN0ZW0uV2luZG93cy5NZWRpYSI+PGQycDE6QT4yNTU8L2QycDE6QT48ZDJwMTpCPjA8L2QycDE6Qj48ZDJwMTpHPjA8L2QycDE6Rz48ZDJwMTpSPjA8L2QycDE6Uj48ZDJwMTpTY0E+MTwvZDJwMTpTY0E+PGQycDE6U2NCPjA8L2QycDE6U2NCPjxkMnAxOlNjRz4wPC9kMnAxOlNjRz48ZDJwMTpTY1I+MDwvZDJwMTpTY1I+PC9PdXRsaW5lQ29sb3I+PE91dGxpbmVXaWR0aD4wPC9PdXRsaW5lV2lkdGg+PFZhcmlhbnRzPk5vcm1hbDwvVmFyaWFudHM+PC9SVkZvbnQ+</NSString>
            </RVTextElement>
          </array>
        </RVDisplaySlide>
      </array>
    </RVSlideGrouping>
    <RVSlideGrouping name="Chorus" uuid="80749948-ED9F-1185-9D69-1EA873008253" color="1 0.39215686274509803 0.39215686274509803 1">
      <array rvXMLIvarName="slides">
        <RVDisplaySlide backgroundColor="0 0 0 0" highlightColor="0 0 0 0" drawingBackgroundColor="false" enabled="true" hotKey="" label="" notes="" UUID="08AA6D51-54C9-3292-25BE-1D6E0E1AE715" chordChartPath="">
          <array rvXMLIvarName="cues"/>
          <array rvXMLIvarName="displayElements">
            <RVTextElement displayName="Default" UUID="5A057F0A-8F78-FC1C-60B8-77252B39ABA8" typeID="0" displayDelay="0" locked="false" persistent="0" fromTemplate="false" opacity="1" source="" bezelRadius="0" rotation="0" drawingFill="false" drawingShadow="true" drawingStroke="false" fillColor="1 1 1 0" adjustsHeightToFit="false" verticalAlignment="0" revealType="0">
              <RVRect3D rvXMLIvarName="position">{40 40 0 1840 1000}</RVRect3D>
              <shadow rvXMLIvarName="shadow">8|0.5019607843137255 0.5019607843137255 0.5019607843137255 1|{2.82842712474619, 2.8284271247461903}</shadow>
              <dictionary rvXMLIvarName="stroke">
                <NSColor rvXMLDictionaryKey="RVShapeElementStrokeColorKey">0 0 0 1</NSColor>
                <NSNumber rvXMLDictionaryKey="RVShapeElementStrokeWidthKey" hint="double">0</NSNumber>
              </dictionary>
              <NSString rvXMLIvarName="PlainText">TXkgY2hhaW5zIGFyZSBnb25lLCBJJ3ZlIGJlZW4gc2V0IGZyZWUKTXkgR29kLCBteSBTYXZpb3IgaGFzIHJhbnNvbWVkIG1l</NSString>
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwe1xmb250dGJsXGYwXGZzd2lzc1xmY2hhcnNldDAgSW1wYWN0O317XGNvbG9ydGJsO1xyZWQyNTBcZ3JlZW4yNTBcYmx1ZTI1MDt9XHBhcmRcdHg1NjBcdHgxMTIwXHR4MTY4MFx0eDIyNDBcdHgyODAwXHR4MzM2MFx0eDM5MjBcdHg0NDgwXHR4NTA0MFx0eDU2MDBcdHg2MTYwXHR4NjcyMFxxY1xwYXJkaXJuYXR1cmFsXGYwXGZzMTYwIFxjZjEgTXkgY2hhaW5zIGFyZSBnb25lLCBJJ3ZlIGJlZW4gc2V0IGZyZWVcDU15IEdvZCwgbXkgU2F2aW9yIGhhcyByYW5zb21lZCBtZX0=</NSString>
              <NSString rvXMLIvarName="WinFlowData">PEZsb3dEb2N1bWVudCBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIFBhZ2VQYWRkaW5nPSI1LDAsNSwwIiBBbGxvd0Ryb3A9IlRydWUiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dpbmZ4LzIwMDYveGFtbC9wcmVzZW50YXRpb24iPjxQYXJhZ3JhcGggTWFyZ2luPSIwLDAsMCwwIiBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIj48UnVuIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIiBGb3JlZ3JvdW5kPSIjRkFGQUZBRkYiIEJsb2NrLlRleHRBbGlnbm1lbnQ9IkNlbnRlciI+TXkgY2hhaW5zIGFyZSBnb25lLCBJJ3ZlIGJlZW4gc2V0IGZyZWU8L1J1bj48L1BhcmFncmFwaD48UGFyYWdyYXBoIE1hcmdpbj0iMCwwLDAsMCIgVGV4dEFsaWdubWVudD0iQ2VudGVyIiBGb250RmFtaWx5PSJJbXBhY3QiIEZvbnRTaXplPSI4MCI+PFJ1biBGb250RmFtaWx5PSJJbXBhY3QiIEZvbnRTaXplPSI4MCIgRm9yZWdyb3VuZD0iI0ZBRkFGQUZGIiBCbG9jay5UZXh0QWxpZ25tZW50PSJDZW50ZXIiPk15IEdvZCwgbXkgU2F2aW9yIGhhcyByYW5zb21lZCBtZTwvUnVuPjwvUGFyYWdyYXBoPjwvRmxvd0RvY3VtZW50Pg==</NSString>
              <NSString rvXMLIvarName="WinFontData">PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTE2Ij8+PFJWRm9udCB4bWxuczppPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9Qcm9QcmVzZW50ZXIuQ29tbW9uIj48S2VybmluZz4wPC9LZXJuaW5nPjxMaW5lU3BhY2luZz4wPC9MaW5lU3BhY2luZz48T3V0bGluZUNvbG9yIHhtbG5zOmQycDE9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9TeXN0ZW0uV2luZG93cy5NZWRpYSI+PGQycDE6QT4yNTU8L2QycDE6QT48ZDJwMTpCPjA8L2QycDE6Qj48ZDJwMTpHPjA8L2QycDE6Rz48ZDJwMTpSPjA8L2QycDE6Uj48ZDJwMTpTY0E+MTwvZDJwMTpTY0E+PGQycDE6U2NCPjA8L2QycDE6U2NCPjxkMnAxOlNjRz4wPC9kMnAxOlNjRz48ZDJwMTpTY1I+MDwvZDJwMTpTY1I+PC9PdXRsaW5lQ29sb3I+PE91dGxpbmVXaWR0aD4wPC9PdXRsaW5lV2lkdGg+PFZhcmlhbnRzPk5vcm1hbDwvVmFyaWFudHM+PC9SVkZvbnQ+</NSString>
            </RVTextElement>
          </array>
        </RVDisplaySlide>
        <RVDisplaySlide backgroundColor="0 0 0 0" highlightColor="0 0 0 0" drawingBackgroundColor="false" enabled="true" hotKey="" label="" notes="" UUID="0DC1E03B-DA39-BA11-4D2F-7BB332A13013" chordChartPath="">
          <array rvXMLIvarName="cues"/>
          <array rvXMLIvarName="displayElements">
            <RVTextElement displayName="Default" UUID="82C95C24-A30B-4A78-DF01-0C7447961DDF" typeID="0" displayDelay="0" locked="false" persistent="0" fromTemplate="false" opacity="1" source="" bezelRadius="0" rotation="0" drawingFill="false" drawingShadow="true" drawingStroke="false" fillColor="1 1 1 0" adjustsHeightToFit="false" verticalAlignment="0" revealType="0">
              <RVRect3D rvXMLIvarName="position">{40 40 0 1840 1000}</RVRect3D>
              <shadow rvXMLIvarName="shadow">8|0.5019607843137255 0.5019607843137255 0.5019607843137255 1|{2.82842712474619, 2.8284271247461903}</shadow>
              <dictionary rvXMLIvarName="stroke">
                <NSColor rvXMLDictionaryKey="RVShapeElementStrokeColorKey">0 0 0 1</NSColor>
                <NSNumber rvXMLDictionaryKey="RVShapeElementStrokeWidthKey" hint="double">0</NSNumber>
              </dictionary>
              <NSString rvXMLIvarName="PlainText">QW5kIGxpa2UgYSBmbG9vZCBIaXMgbWVyY3kgcmVpZ25zClVuZW5kaW5nIGxvdmUsIGFtYXppbmcgZ3JhY2U=</NSString>
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwe1xmb250dGJsXGYwXGZzd2lzc1xmY2hhcnNldDAgSW1wYWN0O317XGNvbG9ydGJsO1xyZWQyNTBcZ3JlZW4yNTBcYmx1ZTI1MDt9XHBhcmRcdHg1NjBcdHgxMTIwXHR4MTY4MFx0eDIyNDBcdHgyODAwXHR4MzM2MFx0eDM5MjBcdHg0NDgwXHR4NTA0MFx0eDU2MDBcdHg2MTYwXHR4NjcyMFxxY1xwYXJkaXJuYXR1cmFsXGYwXGZzMTYwIFxjZjEgQW5kIGxpa2UgYSBmbG9vZCBIaXMgbWVyY3kgcmVpZ25zXA1VbmVuZGluZyBsb3ZlLCBhbWF6aW5nIGdyYWNlfQ==</NSString>
              <NSString rvXMLIvarName="WinFlowData">PEZsb3dEb2N1bWVudCBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIFBhZ2VQYWRkaW5nPSI1LDAsNSwwIiBBbGxvd0Ryb3A9IlRydWUiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dpbmZ4LzIwMDYveGFtbC9wcmVzZW50YXRpb24iPjxQYXJhZ3JhcGggTWFyZ2luPSIwLDAsMCwwIiBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIj48UnVuIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIiBGb3JlZ3JvdW5kPSIjRkFGQUZBRkYiIEJsb2NrLlRleHRBbGlnbm1lbnQ9IkNlbnRlciI+QW5kIGxpa2UgYSBmbG9vZCBIaXMgbWVyY3kgcmVpZ25zPC9SdW4+PC9QYXJhZ3JhcGg+PFBhcmFncmFwaCBNYXJnaW49IjAsMCwwLDAiIFRleHRBbGlnbm1lbnQ9IkNlbnRlciIgRm9udEZhbWlseT0iSW1wYWN0IiBGb250U2l6ZT0iODAiPjxSdW4gRm9udEZhbWlseT0iSW1wYWN0IiBGb250U2l6ZT0iODAiIEZvcmVncm91bmQ9IiNGQUZBRkFGRiIgQmxvY2suVGV4dEFsaWdubWVudD0iQ2VudGVyIj5VbmVuZGluZyBsb3ZlLCBhbWF6aW5nIGdyYWNlPC9SdW4+PC9QYXJhZ3JhcGg+PC9GbG93RG9jdW1lbnQ+</NSString>
              <NSString rvXMLIvarName="WinFontData">PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTE2Ij8+PFJWRm9udCB4bWxuczppPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9Qcm9QcmVzZW50ZXIuQ29tbW9uIj48S2VybmluZz4wPC9LZXJuaW5nPjxMaW5lU3BhY2luZz4wPC9MaW5lU3BhY2luZz48T3V0bGluZUNvbG9yIHhtbG5zOmQycDE9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9TeXN0ZW0uV2luZG93cy5NZWRpYSI+PGQycDE6QT4yNTU8L2QycDE6QT48ZDJwMTpCPjA8L2QycDE6Qj48ZDJwMTpHPjA8L2QycDE6Rz48ZDJwMTpSPjA8L2QycDE6Uj48ZDJwMTpTY0E+MTwvZDJwMTpTY0E+PGQycDE6U2NCPjA8L2QycDE6U2NCPjxkMnAxOlNjRz4wPC9kMnAxOlNjRz48ZDJwMTpTY1I+MDwvZDJwMTpTY1I+PC9PdXRsaW5lQ29sb3I+PE91dGxpbmVXaWR0aD4wPC9PdXRsaW5lV2lkdGg+PFZhcmlhbnRzPk5vcm1hbDwvVmFyaWFudHM+PC9SVkZvbnQ+</NSString>
            </RVTextElement>
          </array>
        </RVDisplaySlide>
      </array>
    </RVSlideGrouping>
    <RVSlideGrouping name="Ending" uuid="20228530-CC19-52CE-4E0B-7E8CECA372EC" color="0 0 0 0">
      <array rvXMLIvarName="slides">
        <RVDisplaySlide backgroundColor="0 0 0 0" highlightColor="0 0 0 0" drawingBackgroundColor="false" enabled="true" hotKey="" label="Leave on screen" notes="" UUID="1AD76149-860F-51F7-A0E5-69774C8C74A0" chordChartPath="">
          <array rvXMLIvarName="cues"/>
          <array rvXMLIvarName="displayElements">
            <RVTextElement displayName="Default" UUID="DAE5C458-9C15-3A5B-5294-5C3033BF94CB" typeID="0" displayDelay="0" locked="false" persistent="0" fromTemplate="false" opacity="1" source="" bezelRadius="0" rotation="0" drawingFill="false" drawingShadow="true" drawingStroke="false" fillColor="1 1 1 0" adjustsHeightToFit="false" verticalAlignment="0" revealType="0">
              <RVRect3D rvXMLIvarName="position">{40 40 0 1840 1000}</RVRect3D>
              <shadow rvXMLIvarName="shadow">8|0.5019607843137255 0.5019607843137255 0.5019607843137255 1|{2.82842712474619, 2.8284271247461903}</shadow>
              <dictionary rvXMLIvarName="stroke">
                <NSColor rvXMLDictionaryKey="RVShapeElementStrokeColorKey">0 0 0 1</NSColor>
                <NSNumber rvXMLDictionaryKey="RVShapeElementStrokeWidthKey" hint="double">0</NSNumber>
              </dictionary>
              <NSString rvXMLIvarName="PlainText">QW1hemluZyBncmFjZQ==</NSString>
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwe1xmb250dGJsXGYwXGZzd2lzc1xmY2hhcnNldDAgSW1wYWN0O317XGNvbG9ydGJsO1xyZWQyNTBcZ3JlZW4yNTBcYmx1ZTI1MDt9XHBhcmRcdHg1NjBcdHgxMTIwXHR4MTY4MFx0eDIyNDBcdHgyODAwXHR4MzM2MFx0eDM5MjBcdHg0NDgwXHR4NTA0MFx0eDU2MDBcdHg2MTYwXHR4NjcyMFxxY1xwYXJkaXJuYXR1cmFsXGYwXGZzMTYwIFxjZjEgQW1hemluZyBncmFjZX0=</NSString>
              <NSString rvXMLIvarName="WinFlowData">PEZsb3dEb2N1bWVudCBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIFBhZ2VQYWRkaW5nPSI1LDAsNSwwIiBBbGxvd0Ryb3A9IlRydWUiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dpbmZ4LzIwMDYveGFtbC9wcmVzZW50YXRpb24iPjxQYXJhZ3JhcGggTWFyZ2luPSIwLDAsMCwwIiBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIj48UnVuIEZvbnRGYW1pbHk9IkltcGFjdCIgRm9udFNpemU9IjgwIiBGb3JlZ3JvdW5kPSIjRkFGQUZBRkYiIEJsb2NrLlRleHRBbGlnbm1lbnQ9IkNlbnRlciI+QW1hemluZyBncmFjZTwvUnVuPjwvUGFyYWdyYXBoPjwvRmxvd0RvY3VtZW50Pg==</NSString>
              <NSString rvXMLIvarName="WinFontData">PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTE2Ij8+PFJWRm9udCB4bWxuczppPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9Qcm9QcmVzZW50ZXIuQ29tbW9uIj48S2VybmluZz4wPC9LZXJuaW5nPjxMaW5lU3BhY2luZz4wPC9MaW5lU3BhY2luZz48T3V0bGluZUNvbG9yIHhtbG5zOmQycDE9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9TeXN0ZW0uV2luZG93cy5NZWRpYSI+PGQycDE6QT4yNTU8L2QycDE6QT48ZDJwMTpCPjA8L2QycDE6Qj48ZDJwMTpHPjA8L2QycDE6Rz48ZDJwMTpSPjA8L2QycDE6Uj48ZDJwMTpTY0E+MTwvZDJwMTpTY0E+PGQycDE6U2NCPjA8L2QycDE6U2NCPjxkMnAxOlNjRz4wPC9kMnAxOlNjRz48ZDJwMTpTY1I+MDwvZDJwMTpTY1I+PC9PdXRsaW5lQ29sb3I+PE91dGxpbmVXaWR0aD4wPC9PdXRsaW5lV2lkdGg+PFZhcmlhbnRzPk5vcm1hbDwvVmFyaWFudHM+PC9SVkZvbnQ+</NSString>
            </RVTextElement>
          </array>
        </RVDisplaySlide>
      </array>
    </RVSlideGrouping>
  </array>
  <array rvXMLIvarName="arrangements"/>
</RVPresentationDocument>`);

    expect(normalizeDatesAndIdsForTesting(builder.build())).toEqual(expectedOutput);
  });

  it('should create a song from lyrics containing UTF-8 characters', () => {
    const builder = new v6Builder({
      properties: {
        CCLIAuthor: 'Neznámý autor',
        CCLIDisplay: false,
        category: 'Song',
        notes: '',
        height: 1080,
        width: 1920,
        CCLISongTitle: '1 Bože, tebe chválíme',
        CCLISongNumber: '11109',
      },
      slideTextFormatting: {
        textColor: {
          r: 255,
          g: 255,
          b: 255,
        },
        textPadding: 20,
        fontName: 'Arial',
        textSize: 60,
        textShadow: {
          angle: 135,
          color: {
            r: 0,
            g: 0,
            b: 0,
          },
          enabled: false,
          length: 7,
          radius: 10,
        },
      },
      slideGroups: [
        {
          label: 'Blank',
          groupColor: '#FF0000',
          slides: [''], //Add a blank slide group with 1 slide that has no text. Good for setting a BG image on
        },
        {
          label: 'Song',
          groupColor: '#0000FF',
          slides: [
            {
              label: 'v1',
              text: 'Bože, tebe chválíme, před tebou se skláníme \ns neskonalou radostí, se srdečnou vděčností,\nneb nám sebe dáváš znáti. Něžně miluješ nás vždy,\notec milý v Kristu jsi, dětmi ráčíš nás v něm zváti.',
            },
            {
              label: 'v2',
              text: 'Chválíme tě s vroucností, žes nám poslal z výsosti \nSyna svého drahého,\nhřích náš vložils na něho a\nmy svobodni jsme nyní. Vzhůru, srdce, vznes se, vznes,\nvesele ať zní tvůj ples z Božího tu dobrodiní!',
            },
            {
              label: 'v3',
              text: 'Chválíme tě uctivě, vděčně, vroucně, ohnivě. Díky tobě vzdáváme, nad tvou láskou jásáme,\nvždyť jsme lid tvůj vykoupený. Tys nás v poušti nenechal, tys nám život věčný dal. Bože náš, buď velebený!',
            },
            {
              label: 'v4',
              text: 'Z Ducha znovuzrozeni, s tebou v Kristu spojeni, spásy máme jistotu, tvoji známe dobrotu, tebe, Bože, velebíme.\nDíky tobě vzdáváme, že jsme tvoji, jásáme, tebe, Otče, vděčně ctíme.',
            },
          ],
        },
      ],
    });

    const expectedOutput = normalizeDatesAndIdsForTesting(`
<?xml version="1.0" encoding="utf-8"?>
<RVPresentationDocument CCLIArtistCredits="" CCLIAuthor="Neznámý autor" CCLICopyrightYear="" CCLIDisplay="false" CCLIPublisher="" CCLISongNumber="11109" CCLISongTitle="1 Bože, tebe chválíme" category="Song" notes="" lastDateUsed="2023-06-20T15:29:44" height="1080" width="1920" backgroundColor="0 0 0 1" buildNumber="6016" chordChartPath="" docType="0" drawingBackgroundColor="false" resourcesDirectory="" selectedArrangementID="" os="1" usedCount="0" versionNumber="600">
  <RVTransition rvXMLIvarName="transitionObject" transitionType="-1" transitionDirection="0" transitionDuration="1" motionEnabled="false" motionDuration="0" motionSpeed="0" groupIndex="0" orderIndex="0" slideBuildAction="0" slideBuildDelay="0"/>
  <RVTimeline rvXMLIvarName="timeline" timeOffset="0" duration="0" selectedMediaTrackIndex="0" loop="false">
    <array rvXMLIvarName="timeCues"/>
    <array rvXMLIvarName="mediaTracks"/>
  </RVTimeline>
  <array rvXMLIvarName="groups">
    <RVSlideGrouping name="Blank" uuid="AAD34AAA-093F-66E4-A0AD-3AD4FBED977D" color="1 0 0 1">
      <array rvXMLIvarName="slides">
        <RVDisplaySlide backgroundColor="0 0 0 0" highlightColor="0 0 0 0" drawingBackgroundColor="false" enabled="true" hotKey="" label="" notes="" UUID="B0F34284-68D9-E4B5-8EB7-30189697D988" chordChartPath="">
          <array rvXMLIvarName="cues"/>
          <array rvXMLIvarName="displayElements">
            <RVTextElement displayName="Default" uuid="00001111-2222-3333-4444-555566667777" typeID="0" displayDelay="0" locked="false" persistent="0" fromTemplate="false" opacity="1" source="" bezelRadius="0" rotation="0" drawingFill="false" drawingShadow="false" drawingStroke="false" fillColor="1 1 1 0" adjustsHeightToFit="false" verticalAlignment="0" revealType="0">
              <RVRect3D rvXMLIvarName="position">{20 20 0 1880 1040}</RVRect3D>
              <shadow rvXMLIvarName="shadow">10|0 0 0 1|{4.949747468305833, -4.949747468305832}</shadow>
              <dictionary rvXMLIvarName="stroke">
                <NSColor rvXMLDictionaryKey="RVShapeElementStrokeColorKey">0 0 0 1</NSColor>
                <NSNumber rvXMLDictionaryKey="RVShapeElementStrokeWidthKey" hint="double">0</NSNumber>
              </dictionary>
              <NSString rvXMLIvarName="PlainText"></NSString>
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwe1xmb250dGJsXGYwXGZzd2lzc1xmY2hhcnNldDAgQXJpYWw7fXtcY29sb3J0Ymw7XHJlZDI1NVxncmVlbjI1NVxibHVlMjU1O31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxMjAgXGNmMSB9</NSString>
              <NSString rvXMLIvarName="WinFlowData">PEZsb3dEb2N1bWVudCBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIFBhZ2VQYWRkaW5nPSI1LDAsNSwwIiBBbGxvd0Ryb3A9IlRydWUiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dpbmZ4LzIwMDYveGFtbC9wcmVzZW50YXRpb24iPjwvRmxvd0RvY3VtZW50Pg==</NSString>
              <NSString rvXMLIvarName="WinFontData">PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTE2Ij8+PFJWRm9udCB4bWxuczppPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9Qcm9QcmVzZW50ZXIuQ29tbW9uIj48S2VybmluZz4wPC9LZXJuaW5nPjxMaW5lU3BhY2luZz4wPC9MaW5lU3BhY2luZz48T3V0bGluZUNvbG9yIHhtbG5zOmQycDE9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9TeXN0ZW0uV2luZG93cy5NZWRpYSI+PGQycDE6QT4yNTU8L2QycDE6QT48ZDJwMTpCPjA8L2QycDE6Qj48ZDJwMTpHPjA8L2QycDE6Rz48ZDJwMTpSPjA8L2QycDE6Uj48ZDJwMTpTY0E+MTwvZDJwMTpTY0E+PGQycDE6U2NCPjA8L2QycDE6U2NCPjxkMnAxOlNjRz4wPC9kMnAxOlNjRz48ZDJwMTpTY1I+MDwvZDJwMTpTY1I+PC9PdXRsaW5lQ29sb3I+PE91dGxpbmVXaWR0aD4wPC9PdXRsaW5lV2lkdGg+PFZhcmlhbnRzPk5vcm1hbDwvVmFyaWFudHM+PC9SVkZvbnQ+</NSString>
            </RVTextElement>
          </array>
        </RVDisplaySlide>
      </array>
    </RVSlideGrouping>
    <RVSlideGrouping name="Song" uuid="D6E8ADBE-A8EE-1AA7-1700-21AFF600646E" color="0 0 1 1">
      <array rvXMLIvarName="slides">
        <RVDisplaySlide backgroundColor="0 0 0 0" highlightColor="0 0 0 0" drawingBackgroundColor="false" enabled="true" hotKey="" label="v1" notes="" UUID="9D17FB89-1159-D1EC-E3FD-0E2780FE70CA" chordChartPath="">
          <array rvXMLIvarName="cues"/>
          <array rvXMLIvarName="displayElements">
            <RVTextElement displayName="Default" UUID="B3241B5B-4150-8F52-9725-53436C2F097D" typeID="0" displayDelay="0" locked="false" persistent="0" fromTemplate="false" opacity="1" source="" bezelRadius="0" rotation="0" drawingFill="false" drawingShadow="false" drawingStroke="false" fillColor="1 1 1 0" adjustsHeightToFit="false" verticalAlignment="0" revealType="0">
              <RVRect3D rvXMLIvarName="position">{20 20 0 1880 1040}</RVRect3D>
              <shadow rvXMLIvarName="shadow">10|0 0 0 1|{4.949747468305833, -4.949747468305832}</shadow>
              <dictionary rvXMLIvarName="stroke">
                <NSColor rvXMLDictionaryKey="RVShapeElementStrokeColorKey">0 0 0 1</NSColor>
                <NSNumber rvXMLDictionaryKey="RVShapeElementStrokeWidthKey" hint="double">0</NSNumber>
              </dictionary>
              <NSString rvXMLIvarName="PlainText">Qm/FvmUsIHRlYmUgY2h2w6Fsw61tZSwgcMWZZWQgdGVib3Ugc2Ugc2tsw6Fuw61tZSAKcyBuZXNrb25hbG91IHJhZG9zdMOtLCBzZSBzcmRlxI1ub3UgdmTEm8SNbm9zdMOtLApuZWIgbsOhbSBzZWJlIGTDoXbDocWhIHpuw6F0aS4gTsSbxb5uxJsgbWlsdWplxaEgbsOhcyB2xb5keSwKb3RlYyBtaWzDvSB2IEtyaXN0dSBqc2ksIGTEm3RtaSByw6HEjcOtxaEgbsOhcyB2IG7Em20genbDoXRpLg==</NSString>
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwe1xmb250dGJsXGYwXGZzd2lzc1xmY2hhcnNldDAgQXJpYWw7fXtcY29sb3J0Ymw7XHJlZDI1NVxncmVlbjI1NVxibHVlMjU1O31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxMjAgXGNmMSBCb8W+ZSwgdGViZSBjaHbDoWzDrW1lLCBwxZllZCB0ZWJvdSBzZSBza2zDoW7DrW1lIFwNcyBuZXNrb25hbG91IHJhZG9zdMOtLCBzZSBzcmRlxI1ub3UgdmTEm8SNbm9zdMOtLFwNbmViIG7DoW0gc2ViZSBkw6F2w6HFoSB6bsOhdGkuIE7Em8W+bsSbIG1pbHVqZcWhIG7DoXMgdsW+ZHksXA1vdGVjIG1pbMO9IHYgS3Jpc3R1IGpzaSwgZMSbdG1pIHLDocSNw63FoSBuw6FzIHYgbsSbbSB6dsOhdGkufQ==</NSString>
              <NSString rvXMLIvarName="WinFlowData">PEZsb3dEb2N1bWVudCBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIFBhZ2VQYWRkaW5nPSI1LDAsNSwwIiBBbGxvd0Ryb3A9IlRydWUiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dpbmZ4LzIwMDYveGFtbC9wcmVzZW50YXRpb24iPjxQYXJhZ3JhcGggTWFyZ2luPSIwLDAsMCwwIiBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIEZvbnRGYW1pbHk9IkFyaWFsIiBGb250U2l6ZT0iNjAiPjxSdW4gRm9udEZhbWlseT0iQXJpYWwiIEZvbnRTaXplPSI2MCIgRm9yZWdyb3VuZD0iI0ZGRkZGRkZGIiBCbG9jay5UZXh0QWxpZ25tZW50PSJDZW50ZXIiPkJvxb5lLCB0ZWJlIGNodsOhbMOtbWUsIHDFmWVkIHRlYm91IHNlIHNrbMOhbsOtbWUgPC9SdW4+PC9QYXJhZ3JhcGg+PFBhcmFncmFwaCBNYXJnaW49IjAsMCwwLDAiIFRleHRBbGlnbm1lbnQ9IkNlbnRlciIgRm9udEZhbWlseT0iQXJpYWwiIEZvbnRTaXplPSI2MCI+PFJ1biBGb250RmFtaWx5PSJBcmlhbCIgRm9udFNpemU9IjYwIiBGb3JlZ3JvdW5kPSIjRkZGRkZGRkYiIEJsb2NrLlRleHRBbGlnbm1lbnQ9IkNlbnRlciI+cyBuZXNrb25hbG91IHJhZG9zdMOtLCBzZSBzcmRlxI1ub3UgdmTEm8SNbm9zdMOtLDwvUnVuPjwvUGFyYWdyYXBoPjxQYXJhZ3JhcGggTWFyZ2luPSIwLDAsMCwwIiBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIEZvbnRGYW1pbHk9IkFyaWFsIiBGb250U2l6ZT0iNjAiPjxSdW4gRm9udEZhbWlseT0iQXJpYWwiIEZvbnRTaXplPSI2MCIgRm9yZWdyb3VuZD0iI0ZGRkZGRkZGIiBCbG9jay5UZXh0QWxpZ25tZW50PSJDZW50ZXIiPm5lYiBuw6FtIHNlYmUgZMOhdsOhxaEgem7DoXRpLiBOxJvFvm7EmyBtaWx1amXFoSBuw6FzIHbFvmR5LDwvUnVuPjwvUGFyYWdyYXBoPjxQYXJhZ3JhcGggTWFyZ2luPSIwLDAsMCwwIiBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIEZvbnRGYW1pbHk9IkFyaWFsIiBGb250U2l6ZT0iNjAiPjxSdW4gRm9udEZhbWlseT0iQXJpYWwiIEZvbnRTaXplPSI2MCIgRm9yZWdyb3VuZD0iI0ZGRkZGRkZGIiBCbG9jay5UZXh0QWxpZ25tZW50PSJDZW50ZXIiPm90ZWMgbWlsw70gdiBLcmlzdHUganNpLCBkxJt0bWkgcsOhxI3DrcWhIG7DoXMgdiBuxJttIHp2w6F0aS48L1J1bj48L1BhcmFncmFwaD48L0Zsb3dEb2N1bWVudD4=</NSString>
              <NSString rvXMLIvarName="WinFontData">PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTE2Ij8+PFJWRm9udCB4bWxuczppPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9Qcm9QcmVzZW50ZXIuQ29tbW9uIj48S2VybmluZz4wPC9LZXJuaW5nPjxMaW5lU3BhY2luZz4wPC9MaW5lU3BhY2luZz48T3V0bGluZUNvbG9yIHhtbG5zOmQycDE9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9TeXN0ZW0uV2luZG93cy5NZWRpYSI+PGQycDE6QT4yNTU8L2QycDE6QT48ZDJwMTpCPjA8L2QycDE6Qj48ZDJwMTpHPjA8L2QycDE6Rz48ZDJwMTpSPjA8L2QycDE6Uj48ZDJwMTpTY0E+MTwvZDJwMTpTY0E+PGQycDE6U2NCPjA8L2QycDE6U2NCPjxkMnAxOlNjRz4wPC9kMnAxOlNjRz48ZDJwMTpTY1I+MDwvZDJwMTpTY1I+PC9PdXRsaW5lQ29sb3I+PE91dGxpbmVXaWR0aD4wPC9PdXRsaW5lV2lkdGg+PFZhcmlhbnRzPk5vcm1hbDwvVmFyaWFudHM+PC9SVkZvbnQ+</NSString>
            </RVTextElement>
          </array>
        </RVDisplaySlide>
        <RVDisplaySlide backgroundColor="0 0 0 0" highlightColor="0 0 0 0" drawingBackgroundColor="false" enabled="true" hotKey="" label="v2" notes="" UUID="9D17FB89-1159-D1EC-E3FD-0E2780FE70CA" chordChartPath="">
          <array rvXMLIvarName="cues"/>
          <array rvXMLIvarName="displayElements">
            <RVTextElement displayName="Default" UUID="B3241B5B-4150-8F52-9725-53436C2F097D" typeID="0" displayDelay="0" locked="false" persistent="0" fromTemplate="false" opacity="1" source="" bezelRadius="0" rotation="0" drawingFill="false" drawingShadow="false" drawingStroke="false" fillColor="1 1 1 0" adjustsHeightToFit="false" verticalAlignment="0" revealType="0">
              <RVRect3D rvXMLIvarName="position">{20 20 0 1880 1040}</RVRect3D>
              <shadow rvXMLIvarName="shadow">10|0 0 0 1|{4.949747468305833, -4.949747468305832}</shadow>
              <dictionary rvXMLIvarName="stroke">
                <NSColor rvXMLDictionaryKey="RVShapeElementStrokeColorKey">0 0 0 1</NSColor>
                <NSNumber rvXMLDictionaryKey="RVShapeElementStrokeWidthKey" hint="double">0</NSNumber>
              </dictionary>
              <NSString rvXMLIvarName="PlainText">Q2h2w6Fsw61tZSB0xJsgcyB2cm91Y25vc3TDrSwgxb5lcyBuw6FtIHBvc2xhbCB6IHbDvXNvc3RpIApTeW5hIHN2w6lobyBkcmFow6lobywKaMWZw61jaCBuw6HFoSB2bG/FvmlscyBuYSBuxJtobyBhCm15IHN2b2JvZG5pIGpzbWUgbnluw60uIFZ6aMWvcnUsIHNyZGNlLCB2em5lcyBzZSwgdnpuZXMsCnZlc2VsZSBhxaUgem7DrSB0dsWvaiBwbGVzIHogQm/FvsOtaG8gdHUgZG9icm9kaW7DrSE=</NSString>
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwe1xmb250dGJsXGYwXGZzd2lzc1xmY2hhcnNldDAgQXJpYWw7fXtcY29sb3J0Ymw7XHJlZDI1NVxncmVlbjI1NVxibHVlMjU1O31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxMjAgXGNmMSBDaHbDoWzDrW1lIHTEmyBzIHZyb3Vjbm9zdMOtLCDFvmVzIG7DoW0gcG9zbGFsIHogdsO9c29zdGkgXA1TeW5hIHN2w6lobyBkcmFow6lobyxcDWjFmcOtY2ggbsOhxaEgdmxvxb5pbHMgbmEgbsSbaG8gYVwNbXkgc3ZvYm9kbmkganNtZSBueW7DrS4gVnpoxa9ydSwgc3JkY2UsIHZ6bmVzIHNlLCB2em5lcyxcDXZlc2VsZSBhxaUgem7DrSB0dsWvaiBwbGVzIHogQm/FvsOtaG8gdHUgZG9icm9kaW7DrSF9</NSString>
              <NSString rvXMLIvarName="WinFlowData">PEZsb3dEb2N1bWVudCBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIFBhZ2VQYWRkaW5nPSI1LDAsNSwwIiBBbGxvd0Ryb3A9IlRydWUiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dpbmZ4LzIwMDYveGFtbC9wcmVzZW50YXRpb24iPjxQYXJhZ3JhcGggTWFyZ2luPSIwLDAsMCwwIiBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIEZvbnRGYW1pbHk9IkFyaWFsIiBGb250U2l6ZT0iNjAiPjxSdW4gRm9udEZhbWlseT0iQXJpYWwiIEZvbnRTaXplPSI2MCIgRm9yZWdyb3VuZD0iI0ZGRkZGRkZGIiBCbG9jay5UZXh0QWxpZ25tZW50PSJDZW50ZXIiPkNodsOhbMOtbWUgdMSbIHMgdnJvdWNub3N0w60sIMW+ZXMgbsOhbSBwb3NsYWwgeiB2w71zb3N0aSA8L1J1bj48L1BhcmFncmFwaD48UGFyYWdyYXBoIE1hcmdpbj0iMCwwLDAsMCIgVGV4dEFsaWdubWVudD0iQ2VudGVyIiBGb250RmFtaWx5PSJBcmlhbCIgRm9udFNpemU9IjYwIj48UnVuIEZvbnRGYW1pbHk9IkFyaWFsIiBGb250U2l6ZT0iNjAiIEZvcmVncm91bmQ9IiNGRkZGRkZGRiIgQmxvY2suVGV4dEFsaWdubWVudD0iQ2VudGVyIj5TeW5hIHN2w6lobyBkcmFow6lobyw8L1J1bj48L1BhcmFncmFwaD48UGFyYWdyYXBoIE1hcmdpbj0iMCwwLDAsMCIgVGV4dEFsaWdubWVudD0iQ2VudGVyIiBGb250RmFtaWx5PSJBcmlhbCIgRm9udFNpemU9IjYwIj48UnVuIEZvbnRGYW1pbHk9IkFyaWFsIiBGb250U2l6ZT0iNjAiIEZvcmVncm91bmQ9IiNGRkZGRkZGRiIgQmxvY2suVGV4dEFsaWdubWVudD0iQ2VudGVyIj5oxZnDrWNoIG7DocWhIHZsb8W+aWxzIG5hIG7Em2hvIGE8L1J1bj48L1BhcmFncmFwaD48UGFyYWdyYXBoIE1hcmdpbj0iMCwwLDAsMCIgVGV4dEFsaWdubWVudD0iQ2VudGVyIiBGb250RmFtaWx5PSJBcmlhbCIgRm9udFNpemU9IjYwIj48UnVuIEZvbnRGYW1pbHk9IkFyaWFsIiBGb250U2l6ZT0iNjAiIEZvcmVncm91bmQ9IiNGRkZGRkZGRiIgQmxvY2suVGV4dEFsaWdubWVudD0iQ2VudGVyIj5teSBzdm9ib2RuaSBqc21lIG55bsOtLiBWemjFr3J1LCBzcmRjZSwgdnpuZXMgc2UsIHZ6bmVzLDwvUnVuPjwvUGFyYWdyYXBoPjxQYXJhZ3JhcGggTWFyZ2luPSIwLDAsMCwwIiBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIEZvbnRGYW1pbHk9IkFyaWFsIiBGb250U2l6ZT0iNjAiPjxSdW4gRm9udEZhbWlseT0iQXJpYWwiIEZvbnRTaXplPSI2MCIgRm9yZWdyb3VuZD0iI0ZGRkZGRkZGIiBCbG9jay5UZXh0QWxpZ25tZW50PSJDZW50ZXIiPnZlc2VsZSBhxaUgem7DrSB0dsWvaiBwbGVzIHogQm/FvsOtaG8gdHUgZG9icm9kaW7DrSE8L1J1bj48L1BhcmFncmFwaD48L0Zsb3dEb2N1bWVudD4=</NSString>
              <NSString rvXMLIvarName="WinFontData">PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTE2Ij8+PFJWRm9udCB4bWxuczppPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9Qcm9QcmVzZW50ZXIuQ29tbW9uIj48S2VybmluZz4wPC9LZXJuaW5nPjxMaW5lU3BhY2luZz4wPC9MaW5lU3BhY2luZz48T3V0bGluZUNvbG9yIHhtbG5zOmQycDE9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9TeXN0ZW0uV2luZG93cy5NZWRpYSI+PGQycDE6QT4yNTU8L2QycDE6QT48ZDJwMTpCPjA8L2QycDE6Qj48ZDJwMTpHPjA8L2QycDE6Rz48ZDJwMTpSPjA8L2QycDE6Uj48ZDJwMTpTY0E+MTwvZDJwMTpTY0E+PGQycDE6U2NCPjA8L2QycDE6U2NCPjxkMnAxOlNjRz4wPC9kMnAxOlNjRz48ZDJwMTpTY1I+MDwvZDJwMTpTY1I+PC9PdXRsaW5lQ29sb3I+PE91dGxpbmVXaWR0aD4wPC9PdXRsaW5lV2lkdGg+PFZhcmlhbnRzPk5vcm1hbDwvVmFyaWFudHM+PC9SVkZvbnQ+</NSString>
            </RVTextElement>
          </array>
        </RVDisplaySlide>
        <RVDisplaySlide backgroundColor="0 0 0 0" highlightColor="0 0 0 0" drawingBackgroundColor="false" enabled="true" hotKey="" label="v3" notes="" UUID="9D17FB89-1159-D1EC-E3FD-0E2780FE70CA" chordChartPath="">
          <array rvXMLIvarName="cues"/>
          <array rvXMLIvarName="displayElements">
            <RVTextElement displayName="Default" UUID="B3241B5B-4150-8F52-9725-53436C2F097D" typeID="0" displayDelay="0" locked="false" persistent="0" fromTemplate="false" opacity="1" source="" bezelRadius="0" rotation="0" drawingFill="false" drawingShadow="false" drawingStroke="false" fillColor="1 1 1 0" adjustsHeightToFit="false" verticalAlignment="0" revealType="0">
              <RVRect3D rvXMLIvarName="position">{20 20 0 1880 1040}</RVRect3D>
              <shadow rvXMLIvarName="shadow">10|0 0 0 1|{4.949747468305833, -4.949747468305832}</shadow>
              <dictionary rvXMLIvarName="stroke">
                <NSColor rvXMLDictionaryKey="RVShapeElementStrokeColorKey">0 0 0 1</NSColor>
                <NSNumber rvXMLDictionaryKey="RVShapeElementStrokeWidthKey" hint="double">0</NSNumber>
              </dictionary>
              <NSString rvXMLIvarName="PlainText">Q2h2w6Fsw61tZSB0xJsgdWN0aXbEmywgdmTEm8SNbsSbLCB2cm91Y27Emywgb2huaXbEmy4gRMOta3kgdG9ixJsgdnpkw6F2w6FtZSwgbmFkIHR2b3UgbMOhc2tvdSBqw6Fzw6FtZSwKdsW+ZHnFpSBqc21lIGxpZCB0dsWvaiB2eWtvdXBlbsO9LiBUeXMgbsOhcyB2IHBvdcWhdGkgbmVuZWNoYWwsIHR5cyBuw6FtIMW+aXZvdCB2xJvEjW7DvSBkYWwuIEJvxb5lIG7DocWhLCBidcSPIHZlbGViZW7DvSE=</NSString>
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwe1xmb250dGJsXGYwXGZzd2lzc1xmY2hhcnNldDAgQXJpYWw7fXtcY29sb3J0Ymw7XHJlZDI1NVxncmVlbjI1NVxibHVlMjU1O31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxMjAgXGNmMSBDaHbDoWzDrW1lIHTEmyB1Y3RpdsSbLCB2ZMSbxI1uxJssIHZyb3VjbsSbLCBvaG5pdsSbLiBEw61reSB0b2LEmyB2emTDoXbDoW1lLCBuYWQgdHZvdSBsw6Fza291IGrDoXPDoW1lLFwNdsW+ZHnFpSBqc21lIGxpZCB0dsWvaiB2eWtvdXBlbsO9LiBUeXMgbsOhcyB2IHBvdcWhdGkgbmVuZWNoYWwsIHR5cyBuw6FtIMW+aXZvdCB2xJvEjW7DvSBkYWwuIEJvxb5lIG7DocWhLCBidcSPIHZlbGViZW7DvSF9</NSString>
              <NSString rvXMLIvarName="WinFlowData">PEZsb3dEb2N1bWVudCBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIFBhZ2VQYWRkaW5nPSI1LDAsNSwwIiBBbGxvd0Ryb3A9IlRydWUiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dpbmZ4LzIwMDYveGFtbC9wcmVzZW50YXRpb24iPjxQYXJhZ3JhcGggTWFyZ2luPSIwLDAsMCwwIiBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIEZvbnRGYW1pbHk9IkFyaWFsIiBGb250U2l6ZT0iNjAiPjxSdW4gRm9udEZhbWlseT0iQXJpYWwiIEZvbnRTaXplPSI2MCIgRm9yZWdyb3VuZD0iI0ZGRkZGRkZGIiBCbG9jay5UZXh0QWxpZ25tZW50PSJDZW50ZXIiPkNodsOhbMOtbWUgdMSbIHVjdGl2xJssIHZkxJvEjW7EmywgdnJvdWNuxJssIG9obml2xJsuIETDrWt5IHRvYsSbIHZ6ZMOhdsOhbWUsIG5hZCB0dm91IGzDoXNrb3UgasOhc8OhbWUsPC9SdW4+PC9QYXJhZ3JhcGg+PFBhcmFncmFwaCBNYXJnaW49IjAsMCwwLDAiIFRleHRBbGlnbm1lbnQ9IkNlbnRlciIgRm9udEZhbWlseT0iQXJpYWwiIEZvbnRTaXplPSI2MCI+PFJ1biBGb250RmFtaWx5PSJBcmlhbCIgRm9udFNpemU9IjYwIiBGb3JlZ3JvdW5kPSIjRkZGRkZGRkYiIEJsb2NrLlRleHRBbGlnbm1lbnQ9IkNlbnRlciI+dsW+ZHnFpSBqc21lIGxpZCB0dsWvaiB2eWtvdXBlbsO9LiBUeXMgbsOhcyB2IHBvdcWhdGkgbmVuZWNoYWwsIHR5cyBuw6FtIMW+aXZvdCB2xJvEjW7DvSBkYWwuIEJvxb5lIG7DocWhLCBidcSPIHZlbGViZW7DvSE8L1J1bj48L1BhcmFncmFwaD48L0Zsb3dEb2N1bWVudD4=</NSString>
              <NSString rvXMLIvarName="WinFontData">PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTE2Ij8+PFJWRm9udCB4bWxuczppPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9Qcm9QcmVzZW50ZXIuQ29tbW9uIj48S2VybmluZz4wPC9LZXJuaW5nPjxMaW5lU3BhY2luZz4wPC9MaW5lU3BhY2luZz48T3V0bGluZUNvbG9yIHhtbG5zOmQycDE9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9TeXN0ZW0uV2luZG93cy5NZWRpYSI+PGQycDE6QT4yNTU8L2QycDE6QT48ZDJwMTpCPjA8L2QycDE6Qj48ZDJwMTpHPjA8L2QycDE6Rz48ZDJwMTpSPjA8L2QycDE6Uj48ZDJwMTpTY0E+MTwvZDJwMTpTY0E+PGQycDE6U2NCPjA8L2QycDE6U2NCPjxkMnAxOlNjRz4wPC9kMnAxOlNjRz48ZDJwMTpTY1I+MDwvZDJwMTpTY1I+PC9PdXRsaW5lQ29sb3I+PE91dGxpbmVXaWR0aD4wPC9PdXRsaW5lV2lkdGg+PFZhcmlhbnRzPk5vcm1hbDwvVmFyaWFudHM+PC9SVkZvbnQ+</NSString>
            </RVTextElement>
          </array>
        </RVDisplaySlide>
        <RVDisplaySlide backgroundColor="0 0 0 0" highlightColor="0 0 0 0" drawingBackgroundColor="false" enabled="true" hotKey="" label="v4" notes="" UUID="9D17FB89-1159-D1EC-E3FD-0E2780FE70CA" chordChartPath="">
          <array rvXMLIvarName="cues"/>
          <array rvXMLIvarName="displayElements">
            <RVTextElement displayName="Default" UUID="B3241B5B-4150-8F52-9725-53436C2F097D" typeID="0" displayDelay="0" locked="false" persistent="0" fromTemplate="false" opacity="1" source="" bezelRadius="0" rotation="0" drawingFill="false" drawingShadow="false" drawingStroke="false" fillColor="1 1 1 0" adjustsHeightToFit="false" verticalAlignment="0" revealType="0">
              <RVRect3D rvXMLIvarName="position">{20 20 0 1880 1040}</RVRect3D>
              <shadow rvXMLIvarName="shadow">10|0 0 0 1|{4.949747468305833, -4.949747468305832}</shadow>
              <dictionary rvXMLIvarName="stroke">
                <NSColor rvXMLDictionaryKey="RVShapeElementStrokeColorKey">0 0 0 1</NSColor>
                <NSNumber rvXMLDictionaryKey="RVShapeElementStrokeWidthKey" hint="double">0</NSNumber>
              </dictionary>
              <NSString rvXMLIvarName="PlainText">WiBEdWNoYSB6bm92dXpyb3plbmksIHMgdGVib3UgdiBLcmlzdHUgc3BvamVuaSwgc3DDoXN5IG3DoW1lIGppc3RvdHUsIHR2b2ppIHpuw6FtZSBkb2Jyb3R1LCB0ZWJlLCBCb8W+ZSwgdmVsZWLDrW1lLgpEw61reSB0b2LEmyB2emTDoXbDoW1lLCDFvmUganNtZSB0dm9qaSwgasOhc8OhbWUsIHRlYmUsIE90xI1lLCB2ZMSbxI1uxJsgY3TDrW1lLg==</NSString>
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwe1xmb250dGJsXGYwXGZzd2lzc1xmY2hhcnNldDAgQXJpYWw7fXtcY29sb3J0Ymw7XHJlZDI1NVxncmVlbjI1NVxibHVlMjU1O31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxMjAgXGNmMSBaIER1Y2hhIHpub3Z1enJvemVuaSwgcyB0ZWJvdSB2IEtyaXN0dSBzcG9qZW5pLCBzcMOhc3kgbcOhbWUgamlzdG90dSwgdHZvamkgem7DoW1lIGRvYnJvdHUsIHRlYmUsIEJvxb5lLCB2ZWxlYsOtbWUuXA1Ew61reSB0b2LEmyB2emTDoXbDoW1lLCDFvmUganNtZSB0dm9qaSwgasOhc8OhbWUsIHRlYmUsIE90xI1lLCB2ZMSbxI1uxJsgY3TDrW1lLn0=</NSString>
              <NSString rvXMLIvarName="WinFlowData">PEZsb3dEb2N1bWVudCBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIFBhZ2VQYWRkaW5nPSI1LDAsNSwwIiBBbGxvd0Ryb3A9IlRydWUiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dpbmZ4LzIwMDYveGFtbC9wcmVzZW50YXRpb24iPjxQYXJhZ3JhcGggTWFyZ2luPSIwLDAsMCwwIiBUZXh0QWxpZ25tZW50PSJDZW50ZXIiIEZvbnRGYW1pbHk9IkFyaWFsIiBGb250U2l6ZT0iNjAiPjxSdW4gRm9udEZhbWlseT0iQXJpYWwiIEZvbnRTaXplPSI2MCIgRm9yZWdyb3VuZD0iI0ZGRkZGRkZGIiBCbG9jay5UZXh0QWxpZ25tZW50PSJDZW50ZXIiPlogRHVjaGEgem5vdnV6cm96ZW5pLCBzIHRlYm91IHYgS3Jpc3R1IHNwb2plbmksIHNww6FzeSBtw6FtZSBqaXN0b3R1LCB0dm9qaSB6bsOhbWUgZG9icm90dSwgdGViZSwgQm/FvmUsIHZlbGViw61tZS48L1J1bj48L1BhcmFncmFwaD48UGFyYWdyYXBoIE1hcmdpbj0iMCwwLDAsMCIgVGV4dEFsaWdubWVudD0iQ2VudGVyIiBGb250RmFtaWx5PSJBcmlhbCIgRm9udFNpemU9IjYwIj48UnVuIEZvbnRGYW1pbHk9IkFyaWFsIiBGb250U2l6ZT0iNjAiIEZvcmVncm91bmQ9IiNGRkZGRkZGRiIgQmxvY2suVGV4dEFsaWdubWVudD0iQ2VudGVyIj5Ew61reSB0b2LEmyB2emTDoXbDoW1lLCDFvmUganNtZSB0dm9qaSwgasOhc8OhbWUsIHRlYmUsIE90xI1lLCB2ZMSbxI1uxJsgY3TDrW1lLjwvUnVuPjwvUGFyYWdyYXBoPjwvRmxvd0RvY3VtZW50Pg==</NSString>
              <NSString rvXMLIvarName="WinFontData">PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTE2Ij8+PFJWRm9udCB4bWxuczppPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9Qcm9QcmVzZW50ZXIuQ29tbW9uIj48S2VybmluZz4wPC9LZXJuaW5nPjxMaW5lU3BhY2luZz4wPC9MaW5lU3BhY2luZz48T3V0bGluZUNvbG9yIHhtbG5zOmQycDE9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9TeXN0ZW0uV2luZG93cy5NZWRpYSI+PGQycDE6QT4yNTU8L2QycDE6QT48ZDJwMTpCPjA8L2QycDE6Qj48ZDJwMTpHPjA8L2QycDE6Rz48ZDJwMTpSPjA8L2QycDE6Uj48ZDJwMTpTY0E+MTwvZDJwMTpTY0E+PGQycDE6U2NCPjA8L2QycDE6U2NCPjxkMnAxOlNjRz4wPC9kMnAxOlNjRz48ZDJwMTpTY1I+MDwvZDJwMTpTY1I+PC9PdXRsaW5lQ29sb3I+PE91dGxpbmVXaWR0aD4wPC9PdXRsaW5lV2lkdGg+PFZhcmlhbnRzPk5vcm1hbDwvVmFyaWFudHM+PC9SVkZvbnQ+</NSString>
            </RVTextElement>
          </array>
        </RVDisplaySlide>
      </array>
    </RVSlideGrouping>
  </array>
  <array rvXMLIvarName="arrangements"/>
</RVPresentationDocument>`);

    expect(normalizeDatesAndIdsForTesting(builder.build())).toEqual(expectedOutput);
  });
});
