import * as fs from "fs";
import makeDir = require("make-dir");
import * as path from "path";
import * as constant from "./constant";

export const copyFileMacro = (filename: string) => {
    const srcFilename = filename;
    const tarFilename = `${srcFilename.split(".")[0]}-${Math.ceil(
        Math.random() * 10000
    )}.${srcFilename.split(".")[1]}`;
    const srcFilepath = path.resolve(constant.RESOURCE_PATH, srcFilename);
    const tarFilepath = path.resolve(constant.TEMP_PATH, tarFilename);
    const tarDirpath = path.dirname(tarFilepath);
    if (!fs.existsSync(tarDirpath)) {
        makeDir.sync(tarDirpath);
    }
    return new Promise<string>((resolve) => {
        const ws = fs.createWriteStream(tarFilepath);
        ws.on("close", () => {
            resolve(tarFilepath);
        });
        fs.createReadStream(srcFilepath).pipe(ws);
    });
};
