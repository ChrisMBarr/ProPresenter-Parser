import { XMLParser } from 'fast-xml-parser';
import { Base64 } from 'js-base64';
import * as Utils from './utils';
import { IPro4Properties, IPro4Slide, IPro4SlideTextElement, IPro4Song } from './v4-parser.model';
import { IXmlPro4DisplaySlide, IXmlPro4Doc, IXmlPro4DocRoot } from './v4-parser.xml.model';

export class v4Parser {
  parse(fileContent: string): IPro4Song {
    //When certain XML nodes only have one item the parser will convert them into objects
    //Here we maintain a list of node paths to always keep as arrays
    //This keeps our code structure and typedefs more sane and normalized
    const alwaysArray = [
      'RVPresentationDocument.slides.RVDisplaySlide',
      'RVPresentationDocument.slides.RVDisplaySlide.displayElements.RVTextElement',
    ];

    const xmlParser = new XMLParser({
      //https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/2.XMLparseOptions.md
      ignoreAttributes: false,
      attributeNamePrefix: '@',
      parseAttributeValue: true,
      isArray: (_name, jPath: string) => alwaysArray.includes(jPath),
    });
    const parsedDoc: IXmlPro4DocRoot = xmlParser.parse(fileContent);

    const properties = this.getProperties(parsedDoc.RVPresentationDocument);
    const slides = this.getSlides(parsedDoc.RVPresentationDocument.slides.RVDisplaySlide);

    return {
      properties,
      slides,
    };
  }

  private getProperties(doc: IXmlPro4Doc): IPro4Properties {
    return {
      CCLIArtistCredits: doc['@CCLIArtistCredits'],
      CCLICopyrightInfo: doc['@CCLICopyrightInfo'],
      CCLIDisplay: doc['@CCLIDisplay'],
      CCLILicenseNumber: doc['@CCLILicenseNumber'],
      CCLIPublisher: doc['@CCLIPublisher'],
      CCLISongTitle: doc['@CCLISongTitle'],
      album: doc['@album'],
      artist: doc['@artist'],
      author: doc['@author'],
      backgroundColor: doc['@backgroundColor'],
      category: doc['@category'],
      creatorCode: doc['@creatorCode'],
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

  private getSlides(displaySlides: IXmlPro4DisplaySlide[]): IPro4Slide[] {
    const slidesList: IPro4Slide[] = [];

    for (const slide of displaySlides) {
      slidesList.push({
        label: slide['@label'],
        textElements: slide.displayElements.RVTextElement.map((txt): IPro4SlideTextElement => {
          const decodedContent = Base64.decode(txt['@RTFData']);

          return {
            position: {
              x: txt['_-RVRect3D-_position']['@x'],
              y: txt['_-RVRect3D-_position']['@y'],
              z: txt['_-RVRect3D-_position']['@z'],
              height: txt['_-RVRect3D-_position']['@height'],
              width: txt['_-RVRect3D-_position']['@width'],
            },
            rawRtfContent: decodedContent,
            textContent: Utils.stripRtf(decodedContent),
          };
        }),
      });
    }

    return slidesList;
  }
}
