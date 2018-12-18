import test from "ava";
import * as fs from "fs";
import * as config from "../lib";
import { copyFileMacro } from "./common/macros";
import { createNewFilepath } from "./common/utils";

const FILENAME = "test.json5";
let filepath: string;

test.beforeEach(async () => {
    filepath = await copyFileMacro(FILENAME);
});

test("Read File", (t) => {
    const obj = config.readFile(filepath).toObject();
    t.is(obj.positiveSign, 1);
    t.true(Array.isArray(obj.andIn));
});

test("Save File", async (t) => {
    const newFilepath = createNewFilepath(FILENAME);
    config.readFile(filepath).save(newFilepath);
    t.true(fs.existsSync(newFilepath));
    const obj = config.readFile(newFilepath).toObject();
    t.is(obj.positiveSign, 1);
    t.true(Array.isArray(obj.andIn));
});

test("Modify Object", (t) => {
    const obj = config
        .readFile(filepath)
        .modify((o) => {
            o.andIn.push("test");
            return o;
        })
        .toObject();
    t.is(obj.andIn.length, 2);
});
