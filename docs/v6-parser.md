# ProPresenter 6 Parser


## Usage: For TypeScript projects
```typescript
import { readFile } from 'fs';
import { ProPresenter6Parser, IPro6Song } from 'propresenter-parser';

readFile('example.pro6', (contents): void => {
  const song: IPro6Song = ProPresenter6Parser(contents.toString());
  console.log(song);
});
```

## Usage: For JavaScript projects
```javascript
const { readFile } = require('fs');
const { ProPresenter6Parser } = require('propresenter-parser');

readFile('example.pro6', (contents) => {
  const song = ProPresenter6Parser(contents.toString());
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
| `CCLIAuthor`             | `string`             |                                              |
| `CCLICopyrightYear`      | `string` or `number` |                                              |
| `CCLIDisplay`            | `boolean`            |                                              |
| `CCLIPublisher`          | `string`             |                                              |
| `CCLISongNumber`         | `string` or `number` |                                              |
| `CCLISongTitle`          | `string`             |                                              |
| `backgroundColor`        | `IRgbColor` object   | See the [colors docs](colors.md) for details |
| `buildNumber`            | `number`             |                                              |
| `category`               | `string`             |                                              |
| `chordChartPath`         | `string`             |                                              |
| `docType`                | `number` or `null`   |                                              |
| `drawingBackgroundColor` | `boolean`            |                                              |
| `height`                 | `number`             |                                              |
| `lastDateUsed`           | `Date`               |                                              |
| `notes`                  | `string`             |                                              |
| `os`                     | `number`             |                                              |
| `resourcesDirectory`     | `string`             |                                              |
| `selectedArrangementID`  | `string`             |                                              |
| `usedCount`              | `number`             |                                              |
| `versionNumber`          | `number`             | Should be `600` for all version 6 files      |
| `width`                  | `number`             |                                              |


Here is example output of the properties that are returned
```javascript
{
  CCLIArtistCredits: 'Shane Bernard',
  CCLIAuthor: '',
  CCLICopyrightYear: 2003,
  CCLIDisplay: false,
  CCLIPublisher: 'Waiting Room Music',
  CCLISongNumber: '',
  CCLISongTitle: 'Be Near',
  backgroundColor: { r: 0, g: 0, b: 0 },
  buildNumber: 6016,
  category: 'Song',
  chordChartPath: '',
  docType: 0,
  drawingBackgroundColor: false,
  height: 1080,
  lastDateUsed: Date('2023-05-18T00:03:20+00:00'),
  notes: '',
  os: 1,
  resourcesDirectory: '',
  selectedArrangementID: '',
  usedCount: 0,
  versionNumber: 600,
  width: 1920,
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
| `slides`      | `IPro6Slide` array   | The actual slides contained in this group. See the [`IPro6Slide` array docs](#the-slidegroups--slides--ipro6slide-object) below for details |



### The `slideGroups` => `slides` => `IPro6Slide` object
Each object in this array is a slide that is contained in a group of slides.  Each object will have the following properties 

| Property Name            | Return Type                   | Description                                                           |
|:-------------------------|:------------------------------|:----------------------------------------------------------------------|
| `backgroundColor`        | `IRgbColor`                   | The slide background color. Usually this is transparent. See the [colors docs](colors.md) for details |
| `chordChartPath`         | `string`                      | The path to any linked chord chart file                               |
| `drawingBackgroundColor` | `boolean`                     | Wether or not this slide uses a background color (I think)            |
| `enabled`                | `boolean`                     | Wether or not this slide is enabled                                   |
| `highlightColor`         | `IRgbColor` or `null`         | The slide highlight color in the ProPresenter UI. See the [colors docs](colors.md) for details |
| `hotkey`                 | `string`                      | The "hot key" assigned to this slide, if any. See [the ProPresenter docs](https://learn.renewedvision.com/propresenter6/the-features-of-propresenter/hot-keys) for more details |
| `id`                     | `string`                      | The internal unique id for the side                                   |
| `label`                  | `string`                      | The label for the slide that is shown in the ProPresenter UI          |
| `notes`                  | `string`                      | Any saved notes on this side. This can be any text.                   |
<!-- | `mediaCues`              | `IPro6SlideMediaCue` array    | An array of all the media cues for this slide. See the [`IPro6SlideMediaCue` docs](#the-slidegroups--slides--ipro6slide--mediacues-array) below for details | -->
| `textElements`           | `IPro6SlideTextElement` array | An array of all the text elements on this slide. See the [`IPro6SlideTextElement` docs](#the-slidegroups--slides--ipro6slide--ipro6slidetextelement-array) below for details |


<!-- 
### The `slideGroups` => `slides` => `IPro6Slide` => `mediaCues` array
Each slide can have a custom media cue saved on it. Media cues can be complex and I doubt many people will need this data extracted from this version of ProPresenter files, so only basic information is returned right now. Each found media cue will only contain the following properties

| Property Name     | Return Type | Description                                                     |
|:------------------|:------------|:----------------------------------------------------------------|
| `displayName`     | `string`    | The display name of the cue. This will probably be a file name. |
| `source`          | `string`    | The path to the file used in the cue                            |
-->



### The `slideGroups` => `slides` => `IPro6Slide` => `IPro6SlideTextElement` array
Each slide contains an array of text elements. Most slides will just have a single item in this array, but if there are multiples they should be returned here too. Each item in this array will have the following properties

| Property Name   | Return Type           | Description                                                                                                 |
|:----------------|:----------------------|:------------------------------------------------------------------------------------------------------------|
<!-- | `color`         | `IRgbColor`           | See the [colors docs](colors.md) for details                                                                |
| `font`          | `string`              | The name of the font used for the text                                                                      |
| `size`          | `number`              | The font size used for the text                                                                             | -->
| `adjustsHeightToFit` | `boolean`             |  |
| `bezelRadius`        | `number`              |  |
| `displayDelay`       | `number`              |  |
| `displayName`        | `string`              |  |
| `drawingFill`        | `boolean`             |  |
| `drawingStroke`      | `boolean`             |  |
| `fillColor`          | `IRgbColor`           |  |
| `fromTemplate`       | `boolean`             |  |
| `id`                 | `string`              |  |
| `locked`             | `boolean`             |  |
| `opacity`            | `number`              |  |
| `persistent`         | `number`              |  |
| `revealType`         | `number`              |  |
| `rotation`           | `number`              |  |
| `source`             | `string`              |  |
| `typeID`             | `number`              |  |
| `verticalAlignment`  | `number`              |  |
| `winFlowData`        | `string`              |  |
| `winFontData`        | `string`              |  |
| `shadow`             | `IPro6ElementShadow`  |  |
| `rtfData`            | `string`              | ProPresenter stores slide text in RTF format. This is the unchanged RTF content that ProPresenter generated |
| `plainText`          | `string`              | The plain text of the slide          |
| `position`           | `IProElementPosition` | The position of this text element on the side. See the [position docs](position.md) for details             |



Here is an example of one object which could appear in the `slideGroups` array. This slide group has two slides inside of it.
```javascript

```


<!-- 
### The `arrangements` array
ProPresenter 5 can store multiple arrangements for each song. Each arrangement can show the slide groups in differing orders.
Each object in this array will contain the following properties

| Property Name   | Return Type                        | Description                                                                        |
|:----------------|:-----------------------------------|:-----------------------------------------------------------------------------------|
| `label`         | `string`                           | The name of this arrangement                                                       |
| `color`         | `IRgbColor`                        | See the [colors docs](colors.md) for details                                       |
| `groupOrder`    | `IPro6ArrangementSlideGroup` array | The order of the slide groups for this array. See below for details on this object |



### The `arrangements` => `groupOrder` => `IPro6ArrangementSlideGroup` array
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
``` -->
