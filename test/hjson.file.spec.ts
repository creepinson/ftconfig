import test from "ava";
import * as fs from "fs";
import * as config from "../lib";
import { copyFileMacro } from "./common/macros";
import { createNewFilepath } from "./common/utils";

test.beforeEach(async (t) => {
    t.context.FILENAME = "test.hjson";
    t.context.filepath = await copyFileMacro(t.context.FILENAME);
});

test("Read File", (t) => {
    const { filepath } = t.context;
    const obj = config.readFile(filepath).toObject();
    t.is(obj.rate, 1000);
    t.is(obj.anything, "?");
    t.true(Array.isArray(obj.notice));
});

test("Save File", async (t) => {
    const { FILENAME, filepath } = t.context;
    const newFilepath = createNewFilepath(FILENAME);
    config.readFile(filepath).save(newFilepath);
    t.true(fs.existsSync(newFilepath));
    const obj = config.readFile(newFilepath).toObject();
    t.is(obj.rate, 1000);
    t.is(obj.anything, "?");
    t.true(Array.isArray(obj.notice));
});

test("Modify Object", (t) => {
    const { filepath } = t.context;
    const obj = config
        .readFile(filepath)
        .modify((o) => {
            o.owner = "Arylo";
            return o;
        })
        .toObject();
    t.is(obj.owner, "Arylo");
});
