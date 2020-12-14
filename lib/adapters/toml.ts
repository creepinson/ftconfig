import TOML from "@iarna/toml";

export = {
    key: "toml",
    match: /\.toml$/,
    parse(str) {
        try {
            return TOML.parse(str);
        } catch (error) {
            return null;
        }
    },
    stringify(obj, options = { indent: 2 }) {
        return TOML.stringify(obj) + "\n";
    },
};
