import { XMLParser } from 'fast-xml-parser';
import { IProPresenter4Doc } from './v4-parser.model';
import { IXmlPro4Doc } from './v4-parser.xml.model';

export class v4Parser {
  parse(fileContent: string): IProPresenter4Doc {
    //When certain XML nodes only have one item the parser will convert them into objects
    //Here we maintain a list of node paths to always keep as arrays
    //This keeps our code structure and typedefs more sane and normalized
    const alwaysArray = [
      'RVPresentationDocument.groups.RVSlideGrouping',
      'RVPresentationDocument.slides.RVDisplaySlide',
      'RVPresentationDocument.groups.RVSlideGrouping.slides.RVDisplaySlide',
    ];

    const xmlParser = new XMLParser({
      //https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/2.XMLparseOptions.md
      ignoreAttributes: false,
      attributeNamePrefix: '@',
      parseAttributeValue: true,
      isArray: (_name, jPath: string) => alwaysArray.includes(jPath),
    });
    const parsedDoc: IXmlPro4Doc = xmlParser.parse(fileContent);

    console.log(parsedDoc.RVPresentationDocument.slides.RVDisplaySlide[0]);

    return parsedDoc;
  }

  // private getInfo(doc: IProPresenter4Document): ISongInfo[] {
  //   const skipKeys = [
  //     'CCLIDisplay',
  //     'backgroundColor',
  //     'docType',
  //     'drawingBackgroundColor',
  //     'height',
  //     'lastDateUsed',
  //     'usedCount',
  //     'versionNumber',
  //     'width',
  //   ];
  //   const info: ISongInfo[] = [];

  //   //Loop through all top-level object properties, skipping over a few hard-coded ones
  //   //If the value is a string or a number, add it to the info
  //   Object.keys(doc.RVPresentationDocument).forEach((k) => {
  //     if (!skipKeys.includes(k)) {
  //       const val = doc.RVPresentationDocument[k];
  //       if ((typeof val === 'string' && val !== '') || typeof val === 'number') {
  //         info.push({
  //           name: k,
  //           value: val,
  //         });
  //       }
  //     }
  //   });
  //   return info;
  // }

  // private getSlides(doc: IProPresenter4Document): ISongSlide[] {
  //   const slidesList: ISongSlide[] = [];
  //   doc.RVPresentationDocument.slides.RVDisplaySlide.forEach((slide) => {
  //     const title = slide.label;
  //     const lyrics = Utils.stripRtf(Base64.decode(slide.displayElements.RVTextElement.RTFData));
  //     if (title || lyrics) {
  //       slidesList.push({ title, lyrics });
  //     }
  //   });

  //   return slidesList;
  // }
}
