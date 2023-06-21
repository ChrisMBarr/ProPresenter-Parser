[![GitHub - release](https://img.shields.io/github/v/release/FiniteLooper/ProPresenter-Parser?style=flat)](https://github.com/FiniteLooper/ProPresenter-Parser/releases/latest)

# ProPresenter-Parser
[ProPresenter](https://renewedvision.com/propresenter/) is a lyric presentation program used by many churches. This project can parses ProPresenter files to extract the basic data, and build ProPresenter files.

**Note:** This is not extensive! ProPresenter has a LOT of options and settings around text formatting, cues, timelines, images, etc. The main focus of this project is to parse the song lyrics from files. The ProPresenter file format changes between versions so it's difficult to support everything, however mhe basics should be mostly covered. Check the documentation below for specifics on the version you need.

## Supported File Versions
| File Version | Parse/Read | Build/Write |
|:-------------|:----------:|:-----------:|
|**4**         | ✅        | 🚫          |
|**5**         | ✅        | ✅          |
|**6**         | ✅        | ✅          |
|**7**         | 🚫        | 🚫          |

### About Version 7
ProPresenter 7 has drastically changed the file format. Perviously the files were formatted in XML, which is super easy to parse and understand. Version 7 is now in a binary format, which is a bit more difficult to parse in the traditional way. Currently I am unfamiliar with parsing or building files in a binary format, so I am most certainly open to suggestions and PRs! There are some very good blog posts about the ProPresenter 7 file format by [GreyShirtGuy](https://greyshirtguy.com/) and his efforts to extract data using C#: [Part 1](https://greyshirtguy.com/blog/pro7fileformat1/) and [Part 2](https://greyshirtguy.com/blog/propresenter-7-file-format-part-2/) | [Part 3](https://greyshirtguy.com/blog/propresenter-7-file-format-part-3/)

For now though, unfortunately ProPresenter 7 files are not able to be parsed by this library. You can export presentations to plain text files _(File > Export > Text)_ to at least get your song lyrics out. If you need to convert these plain text files to other formats you can try using my LyricConverter project: [LyricConverter.net](http://lyricconverter.net) | [LyricConverter Github](https://github.com/FiniteLooper/LyricConverter/)

If you need to create a presentation for ProPresenter 7 I recommend creating/building files with the [v6 file builder](docs/v6-builder.md) in this project and importing those files into ProPresenter 7.

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
