export interface IReadFileOptions extends IReadOptions {
    encoding?: string;
}

export interface IWriteOptions extends IReadOptions {
    encoding?: string;
}

export interface IReadOptions {
    type: string;
    path?: string;
}
