import fs from "fs";
import path from "path";
import { IAdapter } from "./adapter";
import { getAdapter } from "./adapters";
import { IWriteOptions } from "./options";

export class WriteConfig<T> {
    private obj: T;
    private options: IWriteOptions;
    private adapter: IAdapter<T>;

    constructor(obj: T, options: IWriteOptions) {
        this.obj = obj;
        this.options = options;
        this.adapter = getAdapter<T>(this.options.type);
    }

    /**
     * Reloads the configuration from the adapter.
     */
    public read() {
        this.obj = this.adapter.parse(this.options.path);
        return this;
    }

    public modify(fn: (obj: T) => T) {
        this.obj = fn(this.obj);
        return this;
    }

    public save(opts: { path?: string; indent?: number }) {
        let options: Record<string, unknown> = {};
        if (typeof opts.path === "string") options.path = opts.path;

        options = Object.assign(
            {
                encoding: "utf-8",
                indent: opts.indent ?? 4,
            },
            this.options,
            options
        );
        if (options.path && options.encoding) {
            if (!fs.existsSync(path.dirname(options.path as string)))
                fs.mkdirSync(path.dirname(options.path as string), {
                    recursive: true,
                });

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
     * Validates this config object with Zod.
     * @param modify Whether to modify the config or just to validate it.
     * @param onError An optional onError function that can be used to log errors. Defaults to a function that calls console.error.
     */
    public validate(
        modify: boolean,
        onError: (err) => void = (err) => {
            console.error(`Could not load config: ${err}`);
        }
    ) {
        let res = {};
        try {
            res = this.options.schema.parse(this.obj);
            if (modify) this.modify(() => res as T);
        } catch (err) {
            onError(err);
        }
        return this;
    }
}
