import { IProElementOutline, IProElementPosition, IProElementShadow, IRgbColor } from '../shared.model';

export interface IPro7Song {
  properties: IPro7Properties;
  slideGroups: IPro7SlideGroup[];
  arrangements: IPro7Arrangement[];
}

export interface IPro7Properties {
  CCLIArtistCredits: string;
  CCLIAuthor: string;
  CCLICopyrightYear: string | number;
  CCLIDisplay: boolean;
  CCLIPublisher: string;
  CCLISongNumber: string | number;
  CCLISongTitle: string;
  backgroundColor: IRgbColor;
  buildNumber: number;
  category: string;
  chordChartPath: string;
  drawingBackgroundColor: boolean;
  lastDateUsed: Date | undefined;
  notes: string;
  os: number;
  selectedArrangementID: string;
}

export interface IPro7SlideGroup {
  groupLabel: string;
  groupId: string;
  groupColor: IRgbColor;
  slides: IPro7Slide[];
}

export interface IPro7Slide {
  backgroundColor: IRgbColor;
  chordChartPath: string;
  drawingBackgroundColor: boolean;
  enabled: boolean;
  hotKey: string;
  id: string;
  label: string;
  notes: string;

  textElements: IPro7SlideTextElement[];
}

export interface IPro7SlideTextElement {
  adjustsHeightToFit: boolean;
  displayDelay: number;
  displayName: string;
  drawingFill: boolean;
  fillColor: IRgbColor;
  fromTemplate: boolean;
  id: string;
  locked: boolean;
  opacity: number;
  revealType: number;
  rotation: number;
  verticalAlignment: number;

  fontName: string;
  textColor: IRgbColor;
  textSize: number;

  //RTF/Text data
  plainText: string;
  rtfData: string;

  outline: IProElementOutline;
  position: IProElementPosition;
  textShadow: IProElementShadow;
}

//------------------------------------------------------
//Arrangements
export interface IPro7Arrangement {
  label: string;
  groupOrder: IPro7ArrangementSlideGroup[];
}

export interface IPro7ArrangementSlideGroup {
  groupLabel: string;
  groupId: string;
}
