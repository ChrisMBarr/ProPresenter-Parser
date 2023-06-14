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
