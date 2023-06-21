import { XMLParser } from 'fast-xml-parser';
import { Base64 } from 'js-base64';
import { IProElementPosition, IProElementShadow } from '../shared.model';
import * as Utils from '../utils';
import {
  IPro6Arrangement,
  IPro6ArrangementSlideGroup,
  IPro6Properties,
  IPro6Slide,
  IPro6SlideGroup,
  IPro6SlideTextElement,
  IPro6Song,
} from './parser.model';
import {
  IXmlPro6Arrangement,
  IXmlPro6DisplaySlide,
  IXmlPro6DisplaySlideDisplayElement,
  IXmlPro6Doc,
  IXmlPro6DocArrayElementArrangements,
  IXmlPro6DocArrayElementGroups,
  IXmlPro6DocRoot,
  IXmlPro6SlideGroup,
  IXmlPro6TextElement,
} from './xml.model';

export class v6Parser {
  parse(fileContent: string): IPro6Song {
    //When certain XML nodes only have one item the parser will convert them into objects
    //Here we maintain a list of node paths to always keep as arrays
    //This keeps our code structure and typedefs more sane and normalized
    const alwaysArray = [
      'RVPresentationDocument.array',
      'RVPresentationDocument.array.RVSlideGrouping',
      'RVPresentationDocument.array.RVSlideGrouping.array.RVDisplaySlide',
      'RVPresentationDocument.array.RVSlideGrouping.array.RVDisplaySlide.array.RVTextElement',
      'RVPresentationDocument.array.RVSlideGrouping.array.RVDisplaySlide.array.RVImageElement',
      'RVPresentationDocument.array.RVSlideGrouping.array.RVDisplaySlide.array.RVBezierPathElement',
      'RVPresentationDocument.array.RVSlideGrouping.array.RVDisplaySlide.array.RVShapeElement',
      'RVPresentationDocument.array.RVSlideGrouping.array.RVDisplaySlide.array.RVHTMLShapeElement',
      'RVPresentationDocument.array.RVSongArrangement',
      'RVPresentationDocument.array.RVSongArrangement.array.NSString',
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

    //Find the correct slide groups XML
    let slideGroups: IPro6SlideGroup[] = [];
    const groupsXml = parsedDoc.RVPresentationDocument.array.find(
      (el): el is IXmlPro6DocArrayElementGroups => el['@rvXMLIvarName'] === 'groups'
    );
    if (groupsXml) {
      slideGroups = this.getSlideGroups(groupsXml.RVSlideGrouping);
    }

    //Find the correct arrangements XML
    let arrangements: IPro6Arrangement[] = [];
    const arrangementsXml = parsedDoc.RVPresentationDocument.array.find(
      (el): el is IXmlPro6DocArrayElementArrangements => el['@rvXMLIvarName'] === 'arrangements'
    );
    if (arrangementsXml?.RVSongArrangement) {
      arrangements = this.getArrangements(arrangementsXml.RVSongArrangement, slideGroups);
    }

    return { properties, slideGroups, arrangements };
  }

  private getProperties(xmlDoc: IXmlPro6Doc): IPro6Properties {
    return {
      CCLIArtistCredits: xmlDoc['@CCLIArtistCredits'] ?? '',
      CCLIAuthor: xmlDoc['@CCLIAuthor'] ?? '',
      CCLICopyrightYear: xmlDoc['@CCLICopyrightYear'] ?? '',
      CCLIDisplay: xmlDoc['@CCLIDisplay'],
      CCLIPublisher: xmlDoc['@CCLIPublisher'] ?? '',
      CCLISongNumber: xmlDoc['@CCLISongNumber'] ?? '',
      CCLISongTitle: xmlDoc['@CCLISongTitle'] ?? '',
      backgroundColor: Utils.normalizeColorToRgbObj(xmlDoc['@backgroundColor']),
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

  private getSlideGroups(groupsXmlArr: IXmlPro6SlideGroup[]): IPro6SlideGroup[] {
    const groupsArr: IPro6SlideGroup[] = [];

    for (const group of groupsXmlArr) {
      groupsArr.push({
        groupColor: Utils.normalizeColorToRgbObj(group['@color']),
        groupId: group['@uuid'],
        groupLabel: group['@name'],
        slides: this.getSlidesForGroup(group.array.RVDisplaySlide),
      });
    }
    return groupsArr;
  }

  private getSlidesForGroup(slidesXmlArr: IXmlPro6DisplaySlide[]): IPro6Slide[] {
    const slidesArr: IPro6Slide[] = [];

    for (const slide of slidesXmlArr) {
      let textElements: IPro6SlideTextElement[] = [];
      //We know the document will always have displayElements, otherwise why would we parse it?
      //Because of this it's safe to disable this rule here
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const xmlDisplayElements = slide.array.find(
        (s): s is IXmlPro6DisplaySlideDisplayElement => s['@rvXMLIvarName'] === 'displayElements'
      )!;
      if (xmlDisplayElements.RVTextElement) {
        textElements = this.getTextElementsForSlide(xmlDisplayElements.RVTextElement);
      }

      // if (xmlDisplayElements?.RVImageElement) {
      //   //TODO: parse any image elements
      // }

      // if (xmlDisplayElements?.RVShapeElement) {
      //   //TODO: parse any shape elements
      // }

      // if (xmlDisplayElements?.RVHTMLShapeElement) {
      //   //TODO: parse any live HTML elements
      // }

      // if (xmlDisplayElements?.RVBezierPathElement) {
      //   //TODO: parse any bezier paths
      // }

      const highlightColor = slide['@highlightColor'] === '' ? null : Utils.normalizeColorToRgbObj(slide['@highlightColor']);

      slidesArr.push({
        backgroundColor: Utils.normalizeColorToRgbObj(slide['@backgroundColor']),
        chordChartPath: slide['@chordChartPath'],
        drawingBackgroundColor: slide['@drawingBackgroundColor'],
        enabled: slide['@enabled'],
        highlightColor,
        hotKey: slide['@hotKey'],
        id: slide['@UUID'],
        label: slide['@label'],
        notes: slide['@notes'],
        textElements,
      });
    }

    // console.log(JSON.stringify(slidesXmlArr, null, 2));
    // console.log(slidesArr);

    return slidesArr;
  }

  private getTextElementsForSlide(textElementXmlArr: IXmlPro6TextElement[]): IPro6SlideTextElement[] {
    //Most slides will only have one text element, but it's easy enough to allow this to handle multiples
    const textElementArr: IPro6SlideTextElement[] = [];

    for (const txt of textElementXmlArr) {
      let plainText = '';
      let rtfData = '';
      let winFlowData = '';
      let winFontData = '';
      txt.NSString.forEach((str) => {
        if (str['@rvXMLIvarName'] === 'PlainText') {
          plainText = Base64.decode(str['#text']);
        } else if (str['@rvXMLIvarName'] === 'RTFData') {
          rtfData = Base64.decode(str['#text']);
        } else if (str['@rvXMLIvarName'] === 'WinFlowData') {
          winFlowData = Base64.decode(str['#text']);

          //There could be other types, so we ignore this rule here
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        } else if (str['@rvXMLIvarName'] === 'WinFontData') {
          winFontData = Base64.decode(str['#text']);
        }
      });

      const textProps = Utils.getTextPropsFromRtf(rtfData);

      textElementArr.push({
        adjustsHeightToFit: txt['@adjustsHeightToFit'],
        bezelRadius: txt['@bezelRadius'],
        displayDelay: txt['@displayDelay'],
        displayName: txt['@displayName'],
        drawingFill: txt['@drawingFill'],
        fillColor: Utils.normalizeColorToRgbObj(txt['@fillColor']),
        fromTemplate: txt['@fromTemplate'],
        id: txt['@UUID'],
        locked: txt['@locked'],
        opacity: txt['@opacity'],
        persistent: txt['@persistent'],
        revealType: txt['@revealType'],
        rotation: txt['@rotation'],
        source: txt['@source'],
        typeID: txt['@typeID'],
        verticalAlignment: txt['@verticalAlignment'],

        //Attributes extracted from the RTF data
        fontName: textProps.font,
        textColor: textProps.color,
        textSize: textProps.size,

        //These are `<NSString>` elements we decode above
        plainText,
        rtfData,
        winFlowData,
        winFontData,

        //These elements need to have their values parsed to be more useful
        outline: {
          color: Utils.normalizeColorToRgbObj(txt.dictionary.NSColor['#text']),
          size: txt.dictionary.NSNumber['#text'],
          enabled: txt['@drawingStroke'],
        },
        position: this.getPosition(txt.RVRect3D['#text']),
        textShadow: this.getShadow(txt.shadow['#text'], txt['@drawingShadow']),
      });
    }

    // console.log(JSON.stringify(textElementXmlArr, null, 2));
    // console.log(textElementArr);

    return textElementArr;
  }

  private getPosition(positionStr: string): IProElementPosition {
    //The position string looks like this: '{20 20 0 1880 1040}'
    const positionParts = positionStr
      //remove the curly braces
      .replace(/[{}]/g, '')
      //Split the remaining space-separated numbers into an array
      .split(' ')
      //Parse them as real numbers
      .map((n) => parseInt(n, 10));

    return {
      x: positionParts[0],
      y: positionParts[1],
      z: positionParts[2],
      width: positionParts[3],
      height: positionParts[4],
    };
  }

  private getShadow(shadowStr: string, enabled: boolean): IProElementShadow {
    //A shadow string looks like this: '10|0 0 0 1|{1.41421356237309, -1.4142135623731}'
    //The format is as follows:      radius|color|{offsetX, offsetY}

    const pattern = new RegExp(
      '^(\\d+)\\|(' + Utils.patternRgbaStrAsString + ')\\|\\{(-?\\d(?:\\.\\d+)?), (-?\\d(?:\\.\\d+)?)\\}$'
    );

    //This is OK to disable here. If we got here then we know the string will be in this format
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const match = pattern.exec(shadowStr)!;

    const radius = parseInt(match[1], 10);
    const color = Utils.normalizeColorToRgbObj(match[2]);
    const offsetX = parseFloat(match[3]);
    const offsetY = parseFloat(match[4]);

    //https://stackoverflow.com/a/76492788/79677
    const angle = (Math.atan2(offsetX, offsetY) * 180) / Math.PI;
    const length = Math.round(Math.hypot(offsetX, offsetY));

    return { angle, color, enabled, length, radius };
  }

  private getArrangements(arrangementsXml: IXmlPro6Arrangement[], slideGroups: IPro6SlideGroup[]): IPro6Arrangement[] {
    const arrangementsArr: IPro6Arrangement[] = [];

    for (const arrangement of arrangementsXml) {
      const groupOrder: IPro6ArrangementSlideGroup[] = arrangement.array.NSString.map((groupIdStr) => {
        return {
          groupId: groupIdStr,
          //This rule is OK to disable here since we know the ID will exist in the group if it is also in an arrangement
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          groupLabel: slideGroups.find((g) => g.groupId === groupIdStr)!.groupLabel,
        };
      });

      arrangementsArr.push({
        label: arrangement['@name'],
        color: Utils.normalizeColorToRgbObj(arrangement['@color']),
        groupOrder,
      });
    }

    return arrangementsArr;
  }
}
