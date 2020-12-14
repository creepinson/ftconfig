export interface IAdapter<T = unknown> {
    key: string;
    match: RegExp;
    parse(str: string): T;
    stringify(obj: T, options?): string;
}
