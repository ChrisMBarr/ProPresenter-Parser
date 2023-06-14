# ProPresenter 4 Parser


## Usage: For TypeScript projects
```typescript
import { readFile } from 'fs';
import { ProPresenter4Parser, IPro4Song } from 'propresenter-parser';

readFile('example.pro4', (contents): void => {
  const song: IPro4Song = ProPresenter4Parser(contents.toString());
  console.log(song);
});
```

## Usage: For JavaScript projects
```javascript
const { readFile } = require('fs');
const { ProPresenter4Parser } = require('propresenter-parser');

readFile('example.pro4', (contents) => {
  const song = ProPresenter4Parser(contents.toString());
  console.log(song);
});
```

## Returned Object
A large object will be returned that contains a properties object and an array of slides

```javascript
{
  properties: { ... },
  slides: [ ... ]
}
```

### The `properties` object
Here is an example of the properties that are returned
```javascript
{
  CCLIArtistCredits: '',
  CCLICopyrightInfo: 2003,
  CCLIDisplay: false,
  CCLILicenseNumber: '1234',
  CCLIPublisher: 'Waiting Room Music',
  CCLISongTitle: 'Be Near',
  album: '',
  artist: 'Shane Bernard',
  author: 'Shane Bernard',
  backgroundColor: '0 0 0 1',
  category: 'Song',
  creatorCode: 1349676880,
  docType: 0,
  drawingBackgroundColor: 0,
  height: 768,
  lastDateUsed: Date('2010-11-07T00:37:36'),
  notes: '',
  resourcesDirectory: '',
  usedCount: 0,
  versionNumber: 400,
  width: 1024,
}
```

### The `slides` array
Each item in this array will be an object that looks like this
```javascript
{
  backgroundColor: '0 0 0 0',
  highlightColor: '0 1 0 1',
  label: 'Chorus 1',
  id: '9734D050-A3BD-4BD2-A8FE-0C15CC0DF0D3',
  textElements: [
    {
      color: { r: 255, g: 255, b: 255 },
      font: 'Helvetica',
      size: 48,
      position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
      rawRtfContent: `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf350
{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural

\\f0\\fs96 \\cf1 Be near O God\\
Be near O God of us\\
Your nearness is to us our good\\
Be near O God\\
Be near O God of us\\
Your nearness is to us our good\\
Our good}`,
      textContent: `Be near O God
Be near O God of us
Your nearness is to us our good
Be near O God
Be near O God of us
Your nearness is to us our good
Our good`,
    },
  ],
}
```
#### Note:
* The `backgroundColor` is the color of the background of the slide. Normally this will be transparent and represented as `0 0 0 0`
* The `highlightColor` is the color you can set a slide within ProPresenter.
* Color strings (used by `highlightColor` and `backgroundColor`) in `R G B A` format, meaning `1 0 0 1` is a red color, and  `0 1 0 1` is a green color for example.
* Most slides will just have a single item in the `textElements` array, but if there are multiples they should be returned here
* Slide text is stored in RTF format. That raw RTF data is returned, but a parsed version is also returned so that the text and basic font styles are in separate properties
