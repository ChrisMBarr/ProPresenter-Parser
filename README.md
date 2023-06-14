<!-- [![GitHub - release](https://img.shields.io/github/v/release/FiniteLooper/ProPresenter-Parser?style=flat)](https://github.com/FiniteLooper/ProPresenter-Parser/releases/latest) -->

# ProPresenter-Parser
[ProPresenter](https://renewedvision.com/propresenter/) is a lyric presentation program used by many churches. This project parses ProPresenter files to extract the basic data. Note: This is not extensive! ProPresenter has a LOT of options and settings around text formatting, cues, timelines, images, etc. The main focus of this project is to parse the song lyrics from files. The ProPresenter file format changes between versions so it's difficult to support everything.

## Supported Versions & Features
This is a work in progress! I will try to add support for different versions when I can.
| Version | Read | Write |
|:--------|:-----|:------|
|**4**    | ✅   | 🚫   |
|**5**    | ✅   | ✅   |
|**6**    | 🚫   | 🚫   |
|**7**    | 🚫   | 🚫   |

## Installation

```txt
npm install propresenter-parser --save
```

## Documentation
* [ProPresenter 4 Parser](docs/v4-parser.md)
* [ProPresenter 5 Parser](docs/v5-parser.md)
* [ProPresenter 5 Builder](docs/v5-builder.md)

