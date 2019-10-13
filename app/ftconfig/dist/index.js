"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const adapters_1 = require("./adapters");
const WriteConfig_1 = require("./WriteConfig");
exports.read = (data, options) => {
    if (typeof options === "string") {
        options = {
            type: options
        };
    }
    let adapter = adapters_1.getAdapter(options.type);
    if (!adapter) {
        options.type = "raw";
        adapter = adapters_1.getAdapter(options.type);
    }
    const obj = adapter.parse(data);
    return new WriteConfig_1.WriteConfig(obj, options);
};
exports.readFile = (p, options) => {
    if (!fs.existsSync(p)) {
        throw new Error(p.toString());
    }
    if (!fs.statSync(p).isFile()) {
        throw new Error(p.toString());
    }
    if (!options) {
        options = {};
    }
    if (!options.type) {
        options.type = "raw";
        const filename = path.basename(p.toString());
        const adapter = adapters_1.getMatchAdapter(filename);
        if (adapter) {
            options.type = adapter.key;
        }
    }
    if (!options.path) {
        options.path = p.toString();
    }
    if (!options.encoding) {
        options.encoding = "utf-8";
    }
    const data = fs.readFileSync(options.path, { encoding: options.encoding });
    return exports.read(data, options);
};
