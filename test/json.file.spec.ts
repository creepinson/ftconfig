import test from "ava";
import * as config from "../lib";
import { copyFileMacro } from "./macros";
import { createNewFilepath } from "./utils";

let filepath: string;

test.beforeEach(async () => {
    filepath = await copyFileMacro("pkg.json");
});

test("Read File", (t) => {
    const obj = config.readFile(filepath).toObject();
    t.is(obj.name, "ftconfig");
});

test("Save File", (t) => {
    const newFilepath = createNewFilepath() + ".json";
    config.readFile(filepath).save(newFilepath);
    const obj = config.readFile(newFilepath).toObject();
    t.is(obj.name, "ftconfig");
});
