import ava, { TestInterface } from "ava";

const test = ava as TestInterface<{ FILENAME: string; filepath: string }>;

export default test;
