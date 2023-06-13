export interface IPro5Song {
  properties: IPro5Properties;
  arrangements: IPro5Arrangement[];
}

export interface IPro5Properties {
  CCLIArtistCredits: string;
  CCLICopyrightInfo: string | number;
  CCLIDisplay: boolean;
  CCLILicenseNumber: string | number;
  CCLIPublisher: string;
  CCLISongTitle: string;
  album: string;
  artist: string;
  author: string;
  backgroundColor: string;
  category: string;
  creatorCode: number;
  chordChartPath: string;
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

export interface IPro5Arrangement {
  name: string;
  color: string;
  slideGroups: IPro5ArrangementSlideGroup[];
}

export interface IPro5ArrangementSlideGroup {
  groupName: string;
  groupId: string;
}
