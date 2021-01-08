import YAML from "js-yaml";

export = {
    key: "yaml",
    match: /\.ya?ml$/,
    parse(str) {
        try {
            return YAML.load(str);
        } catch (error) {
            return null;
        }
    },
    stringify(obj, options = { indent: 2 }) {
        return YAML.dump(obj, options) + "\n";
    },
};
