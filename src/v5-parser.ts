import { XMLParser } from 'fast-xml-parser';
import { IPro5Arrangement, IPro5Properties, IPro5Song } from './v5-parser.model';
import { IXmlPro5Arrangement, IXmlPro5Doc, IXmlPro5DocRoot } from './v5-parser.xml.model';

export class v5Parser {
  parse(fileContent: string): IPro5Song {
    //When certain XML nodes only have one item the parser will convert them into objects
    //Here we maintain a list of node paths to always keep as arrays
    //This keeps our code structure and typedefs more sane and normalized
    const alwaysArray = [
      'RVPresentationDocument.timeline.timeCues',
      'RVPresentationDocument.timeline.mediaTracks',
      'RVPresentationDocument.arrangements.RVSongArrangement',
      'RVPresentationDocument.arrangements.RVSongArrangement.groupIDs.NSMutableString',
    ];

    const xmlParser = new XMLParser({
      //https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/2.XMLparseOptions.md
      ignoreAttributes: false,
      attributeNamePrefix: '@',
      parseAttributeValue: true,
      isArray: (_name, jPath: string) => alwaysArray.includes(jPath),
    });
    const parsedDoc: IXmlPro5DocRoot = xmlParser.parse(fileContent);

    if (parsedDoc.RVPresentationDocument['@versionNumber'] !== 500) {
      throw new Error(
        `Expected a ProPresenter 5 file with versionNumber="500" but got versionNumber="${parsedDoc.RVPresentationDocument['@versionNumber']}"`
      );
    }

    const properties = this.getProperties(parsedDoc.RVPresentationDocument);
    const arrangements = this.getArrangements(
      parsedDoc.RVPresentationDocument.arrangements.RVSongArrangement
    );

    return { properties, arrangements };
  }

  private getProperties(doc: IXmlPro5Doc): IPro5Properties {
    return {
      CCLIArtistCredits: doc['@CCLIArtistCredits'],
      CCLICopyrightInfo: doc['@CCLICopyrightInfo'],
      CCLIDisplay: Boolean(doc['@CCLIDisplay']),
      CCLILicenseNumber: doc['@CCLILicenseNumber'],
      CCLIPublisher: doc['@CCLIPublisher'],
      CCLISongTitle: doc['@CCLISongTitle'],
      album: doc['@album'],
      artist: doc['@artist'],
      author: doc['@author'],
      backgroundColor: doc['@backgroundColor'],
      category: doc['@category'],
      creatorCode: doc['@creatorCode'],
      chordChartPath: doc['@chordChartPath'],
      docType: doc['@docType'],
      drawingBackgroundColor: doc['@drawingBackgroundColor'],
      height: doc['@height'],
      lastDateUsed: new Date(doc['@lastDateUsed']),
      notes: doc['@notes'],
      resourcesDirectory: doc['@resourcesDirectory'],
      usedCount: doc['@usedCount'],
      versionNumber: doc['@versionNumber'],
      width: doc['@width'],
    };
  }

  private getArrangements(arrangements: IXmlPro5Arrangement[]): IPro5Arrangement[] {
    const arrangementsArr: IPro5Arrangement[] = [];

    for (const a of arrangements) {
      arrangementsArr.push({
        color: a['@color'],
        name: a['@name'],
        slideGroups: a.groupIDs.NSMutableString.map((group) => {
          return {
            groupId: group['@serialization-native-value'],
            groupName: '',
          };
        }),
      });
    }

    return arrangementsArr;
  }
}
