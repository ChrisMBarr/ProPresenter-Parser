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
        // {
        //   label: 'Verse 1',
        //   slides: ['Hello World'],
        // },
      ],
    });

    const expectedOutput = normalizeDatesAndIdsForTesting(`
<RVPresentationDocument CCLIArtistCredits="" CCLIAuthor="" CCLICopyrightYear="" CCLIDisplay="false" CCLIPublisher="" CCLISongNumber="" CCLISongTitle="My Test Song" category="Song" notes="" lastDateUsed="2023-06-20T15:29:44" height="720" width="1280" backgroundColor="0 0 0 1" buildNumber="6016" chordChartPath="" docType="0" drawingBackgroundColor="false" resourcesDirectory="" selectedArrangementID="" os="1" usedCount="0" versionNumber="600">
  <RVTransition rvXMLIvarName="transitionObject" transitionType="-1" transitionDirection="0" transitionDuration="1" motionEnabled="false" motionDuration="0" motionSpeed="0" groupIndex="0" orderIndex="0" slideBuildAction="0" slideBuildDelay="0"></RVTransition>
  <RVTimeline rvXMLIvarName="timeline" timeOffset="0" duration="0" selectedMediaTrackIndex="0" loop="false">
    <array rvXMLIvarName="timeCues"/>
    <array rvXMLIvarName="mediaTracks"/>
  </RVTimeline>
  <array rvXMLIvarName="groups"/>
  <array rvXMLIvarName="arrangements"/>
</RVPresentationDocument>`);

    // console.log(builder.build());

    expect(normalizeDatesAndIdsForTesting(builder.build())).toEqual(expectedOutput);
  });
});
