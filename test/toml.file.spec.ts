import test from "ava";
import * as fs from "fs";
import * as config from "../lib";
import { copyFileMacro } from "./common/macros";
import { createNewFilepath } from "./common/utils";

const FILENAME = "test.toml";
let filepath: string;

test.beforeEach(async () => {
    filepath = await copyFileMacro(FILENAME);
});

test("Read File", (t) => {
    const obj = config.readFile(filepath).toObject();
    t.is(obj.owner.organization, "Arylo");
    t.true(Array.isArray(obj.clients.hosts));
    t.true(Array.isArray(obj.database.ports));
    t.true(!!obj.servers.alpha);
    t.true(!!obj.servers.beta);
});

test("Save File", async (t) => {
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
    const obj = config
        .readFile(filepath)
        .modify((o) => {
            o.title = "test";
            return o;
        })
        .toObject();
    t.is(obj.title, "test");
});
