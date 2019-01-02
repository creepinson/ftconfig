import * as config from "../lib";
import test from "./ava";
import { copyFileMacro } from "./common/macros";

let filepath: string;
test.beforeEach(async () => {
    filepath = await copyFileMacro("raw.file");
});

test("Read File with JSON type", (t) => {
    const str = config.readFile(filepath).toObject();
    t.is(typeof str, "string");
    const obj = config.readFile(filepath, { type: "json" }).toObject();
    t.is(typeof obj, "object");
});

test("Read File with RAW type", (t) => {
    const str1 = config.readFile(filepath).toObject();
    const str2 = config.readFile(filepath, { type: "raw" }).toObject();
    t.is(str1, str2);
});
