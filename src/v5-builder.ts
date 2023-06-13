import { XMLBuilder } from 'fast-xml-parser';
import * as Utils from './utils';
import { IPro5BuilderOptions } from './v5-builder.model';
import { IXmlPro5DocRoot, IXmlPro5Slide, IXmlPro5SlideGroup } from './v5-xml.model';

export class v5Builder {
  private readonly xmlBuilder: XMLBuilder;

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
        '_-RVProTransitionObject-_transitionObject': {
          '@transitionType': -1,
          '@transitionDuration': 1,
          '@motionEnabled': 0,
          '@motionDuration': 20,
          '@motionSpeed': 100,
        },
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
          RVDisplaySlide: this.buildSlidesForGroup(options),
        },
      });
    }

    return xmlSlideGroups;
  }

  private buildSlidesForGroup(_options: IPro5BuilderOptions): IXmlPro5Slide[] {
    const xmlSlides: IXmlPro5Slide[] = [];

    return xmlSlides;
  }
}
