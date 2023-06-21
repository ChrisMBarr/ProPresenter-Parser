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



## The `properties` object
This is a **required** object to pass in the options. You may pass any property to override the default value.

| Name                | Required | Type      | Default Value | Description                                                                                              |
|:--------------------|:---------|:----------|:--------------|:---------------------------------------------------------------------------------------------------------|
| `CCLISongTitle`     | **Yes**  | `string`  | None          | The title of the song                                                                                    |
| `CCLIArtistCredits` | No       | `string`  | None          | The name of the artist who originally performed this song                                                | 
| `CCLIAuthor`        | No       | `string`  | None          | The author of the song                                                                                   |
| `CCLICopyrightYear` | No       | `number`  | None          | The year this song was copywritten                                                                       |
| `CCLIDisplay`       | No       | `boolean` | `false`       | Enables Copyright/CCLI display for this song, if ProPresenter is configured to do this                   |
| `CCLIPublisher`     | No       | `string`  | None          | The publisher of this song                                                                               |
| `CCLISongNumber`    | No       | `number`  | None          | The CCLI license number for this song                                                                    |
| `category`          | No       | `string`  | `'Song'`      | Any name can be used here to categorize this. Common ones are `'Song'`, `'Hymn'`, `'Presentation'`, etc. |
| `notes`             | No       | `string`  | None          | Any other custom information about this song                                                             |
| `height`            | No       | `number`  | `720`         | The document height. This should match the resolution of your presentation screen                        |
| `width`             | No       | `number`  | `1280`        | The document width. This should match the resolution of your presentation screen                         |



## The `slideGroups` array
This is a **required** array to pass in the options. Each slide group is something like "Verse 1", "Chorus", or "Bridge" and it can contain one or multiple slides that comprise the group.  Each item in the array can have the following options:

