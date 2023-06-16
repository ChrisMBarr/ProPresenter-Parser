import { IProBuilderTextFormatting, IProBuilderTextFormattingDefinite, IProTransitionType, IRgbColor } from './shared.model';

export interface IPro5BuilderOptions {
  properties: IPro5BuilderOptionsProperties;
  slideGroups: IPro5BuilderOptionsSlideGroup[];
  slideTextFormatting?: IProBuilderTextFormatting;
  transitions?: {
    duration: number;
    type: IProTransitionType;
  };
}

export interface IPro5BuilderOptionsProperties {
  title: string;

  //Optional
  album?: string;
  artist?: string;
  author?: string;
  category?: string;
  ccliDisplay?: boolean;
  ccliNumber?: number;
  copyrightYear?: number;
  notes?: string;
  publisher?: string;
  height?: number;
  width?: number;
}

export interface IPro5BuilderOptionsSlideGroup {
  label: string;
  groupColor?: string | IRgbColor;
  slides: (string | IPro5BuilderOptionsSlide)[];
}

export interface IPro5BuilderOptionsSlide {
  text: string;
  label?: string;
  slideColor?: string | IRgbColor;
}

export interface IPro5BuilderOptionsDefinite extends IPro5BuilderOptions {
  properties: IPro5BuilderOptionsPropertiesDefinite;
  slideTextFormatting: IProBuilderTextFormattingDefinite;
}

export interface IPro5BuilderOptionsPropertiesDefinite extends IPro5BuilderOptionsProperties {
  album: string;
  artist: string;
  author: string;
  category: string;
  ccliDisplay: boolean;
  notes: string;
  publisher: string;
  height: number;
  width: number;
}
