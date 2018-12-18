import test from "ava";
import * as fs from "fs";
import * as config from "../lib";
import { copyFileMacro } from "./common/macros";
import { createNewFilepath } from "./common/utils";

const FILENAME = "test.hjson";
let filepath: string;

test.beforeEach(async () => {
    filepath = await copyFileMacro(FILENAME);
});

test("Read File", (t) => {
    const obj = config.readFile(filepath).toObject();
    t.is(obj.rate, 1000);
    t.is(obj.anything, "?");
    t.true(Array.isArray(obj.notice));
});

test("Save File", async (t) => {
    const newFilepath = createNewFilepath(FILENAME);
    config.readFile(filepath).save(newFilepath);
    t.true(fs.existsSync(newFilepath));
    const obj = config.readFile(newFilepath).toObject();
    t.is(obj.rate, 1000);
    t.is(obj.anything, "?");
    t.true(Array.isArray(obj.notice));
});

test("Modify Object", (t) => {
    const obj = config
        .readFile(filepath)
        .modify((o) => {
            o.owner = "Arylo";
            return o;
        })
        .toObject();
    t.is(obj.owner, "Arylo");
});
