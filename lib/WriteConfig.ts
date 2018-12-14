import * as fs from "fs";
import * as adapters from "./adapter";
import { IAdapter } from "./adapter.d";
import { IWriteOptions } from "./options.d";

export class WriteConfig<T> {
    private obj: T;
    private options: IWriteOptions;
    private adapter: IAdapter;

    constructor(obj: T, options: IWriteOptions) {
        this.obj = obj;
        this.options = options;
        this.adapter = adapters[this.options.type];
    }

    public modify(fn: (obj: T) => T) {
        this.obj = fn(this.obj);
        return this;
    }

    public save(pathOrOptions?: string) {
        let options: any = {};
        if (typeof pathOrOptions === "string") {
            options.path = pathOrOptions;
        }
        options = Object.assign(
            {
                indent: 2,
                options: "utf-8"
            },
            this.options,
            options
        );
        if (options.path && options.encoding) {
            const data = this.toString(options);
            fs.writeFileSync(options.path, data, {
                encoding: options.encoding
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
}
