import { IProElementPosition, IRtfColor } from './shared.model';

export interface IPro5Song {
  properties: IPro5Properties;
  arrangements: IPro5Arrangement[];
  slideGroups: IPro5SlideGroup[];
}

//------------------------------------------------------
//Properties
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

//------------------------------------------------------
//Arrangements
export interface IPro5Arrangement {
  label: string;
  color: string;
  groupOrder: IPro5ArrangementSlideGroup[];
}

export interface IPro5ArrangementSlideGroup {
  groupLabel: string;
  groupId: string;
}

//------------------------------------------------------
//Slide Groups and Slides
export interface IPro5SlideGroup {
  groupLabel: string;
  groupId: string;
  groupColor: string;
  slides: IPro5Slide[];
}

export interface IPro5Slide {
  backgroundColor: string;
  chordChartPath: string;
  enabled: boolean;
  highlightColor: string;
  id: string;
  label: string;
  notes: string;
  // cues:{}; //purposely omitted for now
  textElements: IPro5SlideTextElement[];
}

export interface IPro5SlideTextElement {
  position: IProElementPosition;
  rawRtfContent: string;
  textContent: string;
  font: string;
  size: number;
  color: IRtfColor;
  //more could be added regarding text formatting, but that may be out of scope for now
}
