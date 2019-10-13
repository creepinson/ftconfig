import { IWriteOptions } from "./options.d";
export declare class WriteConfig<T> {
    private obj;
    private options;
    private adapter;
    constructor(obj: T, options: IWriteOptions);
    modify(fn: (obj: T) => T): this;
    save(pathOrOptions?: string): this;
    toString(options?: any): string;
    toObject(): T;
}
