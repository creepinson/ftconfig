import * as Zod from "zod";

type BufferEncoding =
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
    encoding?: BufferEncoding;
}

export interface IReadOptions {
    type: string;
    path?: string;
    /**
     * Used for validating config with Zod.
     */
    schema?: Zod.Schema<Record<string, unknown>>;
}
