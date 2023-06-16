import { IRgbColor } from './shared.model';

export interface IPro6Song {
  properties: IPro6Properties;
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
