import * as fs from "fs";
import * as config from "../lib";
import test from "./ava";
import { copyFileMacro } from "./common/macros";
import { createNewFilepath } from "./common/utils";

export type Section = { section: { paths: { default: { array: string[] } } } };

test.beforeEach(async (t) => {
    t.context.FILENAME = "test.ini";
    t.context.filepath = await copyFileMacro(t.context.FILENAME);
});

test("Read File", (t) => {
    const { filepath } = t.context;
    const obj = config.readFile<Section>(filepath).toObject();
    t.true(!!obj.section.paths.default);
    t.true(Array.isArray(obj.section.paths.default.array));
});

test("Save File", async (t) => {
    const { FILENAME, filepath } = t.context;

    const newFilepath = createNewFilepath(FILENAME);
    config.readFile(filepath).save({ path: newFilepath });
    t.true(fs.existsSync(newFilepath));
    const obj = config.readFile<Section>(newFilepath).toObject();
    t.true(!!obj.section.paths.default);
    t.true(Array.isArray(obj.section.paths.default.array));
});

test("Modify Object", (t) => {
    const { filepath } = t.context;
    const obj = config
        .readFile<Section>(filepath)
        .modify((o) => {
            o.section.paths.default.array.push("test");
            return o;
        })
        .toObject();
    t.is(obj.section.paths.default.array.length, 5);
});
