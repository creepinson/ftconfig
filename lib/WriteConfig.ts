import fs from "fs";
import makeDir from "make-dir";
import path from "path";
import Joi from "joi";
import { IAdapter } from "./adapter";
import { getAdapter } from "./adapters";
import { IWriteOptions } from "./options";

export class WriteConfig<T> {
    private obj: T;
    private options: IWriteOptions;
    private adapter: IAdapter;

    constructor(obj: T, options: IWriteOptions) {
        this.obj = obj;
        this.options = options;
        this.adapter = getAdapter(this.options.type);
    }

    public modify(fn: (obj: T) => T) {
        this.obj = fn(this.obj);
        return this;
    }

    public save(pathOrOptions?: string) {
        let options: Record<string, unknown> = {};
        if (typeof pathOrOptions === "string") options.path = pathOrOptions;

        options = Object.assign(
            {
                encoding: "utf-8",
                indent: 2,
            },
            this.options,
            options
        );
        if (options.path && options.encoding) {
            if (!fs.existsSync(path.dirname(options.path as string)))
                makeDir.sync(path.dirname(options.path as string));

            const data = this.toString(options);
            fs.writeFileSync(options.path as string, data, {
                encoding: options.encoding as BufferEncoding,
            });
        }
        return this;
    }

    public toString(options?) {
        return this.adapter.stringify(this.obj, options);
    }

    public toObject() {
        return this.obj;
    }

    /**
     * Validates this config object with Joi.
     * @param modify Whether to modify the config or just to validate it.
     * @param callback An optional callback function that can be used to log errors. Defaults to a function that uses console.error.
     */
    public validate(
        modify: boolean,
        callback: (res: Joi.ValidationResult) => void = (res) => {
            if (res.error || res.errors)
                console.error(
                    `Could not load config: ${res.errors ?? res.error}`
                );
        }
    ) {
        const res = this.options.schema.validate(this.obj);
        if (modify) this.modify(() => res.value);
        callback(res);
        return this;
    }
}
