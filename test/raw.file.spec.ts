import * as config from "../lib";
import test from "./ava";
import { copyFileMacro } from "./common/macros";
import { createNewFilepath } from "./common/utils";

test.beforeEach(async (t) => {
    t.context.FILENAME = "raw.file";
    t.context.filepath = await copyFileMacro(t.context.FILENAME);
});

test("Read File", (t) => {
    const { filepath } = t.context;
    const obj = config.readFile(filepath).toObject();
    t.is(typeof obj, "string");
});

test("Save File", async (t) => {
    const { FILENAME, filepath } = t.context;

    const newFilepath = createNewFilepath(FILENAME);
    config.readFile(filepath).save({ path: newFilepath });
    const obj = config.readFile(newFilepath).toObject();
    t.is(typeof obj, "string");
});
