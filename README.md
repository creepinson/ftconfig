# ftconfig

F*ck the config

[![node][NPM_URL]][NPM_HREF]
[![Travis][TRAVIS_URL]][TRAVIS_HREF]
[![Coveralls][COVERALLS_URL]][COVERALLS_HREF]
[![Known Vulnerabilities][SNYK_URL]][SNYK_HREF]
[![David][DAVID_URL]][DAVID_HREF]
[![Author][AUTHOR_URL]][AUTHOR_HREF]
[![MIT-License][LICENSE_URL]][LICENSE_HREF]
[![996ICU-License][LICENSE_996_URL]][LICENSE_996_HREF]

## Usage

### Install with npm

```bash
npm install ftconfig
```

```typescript
const ftconfig = require("ftconfig");
const config = ftconfig.loadFile("./package.json")
  .modify((obj) => {
    config.name = "simple";
    return obj
  })
  .save();
const obj = config.toObject();
```

## Module Methods

### ftconfig.readFile(filepath, [options])

#### Paramseters

- `filepath` `{String}` Filepath
- `options` `{Object}`
  + `encoding` `{String="utf-8"}`
  + `type` `{String}`
    - `yaml`
    - `json`
    - `json5`
    - `hjson`
    - `toml`
    - `ini`

#### Return

Class `Config`

### ftconfig.read(configString, [options])

#### Paramseters

- `configString` `{String}` config string
- `options` `{Object}`
  + `type` `{String}`
    - `yaml`
    - `json`
    - `json5`
    - `hjson`
    - `toml`
    - `ini`

#### Return

Class `Config`

### ftconfig.read(configString, [type])

#### Paramseters

- `configString` `{String}` config string
- `type` `{String}`
  - `yaml`
  - `json`
  - `json5`
  - `hjson`
  - `toml`
  - `ini`

#### Return

Class `Config`

### Config.modify(function)

#### Paramseters

- `configString` `{Function}` Get which type Return what

#### Return

Class `Config`

### Config.save([filepath])

#### Paramseters

- `filepath` `{String}` Targe Filepath

#### Return

Class `Config`

### Config.save([options])

#### Paramseters

- `options` `{Object}`
  + `path` `{String}`
  + `encoding` `{String="utf-8"}`
  + `indent` `{Number=2}`

#### Return

Class `Config`

### Config.toString([options])

#### Paramseters

- `options` `{any}`

#### Return

`String`

### Config.toObject()

#### Return

`Object`

[NPM_URL]: https://img.shields.io/node/v/ftconfig.svg?style=flat-square&maxAge=600
[NPM_HREF]: https://www.npmjs.com/package/ftconfig
[TRAVIS_URL]: https://img.shields.io/travis/Arylo/ftconfig/master.svg?style=flat-square&logo=travis&maxAge=600
[TRAVIS_HREF]: https://travis-ci.org/Arylo/ftconfig
[COVERALLS_URL]: https://img.shields.io/coveralls/github/Arylo/ftconfig/master.svg?style=flat-square&maxAge=600
[COVERALLS_HREF]: https://coveralls.io/github/Arylo/ftconfig
[SNYK_URL]: https://snyk.io/test/github/Arylo/ftconfig/badge.svg?style=flat-square&maxAge=600
[SNYK_HREF]: https://snyk.io/test/github/Arylo/ftconfig
[DAVID_URL]: https://img.shields.io/david/Arylo/ftconfig.svg?style=flat-square&maxAge=600
[DAVID_HREF]: https://github.com/Arylo/ftconfig
[AUTHOR_URL]: https://img.shields.io/badge/Author-AryloYeung-blue.svg?style=flat-square&maxAge=7200
[AUTHOR_HREF]: https://github.com/arylo
[LICENSE_URL]: https://img.shields.io/github/license/Arylo/npm-project-init.svg?style=flat-square&maxAge=7200
[LICENSE_HREF]: https://opensource.org/licenses/MIT

[LICENSE_996_URL]: https://img.shields.io/badge/license-NPL%20(The%20996%20Prohibited%20License)-blue.svg?style=flat-square&maxAge=7200
[LICENSE_996_HREF]: https://github.com/996icu/996.ICU