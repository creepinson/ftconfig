import * as fs from "fs";
import YAML = require("js-yaml");
import { IAdapter } from "./adapter.d";

export const json: IAdapter = {
    parse: (str) => {
        try {
            return JSON.parse(str);
        } catch (error) {
            return null;
        }
    },
    stringify: (obj, options = { indent: 2 }) => {
        return JSON.stringify(obj, null, options.indent) + "\n";
    }
};

export const yaml: IAdapter = {
    parse: (str) => {
        try {
            return YAML.safeLoad(str);
        } catch (error) {
            return null;
        }
    },
    stringify: (obj, options?) => {
        return YAML.safeDump(obj) + "\n";
    }
};

export const raw: IAdapter<string> = {
    parse: (str) => str,
    stringify: (str) => str
};
