"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const makeDir = require("make-dir");
const path = require("path");
const adapters_1 = require("./adapters");
class WriteConfig {
    constructor(obj, options) {
        this.obj = obj;
        this.options = options;
        this.adapter = adapters_1.getAdapter(this.options.type);
    }
    modify(fn) {
        this.obj = fn(this.obj);
        return this;
    }
    save(pathOrOptions) {
        let options = {};
        if (typeof pathOrOptions === "string") {
            options.path = pathOrOptions;
        }
        options = Object.assign({
            encoding: "utf-8",
            indent: 2
        }, this.options, options);
        if (options.path && options.encoding) {
            if (!fs.existsSync(path.dirname(options.path))) {
                makeDir.sync(path.dirname(options.path));
            }
            const data = this.toString(options);
            fs.writeFileSync(options.path, data, {
                encoding: options.encoding
            });
        }
        return this;
    }
    toString(options) {
        return this.adapter.stringify(this.obj, options);
    }
    toObject() {
        return this.obj;
    }
}
exports.WriteConfig = WriteConfig;
