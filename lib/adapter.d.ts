import * as fs from "fs";

export interface IAdapter<T = any> {
    parse: (str: string) => T;
    stringify: (obj: T, options?) => string;
}
