import { IAdapter } from "../adapter";

export = {
    key: "raw",
    match: null,
    async parse(str) {
        return str;
    },
    async stringify(obj) {
        return obj;
    },
} as IAdapter;
