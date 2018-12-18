import test from "ava";
import * as fs from "fs";
import * as config from "../lib";
import { copyFileMacro } from "./common/macros";
import { createNewFilepath } from "./common/utils";

const FILENAME = "test.ini";
let filepath: string;

test.beforeEach(async () => {
    filepath = await copyFileMacro(FILENAME);
});

test("Read File", (t) => {
    const obj = config.readFile(filepath).toObject();
    t.true(!!obj.section.paths.default);
    t.true(Array.isArray(obj.section.paths.default.array));
});

test("Save File", async (t) => {
    const newFilepath = createNewFilepath(FILENAME);
    config.readFile(filepath).save(newFilepath);
    t.true(fs.existsSync(newFilepath));
    const obj = config.readFile(newFilepath).toObject();
    t.true(!!obj.section.paths.default);
    t.true(Array.isArray(obj.section.paths.default.array));
});

test("Modify Object", (t) => {
    const obj = config
        .readFile(filepath)
        .modify((o) => {
            o.section.paths.default.array.push("test");
            return o;
        })
        .toObject();
    t.is(obj.section.paths.default.array.length, 5);
});
