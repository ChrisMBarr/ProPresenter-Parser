import { v6Builder } from './v6-builder';

function normalizeDatesAndIdsForTesting(xmlStr: string): string {
  return xmlStr
    .replace(/lastDateUsed=".+?"/, 'lastDateUsed="2023-01-01T01:01:01"')
    .replace(/uuid=".+?"/gi, 'uuid="00001111-2222-3333-4444-555566667777"')
    .trim();
}

describe('v6Builder', (): void => {
  it('should create an song with minimal options, using a string array for slide text', () => {
    const builder = new v6Builder({
      properties: {
        title: 'My Test Song',
      },
      slideGroups: [
        // {
        //   label: 'Verse 1',
        //   slides: ['Hello World'],
        // },
      ],
    });

    const expectedOutput = normalizeDatesAndIdsForTesting(``);

    expect(normalizeDatesAndIdsForTesting(builder.build())).toEqual(expectedOutput);
  });
});
