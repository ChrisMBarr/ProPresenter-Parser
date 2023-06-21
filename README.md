[![GitHub - release](https://img.shields.io/github/v/release/FiniteLooper/ProPresenter-Parser?style=flat)](https://github.com/FiniteLooper/ProPresenter-Parser/releases/latest)

# ProPresenter-Parser
[ProPresenter](https://renewedvision.com/propresenter/) is a lyric presentation program used by many churches. This project can parses ProPresenter files to extract the basic data, and build ProPresenter files.

**Note:** This is not extensive! ProPresenter has a LOT of options and settings around text formatting, cues, timelines, images, etc. The main focus of this project is to parse the song lyrics from files. The ProPresenter file format changes between versions so it's difficult to support everything, however mhe basics should be mostly covered. Check the documentation below for specifics on the version you need.

## Supported File Versions
This is a work in progress! I will try to add support for different versions when I can.
| File Version | Read | Write |
|:-------------|:-----|:------|
|**4**         | ✅   | 🚫   |
|**5**         | ✅   | ✅   |
|**6**         | ✅   | ✅   |
|**7**         | 🚫   | 🚫   |

_(Version 7 parsing/building coming soon!)_

## Installation

```txt
npm install propresenter-parser --save
```

## Documentation
* [ProPresenter 4 File Parser](docs/v4-parser.md)
* [ProPresenter 5 File Parser](docs/v5-parser.md)
* [ProPresenter 5 File Builder](docs/v5-builder.md)
* [ProPresenter 6 File Parser](docs/v6-parser.md)
* [ProPresenter 6 File Builder](docs/v6-builder.md)
