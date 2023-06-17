import { IProElementPosition, IRgbColor } from './shared.model';

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
  backgroundColor: IRgbColor;
  category: string;
  creatorCode: number;
  chordChartPath: string;
  docType: number | null;
  drawingBackgroundColor: boolean;
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
  color: IRgbColor;
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
  groupColor: IRgbColor | null;
  slides: IPro5Slide[];
}

export interface IPro5Slide {
  backgroundColor: IRgbColor;
  chordChartPath: string;
  enabled: boolean;
  highlightColor: IRgbColor | null;
  id: string;
  label: string;
  notes: string;
  mediaCues: IPro5SlideMediaCue[];
  textElements: IPro5SlideTextElement[];
}

export interface IPro5SlideMediaCue {
  displayName: string;
  source: string;
  //lots more could be added here, but not needed now
}

export interface IPro5SlideTextElement {
  color: IRgbColor;
  font: string;
  position: IProElementPosition;
  rawRtfContent: string;
  size: number;
  textContent: string;
  //more could be added regarding text formatting, but not needed now
}
