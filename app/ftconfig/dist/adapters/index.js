"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
exports.adapters = fs_1.readdirSync(__dirname)
    .filter((filename) => "index.js" !== filename)
    .filter((filename) => /\.js$/.test(filename))
    .map((filename) => require(path_1.resolve(__dirname, filename)));
function getAdapter(typeName) {
    for (const adapterObj of exports.adapters) {
        if (adapterObj.key === typeName) {
            return adapterObj;
        }
    }
    return null;
}
exports.getAdapter = getAdapter;
function getMatchAdapter(filename) {
    for (const adapterObj of exports.adapters) {
        if (adapterObj.match && adapterObj.match.test(filename)) {
            return adapterObj;
        }
    }
    return null;
}
exports.getMatchAdapter = getMatchAdapter;
