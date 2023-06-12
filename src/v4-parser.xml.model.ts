//A representation of a ProPresenter document as a JSON object parsed by fast-xml-parser
export interface IXmlPro4DocRoot {
  RVPresentationDocument: IXmlPro4Doc;
}

export interface IXmlPro4Doc {
  '@CCLIArtistCredits': string;
  '@CCLICopyrightInfo': number;
  '@CCLIDisplay': number;
  '@CCLILicenseNumber': string | number;
  '@CCLIPublisher': string;
  '@CCLISongTitle': string;
  '@album': string;
  '@artist': string;
  '@author': string;
  '@backgroundColor': string;
  '@category': string;
  '@creatorCode': number;
  '@docType'?: number;
  '@drawingBackgroundColor'?: number;
  '@height': number;
  '@lastDateUsed': string;
  '@notes': string;
  '@resourcesDirectory': string;
  '@timeline': IXmlV4Timeline;
  '@usedCount': number;
  '@versionNumber': number;
  '@width': number;
  bibleReference: IXmlPro4BibleReferences;
  slides: {
    RVDisplaySlide: IXmlPro4DisplaySlide[];
  };
}

//------------------------------------------------------
//Timeline
export interface IXmlV4Timeline {
  '@duration': 0;
  '@loop': 0;
  '@selectedMediaTrackIndex': 0;
  '@timeOffSet': 0;
  '@unitOfMeasure': 60;
  mediaTracks: {};
  timeCues: {};
}

//------------------------------------------------------
//Bible References
export interface IXmlPro4BibleReferences {}

//------------------------------------------------------
//Slides
export interface IXmlPro4DisplaySlide {
  '@backgroundColor': string;
  '@drawingBackgroundColor': number;
  '@enabled': number;
  '@highlightColor': string;
  '@hotKey': string;
  '@label': string;
  '@notes': string;
  '@slideType': number;
  '@sort_index': number;
  '@UUID': string;
  '@serialization-array-index': number;
  cues: {};
  displayElements: {
    RVTextElement: IXmlPro4SlideTextElement[];
  };
}

export interface IXmlPro4SlideTextElement {
  '@displayDelay': number;
  '@displayName': string;
  '@locked': number;
  '@persistent': number;
  '@typeID': number;
  '@fromTemplate': number;
  '@bezelRadius': number;
  '@drawingFill': number;
  '@drawingShadow': number;
  '@drawingStroke': number;
  '@fillColor': string;
  '@rotation': number;
  '@source': string;
  '@adjustsHeightToFit': number;
  '@verticalAlignment': number;
  '@RTFData': string;
  '@serialization-array-index': number;
  stroke: {};
  '_-D-_serializedShadow': IXmlPro4TextElementShadow;
  '_-RVRect3D-_position': IXmlPro4TextElementPosition;
}

export interface IXmlPro4TextElementPosition {
  '@x': number;
  '@y': number;
  '@z': number;
  '@width': number;
  '@height': number;
}

export interface IXmlPro4TextElementStroke {
  NSCFNumber: {
    '@serialization-dictionary-key': 'RVShapeElementStrokeWidthKey';
    '@serialization-native-value': number;
  };
  NSCachedRGBColor: {
    '@serialization-dictionary-key': 'RVShapeElementStrokeColorKey';
    '@serialization-native-value': string;
  };
}

export interface IXmlPro4TextElementShadow {
  NSCFNumber: {
    '@serialization-dictionary-key': 'shadowBlurRadius';
    '@serialization-native-value': number;
  };
  NSCFString: {
    '@serialization-dictionary-key': 'shadowOffset';
    '@serialization-native-value': string;
  };
  NSCalibratedRGBColor: {
    '@serialization-dictionary-key': 'shadowColor';
    '@serialization-native-value': string;
  };
}
