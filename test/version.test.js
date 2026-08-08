import { describe, it } from "node:test";
import assert from "node:assert";
import packageJSON from "../package.json" with { type: "json" };
import typescriptPackageJSON from "typescript/package.json" with { type: "json" };

describe("version", () => {
    it("matches upstream version", () => {
        const tsJsonSchemaGeneratorVersion = packageJSON.devDependencies["ts-json-schema-generator"];
        const bundleVersion = packageJSON.version;
        assert(bundleVersion.startsWith(`${tsJsonSchemaGeneratorVersion}-bundle.`));
    });

    it("uses TypeScript 6", () => {
        assert.match(
            typescriptPackageJSON.version,
            /^6\./,
            "ts-json-schema-generator no longer uses TypeScript 6; remove the temporary TypeScript embedding"
        );
    });
});
