import TOML from "@iarna/toml";

export = {
    key: "toml",
    match: /\.toml$/,
    parse(str) {
        return TOML.parse(str);
    },
    stringify(obj, options = { indent: 2 }) {
        return TOML.stringify(obj) + "\n";
    },
};
