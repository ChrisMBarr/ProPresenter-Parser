# Colors
Thankfully, all versions of ProPresenter represent colors in the same way, so this project can have a centralized/shared way to work with them. This short documentation page is shared by all the file parsers and builders this project contains



## The `IRgbColor` Object
Colors returned by all of the parsers in this project will be represented by this object type. All values in the object are between `0` and `255`. This object may also be used when creating files using any of the builders in this project, see below for more details.
```javascript
{
  r: 255,  //Red
  g: 255,  //Green
  b: 255   //Blue
}
```


## ProPresenter Colors: RGBA floats in a string
Internally ProPresenter uses colors with RGBA values in a string using floats, where `1 1 1 1` is white, `0 0 0 1` is black, and `1 0 0 1` is red, `0 0 0 0` is transparent, etc. Each of the values are a decimal/float between 0 and 1.



## Creating Colors: Possible Formats
When building a ProPresenter document any property that asks for a color can be represented in 3 different ways, whatever is easiest for you. These values will be converted to the appropriate value when creating a document.
* RGBA floats in a string: `1 1 1 1`
* HEX colors: `#FFFFFF`
* `IRgbColor` objects: `{r:255, g:255, b:255}`



### Examples
Here are some example colors represented in each of the three formats
|        | RGBA Float                                  | HEX       | `IRgbColor` object      |
|:-------|:--------------------------------------------|:----------|:------------------------|
| White  | `1 1 1 1`                                   | `#FFFFFF` | `{r:255, g:255, b:255}` |
| Black  | `0 0 0 1`                                   | `#000000` | `{r:0,   g:0,   b:0}`   |
| Red    | `1 0 0 1`                                   | `#FF0000` | `{r:255, g:0,   b:0}`   |
| Green  | `0 1 0 1`                                   | `#00FF00` | `{r:0,   g:255, b:0}`   |
| Blue   | `0 0 1 1`                                   | `#0000FF` | `{r:0,   g:0,   b:255}` |
| Orange | `1 1 .6470588235294118 1`                   | `#FFA500` | `{r:255, g:165, b:0}`   |
| Purple | `0.5019607843137255 0 0.5019607843137255 1` | `#800080` | `{r:128, g:0,   b:128}` |
