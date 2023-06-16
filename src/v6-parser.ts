import { XMLParser } from 'fast-xml-parser';
import { IPro6Properties, IPro6Song } from './v6-parser.model';
import { IXmlPro6Doc, IXmlPro6DocRoot } from './v6-xml.model';

export class v6Parser {
  parse(fileContent: string): IPro6Song {
    //When certain XML nodes only have one item the parser will convert them into objects
    //Here we maintain a list of node paths to always keep as arrays
    //This keeps our code structure and typedefs more sane and normalized
    const alwaysArray = [
      'RVPresentationDocument.array.RVSlideGrouping',
      'RVPresentationDocument.array.RVSlideGrouping.array.RVDisplaySlide',
      'RVPresentationDocument.array.RVSlideGrouping.array.RVDisplaySlide.array.RVTextElement',
    ];

    const xmlParser = new XMLParser({
      //https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/2.XMLparseOptions.md
      ignoreAttributes: false,
      attributeNamePrefix: '@',
      parseAttributeValue: true,
      isArray: (_name, jPath: string) => alwaysArray.includes(jPath),
    });
    const parsedDoc: IXmlPro6DocRoot = xmlParser.parse(fileContent);

    if (parsedDoc.RVPresentationDocument['@versionNumber'] !== 600) {
      throw new Error(
        `Expected a ProPresenter 6 file with versionNumber="600" but got versionNumber="${parsedDoc.RVPresentationDocument['@versionNumber']}"`
      );
    }

    // console.log(JSON.stringify(parsedDoc, null, 2));

    const properties = this.getProperties(parsedDoc.RVPresentationDocument);

    return { properties };
  }

  private getProperties(xmlDoc: IXmlPro6Doc): IPro6Properties {
    return {
      CCLIArtistCredits: xmlDoc['@CCLIArtistCredits'],
      CCLIAuthor: xmlDoc['@CCLIAuthor'],
      CCLICopyrightYear: xmlDoc['@CCLICopyrightYear'],
      CCLIDisplay: xmlDoc['@CCLIDisplay'],
      CCLIPublisher: xmlDoc['@CCLIPublisher'],
      CCLISongNumber: xmlDoc['@CCLISongNumber'],
      CCLISongTitle: xmlDoc['@CCLISongTitle'],
      backgroundColor: xmlDoc['@backgroundColor'],
      buildNumber: xmlDoc['@buildNumber'],
      category: xmlDoc['@category'],
      chordChartPath: xmlDoc['@chordChartPath'],
      docType: xmlDoc['@docType'],
      drawingBackgroundColor: xmlDoc['@drawingBackgroundColor'],
      height: xmlDoc['@height'],
      lastDateUsed: new Date(xmlDoc['@lastDateUsed']),
      notes: xmlDoc['@notes'],
      os: xmlDoc['@os'],
      resourcesDirectory: xmlDoc['@resourcesDirectory'],
      selectedArrangementID: xmlDoc['@selectedArrangementID'],
      usedCount: xmlDoc['@usedCount'],
      versionNumber: xmlDoc['@versionNumber'],
      width: xmlDoc['@width'],
    };
  }
}
