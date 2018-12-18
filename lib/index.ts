import * as fs from "fs";
import * as path from "path";
import * as adapters from "./adapter";
import { IAdapter } from "./adapter.d";
import { IReadFileOptions, IReadOptions } from "./options.d";
import { WriteConfig } from "./WriteConfig";

export const read = <T = any>(data: string, options: string | IReadOptions) => {
    if (typeof options === "string") {
        options = {
            type: options
        };
    }
    let adapter: IAdapter = adapters[options.type];
    if (!adapter) {
        options.type = "raw";
        adapter = adapters[options.type];
    }
    const obj: T = adapter.parse(data);
    return new WriteConfig(obj, options);
};

export const readFile = <T = any>(
    p: fs.PathLike,
    options?: IReadFileOptions
) => {
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
        const matches = [
            {
                match: /\.json$/,
                value: "json"
            },
            {
                match: /\.ya?ml$/,
                value: "yaml"
            },
            {
                match: /\.ini$/,
                value: "ini"
            },
            {
                match: /\.toml$/,
                value: "toml"
            },
            {
                match: /\.json5$/,
                value: "json5"
            },
            {
                match: /\.hjson$/,
                value: "hjson"
            }
        ];
        for (const item of matches) {
            if (item.match.test(filename)) {
                options.type = item.value;
                break;
            }
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
