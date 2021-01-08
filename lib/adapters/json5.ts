import JSON5 from "json5";

export = {
    key: "json5",
    match: /\.json5$/,
    parse(str) {
        return JSON5.parse(str);
    },
    stringify(obj, options = { indent: 2 }) {
        return JSON5.stringify(obj, null, options.indent) + "\n";
    },
};
