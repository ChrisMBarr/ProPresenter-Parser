import { IProBuilderTextFormatting, IProBuilderTextFormattingDefinite, IProTransitionType, IRgbColor } from '../shared.model';

export interface IPro6BuilderOptions {
  properties: IPro6BuilderOptionsProperties;
  slideGroups: IPro6BuilderOptionsSlideGroup[];
  slideTextFormatting?: IProBuilderTextFormatting;
  transitions?: {
    duration: number;
    type: IProTransitionType;
  };
}

export interface IPro6BuilderOptionsProperties {
  CCLISongTitle: string;

  //Optional
  CCLIArtistCredits?: string;
  CCLIAuthor?: string;
  CCLICopyrightYear?: number;
  CCLIDisplay?: boolean;
  CCLIPublisher?: string;
  CCLISongNumber?: number;
  category?: string;
  height?: number;
  notes?: string;
  width?: number;
}

export interface IPro6BuilderOptionsSlideGroup {
  label: string;
  groupColor?: string | IRgbColor;
  slides: (string | IPro6BuilderOptionsSlide)[];
}

//TODO: Possibly combine/make general between versions
export interface IPro6BuilderOptionsSlide {
  text: string;
  label?: string;
  slideColor?: string | IRgbColor;
}

export interface IPro6BuilderOptionsDefinite extends IPro6BuilderOptions {
  properties: IPro6BuilderOptionsPropertiesDefinite;
  slideTextFormatting: IProBuilderTextFormattingDefinite;
}

export interface IPro6BuilderOptionsPropertiesDefinite extends IPro6BuilderOptionsProperties {
  CCLIArtistCredits: string;
  CCLIAuthor: string;
  CCLIDisplay: boolean;
  CCLIPublisher: string;
  category: string;
  height: number;
  notes: string;
  width: number;
}
