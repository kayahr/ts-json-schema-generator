# @kayahr/ts-json-schema-generator

[GitHub] | [NPM]

A drop-in replacement for [ts-json-schema-generator], bundling the tool and all its dependencies into a single module.

This package temporarily bundles TypeScript 6 so it can be used in projects that otherwise use TypeScript 7 without causing dependency conflicts. This compatibility measure only works if the project's source code and TypeScript configuration are also supported by TypeScript 6. It can be removed once ts-json-schema-generator supports TypeScript 7 natively.

This package is primarily for my own use as a single dev dependency across my projects, to centralize the review of updates for the dependencies that ts-json-schema-generator brings along, and to reduce the threat of a supply-chain attack. Use at your own risk.

Usage
-----

Install as development dependency:

```
npm install -DE @kayahr/ts-json-schema-generator
```

Usage is the same as with the original [ts-json-schema-generator], so check upstream documentation for more info.

[GitHub]: https://github.com/kayahr/ts-json-schema-generator
[NPM]: https://www.npmjs.com/package/@kayahr/ts-json-schema-generator
[ts-json-schema-generator]: https://www.npmjs.com/package/ts-json-schema-generator
