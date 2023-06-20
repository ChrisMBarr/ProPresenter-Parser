import { IProTransitionType } from './shared.model';
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
<RVPresentationDocument CCLIArtistCredits="" CCLICopyrightInfo="" CCLIDisplay="0" CCLILicenseNumber="" CCLIPublisher="" CCLISongTitle="My Test Song" album="" artist="" author="" category="Song" notes="" lastDateUsed="2023-06-13T18:41:15" height="720" width="1280" backgroundColor="0 0 0 1" creatorCode="0" chordChartPath="" docType="0" drawingBackgroundColor="0" resourcesDirectory="" usedCount="0" versionNumber="500">
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
            <RVTextElement displayDelay="0" displayName="Default" locked="0" persistent="0" typeID="0" fromTemplate="0" bezelRadius="0" drawingFill="0" drawingShadow="1" drawingStroke="0" fillColor="1 1 1 1" rotation="0" source="" adjustsHeightToFit="0" verticalAlignment="0" RTFData="e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBBcmlhbDt9e1xjb2xvcnRibDtccmVkMjU1XGdyZWVuMjU1XGJsdWUyNTU7fVxwYXJkXHR4NTYwXHR4MTEyMFx0eDE2ODBcdHgyMjQwXHR4MjgwMFx0eDMzNjBcdHgzOTIwXHR4NDQ4MFx0eDUwNDBcdHg1NjAwXHR4NjE2MFx0eDY3MjBccWNccGFyZGlybmF0dXJhbFxmMFxmczEyMCBcY2YxIEhlbGxvIFdvcmxkfQ==" revealType="0" serialization-array-index="0">
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

  it('should create an song with lots of options using mixed string and object for slide text', () => {
    const builder = new v5Builder({
      properties: {
        title: 'Amazing Grace (My Chains Are Gone)',
        author: 'John Newton, Chris Tomlin',
        artist: 'Chris Tomlin',
        album: 'See The Morning',
        category: 'Hymn',
        ccliDisplay: true,
        ccliNumber: 12345678,
        copyrightYear: 2006,
        notes: 'Pastor Bill loves this one',
        publisher: 'worshiptogether.com Songs/sixsteps Music, Vamos Publishing, admin. Capitol CMG Publishing',
        height: 1080,
        width: 1920,
      },
      slideTextFormatting: {
        fontName: 'Helvetica',
        textColor: '#FAFAFA',
        textSize: 75,
        textPadding: 40,
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
<RVPresentationDocument CCLIArtistCredits="Chris Tomlin" CCLICopyrightInfo="2006" CCLIDisplay="1" CCLILicenseNumber="12345678" CCLIPublisher="worshiptogether.com Songs/sixsteps Music, Vamos Publishing, admin. Capitol CMG Publishing" CCLISongTitle="Amazing Grace (My Chains Are Gone)" album="See The Morning" artist="Chris Tomlin" author="John Newton, Chris Tomlin" category="Hymn" notes="Pastor Bill loves this one" lastDateUsed="2023-06-14T21:56:24" height="1080" width="1920" backgroundColor="0 0 0 1" creatorCode="0" chordChartPath="" docType="0" drawingBackgroundColor="0" resourcesDirectory="" usedCount="0" versionNumber="500">
  <timeline timeOffSet="0" selectedMediaTrackIndex="0" unitOfMeasure="60" duration="0" loop="0">
    <timeCues containerClass="NSMutableArray"></timeCues>
    <mediaTracks containerClass="NSMutableArray"></mediaTracks>
  </timeline>
  <bibleReference containerClass="NSMutableDictionary"></bibleReference>
  <_-RVProTransitionObject-_transitionObject transitionType="106" transitionDuration="0.4" motionEnabled="0" motionDuration="20" motionSpeed="100"></_-RVProTransitionObject-_transitionObject>
  <groups containerClass="NSMutableArray">
    <RVSlideGrouping name="Blank" uuid="41D68204-0DDF-C500-7031-23F08A5606B8" color="0 0 0 0" serialization-array-index="0">
      <slides containerClass="NSMutableArray">
        <RVDisplaySlide backgroundColor="0 0 0 0" enabled="1" highlightColor="0 0 0 0" hotKey="" label="" notes="" slideType="1" sort_index="0" UUID="1A4B8DF6-40F2-7C10-1104-EC97F8A5277C" drawingBackgroundColor="0" chordChartPath="" serialization-array-index="0">
          <cues containerClass="NSMutableArray"></cues>
          <displayElements containerClass="NSMutableArray">
            <RVTextElement displayDelay="0" displayName="Default" locked="0" persistent="0" typeID="0" fromTemplate="0" bezelRadius="0" drawingFill="0" drawingShadow="1" drawingStroke="0" fillColor="1 1 1 1" rotation="0" source="" adjustsHeightToFit="0" verticalAlignment="0" RTFData="e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBIZWx2ZXRpY2E7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNTAgXGNmMSB9" revealType="0" serialization-array-index="0">
              <stroke>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="RVShapeElementStrokeColorKey"></NSColor>
                <NSNumber serialization-native-value="1" serialization-dictionary-key="RVShapeElementStrokeWidthKey"></NSNumber>
              </stroke>
              <_-D-_serializedShadow>
                <NSMutableString serialization-native-value="{3.4641016, -2}" serialization-dictionary-key="shadowOffset"></NSMutableString>
                <NSNumber serialization-native-value="4" serialization-dictionary-key="shadowBlurRadius"></NSNumber>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="shadowColor"></NSColor>
              </_-D-_serializedShadow>
              <_-RVRect3D-_position x="40" y="40" z="0" width="1840" height="1000"></_-RVRect3D-_position>
            </RVTextElement>
          </displayElements>
          <_-RVProTransitionObject-_transitionObject transitionType="-1" transitionDuration="1" motionEnabled="0" motionDuration="20" motionSpeed="100"></_-RVProTransitionObject-_transitionObject>
        </RVDisplaySlide>
      </slides>
    </RVSlideGrouping>
    <RVSlideGrouping name="Verse 1" uuid="982AA0EE-52DA-22D7-5422-841C7C8AFE98" color="0 0 1 1" serialization-array-index="1">
      <slides containerClass="NSMutableArray">
        <RVDisplaySlide backgroundColor="0 0 0 0" enabled="1" highlightColor="0 0 0 0" hotKey="" label="" notes="" slideType="1" sort_index="0" UUID="331E0FD7-4D62-5491-64D8-959235D05B21" drawingBackgroundColor="0" chordChartPath="" serialization-array-index="0">
          <cues containerClass="NSMutableArray"></cues>
          <displayElements containerClass="NSMutableArray">
            <RVTextElement displayDelay="0" displayName="Default" locked="0" persistent="0" typeID="0" fromTemplate="0" bezelRadius="0" drawingFill="0" drawingShadow="1" drawingStroke="0" fillColor="1 1 1 1" rotation="0" source="" adjustsHeightToFit="0" verticalAlignment="0" RTFData="e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBIZWx2ZXRpY2E7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNTAgXGNmMSBBbWF6aW5nIGdyYWNlLCBIb3cgc3dlZXQgdGhlIHNvdW5kXA1UaGF0IHNhdmVkIGEgd3JldGNoIGxpa2UgbWV9" revealType="0" serialization-array-index="0">
              <stroke>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="RVShapeElementStrokeColorKey"></NSColor>
                <NSNumber serialization-native-value="1" serialization-dictionary-key="RVShapeElementStrokeWidthKey"></NSNumber>
              </stroke>
              <_-D-_serializedShadow>
                <NSMutableString serialization-native-value="{3.4641016, -2}" serialization-dictionary-key="shadowOffset"></NSMutableString>
                <NSNumber serialization-native-value="4" serialization-dictionary-key="shadowBlurRadius"></NSNumber>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="shadowColor"></NSColor>
              </_-D-_serializedShadow>
              <_-RVRect3D-_position x="40" y="40" z="0" width="1840" height="1000"></_-RVRect3D-_position>
            </RVTextElement>
          </displayElements>
          <_-RVProTransitionObject-_transitionObject transitionType="-1" transitionDuration="1" motionEnabled="0" motionDuration="20" motionSpeed="100"></_-RVProTransitionObject-_transitionObject>
        </RVDisplaySlide>
        <RVDisplaySlide backgroundColor="0 0 0 0" enabled="1" highlightColor="0 0 0 0" hotKey="" label="" notes="" slideType="1" sort_index="1" UUID="D5362692-FECF-E44D-0770-1309CC5484DF" drawingBackgroundColor="0" chordChartPath="" serialization-array-index="1">
          <cues containerClass="NSMutableArray"></cues>
          <displayElements containerClass="NSMutableArray">
            <RVTextElement displayDelay="0" displayName="Default" locked="0" persistent="0" typeID="0" fromTemplate="0" bezelRadius="0" drawingFill="0" drawingShadow="1" drawingStroke="0" fillColor="1 1 1 1" rotation="0" source="" adjustsHeightToFit="0" verticalAlignment="0" RTFData="e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBIZWx2ZXRpY2E7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNTAgXGNmMSBJIG9uY2Ugd2FzIGxvc3QsIGJ1dCBub3cgSSBhbSBmb3VuZCxcDVdhcyBibGluZCwgYnV0IG5vdyBJIHNlZX0=" revealType="0" serialization-array-index="0">
              <stroke>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="RVShapeElementStrokeColorKey"></NSColor>
                <NSNumber serialization-native-value="1" serialization-dictionary-key="RVShapeElementStrokeWidthKey"></NSNumber>
              </stroke>
              <_-D-_serializedShadow>
                <NSMutableString serialization-native-value="{3.4641016, -2}" serialization-dictionary-key="shadowOffset"></NSMutableString>
                <NSNumber serialization-native-value="4" serialization-dictionary-key="shadowBlurRadius"></NSNumber>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="shadowColor"></NSColor>
              </_-D-_serializedShadow>
              <_-RVRect3D-_position x="40" y="40" z="0" width="1840" height="1000"></_-RVRect3D-_position>
            </RVTextElement>
          </displayElements>
          <_-RVProTransitionObject-_transitionObject transitionType="-1" transitionDuration="1" motionEnabled="0" motionDuration="20" motionSpeed="100"></_-RVProTransitionObject-_transitionObject>
        </RVDisplaySlide>
      </slides>
    </RVSlideGrouping>
    <RVSlideGrouping name="Verse 2" uuid="78B22FBF-1B2E-7807-E6BD-72A94E7705C2" color="0 0.39215686274509803 1 1" serialization-array-index="2">
      <slides containerClass="NSMutableArray">
        <RVDisplaySlide backgroundColor="0 0 0 0" enabled="1" highlightColor="0 0 0 0" hotKey="" label="" notes="" slideType="1" sort_index="0" UUID="92FEDE1F-C587-DA0D-8F9E-FE549D7B9B98" drawingBackgroundColor="0" chordChartPath="" serialization-array-index="0">
          <cues containerClass="NSMutableArray"></cues>
          <displayElements containerClass="NSMutableArray">
            <RVTextElement displayDelay="0" displayName="Default" locked="0" persistent="0" typeID="0" fromTemplate="0" bezelRadius="0" drawingFill="0" drawingShadow="1" drawingStroke="0" fillColor="1 1 1 1" rotation="0" source="" adjustsHeightToFit="0" verticalAlignment="0" RTFData="e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBIZWx2ZXRpY2E7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNTAgXGNmMSAnVHdhcyBHcmFjZSB0aGF0IHRhdWdodCBteSBoZWFydCB0byBmZWFyXA1BbmQgR3JhY2UsIG15IGZlYXJzIHJlbGlldmVkfQ==" revealType="0" serialization-array-index="0">
              <stroke>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="RVShapeElementStrokeColorKey"></NSColor>
                <NSNumber serialization-native-value="1" serialization-dictionary-key="RVShapeElementStrokeWidthKey"></NSNumber>
              </stroke>
              <_-D-_serializedShadow>
                <NSMutableString serialization-native-value="{3.4641016, -2}" serialization-dictionary-key="shadowOffset"></NSMutableString>
                <NSNumber serialization-native-value="4" serialization-dictionary-key="shadowBlurRadius"></NSNumber>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="shadowColor"></NSColor>
              </_-D-_serializedShadow>
              <_-RVRect3D-_position x="40" y="40" z="0" width="1840" height="1000"></_-RVRect3D-_position>
            </RVTextElement>
          </displayElements>
          <_-RVProTransitionObject-_transitionObject transitionType="-1" transitionDuration="1" motionEnabled="0" motionDuration="20" motionSpeed="100"></_-RVProTransitionObject-_transitionObject>
        </RVDisplaySlide>
        <RVDisplaySlide backgroundColor="0 0 0 0" enabled="1" highlightColor="0 0 0 0" hotKey="" label="" notes="" slideType="1" sort_index="1" UUID="9C36191C-B6E2-FD40-ECC1-49B2642B39B2" drawingBackgroundColor="0" chordChartPath="" serialization-array-index="1">
          <cues containerClass="NSMutableArray"></cues>
          <displayElements containerClass="NSMutableArray">
            <RVTextElement displayDelay="0" displayName="Default" locked="0" persistent="0" typeID="0" fromTemplate="0" bezelRadius="0" drawingFill="0" drawingShadow="1" drawingStroke="0" fillColor="1 1 1 1" rotation="0" source="" adjustsHeightToFit="0" verticalAlignment="0" RTFData="e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBIZWx2ZXRpY2E7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNTAgXGNmMSBIb3cgcHJlY2lvdXMgZGlkIHRoYXQgR3JhY2UgYXBwZWFyXA1UaGUgaG91ciBJIGZpcnN0IGJlbGlldmVkfQ==" revealType="0" serialization-array-index="0">
              <stroke>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="RVShapeElementStrokeColorKey"></NSColor>
                <NSNumber serialization-native-value="1" serialization-dictionary-key="RVShapeElementStrokeWidthKey"></NSNumber>
              </stroke>
              <_-D-_serializedShadow>
                <NSMutableString serialization-native-value="{3.4641016, -2}" serialization-dictionary-key="shadowOffset"></NSMutableString>
                <NSNumber serialization-native-value="4" serialization-dictionary-key="shadowBlurRadius"></NSNumber>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="shadowColor"></NSColor>
              </_-D-_serializedShadow>
              <_-RVRect3D-_position x="40" y="40" z="0" width="1840" height="1000"></_-RVRect3D-_position>
            </RVTextElement>
          </displayElements>
          <_-RVProTransitionObject-_transitionObject transitionType="-1" transitionDuration="1" motionEnabled="0" motionDuration="20" motionSpeed="100"></_-RVProTransitionObject-_transitionObject>
        </RVDisplaySlide>
      </slides>
    </RVSlideGrouping>
    <RVSlideGrouping name="Verse 3" uuid="858AF3DD-8CFE-DF5F-B3F9-B47599CF3CEF" color="0 0.7843137254901961 1 1" serialization-array-index="3">
      <slides containerClass="NSMutableArray">
        <RVDisplaySlide backgroundColor="0 0 0 0" enabled="1" highlightColor="0 0 0 0" hotKey="" label="" notes="" slideType="1" sort_index="0" UUID="184FA6CE-1E1F-CE63-7314-480B6B637853" drawingBackgroundColor="0" chordChartPath="" serialization-array-index="0">
          <cues containerClass="NSMutableArray"></cues>
          <displayElements containerClass="NSMutableArray">
            <RVTextElement displayDelay="0" displayName="Default" locked="0" persistent="0" typeID="0" fromTemplate="0" bezelRadius="0" drawingFill="0" drawingShadow="1" drawingStroke="0" fillColor="1 1 1 1" rotation="0" source="" adjustsHeightToFit="0" verticalAlignment="0" RTFData="e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBIZWx2ZXRpY2E7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNTAgXGNmMSBUaGUgTG9yZCBoYXMgcHJvbWlzZWQgZ29vZCB0byBtZVwNSGlzIHdvcmQgbXkgaG9wZSBzZWN1cmVzfQ==" revealType="0" serialization-array-index="0">
              <stroke>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="RVShapeElementStrokeColorKey"></NSColor>
                <NSNumber serialization-native-value="1" serialization-dictionary-key="RVShapeElementStrokeWidthKey"></NSNumber>
              </stroke>
              <_-D-_serializedShadow>
                <NSMutableString serialization-native-value="{3.4641016, -2}" serialization-dictionary-key="shadowOffset"></NSMutableString>
                <NSNumber serialization-native-value="4" serialization-dictionary-key="shadowBlurRadius"></NSNumber>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="shadowColor"></NSColor>
              </_-D-_serializedShadow>
              <_-RVRect3D-_position x="40" y="40" z="0" width="1840" height="1000"></_-RVRect3D-_position>
            </RVTextElement>
          </displayElements>
          <_-RVProTransitionObject-_transitionObject transitionType="-1" transitionDuration="1" motionEnabled="0" motionDuration="20" motionSpeed="100"></_-RVProTransitionObject-_transitionObject>
        </RVDisplaySlide>
        <RVDisplaySlide backgroundColor="0 0 0 0" enabled="1" highlightColor="0 0 0 0" hotKey="" label="" notes="" slideType="1" sort_index="1" UUID="AFA6D93D-C590-7CCE-1A10-D794E33476DE" drawingBackgroundColor="0" chordChartPath="" serialization-array-index="1">
          <cues containerClass="NSMutableArray"></cues>
          <displayElements containerClass="NSMutableArray">
            <RVTextElement displayDelay="0" displayName="Default" locked="0" persistent="0" typeID="0" fromTemplate="0" bezelRadius="0" drawingFill="0" drawingShadow="1" drawingStroke="0" fillColor="1 1 1 1" rotation="0" source="" adjustsHeightToFit="0" verticalAlignment="0" RTFData="e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBIZWx2ZXRpY2E7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNTAgXGNmMSBIZSB3aWxsIG15IHNoaWVsZCBhbmQgcG9ydGlvbiBiZVwNQXMgbG9uZyBhcyBsaWZlIGVuZHVyZXN9" revealType="0" serialization-array-index="0">
              <stroke>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="RVShapeElementStrokeColorKey"></NSColor>
                <NSNumber serialization-native-value="1" serialization-dictionary-key="RVShapeElementStrokeWidthKey"></NSNumber>
              </stroke>
              <_-D-_serializedShadow>
                <NSMutableString serialization-native-value="{3.4641016, -2}" serialization-dictionary-key="shadowOffset"></NSMutableString>
                <NSNumber serialization-native-value="4" serialization-dictionary-key="shadowBlurRadius"></NSNumber>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="shadowColor"></NSColor>
              </_-D-_serializedShadow>
              <_-RVRect3D-_position x="40" y="40" z="0" width="1840" height="1000"></_-RVRect3D-_position>
            </RVTextElement>
          </displayElements>
          <_-RVProTransitionObject-_transitionObject transitionType="-1" transitionDuration="1" motionEnabled="0" motionDuration="20" motionSpeed="100"></_-RVProTransitionObject-_transitionObject>
        </RVDisplaySlide>
      </slides>
    </RVSlideGrouping>
    <RVSlideGrouping name="Verse 4" uuid="CE13AB34-56C2-FF77-862B-1AD9125BF647" color="0 1 1 1" serialization-array-index="4">
      <slides containerClass="NSMutableArray">
        <RVDisplaySlide backgroundColor="0 0 0 0" enabled="1" highlightColor="0 0 0 0" hotKey="" label="" notes="" slideType="1" sort_index="0" UUID="DCE5F4E4-61EA-7816-0BC4-DFA126F09163" drawingBackgroundColor="0" chordChartPath="" serialization-array-index="0">
          <cues containerClass="NSMutableArray"></cues>
          <displayElements containerClass="NSMutableArray">
            <RVTextElement displayDelay="0" displayName="Default" locked="0" persistent="0" typeID="0" fromTemplate="0" bezelRadius="0" drawingFill="0" drawingShadow="1" drawingStroke="0" fillColor="1 1 1 1" rotation="0" source="" adjustsHeightToFit="0" verticalAlignment="0" RTFData="e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBIZWx2ZXRpY2E7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNTAgXGNmMSBUaGUgZWFydGggc2hhbGwgc29vbiBkaXNzb2x2ZSBsaWtlIHNub3dcDVRoZSBzdW4gZm9yYmVhciB0byBzaGluZX0=" revealType="0" serialization-array-index="0">
              <stroke>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="RVShapeElementStrokeColorKey"></NSColor>
                <NSNumber serialization-native-value="1" serialization-dictionary-key="RVShapeElementStrokeWidthKey"></NSNumber>
              </stroke>
              <_-D-_serializedShadow>
                <NSMutableString serialization-native-value="{3.4641016, -2}" serialization-dictionary-key="shadowOffset"></NSMutableString>
                <NSNumber serialization-native-value="4" serialization-dictionary-key="shadowBlurRadius"></NSNumber>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="shadowColor"></NSColor>
              </_-D-_serializedShadow>
              <_-RVRect3D-_position x="40" y="40" z="0" width="1840" height="1000"></_-RVRect3D-_position>
            </RVTextElement>
          </displayElements>
          <_-RVProTransitionObject-_transitionObject transitionType="-1" transitionDuration="1" motionEnabled="0" motionDuration="20" motionSpeed="100"></_-RVProTransitionObject-_transitionObject>
        </RVDisplaySlide>
        <RVDisplaySlide backgroundColor="0 0 0 0" enabled="1" highlightColor="0 0 0 0" hotKey="" label="" notes="" slideType="1" sort_index="1" UUID="ED984FB6-F94D-BF01-B0FA-2B1FF8FFB9CA" drawingBackgroundColor="0" chordChartPath="" serialization-array-index="1">
          <cues containerClass="NSMutableArray"></cues>
          <displayElements containerClass="NSMutableArray">
            <RVTextElement displayDelay="0" displayName="Default" locked="0" persistent="0" typeID="0" fromTemplate="0" bezelRadius="0" drawingFill="0" drawingShadow="1" drawingStroke="0" fillColor="1 1 1 1" rotation="0" source="" adjustsHeightToFit="0" verticalAlignment="0" RTFData="e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBIZWx2ZXRpY2E7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNTAgXGNmMSBCdXQgR29kLCBXaG8gY2FsbGVkIG1lIGhlcmUgYmVsb3dcDVdpbGwgYmUgZm9yZXZlciBtaW5lXA1XaWxsIGJlIGZvcmV2ZXIgbWluZX0=" revealType="0" serialization-array-index="0">
              <stroke>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="RVShapeElementStrokeColorKey"></NSColor>
                <NSNumber serialization-native-value="1" serialization-dictionary-key="RVShapeElementStrokeWidthKey"></NSNumber>
              </stroke>
              <_-D-_serializedShadow>
                <NSMutableString serialization-native-value="{3.4641016, -2}" serialization-dictionary-key="shadowOffset"></NSMutableString>
                <NSNumber serialization-native-value="4" serialization-dictionary-key="shadowBlurRadius"></NSNumber>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="shadowColor"></NSColor>
              </_-D-_serializedShadow>
              <_-RVRect3D-_position x="40" y="40" z="0" width="1840" height="1000"></_-RVRect3D-_position>
            </RVTextElement>
          </displayElements>
          <_-RVProTransitionObject-_transitionObject transitionType="-1" transitionDuration="1" motionEnabled="0" motionDuration="20" motionSpeed="100"></_-RVProTransitionObject-_transitionObject>
        </RVDisplaySlide>
        <RVDisplaySlide backgroundColor="0 0 0 0" enabled="1" highlightColor="1 0.6470588235294118 0 1" hotKey="" label="Might repeat 2-3x" notes="" slideType="1" sort_index="2" UUID="B0E0CE5C-FBD7-0D3F-972F-F9267D883514" drawingBackgroundColor="0" chordChartPath="" serialization-array-index="2">
          <cues containerClass="NSMutableArray"></cues>
          <displayElements containerClass="NSMutableArray">
            <RVTextElement displayDelay="0" displayName="Default" locked="0" persistent="0" typeID="0" fromTemplate="0" bezelRadius="0" drawingFill="0" drawingShadow="1" drawingStroke="0" fillColor="1 1 1 1" rotation="0" source="" adjustsHeightToFit="0" verticalAlignment="0" RTFData="e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBIZWx2ZXRpY2E7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNTAgXGNmMSBZb3UgYXJlIGZvcmV2ZXIgbWluZX0=" revealType="0" serialization-array-index="0">
              <stroke>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="RVShapeElementStrokeColorKey"></NSColor>
                <NSNumber serialization-native-value="1" serialization-dictionary-key="RVShapeElementStrokeWidthKey"></NSNumber>
              </stroke>
              <_-D-_serializedShadow>
                <NSMutableString serialization-native-value="{3.4641016, -2}" serialization-dictionary-key="shadowOffset"></NSMutableString>
                <NSNumber serialization-native-value="4" serialization-dictionary-key="shadowBlurRadius"></NSNumber>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="shadowColor"></NSColor>
              </_-D-_serializedShadow>
              <_-RVRect3D-_position x="40" y="40" z="0" width="1840" height="1000"></_-RVRect3D-_position>
            </RVTextElement>
          </displayElements>
          <_-RVProTransitionObject-_transitionObject transitionType="-1" transitionDuration="1" motionEnabled="0" motionDuration="20" motionSpeed="100"></_-RVProTransitionObject-_transitionObject>
        </RVDisplaySlide>
      </slides>
    </RVSlideGrouping>
    <RVSlideGrouping name="Chorus" uuid="7CE76113-9ABF-D898-A69A-ACC77FA0CDC4" color="1 0.39215686274509803 0.39215686274509803 1" serialization-array-index="5">
      <slides containerClass="NSMutableArray">
        <RVDisplaySlide backgroundColor="0 0 0 0" enabled="1" highlightColor="0 0 0 0" hotKey="" label="" notes="" slideType="1" sort_index="0" UUID="6D8B7198-8925-C3D3-F419-97D3D159BCCD" drawingBackgroundColor="0" chordChartPath="" serialization-array-index="0">
          <cues containerClass="NSMutableArray"></cues>
          <displayElements containerClass="NSMutableArray">
            <RVTextElement displayDelay="0" displayName="Default" locked="0" persistent="0" typeID="0" fromTemplate="0" bezelRadius="0" drawingFill="0" drawingShadow="1" drawingStroke="0" fillColor="1 1 1 1" rotation="0" source="" adjustsHeightToFit="0" verticalAlignment="0" RTFData="e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBIZWx2ZXRpY2E7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNTAgXGNmMSBNeSBjaGFpbnMgYXJlIGdvbmUsIEkndmUgYmVlbiBzZXQgZnJlZVwNTXkgR29kLCBteSBTYXZpb3IgaGFzIHJhbnNvbWVkIG1lfQ==" revealType="0" serialization-array-index="0">
              <stroke>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="RVShapeElementStrokeColorKey"></NSColor>
                <NSNumber serialization-native-value="1" serialization-dictionary-key="RVShapeElementStrokeWidthKey"></NSNumber>
              </stroke>
              <_-D-_serializedShadow>
                <NSMutableString serialization-native-value="{3.4641016, -2}" serialization-dictionary-key="shadowOffset"></NSMutableString>
                <NSNumber serialization-native-value="4" serialization-dictionary-key="shadowBlurRadius"></NSNumber>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="shadowColor"></NSColor>
              </_-D-_serializedShadow>
              <_-RVRect3D-_position x="40" y="40" z="0" width="1840" height="1000"></_-RVRect3D-_position>
            </RVTextElement>
          </displayElements>
          <_-RVProTransitionObject-_transitionObject transitionType="-1" transitionDuration="1" motionEnabled="0" motionDuration="20" motionSpeed="100"></_-RVProTransitionObject-_transitionObject>
        </RVDisplaySlide>
        <RVDisplaySlide backgroundColor="0 0 0 0" enabled="1" highlightColor="0 0 0 0" hotKey="" label="" notes="" slideType="1" sort_index="1" UUID="472E0736-CF95-E70F-7882-16219ABD73E8" drawingBackgroundColor="0" chordChartPath="" serialization-array-index="1">
          <cues containerClass="NSMutableArray"></cues>
          <displayElements containerClass="NSMutableArray">
            <RVTextElement displayDelay="0" displayName="Default" locked="0" persistent="0" typeID="0" fromTemplate="0" bezelRadius="0" drawingFill="0" drawingShadow="1" drawingStroke="0" fillColor="1 1 1 1" rotation="0" source="" adjustsHeightToFit="0" verticalAlignment="0" RTFData="e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBIZWx2ZXRpY2E7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNTAgXGNmMSBBbmQgbGlrZSBhIGZsb29kIEhpcyBtZXJjeSByZWlnbnNcDVVuZW5kaW5nIGxvdmUsIGFtYXppbmcgZ3JhY2V9" revealType="0" serialization-array-index="0">
              <stroke>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="RVShapeElementStrokeColorKey"></NSColor>
                <NSNumber serialization-native-value="1" serialization-dictionary-key="RVShapeElementStrokeWidthKey"></NSNumber>
              </stroke>
              <_-D-_serializedShadow>
                <NSMutableString serialization-native-value="{3.4641016, -2}" serialization-dictionary-key="shadowOffset"></NSMutableString>
                <NSNumber serialization-native-value="4" serialization-dictionary-key="shadowBlurRadius"></NSNumber>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="shadowColor"></NSColor>
              </_-D-_serializedShadow>
              <_-RVRect3D-_position x="40" y="40" z="0" width="1840" height="1000"></_-RVRect3D-_position>
            </RVTextElement>
          </displayElements>
          <_-RVProTransitionObject-_transitionObject transitionType="-1" transitionDuration="1" motionEnabled="0" motionDuration="20" motionSpeed="100"></_-RVProTransitionObject-_transitionObject>
        </RVDisplaySlide>
      </slides>
    </RVSlideGrouping>
    <RVSlideGrouping name="Ending" uuid="C94601BF-05A3-C5A9-E830-2C2EA6972289" color="0 0 0 0" serialization-array-index="6">
      <slides containerClass="NSMutableArray">
        <RVDisplaySlide backgroundColor="0 0 0 0" enabled="1" highlightColor="0 0 0 0" hotKey="" label="Leave on screen" notes="" slideType="1" sort_index="0" UUID="BA8E7F56-8ADF-3B97-5869-E1A8E114092B" drawingBackgroundColor="0" chordChartPath="" serialization-array-index="0">
          <cues containerClass="NSMutableArray"></cues>
          <displayElements containerClass="NSMutableArray">
            <RVTextElement displayDelay="0" displayName="Default" locked="0" persistent="0" typeID="0" fromTemplate="0" bezelRadius="0" drawingFill="0" drawingShadow="1" drawingStroke="0" fillColor="1 1 1 1" rotation="0" source="" adjustsHeightToFit="0" verticalAlignment="0" RTFData="e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxMDM4XGNvY29hc3VicnRmMzIwJyx7XGZvbnR0YmxcZjBcZnN3aXNzXGZjaGFyc2V0MCBIZWx2ZXRpY2E7fXtcY29sb3J0Ymw7XHJlZDI1MFxncmVlbjI1MFxibHVlMjUwO31ccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHFjXHBhcmRpcm5hdHVyYWxcZjBcZnMxNTAgXGNmMSBBbWF6aW5nIGdyYWNlfQ==" revealType="0" serialization-array-index="0">
              <stroke>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="RVShapeElementStrokeColorKey"></NSColor>
                <NSNumber serialization-native-value="1" serialization-dictionary-key="RVShapeElementStrokeWidthKey"></NSNumber>
              </stroke>
              <_-D-_serializedShadow>
                <NSMutableString serialization-native-value="{3.4641016, -2}" serialization-dictionary-key="shadowOffset"></NSMutableString>
                <NSNumber serialization-native-value="4" serialization-dictionary-key="shadowBlurRadius"></NSNumber>
                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="shadowColor"></NSColor>
              </_-D-_serializedShadow>
              <_-RVRect3D-_position x="40" y="40" z="0" width="1840" height="1000"></_-RVRect3D-_position>
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
