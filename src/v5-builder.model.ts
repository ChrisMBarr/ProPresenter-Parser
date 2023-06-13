export interface IPro5BuilderOptions {
  properties: IPro5BuilderOptionsProperties;
  slideGroups: IPro5BuilderOptionsSlideGroup[];
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
  height?: number;
  publisher?: string;
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

  //Optional
  fontColor?: string;
  fontName?: string;
  fontSize?: number;
  paddingX?: number;
  paddingY?: number;
  slideColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
}
