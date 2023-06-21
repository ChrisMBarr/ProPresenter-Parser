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
  <RVTransition rvXMLIvarName="transitionObject" transitionType="106" transitionDirection="0" transitionDuration="0.4" motionEnabled="false" motionDuration="0" motionSpeed="0" groupIndex="0" orderIndex="0" slideBuildAction="0" slideBuildDelay="0"></RVTransition>
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
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBJbXBhY3Q7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNjAgXGNmMSB9</NSString>
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
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBJbXBhY3Q7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNjAgXGNmMSBBbWF6aW5nIGdyYWNlLCBIb3cgc3dlZXQgdGhlIHNvdW5kXA1UaGF0IHNhdmVkIGEgd3JldGNoIGxpa2UgbWV9</NSString>
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
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBJbXBhY3Q7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNjAgXGNmMSBJIG9uY2Ugd2FzIGxvc3QsIGJ1dCBub3cgSSBhbSBmb3VuZCxcDVdhcyBibGluZCwgYnV0IG5vdyBJIHNlZX0=</NSString>
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
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBJbXBhY3Q7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNjAgXGNmMSAnVHdhcyBHcmFjZSB0aGF0IHRhdWdodCBteSBoZWFydCB0byBmZWFyXA1BbmQgR3JhY2UsIG15IGZlYXJzIHJlbGlldmVkfQ==</NSString>
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
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBJbXBhY3Q7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNjAgXGNmMSBIb3cgcHJlY2lvdXMgZGlkIHRoYXQgR3JhY2UgYXBwZWFyXA1UaGUgaG91ciBJIGZpcnN0IGJlbGlldmVkfQ==</NSString>
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
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBJbXBhY3Q7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNjAgXGNmMSBUaGUgTG9yZCBoYXMgcHJvbWlzZWQgZ29vZCB0byBtZVwNSGlzIHdvcmQgbXkgaG9wZSBzZWN1cmVzfQ==</NSString>
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
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBJbXBhY3Q7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNjAgXGNmMSBIZSB3aWxsIG15IHNoaWVsZCBhbmQgcG9ydGlvbiBiZVwNQXMgbG9uZyBhcyBsaWZlIGVuZHVyZXN9</NSString>
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
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBJbXBhY3Q7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNjAgXGNmMSBUaGUgZWFydGggc2hhbGwgc29vbiBkaXNzb2x2ZSBsaWtlIHNub3dcDVRoZSBzdW4gZm9yYmVhciB0byBzaGluZX0=</NSString>
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
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBJbXBhY3Q7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNjAgXGNmMSBCdXQgR29kLCBXaG8gY2FsbGVkIG1lIGhlcmUgYmVsb3dcDVdpbGwgYmUgZm9yZXZlciBtaW5lXA1XaWxsIGJlIGZvcmV2ZXIgbWluZX0=</NSString>
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
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBJbXBhY3Q7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNjAgXGNmMSBZb3UgYXJlIGZvcmV2ZXIgbWluZX0=</NSString>
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
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBJbXBhY3Q7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNjAgXGNmMSBNeSBjaGFpbnMgYXJlIGdvbmUsIEkndmUgYmVlbiBzZXQgZnJlZVwNTXkgR29kLCBteSBTYXZpb3IgaGFzIHJhbnNvbWVkIG1lfQ==</NSString>
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
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBJbXBhY3Q7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNjAgXGNmMSBBbmQgbGlrZSBhIGZsb29kIEhpcyBtZXJjeSByZWlnbnNcDVVuZW5kaW5nIGxvdmUsIGFtYXppbmcgZ3JhY2V9</NSString>
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
              <NSString rvXMLIvarName="RTFData">e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBJbXBhY3Q7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNjAgXGNmMSBBbWF6aW5nIGdyYWNlfQ==</NSString>
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
});
