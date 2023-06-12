import { v4Parser } from './v4-parser';
import { IPro4Song } from './v4-parser.model';

export * from './v4-parser.model';
export const ProPresenter4Parser = (fileContent: string): IPro4Song => {
  const parser = new v4Parser();
  return parser.parse(fileContent);
};
