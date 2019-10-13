import * as fs from "fs";

export interface IAdapter<T = any> {
    key: string;
    match: RegExp;
    parse(str: string): T;
    stringify(obj: T, options?): string;
}
