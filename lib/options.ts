import * as Zod from "zod";

export type BufferEncoding =
    | "ascii"
    | "utf8"
    | "utf-8"
    | "utf16le"
    | "ucs2"
    | "ucs-2"
    | "base64"
    | "latin1"
    | "binary"
    | "hex";

export interface IReadFileOptions extends IReadOptions {
    encoding?: BufferEncoding;
}

export interface IWriteOptions extends IReadOptions {
    encoding?: string;
}

export interface IReadOptions {
    type: string;
    path?: string;
    /**
     * Used for validating config with Joi.
     */
    schema?: Zod.Schema<Record<string, unknown>>;
}
