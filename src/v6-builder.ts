import { XMLBuilder } from 'fast-xml-parser';
import { IProBuilderTextFormattingDefinite } from './shared.model';
import { IPro6BuilderOptions, IPro6BuilderOptionsDefinite } from './v6-builder.model';

export class v6Builder {
  private readonly xmlBuilder: XMLBuilder;
  private readonly options: IPro6BuilderOptionsDefinite;

  constructor(options: IPro6BuilderOptions) {
    this.xmlBuilder = new XMLBuilder({
      attributeNamePrefix: '@',
      format: true,
      ignoreAttributes: false,
      processEntities: false,
    });

    //Set the options, and force the type
    this.options = options as IPro6BuilderOptionsDefinite;

    //Now use all the default options, but overwrite those with any passed in by the user
    const defaultProperties = {
      album: '',
      artist: '',
      author: '',
      category: 'Song',
      ccliDisplay: false,
      notes: '',
      publisher: '',
      height: 720,
      width: 1280,
    };
    this.options.properties = { ...defaultProperties, ...this.options.properties };

    const defaultSlideTextFormatting: IProBuilderTextFormattingDefinite = {
      textColor: { r: 255, g: 255, b: 255 },
      textPadding: 20,
    };
    this.options.slideTextFormatting = {
      ...defaultSlideTextFormatting,
      ...this.options.slideTextFormatting,
    };
  }

  build(): string {
    const documentObj /*: IXmlPro6DocRoot*/ = {
      RVPresentationDocument: {},
    };

    return this.xmlBuilder.build(documentObj).trim();
  }
}
