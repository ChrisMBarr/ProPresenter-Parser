# Creating Colors
Internally ProPresenter uses colors with RGBA values in a string using floats, where `1 1 1 1` is white, `0 0 0 1` is black, and `1 0 0 1` is red, etc. Each of the red, green, and  blue values are a decimal value between 0 and 1.

## Color Formats
When building a ProPresenter document any property that asks for a color can be represented in 3 different ways, whatever is easiest for you. These values will be converted to the appropriate value when creating a document.
* RGBA floats in a string: `1 1 1 1`
* HEX colors: `#FFFFFF`
* RGB objects: `{r:255, g:255, b: 255}`


## Examples
Here are some example colors represented in each of the three formats
* White:  `1 1 1 1`, `#FFFFFF`, `{r:255, g:255, b:255}`
* Black:  `0 0 0 1`, `#000000`, `{r:0, g:0, b:0}`
* Red:    `1 0 0 1`, `#FF0000`, `{r:255, g:0, b:0}`
* Green:  `0 1 0 1`, `#00FF00`, `{r:0, g:255, b:0}`
* Blue:   `0 0 1 1`, `#0000FF`, `{r:0, g:0, b:255}`
* Orange: `1 1 .6470588235294118 1`, `#FFA500`, `{r:255, g:165, b:0}`
* Purple: `0.5019607843137255 0 0.5019607843137255 1`, `#800080`, `{r:128, g:0, b:128}`

