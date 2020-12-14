# ftconfig

F*ck the config

[![node][NPM_URL]][NPM_HREF]
[![Known Vulnerabilities][SNYK_URL]][SNYK_HREF]
[![Author][AUTHOR_URL]][AUTHOR_HREF]
[![MIT-License][LICENSE_URL]][LICENSE_HREF]
![npm type definitions][TYPE_URL]

## Installation

```bash
npm install @theoparis/config
```

## Usage

```typescript
const ftconfig = require("@theoparis/config");
const config = ftconfig.readFile("./package.json")
    .modify((obj) => {
        config.name = "simple";
        return obj
    })
    .save();
const obj = config.toObject();
```

## Module Methods

### ftconfig.readFile(filepath, [options])

#### Parameters

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

#### Parameters

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

#### Parameters

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

#### Parameters

- `configString` `{Function}` Get which type Return what

#### Return

Class `Config`

### Config.validate(modify, [options])

#### Parameters

- `modify` `{boolean}` Modify the config object or just validate it
- `callback` `{Function}`

#### Return

Class `Config`

### Config.save([filepath])

#### Parameters

- `filepath` `{String}` Target Filepath

#### Return

Class `Config`

### Config.save([options])

#### Parameters

- `options` `{Object}`
    + `path` `{String}`
    + `encoding` `{String="utf-8"}`
    + `indent` `{Number=2}`

#### Return

Class `Config`

### Config.toString([options])

#### Parameters

- `options` `{any}`

#### Return

`String`

### Config.toObject()

#### Return

`Object`

[NPM_URL]: https://img.shields.io/node/v/ftconfig.svg?style=flat-square&maxAge=600

[NPM_HREF]: https://www.npmjs.com/package/ftconfig

[TRAVIS_URL]: https://img.shields.io/travis/creepinson/ftconfig/master.svg?style=flat-square&logo=travis&maxAge=600

[TRAVIS_HREF]: https://travis-ci.org/creepinson/ftconfig

[COVERALLS_URL]: https://img.shields.io/coveralls/github/creepinson/ftconfig/master.svg?style=flat-square&maxAge=600

[COVERALLS_HREF]: https://coveralls.io/github/creepinson/ftconfig

[SNYK_URL]: https://snyk.io/test/github/creepinson/ftconfig/badge.svg?style=flat-square&maxAge=600

[SNYK_HREF]: https://snyk.io/test/github/creepinson/ftconfig

[AUTHOR_URL]: https://img.shields.io/badge/Author-creepinson-blue.svg?style=flat-square&maxAge=7200

[AUTHOR_HREF]: https://github.com/creepinson

[LICENSE_URL]: https://img.shields.io/github/license/creepinson/ftconfig.svg?style=flat-square&maxAge=7200

[LICENSE_HREF]: https://opensource.org/licenses/MIT

[TYPE_URL]: https://img.shields.io/npm/types/@theoparis/config?style=flat-square
