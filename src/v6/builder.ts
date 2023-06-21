import { XMLBuilder } from 'fast-xml-parser';
import { Base64 } from 'js-base64';
import { IProTransitionType } from '../shared.model';
import * as Utils from '../utils';
import {
  IPro6BuilderOptions,
  IPro6BuilderOptionsDefinite,
  IPro6BuilderOptionsSlideGroup,
  IPro6BuilderTextFormattingDefinite,
} from './builder.model';
import { IXmlPro6DisplaySlide, IXmlPro6DocRoot, IXmlPro6SlideGroup, IXmlPro6TextElement, IXmlPro6Transition } from './xml.model';

export class v6Builder {
  private readonly xmlBuilder: XMLBuilder;
  private readonly options: IPro6BuilderOptionsDefinite;

  //Apparently this does not need to change at all if the text color or font changes, so we just treat it like a magic string!
  private readonly winFontData = `<?xml version="1.0" encoding="utf-16"?><RVFont xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.datacontract.org/2004/07/ProPresenter.Common"><Kerning>0</Kerning><LineSpacing>0</LineSpacing><OutlineColor xmlns:d2p1="http://schemas.datacontract.org/2004/07/System.Windows.Media"><d2p1:A>255</d2p1:A><d2p1:B>0</d2p1:B><d2p1:G>0</d2p1:G><d2p1:R>0</d2p1:R><d2p1:ScA>1</d2p1:ScA><d2p1:ScB>0</d2p1:ScB><d2p1:ScG>0</d2p1:ScG><d2p1:ScR>0</d2p1:ScR></OutlineColor><OutlineWidth>0</OutlineWidth><Variants>Normal</Variants></RVFont>`;

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
      suppressBooleanAttributes: false,
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

    const defaultSlideTextFormatting: IPro6BuilderTextFormattingDefinite = {
      textColor: { r: 255, g: 255, b: 255 },
      textPadding: 20,
      fontName: 'Arial',
      textSize: 60,
      textShadow: {
        angle: 135,
        color: { r: 0, g: 0, b: 0 },
        enabled: false,
        length: 7,
        radius: 10,
      },
    };
    this.options.slideTextFormatting = {
      ...defaultSlideTextFormatting,
      ...this.options.slideTextFormatting,
    };
  }

  build(): string {
    const documentObj: IXmlPro6DocRoot = {
      '?xml': {
        '@version': '1.0',
        '@encoding': 'utf-8',
      },
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
            RVSongArrangement: [],
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
        '@drawingBackgroundColor': false,
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
      '@typeID': 0,
      '@displayDelay': 0,
      '@locked': false,
      '@persistent': 0,
      '@fromTemplate': false,
      '@opacity': 1,
      '@source': '',
      '@bezelRadius': 0,
      '@rotation': 0,
      '@drawingFill': false,
      '@drawingShadow': this.options.slideTextFormatting.textShadow.enabled,
      '@drawingStroke': false,
      '@fillColor': '1 1 1 0', //transparent
      '@adjustsHeightToFit': false, //fixed-height text element
      '@verticalAlignment': 0, //center aligned
      '@revealType': 0, //no reveal type

      RVRect3D: {
        '@rvXMLIvarName': 'position',
        '#text': this.getTextElementPosition(),
      },
      shadow: { '@rvXMLIvarName': 'shadow', '#text': this.getElementShadow() },
      dictionary: {
        '@rvXMLIvarName': 'stroke',
        NSColor: {
          '@rvXMLDictionaryKey': 'RVShapeElementStrokeColorKey',
          '#text': '0 0 0 1',
        },
        NSNumber: {
          '@rvXMLDictionaryKey': 'RVShapeElementStrokeWidthKey',
          '@hint': 'double',
          '#text': 0,
        },
      },
      NSString: [
        { '@rvXMLIvarName': 'PlainText', '#text': Base64.encode(text) },
        { '@rvXMLIvarName': 'RTFData', '#text': Base64.encode(rtfText) },
        { '@rvXMLIvarName': 'WinFlowData', '#text': Base64.encode(this.getWinFlowDocument(text)) },
        { '@rvXMLIvarName': 'WinFontData', '#text': Base64.encode(this.winFontData) },
      ],
    };
  }

  private getTextElementPosition(): string {
    const posX = this.options.slideTextFormatting.textPadding;
    const posY = this.options.slideTextFormatting.textPadding;
    const width = this.options.properties.width - this.options.slideTextFormatting.textPadding * 2;
    const height = this.options.properties.height - this.options.slideTextFormatting.textPadding * 2;
    return `{${posX} ${posY} 0 ${width} ${height}}`;
  }

  private getElementShadow(): string {
    const radius = this.options.slideTextFormatting.textShadow.radius;
    const color = Utils.normalizeColorToRgbaString(this.options.slideTextFormatting.textShadow.color);

    const angle = this.options.slideTextFormatting.textShadow.angle;
    const length = this.options.slideTextFormatting.textShadow.length;
    const posX = Math.sin(angle * (Math.PI / 180)) * length;
    const posY = Math.cos(angle * (Math.PI / 180)) * length;

    return `${radius}|${color}|{${posX}, ${posY}}`;
  }

  private getWinFlowDocument(text: string): string {
    const fontName = this.options.slideTextFormatting.fontName;
    const size = this.options.slideTextFormatting.textSize;
    const hexColor = Utils.normalizeColorToHex(this.options.slideTextFormatting.textColor);

    const paragraphs = text
      //Break up new lines
      .split(/[\n\r]/g)
      //Remove empty lines
      .filter((line) => line !== '')
      .map(
        (line) =>
          //Add a new `<Paragraph>` for each line of text. Note that colors have a hard coded alpha value added!
          `<Paragraph Margin="0,0,0,0" TextAlignment="Center" FontFamily="${fontName}" FontSize="${size}"><Run FontFamily="${fontName}" FontSize="${size}" Foreground="#${hexColor}FF" Block.TextAlignment="Center">${line}</Run></Paragraph>`
      )
      //Put it all back together as a string
      .join('');

    //Return the completed flow document that contains all the paragraphs
    return `<FlowDocument TextAlignment="Center" PagePadding="5,0,5,0" AllowDrop="True" xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation">${paragraphs}</FlowDocument>`;
  }
}
