export interface IXmlPro5DocRoot {
  RVPresentationDocument: IXmlPro5Doc;
}

export interface IXmlPro5Doc {
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
  '@chordChartPath': string;
  '@docType'?: number;
  '@drawingBackgroundColor'?: number;
  '@height': number;
  '@lastDateUsed': string;
  '@notes': string;
  '@resourcesDirectory': string;
  '@usedCount': number;
  '@versionNumber': number;
  '@width': number;

  arrangements: {
    RVSongArrangement: IXmlPro5Arrangement[];
  };
  groups: {
    RVSlideGrouping: IXmlPro5SlideGroup[];
  };
  // slides: {
  //   RVDisplaySlide: IXmlPro4DisplaySlide[];
  // };

  //timeline and bibleReferences are not implemented yet
  timeline: IXmlV5Timeline;
  bibleReference: IXmlPro5BibleReferences;
}

//------------------------------------------------------
//Timeline
export interface IXmlV5Timeline {
  '@timeOffSet': number;
  '@selectedMediaTrackIndex': number;
  '@unitOfMeasure': number;
  '@duration': number;
  '@loop': number;
  //timeCues & mediaTracks Not implemented here yet
  timeCues: [];
  mediaTracks: [];
}

//------------------------------------------------------
//Bible References
export interface IXmlPro5BibleReferences {
  '@transitionType': number;
  '@transitionDuration': number;
  '@motionEnabled': number;
  '@motionDuration': number;
  '@motionSpeed': number;
}

//------------------------------------------------------
//Arrangements
export interface IXmlPro5Arrangement {
  '@name': string;
  '@uuid': string;
  '@color': string;
  '@serialization-array-index': number;
  groupIDs: {
    NSMutableString: IXmlPro5ArrangementGroupId[];
  };
}

export interface IXmlPro5ArrangementGroupId {
  '@serialization-native-value': string;
  '@serialization-array-index': number;
}

//------------------------------------------------------
//Slide Groups and Slides

export interface IXmlPro5SlideGroup {
  '@name': string;
  '@uuid': string;
  '@color': string;
  slides: {
    RVDisplaySlide: IXmlPro5Slide[];
  };
}

export interface IXmlPro5Slide {
  '@backgroundColor': string;
  '@enabled': number;
  '@highlightColor': string;
  '@hotKey': string;
  '@label': string;
  '@notes': string;
  '@slideType': number;
  '@sort_index': number;
  '@UUID': string;
  '@drawingBackgroundColor': number;
  '@chordChartPath': string;
  '@serialization-array-index': number;

  cues: {
    RVMediaCue?: IXmlPro5SlideCue[];
  };
  displayElements: {
    RVTextElement?: IXmlPro5SlideTextElement[];
  };
  '_-RVProTransitionObject-_transitionObject': IXmlPro5SlideTransition;
}

export interface IXmlPro5SlideCue {
  '_-RVProTransitionObject-_transitionObject': string | IXmlPro5SlideTransition;
  '@displayName': string;
  '@delayTime': number;
  '@timeStamp': number;
  '@enabled': number;
  '@UUID': string;
  '@parentUUID': string;
  '@elementClassName': string;
  '@behavior': number;
  '@alignment': number;
  '@serialization-array-index': number;
  element: IXmlPro5SlideCueElement;
}

export interface IXmlPro5SlideCueElement {
  '_-RVRect3D-_position': IXmlPro5SlideElementPosition;
  '_-D-_serializedShadow': IXmlPro5SlideElementShadow;
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
  '@flippedHorizontally': number;
  '@flippedVertically': number;
  '@scaleFactor': number;
  '@serializedImageOffset': string;
  '@serializedFilters': string;
  '@scaleBehavior': number;
  '@brightness': number;
  '@contrast': number;
  '@saturation': number;
  '@hue': number;
  '@manufactureURL': string;
  '@manufactureName': string;
  '@format': string;
  '@enableColorFilter': number;
  '@colorFilter': string;
  '@enableBlur': number;
  '@blurRadius': number;
  '@enableEdgeBlur': number;
  '@edgeBlurRadius': number;
  '@edgeBlurArea': number;
  '@enableSepia': number;
  '@enableColorInvert': number;
  '@enableGrayInvert': number;
  '@enableHeatSignature': number;
  '@audioVolume': number;
  '@inPoint': number;
  '@outPoint': number;
  '@playRate': number;
  '@playbackBehavior': number;
  '@timeScale': number;
  '@endPoint': number;
}

export interface IXmlPro5SlideTransition {
  '@transitionType': number;
  '@transitionDuration': number;
  '@motionEnabled': number;
  '@motionDuration': number;
  '@motionSpeed': number;
}

export interface IXmlPro5SlideTextElement {
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
  '@revealType': number;
  '@serialization-array-index': number;
  stroke: IXmlPro5SlideElementStroke;
  '_-D-_serializedShadow': IXmlPro5SlideElementShadow;
  '_-RVRect3D-_position': IXmlPro5SlideElementPosition;
}

export interface IXmlPro5SlideElementPosition {
  '@x': number;
  '@y': number;
  '@z': number;
  '@width': number;
  '@height': number;
}

export interface IXmlPro5SlideElementStroke {
  NSColor: {
    '@serialization-native-value': string;
    '@serialization-dictionary-key': 'RVShapeElementStrokeColorKey';
  };
  NSNumber: {
    '@serialization-native-value': number;
    '@serialization-dictionary-key': 'RVShapeElementStrokeWidthKey';
  };
}

export interface IXmlPro5SlideElementShadow {
  NSMutableString: {
    '@serialization-native-value': string;
    '@serialization-dictionary-key': 'shadowOffset';
  };
  NSNumber: {
    '@serialization-native-value': number;
    '@serialization-dictionary-key': 'shadowBlurRadius';
  };
  NSColor: {
    '@serialization-native-value': string;
    '@serialization-dictionary-key': 'shadowColor';
  };
}
