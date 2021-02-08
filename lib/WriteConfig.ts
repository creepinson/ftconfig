import fs from "fs";
import path from "path";
import { AdapterOptions, IAdapter } from "./adapter";
import { getAdapter } from "./adapters";
import { IWriteOptions } from "./options";

export type ConfigOptions = {
    path: string;
    indent: number;
    encoding: BufferEncoding;
} & Partial<AdapterOptions>;
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
    public async read() {
        this.obj = await this.adapter.parse(this.options.path);
        return this;
    }

    public async modify(fn: (obj: T) => Promise<T>) {
        this.obj = await fn(this.obj);
        return this;
    }

    public async save(opts: Partial<ConfigOptions>) {
        // eslint-disable-next-line prefer-const
        let options: Partial<ConfigOptions> = {};
        if (typeof opts.path === "string") options.path = opts.path;

        options = Object.assign(
            {
                encoding: "utf-8",
                indent: opts.indent || 4,
            },
            this.options,
            options
        );
        if (options.path && options.encoding) {
            if (!(await checkFileExists(path.dirname(options.path as string))))
                await fs.promises.mkdir(path.dirname(options.path as string), {
                    recursive: true,
                });

            const data = await this.toString(options as ConfigOptions);
            await fs.promises.writeFile(options.path as string, data, {
                encoding: options.encoding as BufferEncoding,
            });
        }
        return this;
    }

    public toString<O extends AdapterOptions = AdapterOptions>(options?: O) {
        return this.adapter.stringify<O>(this.obj, options);
    }

    public toObject() {
        return this.obj;
    }

    /**
     * Validates this config object with Zod.
     * @param modify Whether to modify the config or just to validate it.
     * @param onError An optional onError function that can be used to log errors. Defaults to a function that calls console.error.
     */
    public async validate(modify: boolean) {
        let res = {};
        res = await this.options.schema.parseAsync(this.obj);
        if (modify) this.modify(async () => res as T);
        return this;
    }
}

export const checkFileExists = (s: string) =>
    new Promise((r) => fs.access(s, fs.constants.F_OK, (e) => r(!e)));
