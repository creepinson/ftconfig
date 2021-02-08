import { IAdapter } from "../adapter";

export = {
    key: "ini",
    match: /\.ini$/,
    async parse(str) {
        try {
            const INI = await import("ini");
            return INI.parse(str);
        } catch (error) {
            return null;
        }
    },
    async stringify(obj) {
        const INI = await import("ini");
        return INI.stringify(obj) + "\n";
    },
} as IAdapter;
