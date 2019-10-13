/// <reference types="node" />
import * as fs from "fs";
import { IReadFileOptions, IReadOptions } from "./options.d";
import { WriteConfig } from "./WriteConfig";
export declare const read: <T = any>(data: string, options: string | IReadOptions) => WriteConfig<T>;
export declare const readFile: <T = any>(p: fs.PathLike, options?: IReadFileOptions) => WriteConfig<T>;
