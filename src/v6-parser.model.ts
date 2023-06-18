import { IProElementPosition, IRgbColor } from './shared.model';

export interface IPro6Song {
  properties: IPro6Properties;
  slideGroups: IPro6SlideGroup[];
  arrangements: IPro6Arrangement[];
}

export interface IPro6Properties {
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
  docType: number;
  drawingBackgroundColor: boolean;
  height: number;
  lastDateUsed: Date;
  notes: string;
  os: number;
  resourcesDirectory: string;
  selectedArrangementID: string;
  usedCount: number;
  versionNumber: number;
  width: number;
}

export interface IPro6SlideGroup {
  groupLabel: string;
  groupId: string;
  groupColor: IRgbColor;
  slides: IPro6Slide[];
}

export interface IPro6Slide {
  backgroundColor: IRgbColor;
  chordChartPath: string;
  drawingBackgroundColor: boolean;
  enabled: boolean;
  highlightColor: IRgbColor | null;
  hotKey: string;
  id: string;
  label: string;
  notes: string;

  textElements: IPro6SlideTextElement[];
}

export interface IPro6SlideTextElement {
  adjustsHeightToFit: boolean;
  bezelRadius: number;
  displayDelay: number;
  displayName: string;
  drawingFill: boolean;
  drawingStroke: boolean;
  fillColor: IRgbColor;
  fromTemplate: boolean;
  id: string;
  locked: boolean;
  opacity: number;
  persistent: number;
  revealType: number;
  rotation: number;
  source: string;
  typeID: number;
  verticalAlignment: number;

  //These are `<NSString>` elements we decode
  plainText: string;
  rtfData: string;
  winFlowData: string;
  winFontData: string;

  //These are elements that must have child properties that must be processed
  position: IProElementPosition;
  shadow: IPro6ElementShadow;
}

export interface IPro6ElementShadow {
  angle: number;
  color: IRgbColor;
  enabled: boolean;
  length: number;
  radius: number;
}

//------------------------------------------------------
//Arrangements
export interface IPro6Arrangement {
  label: string;
  color: IRgbColor;
  groupOrder: IPro6ArrangementSlideGroup[];
}

export interface IPro6ArrangementSlideGroup {
  groupLabel: string;
  groupId: string;
}
