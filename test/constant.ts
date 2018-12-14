import findUp = require("find-up");
import path = require("path");

export const ROOT_PATH = path.dirname(findUp.sync("package.json"));
export const RESOURCE_PATH = path.resolve(ROOT_PATH, "test/resources");
export const TEMP_PATH = path.resolve(ROOT_PATH, "dist/temp");
