export interface IAdapter<T = unknown> {
    key: string;
    match: RegExp;
    parse(str: string): Promise<T>;
    stringify<O extends AdapterOptions = AdapterOptions>(
        obj: T,
        options?: O
    ): Promise<string>;
}

export interface AdapterOptions {
    indent: number;
}
