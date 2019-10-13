"use strict";
module.exports = {
    key: "json5",
    match: /\.json5$/,
    parse(str) {
        const JSON5 = require("json5");
        try {
            return JSON5.parse(str);
        }
        catch (error) {
            return null;
        }
    },
    stringify(obj, options = { indent: 2 }) {
        const JSON5 = require("json5");
        return JSON5.stringify(obj, null, options.indent) + "\n";
    }
};
