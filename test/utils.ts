import * as path from "path";
import * as constant from "./constant";

export const createNewFilepath = (name?: string) => {
    if (!name) {
        name = Math.ceil(Math.random() * 10000) + "";
    }
    return path.resolve(constant.TEMP_PATH, name);
};
