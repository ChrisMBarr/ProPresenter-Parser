export interface IXmlPro6DocRoot {
  RVPresentationDocument: IXmlPro6Doc;
}

export interface IXmlPro6Doc {
  '@CCLIArtistCredits': string;
  '@CCLIAuthor': string;
  '@CCLICopyrightYear': string | number;
  '@CCLIDisplay': boolean;
  '@CCLIPublisher': string;
  '@CCLISongNumber': string | number;
  '@CCLISongTitle': string;
  '@backgroundColor': string;
  '@buildNumber': number;
  '@category': string;
  '@chordChartPath': string;
  '@docType': number;
  '@drawingBackgroundColor': boolean;
  '@height': number;
  '@lastDateUsed': Date;
  '@notes': string;
  '@os': number;
  '@resourcesDirectory': string;
  '@selectedArrangementID': string;
  '@usedCount': number;
  '@versionNumber': number;
  '@width': number;

  RVTimeline: IXmlPro6Timeline;
  array: IXmlPro6DocArrayElement[]; //multiple "<array>" elements could be various kinds of data
}

export interface IXmlPro6Timeline {
  '@rvXMLIvarName': 'timeline';
  '@timeOffset': number;
  '@duration': number;
  '@selectedMediaTrackIndex': number;
  '@loop': boolean;
  array: IXmlPro6TimelineArray[];
}

export interface IXmlPro6TimelineArray {
  '@rvXMLIvarName': 'timeCues' | 'mediaTracks';
}

export interface IXmlPro6DocArrayElement {
  RVSlideGrouping?: IXmlPro6SlideGrouping[];
  '@rvXMLIvarName': 'groups' | 'arrangements';
}

export interface IXmlPro6SlideGrouping {
  array: IXmlPro6SlideGroupingArray;
  '@name': string;
  '@color': string;
  '@uuid': string;
}

export interface IXmlPro6SlideGroupingArray {
  '@rvXMLIvarName': 'slides';
  RVDisplaySlide: IXmlPro6DisplaySlide[];
}

export interface IXmlPro6DisplaySlide {
  array: IXmlPro6DisplaySlideArray[];
  '@backgroundColor': string;
  '@highlightColor': string;
  '@drawingBackgroundColor': boolean;
  '@enabled': boolean;
  '@hotKey': string;
  '@label': string;
  '@notes': string;
  '@UUID': string;
  '@chordChartPath': string;
}

export interface IXmlPro6DisplaySlideArray {
  '@rvXMLIvarName': 'cues' | 'displayElements';
  RVTextElement?: IXmlPro6TextElement[];
}

export interface IXmlPro6TextElement {
  RVRect3D: IXmlPro6TextRect3D;
  shadow: IXmlPro6TextShadow;
  dictionary: IXmlPro6TextStroke;
  NSString: IXmlPro6TextString[];
  '@displayName': string;
  '@UUID': string;
  '@typeID': number;
  '@displayDelay': number;
  '@locked': boolean;
  '@persistent': number;
  '@fromTemplate': boolean;
  '@opacity': number;
  '@source': string;
  '@bezelRadius': number;
  '@rotation': number;
  '@drawingFill': boolean;
  '@drawingShadow': boolean;
  '@drawingStroke': boolean;
  '@fillColor': string;
  '@adjustsHeightToFit': boolean;
  '@verticalAlignment': number;
  '@revealType': number;
}

export interface IXmlPro6TextRect3D {
  '@rvXMLIvarName': 'position';
  '#text': string;
}

export interface IXmlPro6TextShadow {
  '@rvXMLIvarName': 'shadow';
  '#text': string;
}

export interface IXmlPro6TextString {
  '@rvXMLIvarName': 'PlainText' | 'RTFData' | 'WinFlowData' | 'WinFontData';
  '#text': string;
}

export interface IXmlPro6TextStroke {
  '@rvXMLIvarName': 'stroke';
  NSColor: {
    '#text': string;
    '@rvXMLDictionaryKey': 'RVShapeElementStrokeColorKey';
  };
  NSNumber: {
    '#text': number;
    '@rvXMLDictionaryKey': 'RVShapeElementStrokeWidthKey';
    '@hint': 'double';
  };
}
