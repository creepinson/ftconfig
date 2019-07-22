export = {
    key: "json",
    match: /\.json$/,
    parse(str) {
        try {
            return JSON.parse(str);
        } catch (error) {
            return null;
        }
    },
    stringify(obj, options = { indent: 2 }) {
        return JSON.stringify(obj, null, options.indent) + "\n";
    }
};
