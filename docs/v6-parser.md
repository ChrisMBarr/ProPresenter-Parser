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
A large object will be returned that contains a properties object, an array of slide groups, and an array of song arrangements

```javascript
{
  properties: { ... },
  slideGroups: [ ... ],
  arrangements: [ ... ]
}
```
