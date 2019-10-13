export = {
    key: "ini",
    match: /\.ini$/,
    parse(str) {
        const INI = require("ini");
        try {
            return INI.parse(str);
        } catch (error) {
            return null;
        }
    },
    stringify(obj, options = { indent: 2 }) {
        const INI = require("ini");
        return INI.stringify(obj) + "\n";
    }
};
