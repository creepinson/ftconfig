import * as fs from "fs";
import * as config from "../lib";
import test from "./ava";
import { copyFileMacro } from "./common/macros";
import { createNewFilepath } from "./common/utils";

test.beforeEach(async (t) => {
    t.context.FILENAME = "test.toml";
    t.context.filepath = await copyFileMacro(t.context.FILENAME);
});

const readFile = (t, path: string) => {
    const obj = config
        .readFile<{
            owner: { organization: string };
            clients: {
                hosts: string[];
            };
            database: { ports: number[] };
            servers: { alpha: boolean; beta: boolean };
        }>(path)
        .toObject();
    t.is(obj.owner.organization, "Arylo");
    t.true(Array.isArray(obj.clients.hosts));
    t.true(Array.isArray(obj.database.ports));
    t.true(!!obj.servers.alpha);
    t.true(!!obj.servers.beta);
};

test("Read File", (t) => {
    const { filepath } = t.context;

    readFile(t, filepath);
});

test("Save File", async (t) => {
    const { FILENAME, filepath } = t.context;

    const newFilepath = createNewFilepath(FILENAME);
    config.readFile(filepath).save(newFilepath);
    t.true(fs.existsSync(newFilepath));

    readFile(t, newFilepath);
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
