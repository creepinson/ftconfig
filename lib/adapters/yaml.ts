import YAML from "js-yaml";

export = {
    key: "yaml",
    match: /\.ya?ml$/,
    parse(str) {
        try {
            return YAML.safeLoad(str);
        } catch (error) {
            return null;
        }
    },
    stringify(obj, options = { indent: 2 }) {
        return YAML.safeDump(obj) + "\n";
    },
};
