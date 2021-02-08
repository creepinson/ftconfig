import { IAdapter } from "../adapter";

export = {
    key: "json5",
    match: /\.json5$/,
    async parse(str) {
        const JSON5 = await import("json5");
        return JSON5.parse(str);
    },
    async stringify(obj, options) {
        const JSON5 = await import("json5");
        return JSON5.stringify(obj, null, options.indent) + "\n";
    },
} as IAdapter;
