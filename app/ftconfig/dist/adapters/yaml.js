"use strict";
module.exports = {
    key: "yaml",
    match: /\.ya?ml$/,
    parse(str) {
        const YAML = require("js-yaml");
        try {
            return YAML.safeLoad(str);
        }
        catch (error) {
            return null;
        }
    },
    stringify(obj, options = { indent: 2 }) {
        const YAML = require("js-yaml");
        return YAML.safeDump(obj) + "\n";
    }
};
