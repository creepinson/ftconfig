import INI from "ini";

export = {
    key: "ini",
    match: /\.ini$/,
    parse(str) {
        try {
            return INI.parse(str);
        } catch (error) {
            return null;
        }
    },
    stringify(obj, options = { indent: 2 }) {
        return INI.stringify(obj) + "\n";
    },
};
