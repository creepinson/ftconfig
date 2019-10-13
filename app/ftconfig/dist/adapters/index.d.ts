import { IAdapter } from "../adapter.d";
export declare const adapters: IAdapter[];
export declare function getAdapter(typeName: string): IAdapter<any>;
export declare function getMatchAdapter(filename: string): IAdapter<any>;
