import * as config from "../lib";
import test from "./ava";
import { copyFileMacro } from "./common/macros";
import { createNewFilepath } from "./common/utils";

test.beforeEach(async (t) => {
    t.context.FILENAME = "travis.yml";
    t.context.filepath = await copyFileMacro(t.context.FILENAME);
});

test("Read File", (t) => {
    const { filepath } = t.context;
    const obj = config.readFile(filepath).toObject();
    t.is(obj.language, "node_js");
});

test("Save File", (t) => {
    const { FILENAME, filepath } = t.context;

    const newFilepath = createNewFilepath(FILENAME);
    config.readFile(filepath).save({ path: newFilepath });
    const obj = config.readFile(newFilepath).toObject();
    t.is(obj.language, "node_js");
});

test("Modify Object", (t) => {
    const { filepath } = t.context;

    const obj = config
        .readFile(filepath)
        .modify((o) => {
            o.language = "test";
            return o;
        })
        .toObject();
    t.is(obj.language, "test");
});
