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

| Name            | Required | Type      | Default Value | Description                                               |
|:----------------|:---------|:----------|:--------------|:----------------------------------------------------------|



## The `slideGroups` array
This is a **required** array to pass in the options. Each slide group is something like "Verse 1", "Chorus", or "Bridge" and it can contain one or multiple slides that comprise the group.  Each item in the array can have the following options:

| Name         | Required | Type                                      | Description                                                                       |
|:-------------|:---------|:------------------------------------------|-----------------------------------------------------------------------------------|



## The `slideTextFormatting` object
This is an **optional** object to pass in the options. You may pass any property to override the default value.

| Name          | Required | Type                                        | Default Value                                                                      | Description                                             |
|:------------- |:---------|:--------------------------------------------|------------------------------------------------------------------------------------|:--------------------------------------------------------|
| `fontName`    | No       | `string`                                    | `'Arial'`                                                                          | The name of the font for the text in all created slides |
| `textColor`   | No       | `string` or [`IRgbColor`](colors.md) object | `{r:255, g:255, b:255}`                                                            | The color of the text in all created slides. The default is white text. See the [colors docs](colors.md) for formatting details |
| `textSize`    | No       | `number`                                    | `60` (in points)                                                                   | The size of the text, in points, for all created slides |
| `textPadding` | No       | `number`                                    | `20` (in pixels)                                                                   | The padding around the text element within the slide    |
| `textShadow`  | No       | `IProElementShadow`                         | `{enabled: false, angle: 135, length: 7, radius: 10, color: { r: 0, g: 0, b: 0 }}` | Shadows are disabled by default. See the [shadows docs](shadows.md) for formatting details |

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
```
