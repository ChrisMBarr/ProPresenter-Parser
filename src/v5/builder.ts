import { XMLBuilder } from 'fast-xml-parser';
import { Base64 } from 'js-base64';

import { IProBuilderTextFormattingDefinite, IProTransitionType } from '../shared.model';
import * as Utils from '../utils';
import { IPro5BuilderOptions, IPro5BuilderOptionsDefinite, IPro5BuilderOptionsSlideGroup } from './builder.model';
import {
  IXmlPro5DocRoot,
  IXmlPro5ElementPosition,
  IXmlPro5Slide,
  IXmlPro5SlideGroup,
  IXmlPro5SlideTextElement,
  IXmlPro5TransitionObj,
} from './xml.model';

export class v5Builder {
  private readonly xmlBuilder: XMLBuilder;
  private readonly options: IPro5BuilderOptionsDefinite;

  private readonly defaultTransitionObj: IXmlPro5TransitionObj = {
    '@transitionType': IProTransitionType.None,
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
      suppressUnpairedNode: false,
      unpairedTags: [
        'arrangements',
        'timeCues',
        'mediaTracks',
        'bibleReference',
        'cues',
        '_-RVProTransitionObject-_transitionObject',
        '_-RVRect3D-_position',
        'NSColor',
        'NSNumber',
        'NSMutableString',
      ],
    });

    //Set the options, and force the type
    this.options = options as IPro5BuilderOptionsDefinite;

    //Now use all the default options, but overwrite those with any passed in by the user
    const defaultProperties = {
      album: '',
      artist: '',
      author: '',
      category: 'Song',
      ccliDisplay: false,
      notes: '',
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
        '@CCLIArtistCredits': this.options.properties.artist,
        '@CCLICopyrightInfo': this.options.properties.copyrightYear ?? '',
        '@CCLIDisplay': this.options.properties.ccliDisplay ? 1 : 0,
        '@CCLILicenseNumber': this.options.properties.ccliNumber ?? '',
        '@CCLIPublisher': this.options.properties.publisher,
        '@CCLISongTitle': this.options.properties.title,
        '@album': this.options.properties.album,
        '@artist': this.options.properties.artist,
        '@author': this.options.properties.author,
        '@category': this.options.properties.category,
        '@notes': this.options.properties.notes,
        '@lastDateUsed': Utils.getIsoDateString(),

        //Size
        '@height': this.options.properties.height,
        '@width': this.options.properties.width,

        //Non-customizable stuff
        '@backgroundColor': '0 0 0 1', //transparent
        '@creatorCode': 0, //not sure what this is
        '@chordChartPath': '',
        '@docType': 0,
        '@drawingBackgroundColor': 0,
        '@resourcesDirectory': '',
        '@usedCount': 0,
        '@versionNumber': 500,

        timeline: {
          //Create an empty timeline element
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
        '_-RVProTransitionObject-_transitionObject': this.getTransitions(),
        groups: {
          '@containerClass': 'NSMutableArray',
          RVSlideGrouping: this.buildSlideGroups(),
        },
        arrangements: {
          //No default arrangement created, but add the empty XML node
          '@containerClass': 'NSMutableArray',
          RVSongArrangement: [],
        },
      },
    };

    return this.xmlBuilder.build(documentObj).trim();
  }

  private getTransitions(): IXmlPro5TransitionObj {
    if (this.options.transitions) {
      const transitionsCopy: IXmlPro5TransitionObj = { ...this.defaultTransitionObj };
      transitionsCopy['@transitionDuration'] = this.options.transitions.duration;
      transitionsCopy['@transitionType'] = this.options.transitions.type;
      return transitionsCopy;
    }
    return this.defaultTransitionObj;
  }

  private buildSlideGroups(): IXmlPro5SlideGroup[] {
    const xmlSlideGroups: IXmlPro5SlideGroup[] = [];

    for (let i = 0; i < this.options.slideGroups.length; i++) {
      const group = this.options.slideGroups[i];
      xmlSlideGroups.push({
        '@name': group.label,
        '@uuid': Utils.getUniqueID(),
        '@color': Utils.normalizeColorToRgbaString(group.groupColor ?? '0 0 0 0'),
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

      //Defaults
      let highlightColor = '0 0 0 0'; //transparent/none
      let label = '';
      let text;

      if (typeof slide === 'string') {
        text = slide;
      } else {
        highlightColor = Utils.normalizeColorToRgbaString(slide.slideColor ?? highlightColor);
        label = slide.label ?? '';
        text = slide.text;
      }

      xmlSlides.push({
        '@backgroundColor': '0 0 0 0', //transparent/none
        '@enabled': 1,
        '@highlightColor': highlightColor,
        '@hotKey': '',
        '@label': label,
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
          RVTextElement: [this.buildTextElement(text)],
        },
        '_-RVProTransitionObject-_transitionObject': this.defaultTransitionObj,
      });
    }

    return xmlSlides;
  }

  private buildTextElement(text: string): IXmlPro5SlideTextElement {
    const rtfText = Utils.formatRtf(
      text,
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
        '@containerClass': 'NSMutableDictionary',
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
        '@containerClass': 'NSMutableDictionary',
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

  private getElementPosition(): IXmlPro5ElementPosition {
    return {
      '@x': this.options.slideTextFormatting.textPadding,
      '@y': this.options.slideTextFormatting.textPadding,
      '@z': 0,
      '@width': this.options.properties.width - this.options.slideTextFormatting.textPadding * 2,
      '@height': this.options.properties.height - this.options.slideTextFormatting.textPadding * 2,
    };
  }
}
