import * as fs from "fs";
import * as config from "../lib";
import test from "./ava";
import { copyFileMacro } from "./common/macros";
import { createNewFilepath } from "./common/utils";

test.beforeEach("Init", async (t) => {
    t.context.FILENAME = "pkg.json";
    t.context.filepath = await copyFileMacro(t.context.FILENAME);
});

test("Read File", (t) => {
    const { filepath } = t.context;
    const obj = config.readFile(filepath).toObject();
    t.is(obj.name, "ftconfig");
});

test("Save File", async (t) => {
    const { FILENAME, filepath } = t.context;
    const newFilepath = createNewFilepath(FILENAME);
    config.readFile(filepath).save({ path: newFilepath });
    t.true(fs.existsSync(newFilepath));
    const obj = config.readFile(newFilepath).toObject();
    t.is(obj.name, "ftconfig");
});

test("Modify Object", (t) => {
    const { filepath } = t.context;
    const obj = config
        .readFile(filepath)
        .modify((o) => {
            o.name = "test";
            return o;
        })
        .toObject();
    t.is(obj.name, "test");
});
