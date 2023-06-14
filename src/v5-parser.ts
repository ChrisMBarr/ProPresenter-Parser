import { XMLParser } from 'fast-xml-parser';
import { Base64 } from 'js-base64';
import * as Utils from './utils';
import {
  IPro5Arrangement,
  IPro5Properties,
  IPro5Slide,
  IPro5SlideGroup,
  IPro5SlideMediaCue,
  IPro5SlideTextElement,
  IPro5Song,
} from './v5-parser.model';
import {
  IXmlPro5Arrangement,
  IXmlPro5Doc,
  IXmlPro5DocRoot,
  IXmlPro5Slide,
  IXmlPro5SlideGroup,
} from './v5-xml.model';

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
      'RVPresentationDocument.groups.RVSlideGrouping',
      'RVPresentationDocument.groups.RVSlideGrouping.slides.RVDisplaySlide',
      'RVPresentationDocument.groups.RVSlideGrouping.slides.RVDisplaySlide.cues.RVMediaCue',
      'RVPresentationDocument.groups.RVSlideGrouping.slides.RVDisplaySlide.displayElements.RVTextElement',
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
    const slideGroups = this.getSlideGroups(
      parsedDoc.RVPresentationDocument.groups.RVSlideGrouping
    );
    const arrangements = this.getArrangements(
      parsedDoc.RVPresentationDocument.arrangements.RVSongArrangement,
      slideGroups
    );

    return { properties, slideGroups, arrangements };
  }

  private getProperties(xmlDoc: IXmlPro5Doc): IPro5Properties {
    return {
      CCLIArtistCredits: xmlDoc['@CCLIArtistCredits'],
      CCLICopyrightInfo: xmlDoc['@CCLICopyrightInfo'],
      CCLIDisplay: Boolean(xmlDoc['@CCLIDisplay']),
      CCLILicenseNumber: xmlDoc['@CCLILicenseNumber'],
      CCLIPublisher: xmlDoc['@CCLIPublisher'],
      CCLISongTitle: xmlDoc['@CCLISongTitle'],
      album: xmlDoc['@album'],
      artist: xmlDoc['@artist'],
      author: xmlDoc['@author'],
      backgroundColor: xmlDoc['@backgroundColor'],
      category: xmlDoc['@category'],
      creatorCode: xmlDoc['@creatorCode'],
      chordChartPath: xmlDoc['@chordChartPath'],
      docType: xmlDoc['@docType'],
      drawingBackgroundColor: xmlDoc['@drawingBackgroundColor'],
      height: xmlDoc['@height'],
      lastDateUsed: new Date(xmlDoc['@lastDateUsed']),
      notes: xmlDoc['@notes'],
      resourcesDirectory: xmlDoc['@resourcesDirectory'],
      usedCount: xmlDoc['@usedCount'],
      versionNumber: xmlDoc['@versionNumber'],
      width: xmlDoc['@width'],
    };
  }

  private getSlideGroups(xmlGroups: IXmlPro5SlideGroup[]): IPro5SlideGroup[] {
    return xmlGroups.map(
      (sg): IPro5SlideGroup => ({
        groupColor: sg['@color'],
        groupLabel: sg['@name'],
        groupId: sg['@uuid'],
        slides: this.getSlidesForGroup(sg.slides.RVDisplaySlide),
      })
    );
  }

  private getSlidesForGroup(xmlSlides: IXmlPro5Slide[]): IPro5Slide[] {
    return xmlSlides.map((slide): IPro5Slide => {
      let textElements: IPro5SlideTextElement[] = [];
      if (slide.displayElements.RVTextElement) {
        textElements = slide.displayElements.RVTextElement.map((txt): IPro5SlideTextElement => {
          const decodedContent = Base64.decode(txt['@RTFData']);
          const textProps = Utils.getTextPropsFromRtf(decodedContent);
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
            color: textProps.color,
            font: textProps.font,
            size: textProps.size,
          };
        });
      }

      let mediaCues: IPro5SlideMediaCue[] = [];
      if (slide.cues.RVMediaCue) {
        mediaCues = slide.cues.RVMediaCue.map(
          (cue): IPro5SlideMediaCue => ({
            displayName: cue.element['@displayName'],
            source: cue.element['@source'],
          })
        );
      }

      return {
        backgroundColor: slide['@backgroundColor'],
        chordChartPath: slide['@chordChartPath'],
        enabled: Boolean(slide['@enabled']),
        highlightColor: slide['@highlightColor'],
        id: slide['@UUID'],
        label: slide['@label'],
        notes: slide['@notes'],
        mediaCues,
        textElements,
      };
    });
  }

  private getArrangements(
    xmlArrangements: IXmlPro5Arrangement[],
    slideGroups: IPro5SlideGroup[]
  ): IPro5Arrangement[] {
    const arrangementsArr: IPro5Arrangement[] = [];

    for (const a of xmlArrangements) {
      arrangementsArr.push({
        color: a['@color'],
        label: a['@name'],
        groupOrder: a.groupIDs.NSMutableString.map((group) => {
          //This should always find a match since you can't put something in an arrangement that doesn't already exist
          //So because of that it's OK to have a non-null assertion here
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const slideGroupMatch = slideGroups.find(
            //Look up the actual slide group by ID so we can get its name
            (sg) => sg.groupId === group['@serialization-native-value']
          )!;

          return {
            groupId: group['@serialization-native-value'],
            groupLabel: slideGroupMatch.groupLabel,
          };
        }),
      });
    }

    return arrangementsArr;
  }
}
