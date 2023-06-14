import {
  IProBuilderTextFormatting,
  IProBuilderTextFormattingDefinite,
  IRgbColor,
} from './shared.model';

export interface IPro5BuilderOptions {
  properties: IPro5BuilderOptionsProperties;
  slideGroups: IPro5BuilderOptionsSlideGroup[];
  slideTextFormatting?: IProBuilderTextFormatting;
}

export interface IPro5BuilderOptionsProperties {
  title: string;

  //Optional
  album?: string;
  artist?: string;
  artistCredits?: string;
  author?: string;
  category?: string;
  ccliDisplay?: boolean;
  ccliNumber?: number;
  copyrightYear?: number;
  publisher?: string;
  height?: number;
  width?: number;
}

export interface IPro5BuilderOptionsSlideGroup {
  label: string;
  groupColor?: string;
  slides: IPro5BuilderOptionsSlide[];
}

export interface IPro5BuilderOptionsSlide {
  label: string;
  text: string;
  slideColor?: string | IRgbColor;
}

export interface IPro5BuilderOptionsDefinite extends IPro5BuilderOptions {
  properties: IPro5BuilderOptionsPropertiesDefinite;
  slideTextFormatting: IProBuilderTextFormattingDefinite;
}

export interface IPro5BuilderOptionsPropertiesDefinite extends IPro5BuilderOptionsProperties {
  album: string;
  artist: string;
  artistCredits: string;
  author: string;
  category: string;
  ccliDisplay: boolean;
  publisher: string;
  height: number;
  width: number;
}
