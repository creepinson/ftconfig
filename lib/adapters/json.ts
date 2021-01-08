export = {
    key: "json",
    match: /\.json$/,
    parse(str) {
        return JSON.parse(str);
    },
    stringify(obj, options = { indent: 2 }) {
        return JSON.stringify(obj, null, options.indent) + "\n";
    },
};
