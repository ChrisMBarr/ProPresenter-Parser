import { XMLBuilder } from 'fast-xml-parser';
import { IProBuilderTextFormattingDefinite, IProTransitionType } from '../shared.model';
import * as Utils from '../utils';
import { IPro6BuilderOptions, IPro6BuilderOptionsDefinite, IPro6BuilderOptionsSlideGroup } from './builder.model';
import { IXmlPro6DisplaySlide, IXmlPro6DocRoot, IXmlPro6SlideGroup, IXmlPro6TextElement, IXmlPro6Transition } from './xml.model';
import { Base64 } from 'js-base64';

export class v6Builder {
  private readonly xmlBuilder: XMLBuilder;
  private readonly options: IPro6BuilderOptionsDefinite;

  private readonly defaultTransitionObj: IXmlPro6Transition = {
    '@rvXMLIvarName': 'transitionObject',
    '@transitionType': IProTransitionType.None,
    '@transitionDirection': 0,
    '@transitionDuration': 1,
    '@motionEnabled': false,
    '@motionDuration': 0,
    '@motionSpeed': 0,
    '@groupIndex': 0,
    '@orderIndex': 0,
    '@slideBuildAction': 0,
    '@slideBuildDelay': 0,
  };

  constructor(options: IPro6BuilderOptions) {
    this.xmlBuilder = new XMLBuilder({
      attributeNamePrefix: '@',
      format: true,
      ignoreAttributes: false,
      processEntities: false,
      suppressUnpairedNode: false,
      unpairedTags: ['array'],
    });

    //Set the options, and force the type
    this.options = options as IPro6BuilderOptionsDefinite;

    //Now use all the default options, but overwrite those with any passed in by the user
    const defaultProperties = {
      CCLIArtistCredits: '',
      CCLIAuthor: '',
      CCLIDisplay: false,
      CCLIPublisher: '',
      category: 'Song',
      notes: '',
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
    const documentObj: IXmlPro6DocRoot = {
      RVPresentationDocument: {
        '@CCLIArtistCredits': this.options.properties.CCLIArtistCredits,
        '@CCLIAuthor': this.options.properties.CCLIAuthor,
        '@CCLICopyrightYear': this.options.properties.CCLICopyrightYear ?? '',
        '@CCLIDisplay': this.options.properties.CCLIDisplay,
        '@CCLIPublisher': this.options.properties.CCLIPublisher,
        '@CCLISongNumber': this.options.properties.CCLISongNumber ?? '',
        '@CCLISongTitle': this.options.properties.CCLISongTitle,
        '@category': this.options.properties.category,
        '@notes': this.options.properties.notes,
        '@lastDateUsed': Utils.getIsoDateString(),

        //Size
        '@height': this.options.properties.height,
        '@width': this.options.properties.width,

        //Non-customizable stuff
        '@backgroundColor': '0 0 0 1', //transparent
        '@buildNumber': 6016, //build number for the last version of ProPresenter 6 released
        '@chordChartPath': '',
        '@docType': 0,
        '@drawingBackgroundColor': false,
        '@resourcesDirectory': '',
        '@selectedArrangementID': '',
        '@os': 1,
        '@usedCount': 0,
        '@versionNumber': 600,

        RVTransition: this.getTransitions(),

        RVTimeline: {
          //Create an empty timeline element
          '@rvXMLIvarName': 'timeline',
          '@timeOffset': 0,
          '@duration': 0,
          '@selectedMediaTrackIndex': 0,
          '@loop': false,
          array: [{ '@rvXMLIvarName': 'timeCues' }, { '@rvXMLIvarName': 'mediaTracks' }],
        },

        array: [
          {
            '@rvXMLIvarName': 'groups',
            RVSlideGrouping: this.buildSlideGroups(),
          },
          {
            //No default arrangement created, but add the empty XML node
            '@rvXMLIvarName': 'arrangements',
          },
        ],
      },
    };

    return this.xmlBuilder.build(documentObj).trim();
  }

  private getTransitions(): IXmlPro6Transition {
    if (this.options.transitions) {
      const transitionsCopy: IXmlPro6Transition = { ...this.defaultTransitionObj };
      transitionsCopy['@transitionDuration'] = this.options.transitions.duration;
      transitionsCopy['@transitionType'] = this.options.transitions.type;
      return transitionsCopy;
    }
    return this.defaultTransitionObj;
  }

  private buildSlideGroups(): IXmlPro6SlideGroup[] {
    const xmlSlideGroups: IXmlPro6SlideGroup[] = [];

    for (const group of this.options.slideGroups) {
      xmlSlideGroups.push({
        '@name': group.label,
        '@uuid': Utils.getUniqueID(),
        '@color': Utils.normalizeColorToRgbaString(group.groupColor ?? '0 0 0 0'),
        array: {
          '@rvXMLIvarName': 'slides',
          RVDisplaySlide: this.buildSlidesForGroup(group),
        },
      });
    }

    return xmlSlideGroups;
  }

  private buildSlidesForGroup(thisGroup: IPro6BuilderOptionsSlideGroup): IXmlPro6DisplaySlide[] {
    const xmlSlides: IXmlPro6DisplaySlide[] = [];

    for (const slide of thisGroup.slides) {
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
        '@highlightColor': highlightColor,
        '@drawingBackgroundColor': true,
        '@enabled': true,
        '@hotKey': '',
        '@label': label,
        '@notes': '',
        '@UUID': Utils.getUniqueID(),
        '@chordChartPath': '',

        array: [
          { '@rvXMLIvarName': 'cues' },
          {
            '@rvXMLIvarName': 'displayElements',
            RVTextElement: [this.buildTextElement(text)],
          },
        ],
      });
    }

    return xmlSlides;
  }

  private buildTextElement(text: string): IXmlPro6TextElement {
    const rtfText = Utils.formatRtf(
      text,
      this.options.slideTextFormatting.fontName,
      this.options.slideTextFormatting.textSize,
      Utils.normalizeColorToRgbObj(this.options.slideTextFormatting.textColor)
    );

    return {
      '@displayName': 'Default',
      '@UUID': Utils.getUniqueID(),
      '@typeID': 1,
      '@displayDelay': 0,
      '@locked': false,
      '@persistent': 0,
      '@fromTemplate': false,
      '@opacity': 1,
      '@source': '',
      '@bezelRadius': 0,
      '@rotation': 0,
      '@drawingFill': false,
      '@drawingShadow': false,
      '@drawingStroke': false,
      '@fillColor': '1 1 1 0', //transparent
      '@adjustsHeightToFit': false,
      '@verticalAlignment': 1,
      '@revealType': 0,

      RVRect3D: {
        '@rvXMLIvarName': 'position',
        '#text': '',
      },
      shadow: { '@rvXMLIvarName': 'shadow', '#text': '' },
      dictionary: {
        '@rvXMLIvarName': 'stroke',
        NSColor: { '@rvXMLDictionaryKey': 'RVShapeElementStrokeColorKey', '#text': '' },
        NSNumber: { '@rvXMLDictionaryKey': 'RVShapeElementStrokeWidthKey', '@hint': 'double', '#text': 0 },
      },
      NSString: [
        { '@rvXMLIvarName': 'PlainText', '#text': Base64.encode(text) },
        { '@rvXMLIvarName': 'RTFData', '#text': Base64.encode(rtfText) },
        { '@rvXMLIvarName': 'WinFlowData', '#text': '' },
        { '@rvXMLIvarName': 'WinFontData', '#text': '' },
      ],
    };
  }
}
