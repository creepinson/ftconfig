import * as config from "../lib";
import test from "./ava";
import { copyFileMacro } from "./common/macros";

let filepath: string;
test.beforeEach(async () => {
    filepath = await copyFileMacro("raw.file");
});

test("Read File with JSON type", async (t) => {
    const str = (await config.readFile(filepath)).toObject();
    t.is(typeof str, "string");
    const obj = (await config.readFile(filepath, { type: "json" })).toObject();
    t.is(typeof obj, "object");
});

test("Read File with RAW type", async (t) => {
    const str1 = (await config.readFile(filepath)).toObject();
    const str2 = (await config.readFile(filepath, { type: "raw" })).toObject();
    t.is(str1, str2);
});
