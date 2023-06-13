<!-- [![GitHub - release](https://img.shields.io/github/v/release/FiniteLooper/ProPresenter-Parser?style=flat)](https://github.com/FiniteLooper/ProPresenter-Parser/releases/latest) -->

# ProPresenter-Parser
[ProPresenter](https://renewedvision.com/propresenter/) is a lyric presentation program used by many churches. This project parses ProPresenter files to extract the basic data. Note: This is not extensive! ProPresenter has a LOT of options and settings around text formatting, cues, timelines, images, etc. The main focus of this project is to parse the song lyrics from files. The ProPresenter file format changes between versions so it's difficult to support everything.

## Supported Versions & Features
This is a work in progress! I will try to add support for different versions when I can.
| Version | Read | Write |
|:--------|:-----|:------|
|**4**    | ✅   | 🚫   |
|**5**    | ✅   | 🚫   |
|**6**    | 🚫   | 🚫   |
|**7**    | 🚫   | 🚫   |

## Installation

```txt
npm install propresenter-parser --save
```

### Usage: For TypeScript projects
```typescript
import { readFile } from 'fs';
import { ProPresenter4Parser, IPro4Song } from 'propresenter-parser';

readFile('example.pro4', (contents): void => {
  const song: IPro4Song = ProPresenter4Parser(contents.toString());
  console.log(song);
});
```

### Usage: For JavaScript projects
```javascript
const { readFile } = require('fs');
const { ProPresenter4Parser } = require('propresenter-parser');

readFile('example.pro4', (contents) => {
  const song = ProPresenter4Parser(contents.toString());
  console.log(song);
});
```
