import TOML = require("@iarna/toml");
import HJSON = require("hjson");
import INI = require("ini");
import YAML = require("js-yaml");
import JSON5 = require("json5");
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

export const ini: IAdapter = {
    parse: (str) => {
        try {
            return INI.parse(str);
        } catch (error) {
            return null;
        }
    },
    stringify: (obj, options?) => {
        return INI.stringify(obj) + "\n";
    }
};

export const toml: IAdapter = {
    parse: (str) => {
        try {
            return TOML.parse(str);
        } catch (error) {
            return null;
        }
    },
    stringify: (obj, options?) => {
        return TOML.stringify(obj) + "\n";
    }
};

export const json5: IAdapter = {
    parse: (str) => {
        try {
            return JSON5.parse(str);
        } catch (error) {
            return null;
        }
    },
    stringify: (obj, options = { indent: 2 }) => {
        return JSON5.stringify(obj, null, options.indent) + "\n";
    }
};

export const hjson: IAdapter = {
    parse: (str) => {
        try {
            return HJSON.parse(str);
        } catch (error) {
            return null;
        }
    },
    stringify: (obj, options = { indent: 2 }) => {
        return HJSON.stringify(obj, { space: options.indent }) + "\n";
    }
};

export const raw: IAdapter<string> = {
    parse: (str) => str,
    stringify: (str) => str
};
