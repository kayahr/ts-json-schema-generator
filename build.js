import { join } from "node:path";
import esbuild from "esbuild";
import esbuildPluginLicense from "esbuild-plugin-license";

const outdir = "lib";
const outfile = join(outdir, "ts-json-schema-generator.mjs");

function describeAuthor(author) {
    if (author instanceof Object) {
        let description = `Author: ${author.name}`;
        if (author.email != null) {
            description += ` <${author.email}>`;
        }
        return description;
    }
    return null;
}

const banner = `#!/usr/bin/env node
import { fileURLToPath as ___fileURLToPath } from "node:url";
import { dirname as ___dirname } from "node:path";
import { createRequire as ___createRequire} from "node:module";
const __filename = ___fileURLToPath(import.meta.url);
const __dirname = ___dirname(__filename);
const require = ___createRequire(import.meta.url);`;

// Bundle ts-json-schema-generator
await esbuild.build({
    entryPoints: [ "./node_modules/ts-json-schema-generator/dist/ts-json-schema-generator.js" ],
    outfile,
    external: [
        "typescript"
    ],
    platform: "node",
    target: "node20",
    format: "esm",
    bundle: true,
    minify: true,
    banner: { js: banner },
    plugins: [
        esbuildPluginLicense({
            thirdParty: {
                output: {
                    file: 'lib/LICENSE-THIRD-PARTY.txt',
                    // Template function that can be defined to customize report output
                    template(dependencies) {
                        return [
                            "This file lists third-party dependencies bundled with this package, along with their license information.",
                            ...dependencies.map((dependency) => [
                                `${dependency.packageJson.name} v${dependency.packageJson.version}`,
                                describeAuthor(dependency.packageJson.author),
                                `License: ${dependency.packageJson.license}`,
                                "",
                                dependency.licenseText.trim() || "(No LICENSE file found)",
                            ].filter(a => a != null).join("\n"))
                        ].join("\n\n-----\n\n");
                    }
                }
            }
       })
    ]
});
