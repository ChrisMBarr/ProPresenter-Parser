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
