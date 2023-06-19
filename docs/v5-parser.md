# ProPresenter 5 Parser


## Usage: For TypeScript projects
```typescript
import { readFile } from 'fs';
import { ProPresenter5Parser, IPro5Song } from 'propresenter-parser';

readFile('example.pro5', (contents): void => {
  const song: IPro5Song = ProPresenter5Parser(contents.toString());
  console.log(song);
});
```

## Usage: For JavaScript projects
```javascript
const { readFile } = require('fs');
const { ProPresenter5Parser } = require('propresenter-parser');

readFile('example.pro5', (contents) => {
  const song = ProPresenter5Parser(contents.toString());
  console.log(song);
});
```



## Returned Object
A large object will be returned that contains a `properties` object, a `slideGroups` array, and an array of song `arrangements`

| Property Name                             | Description                                                                                  |
|:------------------------------------------|:---------------------------------------------------------------------------------------------|
| [`properties`](#the-properties-object)    | Data about the song. Title, artist, CCLI info, etc.                                          |
| [`slideGroups`](#the-slidegroups-array)   | The groups of slides. Each group contains an array of slides for that group                  |
| [`arrangements`](#the-arrangements-array) | Each song arrangement has a name and an array of ordered groups to show for that arrangement |



## The `properties` object
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
| `chordChartPath`         | `string`             |                                              |
| `docType`                | `number` or `null`   |                                              |
| `drawingBackgroundColor` | `boolean`            |                                              |
| `height`                 | `number`             |                                              |
| `lastDateUsed`           | `Date`               |                                              |
| `notes`                  | `string`             |                                              |
| `resourcesDirectory`     | `string`             |                                              |
| `usedCount`              | `number`             |                                              |
| `versionNumber`          | `number`             | Should be `500` for all version 5 files      |
| `width`                  | `number`             |                                              |


Here is example output of the properties that are returned
```javascript
{
  CCLIArtistCredits: '',
  CCLICopyrightInfo: 2003,
  CCLIDisplay: false,
  CCLILicenseNumber: '',
  CCLIPublisher: 'Waiting Room Music',
  CCLISongTitle: 'Be Near',
  album: '',
  artist: 'Shane Bernard',
  author: '',
  backgroundColor: { r: 0, g: 0, b: 0 },
  category: 'Song',
  creatorCode: 1349676880,
  chordChartPath: '',
  docType: 0,
  drawingBackgroundColor: false,
  height: 1050,
  lastDateUsed: Date('2014-10-12T20:44:32'),
  notes: '',
  resourcesDirectory: '',
  usedCount: 0,
  versionNumber: 500,
  width: 1680,
}
```


## The `slideGroups` array
Each object in this array is a group of slides, eg: "Verse 1" or "Chorus" might actually contain multiple slides.
Each object in this array will have the following properties.

| Property Name | Return Type          | Other Info                                                             |
|:--------------|:---------------------|:-----------------------------------------------------------------------|
| `groupLabel`  | `string`             | The text label for this group that is displayed in the ProPresenter UI |
| `groupId`     | `string`             | The internal unique ID for this group                                  |
| `groupColor`  | `IRgbColor` object   | See the [colors docs](colors.md) for details                           |
| `slides`      | `IPro5Slide` array   | The actual slides contained in this group. See the [`IPro5Slide` array docs](#the-slidegroups--slides--ipro5slide-object) below for details |



### The `slideGroups` => `slides` => `IPro5Slide` object
Each object in this array is a slide that is contained in a group of slides.  Each object will have the following properties 

| Property Name     | Return Type                   | Description                                                           |
|:------------------|:------------------------------|:----------------------------------------------------------------------|
| `backgroundColor` | `IRgbColor`                   | The slide background color. Usually this is transparent. See the [colors docs](colors.md) for details |
| `chordChartPath`  | `string`                      | The path to any linked chord chart file                               |
| `enabled`         | `boolean`                     | Wether or not this slide is enabled                                   |
| `highlightColor`  | `IRgbColor` or `null`         | The slide highlight color in the ProPresenter UI. See the [colors docs](colors.md) for details |
| `id`              | `string`                      | The internal unique id for the side                                   |
| `label`           | `string`                      | The label for the slide that is shown in the ProPresenter UI          |
| `notes`           | `string`                      | Stage display notes. This can be any text.                   |
| `mediaCues`       | `IPro5SlideMediaCue` array    | An array of all the media cues for this slide. See the [`IPro5SlideMediaCue` docs](#the-slidegroups--slides--ipro5slide--mediacues-array) below for details |
| `textElements`    | `IPro5SlideTextElement` array | An array of all the text elements on this slide. See the [`IPro5SlideTextElement` docs](#the-slidegroups--slides--ipro5slide--ipro5slidetextelement-array) below for details |



### The `slideGroups` => `slides` => `IPro5Slide` => `mediaCues` array
Each slide can have a custom media cue saved on it. Media cues can be complex and I doubt many people will need this data extracted from this version of ProPresenter files, so only basic information is returned right now. Each found media cue will only contain the following properties

| Property Name     | Return Type | Description                                                     |
|:------------------|:------------|:----------------------------------------------------------------|
| `displayName`     | `string`    | The display name of the cue. This will probably be a file name. |
| `source`          | `string`    | The path to the file used in the cue                            |



### The `slideGroups` => `slides` => `IPro5Slide` => `IPro5SlideTextElement` array
Each slide contains an array of text elements. Most slides will just have a single item in this array, but if there are multiples they should be returned here too. Each item in this array will have the following properties

| Property Name   | Return Type           | Description                                                                                                 |
|:----------------|:----------------------|:------------------------------------------------------------------------------------------------------------|
| `color`         | `IRgbColor`           | See the [colors docs](colors.md) for details                                                                |
| `font`          | `string`              | The name of the font used for the text                                                                      |
| `position`      | `IProElementPosition` | See the [position docs](position.md) for details                                                            |
| `rawRtfContent` | `string`              | ProPresenter stores slide text in RTF format. This is the unchanged RTF content that ProPresenter generated |
| `size`          | `number`              | The font size used for the text                                                                             |
| `textContent`   | `string`              | The plain text of the slide, extracted from the `rawRtfContent` to be a little easier to work with          |



Here is an example of one object which could appear in the `slideGroups` array. This slide group has two slides inside of it.
```javascript
{
  groupColor: { r: 0, g: 0, b: 255 },
  groupId: '879b9305-3db4-7632-b826-715a1c7284cd',
  groupLabel: 'Verse 1',
  slides: [
    {
      backgroundColor: { r: 0, g: 0, b: 0 },
      chordChartPath: '',
      enabled: true,
      highlightColor: { r: 0, g: 0, b: 0 },
      id: '349b10c2-362d-06b9-ea34-2b938900f526',
      label: '',
      notes: '',
      mediaCues: [],
      textElements: [
        {
          color: { b: 255, g: 255, r: 255 },
          font: 'Helvetica',
          position: { height: 995.3125, width: 1614.375, x: 32.8125, y: 27.34375, z: 0 },
          rawRtfContent: '{\\rtf1\\ansi\\ansicpg1252\\cocoartf1343\\cocoasubrtf140\n\\cocoascreenfonts1{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}\n{\\colortbl;\\red255\\green255\\blue255;}\n\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc\n\n\\f0\\fs260 \\cf1 \\outl0\\strokewidth0 \\strokec1 You are all\\\nBig and small\\\nBeautiful}',
          size: 130,
          textContent: 'You are all\nBig and small\nBeautiful',
        },
      ],
    },
    {
      backgroundColor: { r: 0, g: 0, b: 0 },
      chordChartPath: '',
      enabled: true,
      highlightColor: { r: 0, g: 0, b: 0 },
      id: 'b458c19d-19c5-9ca1-0730-34dc0d5de9fa',
      label: '',
      notes: '',
      mediaCues: [],
      textElements: [
        {
          color: { b: 255, g: 255, r: 255 },
          font: 'Helvetica',
          position: { height: 995.3125, width: 1614.375, x: 32.8125, y: 27.34375, z: 0 },
          rawRtfContent: "{\\rtf1\\ansi\\ansicpg1252\\cocoartf1343\\cocoasubrtf140\n\\cocoascreenfonts1{\\fonttbl\\f0\\fswiss\\fcharset0 Helvetica;}\n{\\colortbl;\\red255\\green255\\blue255;}\n\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc\n\n\\f0\\fs260 \\cf1 \\outl0\\strokewidth0 \\strokec1 And wonderful to \\\nTrust in grace\\\nThrough faith\\\n\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\\qc\n\\cf1 \\outl0\\strokewidth0 \\strokec1 But I'm asking to taste}",
          size: 130,
          textContent: "And wonderful to \nTrust in grace\nThrough faith\nBut I'm asking to taste",
        },
      ],
    },
  ],
},
```



### The `arrangements` array
ProPresenter 5 can store multiple arrangements for each song. Each arrangement can show the slide groups in differing orders.
Each object in this array will contain the following properties

| Property Name   | Return Type                        | Description                                                                        |
|:----------------|:-----------------------------------|:-----------------------------------------------------------------------------------|
| `label`         | `string`                           | The name of this arrangement                                                       |
| `color`         | `IRgbColor`                        | See the [colors docs](colors.md) for details                                       |
| `groupOrder`    | `IPro5ArrangementSlideGroup` array | The order of the slide groups for this array. See below for details on this object |



### The `arrangements` => `groupOrder` => `IPro5ArrangementSlideGroup` array
Each arrangement will contain an array of objects simply lists the ID and label for each slide group in this arrangement. The order of this array represents the order in the arrangement.

| Property Name   | Return Type | Description                |
|:----------------|:------------|:---------------------------|
| `groupLabel`    | `string`    | The name of the group      |
| `groupId`       | `string`    | The unique ID of the group |


Here is an example object which could appear in the `arrangements` array. Notice that repeated `groupId` properties represent the same slide group being displayed multiple times in this arrangement.
```javascript
{
  label: 'Worship',
  color: { r: 0, g: 0, b: 0 },
  groupOrder: [
    { groupLabel: 'Background',  groupId: '72801056-2a83-7531-0a6b-c038601f3a57' },
    { groupLabel: 'Verse 1',     groupId: '879b9305-3db4-7632-b826-715a1c7284cd' },
    { groupLabel: 'Bridge 1',    groupId: 'A8499FCB-AF89-40D8-9671-E85706B8EA0B' },
    { groupLabel: 'Chorus',      groupId: '319f1463-3c59-9268-623b-be2da570f476' },
    { groupLabel: 'Chorus',      groupId: '319f1463-3c59-9268-623b-be2da570f476' },
    { groupLabel: 'Post-Chorus', groupId: 'E5052FF3-7B57-42A7-A348-E5C52C770AED' },
    { groupLabel: 'Verse 2',     groupId: '0173b2d0-7137-58b2-1903-67def417faac' },
    { groupLabel: 'Bridge 1',    groupId: 'A8499FCB-AF89-40D8-9671-E85706B8EA0B' },
    { groupLabel: 'Chorus',      groupId: '319f1463-3c59-9268-623b-be2da570f476' },
    { groupLabel: 'Chorus',      groupId: '319f1463-3c59-9268-623b-be2da570f476' },
    { groupLabel: 'Chorus',      groupId: '319f1463-3c59-9268-623b-be2da570f476' },
    { groupLabel: 'Chorus',      groupId: '319f1463-3c59-9268-623b-be2da570f476' },
    { groupLabel: 'Ending',      groupId: '26520F92-9B90-4CB6-BBB6-65958B7AECDA' },
    { groupLabel: '*blank*',     groupId: 'cba67af7-515f-5048-79f8-155a2f1ca390' }
  ]
}
```
