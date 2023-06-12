export interface IPro4Song {
  properties: IPro4Properties;
}

export interface IPro4Properties {
  CCLIArtistCredits: string;
  CCLICopyrightInfo: string | number;
  CCLIDisplay: number;
  CCLILicenseNumber: string | number;
  CCLIPublisher: string;
  CCLISongTitle: string;
  album: string;
  artist: string;
  author: string;
  backgroundColor: string;
  category: string;
  creatorCode: number;
  docType?: number;
  drawingBackgroundColor?: number;
  height: number;
  lastDateUsed: Date;
  notes: string;
  resourcesDirectory: string;
  usedCount: number;
  versionNumber: number;
  width: number;
}

