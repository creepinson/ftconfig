import * as fs from "fs";
import * as config from "../lib";
import test from "./ava";
import { copyFileMacro } from "./common/macros";
import { createNewFilepath } from "./common/utils";

test.beforeEach("Init", async (t) => {
    t.context.FILENAME = "pkg.json";
    t.context.filepath = await copyFileMacro(t.context.FILENAME);
});

test("Read File", async (t) => {
    const { filepath } = t.context;
    const obj = (await config.readFile(filepath)).toObject();
    t.is(obj.name, "ftconfig");
});

test("Save File", async (t) => {
    const { FILENAME, filepath } = t.context;
    const newFilepath = createNewFilepath(FILENAME);
    await (await config.readFile(filepath)).save({ path: newFilepath });
    t.true(fs.existsSync(newFilepath));
    const obj = (await config.readFile(newFilepath)).toObject();
    t.is(obj.name, "ftconfig");
});

test("Modify Object", async (t) => {
    const { filepath } = t.context;
    const obj = (
        await (await config.readFile(filepath)).modify(async (o) => {
            o.name = "test";
            return o;
        })
    ).toObject();
    t.is(obj.name, "test");
});
