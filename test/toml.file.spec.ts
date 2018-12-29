import test from "ava";
import * as fs from "fs";
import * as config from "../lib";
import { copyFileMacro } from "./common/macros";
import { createNewFilepath } from "./common/utils";

test.beforeEach(async (t) => {
    t.context.FILENAME = "test.toml";
    t.context.filepath = await copyFileMacro(t.context.FILENAME);
});

test("Read File", (t) => {
    const { filepath } = t.context;

    const obj = config.readFile(filepath).toObject();
    t.is(obj.owner.organization, "Arylo");
    t.true(Array.isArray(obj.clients.hosts));
    t.true(Array.isArray(obj.database.ports));
    t.true(!!obj.servers.alpha);
    t.true(!!obj.servers.beta);
});

test("Save File", async (t) => {
    const { FILENAME, filepath } = t.context;

    const newFilepath = createNewFilepath(FILENAME);
    config.readFile(filepath).save(newFilepath);
    t.true(fs.existsSync(newFilepath));
    const obj = config.readFile(newFilepath).toObject();
    t.is(obj.owner.organization, "Arylo");
    t.true(Array.isArray(obj.clients.hosts));
    t.true(Array.isArray(obj.database.ports));
    t.true(!!obj.servers.alpha);
    t.true(!!obj.servers.beta);
});

test("Modify Object", (t) => {
    const { filepath } = t.context;

    const obj = config
        .readFile(filepath)
        .modify((o) => {
            o.title = "test";
            return o;
        })
        .toObject();
    t.is(obj.title, "test");
});
