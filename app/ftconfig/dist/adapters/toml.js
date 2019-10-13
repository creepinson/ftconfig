"use strict";
module.exports = {
    key: "toml",
    match: /\.toml$/,
    parse(str) {
        const TOML = require("@iarna/toml");
        try {
            return TOML.parse(str);
        }
        catch (error) {
            return null;
        }
    },
    stringify(obj, options = { indent: 2 }) {
        const TOML = require("@iarna/toml");
        return TOML.stringify(obj) + "\n";
    }
};
