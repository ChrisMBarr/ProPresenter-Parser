import { XMLBuilder } from 'fast-xml-parser';
import * as Utils from './utils';
import { Base64 } from 'js-base64';
import {
  IPro5BuilderOptions,
  IPro5BuilderOptionsSlide,
  IPro5BuilderOptionsSlideGroup,
} from './v5-builder.model';
import {
  IXmlPro5DocRoot,
  IXmlPro5Slide,
  IXmlPro5SlideGroup,
  IXmlPro5SlideTextElement,
  IXmlPro5TransitionObj,
} from './v5-xml.model';

export class v5Builder {
  private readonly xmlBuilder: XMLBuilder;

  private readonly defaultTransitionObj: IXmlPro5TransitionObj = {
    '@transitionType': -1,
    '@transitionDuration': 1,
    '@motionEnabled': 0,
    '@motionDuration': 20,
    '@motionSpeed': 100,
  };

  constructor() {
    this.xmlBuilder = new XMLBuilder({
      attributeNamePrefix: '@',
      format: true,
      ignoreAttributes: false,
      processEntities: false,
    });
  }

  build(options: IPro5BuilderOptions): string {
    const documentObj: IXmlPro5DocRoot = {
      RVPresentationDocument: {
        '@CCLIArtistCredits': options.properties.artistCredits ?? '',
        '@CCLICopyrightInfo': options.properties.copyrightYear ?? '',
        '@CCLIDisplay':
          options.properties.ccliDisplay == null || !options.properties.ccliDisplay ? 0 : 1,
        '@CCLILicenseNumber': options.properties.ccliNumber ?? '',
        '@CCLIPublisher': options.properties.publisher ?? '',
        '@CCLISongTitle': options.properties.title,
        '@album': options.properties.album ?? '',
        '@artist': options.properties.artist ?? '',
        '@author': options.properties.author ?? '',
        '@backgroundColor': '0 0 0 1',
        '@category': options.properties.category ?? 'Song',
        '@creatorCode': 0, //not sure what this is
        '@chordChartPath': '',
        '@docType': 0,
        '@drawingBackgroundColor': 0,
        '@height': options.properties.height == null ? 720 : options.properties.height,
        '@width': options.properties.width == null ? 1280 : options.properties.width,
        '@lastDateUsed': Utils.getIsoDateString(),
        '@notes': '',
        '@resourcesDirectory': '',
        '@usedCount': 0,
        '@versionNumber': 500,

        timeline: {
          '@timeOffSet': 0,
          '@selectedMediaTrackIndex': 0,
          '@unitOfMeasure': 60,
          '@duration': 0,
          '@loop': 0,
          timeCues: {
            '@containerClass': 'NSMutableArray',
          },
          mediaTracks: {
            '@containerClass': 'NSMutableArray',
          },
        },
        bibleReference: {
          '@containerClass': 'NSMutableDictionary',
        },
        '_-RVProTransitionObject-_transitionObject': this.defaultTransitionObj,
        groups: {
          '@containerClass': 'NSMutableArray',
          RVSlideGrouping: this.buildSlideGroups(options),
        },
        arrangements: {
          '@containerClass': 'NSMutableArray',
          RVSongArrangement: [],
        },
      },
    };

    return this.xmlBuilder.build(documentObj).trim();
  }

  private buildSlideGroups(options: IPro5BuilderOptions): IXmlPro5SlideGroup[] {
    const xmlSlideGroups: IXmlPro5SlideGroup[] = [];

    for (const group of options.slideGroups) {
      xmlSlideGroups.push({
        '@name': group.label,
        '@color': group.groupColor ?? '0 0 0 0',
        '@uuid': Utils.getUniqueID(),
        slides: {
          RVDisplaySlide: this.buildSlidesForGroup(group, options),
        },
      });
    }

    return xmlSlideGroups;
  }

  private buildSlidesForGroup(
    thisGroup: IPro5BuilderOptionsSlideGroup,
    options: IPro5BuilderOptions
  ): IXmlPro5Slide[] {
    const xmlSlides: IXmlPro5Slide[] = [];

    for (let i = 0; i <= thisGroup.slides.length - 1; i++) {
      const slide = thisGroup.slides[i];
      xmlSlides.push({
        '@backgroundColor': '',
        '@enabled': 1,
        '@highlightColor': slide.slideColor ?? '',
        '@hotKey': '',
        '@label': slide.label,
        '@notes': '',
        '@slideType': 1,
        '@sort_index': i,
        '@UUID': Utils.getUniqueID(),
        '@drawingBackgroundColor': 0,
        '@chordChartPath': '',
        '@serialization-array-index': i,
        cues: {},
        displayElements: {
          '@containerClass': 'NSMutableArray',
          RVTextElement: [this.buildTextElement(slide, options)],
        },
        '_-RVProTransitionObject-_transitionObject': this.defaultTransitionObj,
      });
    }

    return xmlSlides;
  }

  private buildTextElement(
    slide: IPro5BuilderOptionsSlide,
    options: IPro5BuilderOptions
  ): IXmlPro5SlideTextElement {
    return {
      '@displayDelay': 0,
      '@displayName': 'Default',
      '@locked': 0,
      '@persistent': 0,
      '@typeID': 0,
      '@fromTemplate': 0,
      '@bezelRadius': 0,
      '@drawingFill': 0,
      '@drawingShadow': 1,
      '@drawingStroke': 0,
      '@fillColor': '1 1 1 1',
      '@rotation': 0,
      '@source': '',
      '@adjustsHeightToFit': 0,
      '@verticalAlignment': 0,
      '@RTFData': Base64.encode(Utils.formatRtf(slide.text, slide.fontName, slide.fontSize)), //slide.fontColor --parse colors
      '@revealType': 0,
      '@serialization-array-index': 0,
      stroke: {
        NSColor: {
          '@serialization-native-value': slide.strokeColor ?? '0 0 0 1',
          '@serialization-dictionary-key': 'RVShapeElementStrokeColorKey',
        },
        NSNumber: {
          '@serialization-native-value': slide.strokeWidth ?? 1,
          '@serialization-dictionary-key': 'RVShapeElementStrokeWidthKey',
        },
      },
      '_-D-_serializedShadow': {
        NSMutableString: {
          '@serialization-native-value': '{3.4641016, -2}',
          '@serialization-dictionary-key': 'shadowOffset',
        },
        NSNumber: {
          '@serialization-native-value': 4,
          '@serialization-dictionary-key': 'shadowBlurRadius',
        },
        NSColor: {
          '@serialization-native-value': '0 0 0 1',
          '@serialization-dictionary-key': 'shadowColor',
        },
      },
      '_-RVRect3D-_position': {
        '@x': 0,
        '@y': 0,
        '@z': 0,
        '@width': options.properties.width ?? 0,
        '@height': options.properties.width ?? 0,
      },
    };
  }
}
