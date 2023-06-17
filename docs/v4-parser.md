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
A large object will be returned that contains a `properties` object and a `slides` array

| Property Name                           | Description                                                |
|:----------------------------------------|:-----------------------------------------------------------|
| [`properties`](#the-properties-object)  | Data about the song. Title, artist, CCLI info, etc.        |
| [`slides`](#the-slides-array)           | The actual song lyrics grouped into verses, choruses, etc. |



### The `properties` object
An object that contains data about the song. Most property names should be fairly self descriptive.

| Property Name            | Return Type          | Other Info                                   |
|:-------------------------|:---------------------|:---------------------------------------------|
| `CCLIArtistCredits`      | `string`             |                                              |
| `CCLICopyrightInfo`      | `string` or `number` |                                              |
| `CCLIDisplay`            | `boolean`            |                                              |
| `CCLILicenseNumber`      | `string` or `number` |                                              |
| `CCLIPublisher`          | `string`             |                                              |
| `CCLISongTitle`          | `string`             |                                              |
| `album`                  | `string`             |                                              |
| `artist`                 | `string`             |                                              |
| `author`                 | `string`             |                                              |
| `backgroundColor`        | `IRgbColor` object   | See the [colors docs](colors.md) for details |
| `category`               | `string`             |                                              |
| `creatorCode`            | `number`             |                                              |
| `docType`                | `number` or `null`   |                                              |
| `drawingBackgroundColor` | `boolean`            |                                              |
| `height`                 | `number`             |                                              |
| `lastDateUsed`           | `Date`               |                                              |
| `notes`                  | `string`             |                                              |
| `resourcesDirectory`     | `string`             |                                              |
| `usedCount`              | `number`             |                                              |
| `versionNumber`          | `number`             | Should be `400` for all version 4 files      |
| `width`                  | `number`             |                                              |


Here is example output of the properties that are returned
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
  backgroundColor: {r: 0, g: 0, b: 0},
  category: 'Song',
  creatorCode: 1349676880,
  docType: 0,
  drawingBackgroundColor: false,
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
Each object in this array will contain these properties

| Property Name     | Return Type                   | Description                                                           |
|:------------------|:------------------------------|:----------------------------------------------------------------------|
| `label`           | `string`                      | The label for the slide that is shown in the ProPresenter UI          |
| `id`              | `string`                      | The internal unique id for the side                                   |
| `backgroundColor` | `IRgbColor`                   | The slide background color. Usually this is transparent. See the [colors docs](colors.md) for details                          |
| `highlightColor`  | `IRgbColor` or `null`         | The slide highlight color in the ProPresenter UI. See the [colors docs](colors.md) for details                          |
| `textElements`    | `IPro4SlideTextElement` array | An array of all the text elements of the slide. See the [`IPro4SlideTextElement` docs](#the-slides--textelements--ipro4slidetextelement-object) below for details |



### The `slides` => `textElements` => `IPro4SlideTextElement` object
Each slide contains an array of text elements. Most slides will just have a single item in this array, but if there are multiples they should be returned here too. Each item in this array will have the following properties

| Property Name   | Return Type           | Description                                                                                                 |
|:----------------|:----------------------|:------------------------------------------------------------------------------------------------------------|
| `color`         | `IRgbColor`           | See the [colors docs](colors.md) for details                                                                |
| `font`          | `string`              | The name of the font used for the text                                                                      |
| `position`      | `IProElementPosition` | See the [position docs](position.md) for details                                                            |
| `rawRtfContent` | `string`              | ProPresenter stores slide text in RTF format. This is the unchanged RTF content that ProPresenter generated |
| `size`          | `number`              | The font size used for the text                                                                             |
| `textContent`   | `string`              | The plain text of the slide, extracted from the `rawRtfContent` to be a little easier to work with          |


Here is an example of one object which could appear in the `slides` array
```javascript
{
  backgroundColor: {r: 0, g: 0, b: 0},
  highlightColor: {r: 0, g: 255, b: 0},
  label: 'Chorus 1',
  id: '9734D050-A3BD-4BD2-A8FE-0C15CC0DF0D3',
  textElements: [
    {
      color: { r: 255, g: 255, b: 255 },
      font: 'Helvetica',
      size: 48,
      position: { height: 728, width: 984, x: 20, y: 20, z: 0 },
      rawRtfContent: '{\\rtf1\\ansi\\ansicpg1252\\cocoartf1038\\cocoasubrtf350\n{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}\n{\\colortbl;\\red255\\green255\\blue255;}\n\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\qc\\pardirnatural\n\n\\f0\\fs96 \\cf1 Be near O God\\\nBe near O God of us\\\nYour nearness is to us our good\\\nBe near O God\\\ne near O God of us\\\nYour nearness is to us our good\\\nOur good}',
      textContent: 'Be near O God\nBe near O God of us\nYour nearness is to us our good\nBe near O God\nBe near O God of us\nYour nearness is to us our good\nOur good',
    },
  ],
}
```
