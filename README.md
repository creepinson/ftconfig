# ftconfig

F\*ck the config

[![node][npm_url]][npm_href]
[![Known Vulnerabilities][snyk_url]][snyk_href]
[![Author][author_url]][author_href]
[![MIT-License][license_url]][license_href]
![npm type definitions][type_url]

## Installation

```bash
npm install @theoparis/config
```

## Usage

```typescript
import { readFile } from "@theoparis/config";

(async function () {
    const config = await
        .readFile("./package.json");
    await config.modify(async (obj) => {
            config.name = "simple";
            return obj;
        })
    await config.save({ path: "./package.json" });
    // {name: "simple", ...}
    const obj = config.toObject();
})()
```

## Documentation

Better documentation coming soon.

[npm_url]: https://img.shields.io/node/v/@theoparis/config.svg?style=flat-square&maxAge=600
[npm_href]: https://www.npmjs.com/package/@theoparis/config
[travis_url]: https://img.shields.io/travis/creepinson/ftconfig/master.svg?style=flat-square&logo=travis&maxAge=600
[travis_href]: https://travis-ci.org/creepinson/ftconfig
[coveralls_url]: https://img.shields.io/coveralls/github/creepinson/ftconfig/master.svg?style=flat-square&maxAge=600
[coveralls_href]: https://coveralls.io/github/creepinson/ftconfig
[snyk_url]: https://snyk.io/test/github/creepinson/ftconfig/badge.svg?style=flat-square&maxAge=600
[snyk_href]: https://snyk.io/test/github/creepinson/ftconfig
[author_url]: https://img.shields.io/badge/Author-creepinson-blue.svg?style=flat-square&maxAge=7200
[author_href]: https://github.com/creepinson
[license_url]: https://img.shields.io/github/license/creepinson/ftconfig.svg?style=flat-square&maxAge=7200
[license_href]: https://opensource.org/licenses/MIT
[type_url]: https://img.shields.io/npm/types/@theoparis/config?style=flat-square
