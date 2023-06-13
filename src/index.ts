import { v4Parser } from './v4-parser';
import { IPro4Song } from './v4-parser.model';
import { v5Builder } from './v5-builder';
import { IPro5BuilderOptions } from './v5-builder.model';
import { v5Parser } from './v5-parser';
import { IPro5Song } from './v5-parser.model';

export * from './v4-parser.model';
export const ProPresenter4Parser = (fileContent: string): IPro4Song => {
  const parser = new v4Parser();
  return parser.parse(fileContent);
};

export * from './v5-parser.model';
export const ProPresenter5Parser = (fileContent: string): IPro5Song => {
  const parser = new v5Parser();
  return parser.parse(fileContent);
};

export * from './v5-builder.model';
export const ProPresenter5Builder = (options: IPro5BuilderOptions): string => {
  const builder = new v5Builder();
  return builder.build(options);
};
