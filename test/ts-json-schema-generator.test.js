import { afterEach, beforeEach, describe, it } from "node:test";
import assert from "node:assert";
import { mkdtemp, cp, mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { exec } from "node:child_process";
import { promisify } from "node:util";

const rawExecAsync = promisify(exec);
const tmpPrefix = join(tmpdir(), "@kayahr-ts-json-schema-generator-");

async function execAsync(command, options) {
    await rawExecAsync(`${command} > stdout.txt 2> stderr.txt`, options);
    return {
        stdout: await readFile(join(options.cwd, "stdout.txt"), "utf8"),
        stderr: await readFile(join(options.cwd, "stderr.txt"), "utf8")
    };
}

describe("ts-json-schema-generator", () => {
    let tmpDir;

    beforeEach(async () => {
        // Create temporary working directory
        tmpDir = await mkdtemp(tmpPrefix);

        // Copy ts-json-schema-generator bundle into bin directory
        const binDir = join(tmpDir, "bin");
        await mkdir(binDir);
        await cp("lib", binDir, { recursive: true });
    });

    afterEach(async () => {
        await rm(tmpDir, { recursive: true });
    });

    it("correctly generates JSON schema for a typescript interface", async () => {
        await writeFile(join(tmpDir, "interface.ts"), "export interface TestInterface { foo: string; bar: number; }\n");
        const { stdout, stderr } = await execAsync("node bin/ts-json-schema-generator.mjs -p interface.ts", { cwd: tmpDir });
        assert.equal(stderr, "");
        assert.deepEqual(JSON.parse(stdout), {
            "$ref": "#/definitions/TestInterface",
            "$schema": "http://json-schema.org/draft-07/schema#",
            "definitions": {
                "TestInterface": {
                "additionalProperties": false,
                "properties": {
                    "bar": {
                        "type": "number"
                    },
                    "foo": {
                        "type": "string"
                    }
                },
                "required": [
                    "foo",
                    "bar"
                ],
                    "type": "object"
                }
            }
        });
    });

    it("correctly outputs help", async () => {
        const { stdout, stderr } = await execAsync("node bin/ts-json-schema-generator.mjs --help", { cwd: tmpDir });
        assert.equal(stderr, "");
        assert.match(stdout, /^Usage: ts-json-schema-generator .*/);
    });
});
