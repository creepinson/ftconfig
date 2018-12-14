import test from "ava";
import * as config from "../lib";
import { copyFileMacro } from "./macros";
import { createNewFilepath } from "./utils";

let filepath: string;

test.beforeEach(async () => {
    filepath = await copyFileMacro("travis.yml");
});

test("Read File", (t) => {
    const obj = config.readFile(filepath).toObject();
    t.is(obj.language, "node_js");
});

test("Save File", (t) => {
    const newFilepath = createNewFilepath() + ".yml";
    config.readFile(filepath).save(newFilepath);
    const obj = config.readFile(newFilepath).toObject();
    t.is(obj.language, "node_js");
});
