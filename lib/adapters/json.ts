import { IAdapter } from "../adapter";

export = {
    key: "json",
    match: /\.json$/,
    async parse(str) {
        return JSON.parse(str);
    },
    async stringify(obj, options) {
        return JSON.stringify(obj, null, options.indent) + "\n";
    },
} as IAdapter;
