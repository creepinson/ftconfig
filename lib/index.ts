import * as fs from "fs";
import * as path from "path";
import { IAdapter } from "./adapter";
import { getAdapter, getMatchAdapter } from "./adapters";
import { IReadFileOptions, IReadOptions } from "./options";
import { WriteConfig } from "./WriteConfig";

export { WriteConfig };
export * from "./options";
export * from "./adapters";
export * from "./adapter";

/**
 * Reads a config object from a string.
 */
export const read = <T = Record<string, unknown>>(
    data: string,
    options: string | IReadOptions
) => {
    if (typeof options === "string")
        options = {
            type: options,
        };

    let adapter: IAdapter = getAdapter(options.type);
    if (!adapter) {
        options.type = "raw";
        adapter = getAdapter(options.type);
    }

    const obj: T = adapter.parse(data) as T;
    return new WriteConfig(obj, options);
};

/**
 * Reads a config object from a file path.
 */
export const readFile = <T = Record<string, unknown>>(
    p: fs.PathLike,
    options?: IReadFileOptions
) => {
    if (!fs.existsSync(p)) throw new Error(p.toString());

    if (!fs.statSync(p).isFile()) throw new Error(p.toString());

    if (!options) options = {} as never;

    if (!options.type) {
        options.type = "raw";
        const filename = path.basename(p.toString());
        const adapter = getMatchAdapter(filename);
        if (adapter) options.type = adapter.key;
    }
    if (!options.path) options.path = p.toString();

    if (!options.encoding) options.encoding = "utf-8";

    const data = fs.readFileSync(options.path, { encoding: options.encoding });
    return read<T>(data, options);
};
