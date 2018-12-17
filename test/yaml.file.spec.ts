import test from "ava";
import * as config from "../lib";
import { copyFileMacro } from "./common/macros";
import { createNewFilepath } from "./common/utils";

let filepath: string;

test.beforeEach(async () => {
    filepath = await copyFileMacro("travis.yml");
});

test("Read File", (t) => {
    const obj = config.readFile(filepath).toObject();
    t.is(obj.language, "node_js");
});

test("Save File", (t) => {
    const newFilepath = createNewFilepath("travis.yml");
    config.readFile(filepath).save(newFilepath);
    const obj = config.readFile(newFilepath).toObject();
    t.is(obj.language, "node_js");
});

test("Modify Object", (t) => {
    const obj = config
        .readFile(filepath)
        .modify((o) => {
            o.language = "test";
            return o;
        })
        .toObject();
    t.is(obj.language, "test");
});
