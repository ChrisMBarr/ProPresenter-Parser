import { IProBuilderTextFormatting, IProTransitionType } from './shared.model';

export interface IPro6BuilderOptions {
  properties: {};
  slideGroups: [];
  slideTextFormatting?: IProBuilderTextFormatting;
  transitions?: {
    duration: number;
    type: IProTransitionType;
  };
}

export interface IPro6BuilderOptionsDefinite extends IPro6BuilderOptions {}
