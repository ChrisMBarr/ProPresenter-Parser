import { XMLBuilder } from 'fast-xml-parser';
import { Base64 } from 'js-base64';
import { IProBuilderTextFormattingDefinite, IXmlProElementPosition } from './shared.model';
import * as Utils from './utils';
import {
  IPro5BuilderOptions,
  IPro5BuilderOptionsDefinite,
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
  private readonly options: IPro5BuilderOptionsDefinite;

  private readonly defaultTransitionObj: IXmlPro5TransitionObj = {
    '@transitionType': -1,
    '@transitionDuration': 1,
    '@motionEnabled': 0,
    '@motionDuration': 20,
    '@motionSpeed': 100,
  };

  constructor(options: IPro5BuilderOptions) {
    this.xmlBuilder = new XMLBuilder({
      attributeNamePrefix: '@',
      format: true,
      ignoreAttributes: false,
      processEntities: false,
    });

    //Set the options, and force the type
    this.options = options as IPro5BuilderOptionsDefinite;

    //Now use all the default options, but overwrite those with any passed in by the user
    const defaultProperties = {
      album: '',
      artist: '',
      artistCredits: '',
      author: '',
      category: 'Song',
      ccliDisplay: false,
      publisher: '',
      height: 720,
      width: 1280,
    };
    this.options.properties = { ...defaultProperties, ...this.options.properties };

    const defaultSlideTextFormatting: IProBuilderTextFormattingDefinite = {
      textColor: { r: 255, g: 255, b: 255 },
      textPadding: 20,
    };
    this.options.slideTextFormatting = {
      ...defaultSlideTextFormatting,
      ...this.options.slideTextFormatting,
    };
  }

  build(): string {
    const documentObj: IXmlPro5DocRoot = {
      RVPresentationDocument: {
        '@CCLIArtistCredits': this.options.properties.artistCredits,
        '@CCLICopyrightInfo': this.options.properties.copyrightYear ?? '',
        '@CCLIDisplay': this.options.properties.ccliDisplay ? 1 : 0,
        '@CCLILicenseNumber': this.options.properties.ccliNumber ?? '',
        '@CCLIPublisher': this.options.properties.publisher,
        '@CCLISongTitle': this.options.properties.title,
        '@album': this.options.properties.album,
        '@artist': this.options.properties.artist,
        '@author': this.options.properties.author,
        '@backgroundColor': '0 0 0 1',
        '@category': this.options.properties.category,
        '@creatorCode': 0, //not sure what this is
        '@chordChartPath': '',
        '@docType': 0,
        '@drawingBackgroundColor': 0,
        '@height': this.options.properties.height,
        '@width': this.options.properties.width,
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
          RVSlideGrouping: this.buildSlideGroups(),
        },
        arrangements: {
          '@containerClass': 'NSMutableArray',
          RVSongArrangement: [],
        },
      },
    };

    return this.xmlBuilder.build(documentObj).trim();
  }

  private buildSlideGroups(): IXmlPro5SlideGroup[] {
    const xmlSlideGroups: IXmlPro5SlideGroup[] = [];

    for (let i = 0; i < this.options.slideGroups.length; i++) {
      const group = this.options.slideGroups[i];
      xmlSlideGroups.push({
        '@name': group.label,
        '@uuid': Utils.getUniqueID(),
        '@color': group.groupColor ?? '0 0 0 0',
        '@serialization-array-index': i,
        slides: {
          '@containerClass': 'NSMutableArray',
          RVDisplaySlide: this.buildSlidesForGroup(group),
        },
      });
    }

    return xmlSlideGroups;
  }

  private buildSlidesForGroup(thisGroup: IPro5BuilderOptionsSlideGroup): IXmlPro5Slide[] {
    const xmlSlides: IXmlPro5Slide[] = [];

    for (let i = 0; i < thisGroup.slides.length; i++) {
      const slide = thisGroup.slides[i];
      const highlightColor = Utils.normalizeColorToRgbaString(slide.slideColor ?? '0 0 0 0');
      xmlSlides.push({
        '@backgroundColor': '0 0 0 0',
        '@enabled': 1,
        '@highlightColor': highlightColor,
        '@hotKey': '',
        '@label': slide.label,
        '@notes': '',
        '@slideType': 1,
        '@sort_index': i,
        '@UUID': Utils.getUniqueID(),
        '@drawingBackgroundColor': 0,
        '@chordChartPath': '',
        '@serialization-array-index': i,
        cues: {
          '@containerClass': 'NSMutableArray',
        },
        displayElements: {
          '@containerClass': 'NSMutableArray',
          RVTextElement: [this.buildTextElement(slide)],
        },
        '_-RVProTransitionObject-_transitionObject': this.defaultTransitionObj,
      });
    }

    return xmlSlides;
  }

  private buildTextElement(slide: IPro5BuilderOptionsSlide): IXmlPro5SlideTextElement {
    const rtfText = Utils.formatRtf(
      slide.text,
      this.options.slideTextFormatting.fontName,
      this.options.slideTextFormatting.textSize,
      Utils.normalizeColorToRgbObj(this.options.slideTextFormatting.textColor)
    );

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
      '@RTFData': Base64.encode(rtfText),
      '@revealType': 0,
      '@serialization-array-index': 0,
      stroke: {
        NSColor: {
          '@serialization-native-value': '0 0 0 1',
          '@serialization-dictionary-key': 'RVShapeElementStrokeColorKey',
        },
        NSNumber: {
          '@serialization-native-value': 1,
          '@serialization-dictionary-key': 'RVShapeElementStrokeWidthKey',
        },
      },
      '_-D-_serializedShadow': {
        NSMutableString: {
          '@serialization-native-value': `{3.4641016, -2}`,
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
      '_-RVRect3D-_position': this.getElementPosition(),
    };
  }

  private getElementPosition(): IXmlProElementPosition {
    return {
      '@x': this.options.slideTextFormatting.textPadding,
      '@y': this.options.slideTextFormatting.textPadding,
      '@z': 0,
      '@width': this.options.properties.width - this.options.slideTextFormatting.textPadding * 2,
      '@height': this.options.properties.height - this.options.slideTextFormatting.textPadding * 2,
    };
  }
}
