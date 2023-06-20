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
| `drawingBackgroundColor` | `boolean`                     | Whether or not this slide uses a background color (I think)            |
| `enabled`                | `boolean`                     | Whether or not this slide is enabled                                   |
| `highlightColor`         | `IRgbColor` or `null`         | The slide highlight color in the ProPresenter UI. See the [colors docs](colors.md) for details |
| `hotkey`                 | `string`                      | The "hot key" assigned to this slide, if any. See [the ProPresenter docs](https://learn.renewedvision.com/propresenter6/the-features-of-propresenter/hot-keys) for more details |
| `id`                     | `string`                      | The internal unique id for the side                                   |
| `label`                  | `string`                      | The label for the slide that is shown in the ProPresenter UI          |
| `notes`                  | `string`                      | Stage display notes. This can be any text.                   |
| `textElements`           | `IPro6SlideTextElement` array | An array of all the text elements on this slide. See the [`IPro6SlideTextElement` docs](#the-slidegroups--slides--ipro6slide--ipro6slidetextelement-array) below for details |



### The `slideGroups` => `slides` => `IPro6Slide` => `IPro6SlideTextElement` array
Each slide contains an array of text elements. Most slides will just have a single item in this array, but if there are multiples they should be returned here too. Each item in this array will have the following properties

| Property Name   | Return Type           | Description                                                                                                                         |
|:----------------|:----------------------|:------------------------------------------------------------------------------------------------------------------------------------|
| `adjustsHeightToFit` | `boolean`             | Whether the "adjusts to fit" box is checked in ProPresenter. If so, the height of this element depends on the text inside it   |
| `bezelRadius`        | `number`              | The radius of the rounded corners on this text element                                                                         |
| `displayDelay`       | `number`              | ❓ Not sure what this represents. When setting a build in/out delay for a text element that delay amount is applied elsewhere |
| `displayName`        | `string`              | The name of this text element                                                                                                  |
| `drawingFill`        | `boolean`             | Whether the background fill color on the text is displayed or not. If so, the color specified in `fillColor` property is used. |
| `fillColor`          | `IRgbColor`           | The fill color of the text element (the background color of the text box)                                                      |
| `fontName`           | `string`              | The name of the font used for the text                                                                                         |
| `fromTemplate`       | `boolean`             | Whether this text element was generated from a template or not                                                                 |
| `id`                 | `string`              | The unique ID ProPresenter uses internally for this text element                                                               |
| `locked`             | `boolean`             | Whether this text element is locked or not                                                                                     |
| `opacity`            | `number`              | The opacity of the text as a range between 0 and 1                                                                             |
| `persistent`         | `number`              | ❓ Not sure what this represents                                                                                              |
| `position`           | `IProElementPosition` | The position of this text element on the side. See the [position docs](position.md) for details                                |
| `revealType`         | `number`              | `0` is no reveal, `1` is "Bulleted List", and `2` is "Fill in the Blank"                                                       |
| `rotation`           | `number`              | The angle of rotation for this text element                                                                                    |
| `textShadow`         | `IProElementShadow`   | An object that describes the text shadow. See the [shadows docs](shadows.md) for details                                       |
| `source`             | `string`              | ❓ Not sure what this represents. I do not think it applies to text elements but the property does exist on it.               |
| `textColor`          | `IRgbColor`           | The color of the text. See the [colors docs](colors.md) for details                                                            |
| `outline`             | `IProElementOutline` | An object that describes the text element outline. This is around the text element, NOT around the actual letters of the text! See the [outlines docs](outlines.md) for details                                      |
| `textSize`           | `number`              | The font size used for the text                                                                                                |
| `typeID`             | `number`              | ❓ Not sure what this represents. Possibly the type of element? This parser will only return text elements right now.         |
| `verticalAlignment`  | `number`              | `0` is center aligned, `1` is top aligned, and `2` is bottom aligned                                                           |
| `plainText`          | `string`              | The plain text of the slide                                                                                                    |
| `rtfData`            | `string`              | The text of the side represented as RTF data                                                                                   |
| `winFlowData`        | `string`              | The text of the side represented as a Windows Flow document. See the [Microsoft documentation page](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/flow-document-overview?view=netframeworkdesktop-4.8) for more details |
| `winFontData`        | `string`              | ❓ The font data about the text (color, size, stroke, etc.) represented as some kind of XML. I am not sure exactly!           |



Here is an example of one object which could appear in the `slideGroups` array. This slide group has two slides inside of it.
```javascript
{
  groupColor: { r: 0, g: 0, b: 255 },
  groupId: '1E80B87B-831A-A1D5-7D5F-0F42AE338C89',
  groupLabel: 'Verse 1',
  slides: [
    {
      backgroundColor: { r: 0, g: 0, b: 0 },
      chordChartPath: '',
      drawingBackgroundColor: false,
      enabled: true,
      highlightColor: null,
      hotKey: '',
      id: 'B2ADFDF1-C3F5-850E-8344-7E379BFE827A',
      label: '',
      notes: '',
      textElements: [
        {
          adjustsHeightToFit: false,
          bezelRadius: 0,
          displayDelay: 0,
          displayName: 'Default',
          drawingFill: false,
          fillColor: { b: 255, g: 255, r: 255 },
          fromTemplate: false,
          id: '9328c28d-fe52-4fe9-99be-49ce26f242db',
          locked: false,
          opacity: 1,
          persistent: 0,
          plainText: 'Amazing grace how sweet the sound\r\nThat saved a wretch like me',
          outline: {
            color: { r: 0, g: 0, b: 0 }
            enabled: false,
            size: 0,
          },
          fontName: 'Impact',
          textColor: { r: 255, g: 255, b: 255 },
          textShadow: {
            angle: 135,
            color: { r: 0, g: 0, b: 0 },
            enabled: false,
            length: 7,
            radius: 10
          },
          textSize: 74.5,
          position: { height: 1040, width: 1880, x: 20, y: 20, z: 0 },
          revealType: 0,
          rotation: 0,
          rtfData: `{\\rtf1\\prortf1\\ansi\\ansicpg1252\\uc1\\htmautsp\\deff2{\\fonttbl{\\f0\\fcharset0 Times New Roman;}{\\f2\\fcharset0 Georgia;}{\\f3\\fcharset0 Arial;}{\\f4\\fcharset0 Impact;}}{\\colortbl;\\red0\\green0\\blue0;\\red255\\green255\\blue255;}\\loch\\hich\\dbch\\pard\\slleading0\\plain\\ltrpar\\itap0{\\lang1033\\fs120\\f3\\cf1 \\cf1\\qc{\\fs149\\f4 {\\cf2\\ltrch Amazing grace how sweet the sound}\\li0\\sa0\\sb0\\fi0\\qc\\par}\r\n{\\fs149\\f4 {\\cf2\\ltrch That saved a wretch like me}\\li0\\sa0\\sb0\\fi0\\qc\\par}\r\n}\r\n}`,
          source: '',
          typeID: 0,
          verticalAlignment: 0,
          winFlowData:
            '<FlowDocument TextAlignment="Center" PagePadding="5,0,5,0" AllowDrop="True" xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"><Paragraph Margin="0,0,0,0" TextAlignment="Center" FontFamily="Arial" FontSize="60"><Run FontFamily="Impact" FontStretch="Condensed" FontSize="75" Foreground="#FFFFFFFF" Block.TextAlignment="Center">Amazing grace how sweet the sound</Run></Paragraph><Paragraph Margin="0,0,0,0" TextAlignment="Center" FontFamily="Arial" FontSize="60"><Run FontFamily="Impact" FontStretch="Condensed" FontSize="75" Foreground="#FFFFFFFF" Block.TextAlignment="Center">That saved a wretch like me</Run></Paragraph></FlowDocument>',
          winFontData:
            '<?xml version="1.0" encoding="utf-16"?><RVFont xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.datacontract.org/2004/07/ProPresenter.Common"><Kerning>0</Kerning><LineSpacing>0</LineSpacing><OutlineColor xmlns:d2p1="http://schemas.datacontract.org/2004/07/System.Windows.Media"><d2p1:A>255</d2p1:A><d2p1:B>0</d2p1:B><d2p1:G>0</d2p1:G><d2p1:R>0</d2p1:R><d2p1:ScA>1</d2p1:ScA><d2p1:ScB>0</d2p1:ScB><d2p1:ScG>0</d2p1:ScG><d2p1:ScR>0</d2p1:ScR></OutlineColor><OutlineWidth>0</OutlineWidth><Variants>Normal</Variants></RVFont>'
        }
      ]
    },
    {
      backgroundColor: { r: 0, g: 0, b: 0 },
      chordChartPath: '',
      drawingBackgroundColor: false,
      enabled: true,
      highlightColor: null,
      hotKey: '',
      id: 'B12B2C43-9D29-4DDC-98C3-EE95EB3B6A30',
      label: '',
      notes: '',
      textElements: [
        {
          adjustsHeightToFit: false,
          bezelRadius: 0,
          displayDelay: 0,
          displayName: 'Default',
          drawingFill: false,
          fillColor: { r: 255, g: 255, b: 255 },
          fromTemplate: false,
          id: '66b37b9a-4513-40df-8d81-12e8f756c43e',
          locked: false,
          opacity: 1,
          persistent: 0,
          plainText: "I once was lost but now I'm found\r\nWas blind but now I see",
          outline: {
            color: { r: 0, g: 0, b: 0 }
            enabled: false,
            size: 0,
          },
          fontName: 'Impact',
          textColor: { r: 255, g: 255, b: 255 },
          textShadow: {
            angle: 135,
            color: { r: 0, g: 0, b: 0 },
            enabled: false,
            length: 7,
            radius: 10
          },
          textSize: 74.5,
          position: { height: 1040, width: 1880, x: 20, y: 20, z: 0 },
          revealType: 0,
          rotation: 0,
          rtfData: `{\\rtf1\\prortf1\\ansi\\ansicpg1252\\uc1\\htmautsp\\deff2{\\fonttbl{\\f0\\fcharset0 Times New Roman;}{\\f2\\fcharset0 Georgia;}{\\f3\\fcharset0 Impact;}}{\\colortbl;\\red0\\green0\\blue0;\\red255\\green255\\blue255;}\\loch\\hich\\dbch\\pard\\slleading0\\plain\\ltrpar\\itap0{\\lang1033\\fs32\\f2\\cf1 \\cf1\\qc{\\fs149\\f3 {\\cf2\\ltrch I once was lost but now I'm found}\\li0\\sa0\\sb0\\fi0\\qc\\par}\r\n{\\fs149\\f3 {\\cf2\\ltrch Was blind but now I see}\\li0\\sa0\\sb0\\fi0\\qc\\par}\r\n}\r\n}`,
          source: '',
          typeID: 0,
          verticalAlignment: 0,
          winFlowData:
            '<FlowDocument FontFamily="Georgia" TextAlignment="Center" PagePadding="5,0,5,0" AllowDrop="True" xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"><Paragraph TextAlignment="Center"><Run FontFamily="Impact" FontStyle="Normal" FontWeight="Normal" FontStretch="Condensed" FontSize="75" Foreground="#FFFFFFFF" Block.TextAlignment="Center"><Run.TextDecorations><TextDecorationCollection /></Run.TextDecorations>I once was lost but now I\'m found</Run></Paragraph><Paragraph TextAlignment="Center"><Run FontFamily="Impact" FontStyle="Normal" FontWeight="Normal" FontStretch="Condensed" FontSize="75" Foreground="#FFFFFFFF" Block.TextAlignment="Center"><Run.TextDecorations><TextDecorationCollection /></Run.TextDecorations>Was blind but now I see</Run></Paragraph></FlowDocument>',
          winFontData:
            '<?xml version="1.0" encoding="utf-16"?><RVFont xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.datacontract.org/2004/07/ProPresenter.Common"><Kerning>0</Kerning><LineSpacing>0</LineSpacing><OutlineColor xmlns:d2p1="http://schemas.datacontract.org/2004/07/System.Windows.Media"><d2p1:A>255</d2p1:A><d2p1:B>0</d2p1:B><d2p1:G>0</d2p1:G><d2p1:R>0</d2p1:R><d2p1:ScA>1</d2p1:ScA><d2p1:ScB>0</d2p1:ScB><d2p1:ScG>0</d2p1:ScG><d2p1:ScR>0</d2p1:ScR></OutlineColor><OutlineWidth>0</OutlineWidth><Variants>Normal</Variants></RVFont>'
        }
      ]
    }
  ]
}
```


### The `arrangements` array
ProPresenter 6 can store multiple arrangements for each song. Each arrangement can show the slide groups in differing orders.
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
```
