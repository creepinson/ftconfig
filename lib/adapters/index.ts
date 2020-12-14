import { readdirSync } from "fs";
import { resolve } from "path";
import { IAdapter } from "../adapter";

export const adapters: IAdapter[] = readdirSync(__dirname)
    .filter((filename) => "index.js" !== filename)
    .filter((filename) => /\.js$/.test(filename))
    .map((filename) => require(resolve(__dirname, filename)));

export function getAdapter(typeName: string) {
    for (const adapterObj of adapters)
        if (adapterObj.key === typeName) return adapterObj;

    return null;
}

export function getMatchAdapter(filename: string) {
    for (const adapterObj of adapters)
        if (adapterObj.match && adapterObj.match.test(filename))
            return adapterObj;

    return null;
}
