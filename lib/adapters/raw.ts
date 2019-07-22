export = {
    key: "raw",
    match: null,
    parse(str) {
        return str;
    },
    stringify(obj, options = { indent: 2 }) {
        return obj;
    }
};
