import { IProElementPosition, IRgbColor } from '../shared.model';

export interface IPro4Song {
  properties: IPro4Properties;
  slides: IPro4Slide[];
}

export interface IPro4Properties {
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

export interface IPro4Slide {
  label: string;
  id: string;
  backgroundColor: IRgbColor;
  highlightColor: IRgbColor;
  textElements: IPro4SlideTextElement[];
}

export interface IPro4SlideTextElement {
  color: IRgbColor;
  font: string;
  position: IProElementPosition;
  rawRtfContent: string;
  size: number;
  textContent: string;
}
