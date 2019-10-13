import * as fs from "fs";
import * as path from "path";
import { IAdapter } from "./adapter.d";
import { getAdapter, getMatchAdapter } from "./adapters";
import { IReadFileOptions, IReadOptions } from "./options.d";
import { WriteConfig } from "./WriteConfig";

export const read = <T = any>(data: string, options: string | IReadOptions) => {
    if (typeof options === "string") {
        options = {
            type: options
        };
    }
    let adapter: IAdapter = getAdapter(options.type);
    if (!adapter) {
        options.type = "raw";
        adapter = getAdapter(options.type);
    }
    const obj: T = adapter.parse(data);
    return new WriteConfig(obj, options);
};

export const readFile = <T = any>(p: fs.PathLike, options?: IReadFileOptions) => {
    if (!fs.existsSync(p)) {
        throw new Error(p.toString());
    }
    if (!fs.statSync(p).isFile()) {
        throw new Error(p.toString());
    }
    if (!options) {
        options = {} as any;
    }
    if (!options.type) {
        options.type = "raw";
        const filename = path.basename(p.toString());
        const adapter = getMatchAdapter(filename);
        if (adapter) {
            options.type = adapter.key;
        }
    }
    if (!options.path) {
        options.path = p.toString();
    }
    if (!options.encoding) {
        options.encoding = "utf-8";
    }
    const data = fs.readFileSync(options.path, { encoding: options.encoding });
    return read<T>(data, options);
};
