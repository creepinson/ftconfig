import * as fs from "fs";
import * as config from "../lib";
import test from "./ava";
import { copyFileMacro } from "./common/macros";
import { createNewFilepath } from "./common/utils";

test.beforeEach(async (t) => {
    t.context.FILENAME = "test.json5";
    t.context.filepath = await copyFileMacro(t.context.FILENAME);
});

test("Read File", async (t) => {
    const { filepath } = t.context;
    const obj = (await config.readFile(filepath)).toObject();
    t.is(obj.positiveSign, 1);
    t.true(Array.isArray(obj.andIn));
});

test("Save File", async (t) => {
    const { FILENAME, filepath } = t.context;

    const newFilepath = createNewFilepath(FILENAME);
    await (await config.readFile(filepath)).save({ path: newFilepath });
    t.true(fs.existsSync(newFilepath));
    const obj = (await config.readFile(newFilepath)).toObject();
    t.is(obj.positiveSign, 1);
    t.true(Array.isArray(obj.andIn));
});

test("Modify Object", async (t) => {
    const { filepath } = t.context;
    const obj = (
        await (await config.readFile<{ andIn: string[] }>(filepath)).modify(
            async (o) => {
                o.andIn.push("test");
                return o;
            }
        )
    ).toObject();
    t.is(obj.andIn.length, 2);
});
