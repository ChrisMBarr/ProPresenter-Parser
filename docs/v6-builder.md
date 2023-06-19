# ProPresenter 6 Builder

# Usage
Import `ProPresenter6Builder` into your project and pass options to it. A string of generated XML will be returned which you can then save as a file.


## For TypeScript projects
```typescript
import { ProPresenter6Builder, IPro6BuilderOptionsProperties } from 'propresenter-parser';

const options: IPro6BuilderOptionsProperties = { ... } //see below for options

const songXml: string = ProPresenter6Builder(options);
console.log(songXml);
```



## For JavaScript projects
```javascript
const { ProPresenter6Builder } = require('propresenter-parser');

const options = { ... } //see below for options

const songXml = ProPresenter6Builder(options);
console.log(songXml);
```



# Options
The options passed to the `ProPresenter6Builder` object are grouped into categories. See below for more details on each one.

| Name                                                     | Required | Description                                                                     |
|:---------------------------------------------------------|:---------|:--------------------------------------------------------------------------------|
| [`properties`](#the-properties-object)                   | **Yes**  | Data about the song. Title, artist, CCLI info, etc.                             |
| [`slideGroups`](#the-slidegroups-array)                  | **Yes**  | The actual song lyrics grouped into verses, choruses, etc.                      |
| [`slideTextFormatting`](#the-slidetextformatting-object) | No       | Optional text formatting options for the song lyrics. Omit to use the defaults. |
| [`transitions`](#the-transitions-object)                 | No       | Optional slide transition options. Omit to use the defaults.                    |
