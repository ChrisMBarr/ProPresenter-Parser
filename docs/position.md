# Colors
Thankfully, all versions of ProPresenter represent object positions and sizes in the same way, so this project can have a centralized/shared way to work with them. This short documentation page is shared by all the file parsers and builders this project contains


## The `IProElementPosition` Object
The property names are self descriptive. Keep in mind that while the `z` property exists, almost all of the time it will have a value of `0` since most people don't position slide elements in 3D space. All values are represented in pixels

Here is an example object that shows an element that is `984`px wide, `728`px high, and is `20`px offset from the top and left sides of the slide. In this example object we can assume the slide is `1024`px wide by `768`px high, but has `20`px of "padding" on all sides: (`1024 - (20 * 2) = 984` and `768 - (20 * 2) = 728`)
```javascript
{
  height: 728,
  width: 984, 
  x: 20,      
  y: 20,      
  z: 0        
}
```
