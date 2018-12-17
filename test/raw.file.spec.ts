import test from "ava";
import * as config from "../lib";
import { copyFileMacro } from "./common/macros";
import { createNewFilepath, sleep } from "./common/utils";

let filepath: string;

test.beforeEach(async () => {
    filepath = await copyFileMacro("raw.file");
});

test("Read File", (t) => {
    const obj = config.readFile(filepath).toObject();
    t.is(typeof obj, "string");
});

test("Save File", async (t) => {
    const newFilepath = createNewFilepath("raw.file");
    config.readFile(filepath).save(newFilepath);
    const obj = config.readFile(newFilepath).toObject();
    t.is(typeof obj, "string");
});
