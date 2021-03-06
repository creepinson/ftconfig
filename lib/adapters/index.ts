import { readdirSync } from "fs";
import { resolve } from "path";
import { IAdapter } from "../adapter";

export const adapters: IAdapter[] = readdirSync(__dirname)
    .filter((filename) => !/index.(js|ts)$/.test(filename))
    .filter((filename) => /\.(js|ts)$/.test(filename))
    .map((filename) => require(resolve(__dirname, filename)));

export function getAdapter<T = unknown, A = IAdapter<T>>(typeName: string) {
    for (const adapterObj of adapters)
        if (adapterObj.key === typeName) return (adapterObj as unknown) as A;

    return null;
}

export function getMatchAdapter(filename: string) {
    for (const adapterObj of adapters)
        if (adapterObj.match && adapterObj.match.test(filename))
            return adapterObj;

    return null;
}
