import YAML from "js-yaml";

export = {
    key: "yaml",
    match: /\.ya?ml$/,
    parse(str) {
        return YAML.load(str);
    },
    stringify(obj, options = { indent: 2 }) {
        return YAML.dump(obj, options) + "\n";
    },
};
