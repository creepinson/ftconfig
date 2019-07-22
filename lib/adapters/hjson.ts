export = {
    key: "hjson",
    match: /\.hjson$/,
    parse(str) {
        const HJSON = require("hjson");
        try {
            return HJSON.parse(str);
        } catch (error) {
            return null;
        }
    },
    stringify(obj, options = { indent: 2 }) {
        const HJSON = require("hjson");
        return HJSON.stringify(obj, { space: options.indent }) + "\n";
    }
};
