import { v4Parser } from './v4-parser';
import { IProPresenter4Doc } from './v4-parser.model';

export * from './v4-parser.model';
export const ProPresenter4Parser = (fileContent: string): IProPresenter4Doc => {
  const parser = new v4Parser();
  return parser.parse(fileContent);
};
