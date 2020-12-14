import HJSON from "hjson";

export = {
    key: "hjson",
    match: /\.hjson$/,
    parse(str) {
        try {
            return HJSON.parse(str);
        } catch (error) {
            return null;
        }
    },
    stringify(obj, options = { indent: 2 }) {
        return HJSON.stringify(obj, { space: options.indent }) + "\n";
    },
};
