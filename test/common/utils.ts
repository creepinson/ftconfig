import * as path from "path";
import * as constant from "./constant";

/* istanbul ignore next */

export const createNewFilepath = (name?: string) => {
    name = (name || "")
        .split(".")
        .map((val, index, arr) => {
            if (arr.length === 1) {
                val = `${Math.ceil(Math.random() * 10000)}${val}`;
            } else if (index === arr.length - 2) {
                val += `-${Math.ceil(Math.random() * 10000)}`;
            }
            return val;
        })
        .join(".");
    return path.resolve(constant.TEMP_PATH, "dist", name);
};

export const sleep = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};
