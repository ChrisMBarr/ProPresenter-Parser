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
  '@docType'?: number;
  '@drawingBackgroundColor'?: number;
  '@height': number;
  '@lastDateUsed': string;
  '@notes': string;
  '@resourcesDirectory': string;
  // '@timeline': IXmlV4Timeline;
  '@usedCount': number;
  '@versionNumber': number;
  '@width': number;
  // bibleReference: IXmlPro4BibleReferences;
  // slides: {
  //   RVDisplaySlide: IXmlPro4DisplaySlide[];
  // };
}
