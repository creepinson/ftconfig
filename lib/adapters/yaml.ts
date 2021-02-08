import { IAdapter } from "../adapter";

export = {
    key: "yaml",
    match: /\.ya?ml$/,
    async parse(str) {
        const YAML = await import("js-yaml");
        return YAML.load(str);
    },
    async stringify(obj, options) {
        const YAML = await import("js-yaml");
        return YAML.dump(obj, options) + "\n";
    },
} as IAdapter;