| Name         | Required | Type                                      | Description                                                                       |
|:-------------|:---------|:------------------------------------------|-----------------------------------------------------------------------------------|
| `label`      | **Yes**  | `string`                                  | The name of this slide group, eg: `'Verse 1'`, `'Chorus'`, `'Bridge'`, `'Ending'` |
| `slides`     | **Yes**  | `string[]` or [`IPro6BuilderOptionsSlide[]`](#the-slidegroups--slides--ipro6builderoptionsslide-objects) | Each item in this array will become a slide. For simplicity just pass strings. Add line breaks with `\n`. If needed, [more options are available when an object is passed](#the-slidegroups--slides--ipro6builderoptionsslide-objects)     |
| `groupColor` | No       | `string` or [`IRgbColor`](colors.md) object | An optional color of this slide group in the main UI. See the [colors docs](colors.md) for formatting details |



### The `slideGroups` => `slides` => `IPro6BuilderOptionsSlide` objects
If all you need for each slide in a group is the text, just pass strings instead of these objects.  However if you need more options you can pass these objects instead. Each object can have the following properties:

| Name         | Required | Type                                        | Description                                                                    |
|:-------------|:---------|:--------------------------------------------|--------------------------------------------------------------------------------|
| `text`       | **Yes**  | `string`                                    | The text content of the slide, probably song lyrics. Add line breaks with `\n` |
| `label`      | No       | `string`                                    | Any custom label to show on this slide in the main UI. This could be a quick note to the operator for example, eg: `'Hold during solo'` or `'long instrumental'` |
| `slideColor` | No       | `string` or [`IRgbColor`](colors.md) object | An optional highlight color of this slide in the main UI. See the [colors docs](colors.md) for formatting details |



## The `slideTextFormatting` object
This is an **optional** object to pass in the options. You may pass any property to override the default value.

| Name          | Required | Type                                        | Default Value                                            | Description                                             |
|:------------- |:---------|:--------------------------------------------|----------------------------------------------------------|:--------------------------------------------------------|
| `fontName`    | No       | `string`                                    | `'Arial'`                                                | The name of the font for the text in all created slides |
| `textColor`   | No       | `string` or [`IRgbColor`](colors.md) object | `{r:255, g:255, b:255}`                                  | The color of the text in all created slides. The default is white text. See the [colors docs](colors.md) for formatting details |
| `textSize`    | No       | `number`                                    | `60` (in points)                                         | The size of the text, in points, for all created slides |
| `textPadding` | No       | `number`                                    | `20` (in pixels)                                         | The padding around the text element within the slide    |
| `textShadow`  | No       | `IProElementShadow`                         | Disabled. See the [shadows docs](shadows.md) for details | Shadows are disabled by default. See the [shadows docs](shadows.md) for formatting details |

**Note about the `textPadding` property:** In the `properties` you can set the `height` and `width` of all slides in the document. If the document is set to be 1920x1080 and `textPadding` is set to `20`px then the text element will be 1880x1040 (subtracting 20*2 for each dimension) and will have `20`px spacing on all sides.



## The `transitions` object
This is an **optional** object to pass in the options. 
If you choose to omit this the song will just use the default transitions from whatever you have set in ProPresenter.
Providing this object will set a custom transition for this song, overriding whatever you have set in ProPresenter.

| Name       | Required | Type                      | Description                                                               |
|:-----------|:---------|:--------------------------|---------------------------------------------------------------------------|
| `duration` | **Yes**  | `number`                  | The number of seconds the transition should last. Use `1` for 1 second. Use `0.4` for 400 milliseconds |
| `type`     | **Yes**  | `IProTransitionType` enum | The type of transition. For JS projects see [the enum itself](/src/shared.model.ts) for possible number values to use. TS projects benefit from intellisense here. |


# Larger Example
Below is a larger example object for a song with lots of options provided:
```typescript
{
  properties: {
    CCLIArtistCredits: 'Chris Tomlin',
    CCLIAuthor: 'John Newton, Chris Tomlin',
    CCLICopyrightYear: 2006,
    CCLIDisplay: true,
    CCLIPublisher: 'worshiptogether.com Songs/sixsteps Music, Vamos Publishing, admin. Capitol CMG Publishing',
    CCLISongNumber: 12345678,
    CCLISongTitle: 'My Test Song',
    category: 'Hymn',
    notes: 'Pastor Bill loves this one',
    height: 1080,
    width: 1920,
  },
  slideTextFormatting: {
    fontName: 'Impact',
    textColor: '#FAFAFA',
    textSize: 80,
    textPadding: 40,
    textShadow: {
      angle: 45,
      color: { r: 128, g: 128, b: 128 },
      enabled: true,
      length: 4,
      radius: 8,
    },
  },
  transitions: {
    duration: 0.4, //400ms
    type: IProTransitionType.ZoomInLeft,
  },
  slideGroups: [
    {
      label: 'Blank',
      slides: [''], //Add a blank slide group with 1 slide that has no text. Good for setting a BG image on
    },
    {
      label: 'Verse 1',
      groupColor: { r: 0, g: 0, b: 255 },
      slides: [
        'Amazing grace, How sweet the sound\nThat saved a wretch like me',
        'I once was lost, but now I am found,\nWas blind, but now I see',
      ],
    },
    {
      label: 'Verse 2',
      groupColor: { r: 0, g: 100, b: 255 },
      slides: [
        "'Twas Grace that taught my heart to fear\nAnd Grace, my fears relieved",
        'How precious did that Grace appear\nThe hour I first believed',
      ],
    },
    {
      label: 'Verse 3',
      groupColor: { r: 0, g: 200, b: 255 },
      slides: [
        'The Lord has promised good to me\nHis word my hope secures',
        'He will my shield and portion be\nAs long as life endures',
      ],
    },
    {
      label: 'Verse 4',
      groupColor: { r: 0, g: 255, b: 255 },
      slides: [
        'The earth shall soon dissolve like snow\nThe sun forbear to shine',
        'But God, Who called me here below\nWill be forever mine\nWill be forever mine',
        { text: 'You are forever mine', label: 'Might repeat 2-3x', slideColor: '#FFA500' },
      ],
    },
    {
      label: 'Chorus',
      groupColor: { r: 255, g: 100, b: 100 },
      slides: [
        { text: "My chains are gone, I've been set free\nMy God, my Savior has ransomed me" },
        { text: 'And like a flood His mercy reigns\nUnending love, amazing grace' },
      ],
    },
    {
      label: 'Ending',
      slides: [{ text: 'Amazing grace', label: 'Leave on screen' }],
    },
  ],
}
```
