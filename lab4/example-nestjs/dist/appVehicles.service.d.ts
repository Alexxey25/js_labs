export interface vehiclesAccessor {
    filePath: string;
}
export declare class vhclService<I> {
    private readonly filePath;
    constructor(filePath?: string);
    read<T extends I>(): T;
    add<T>(newData: T): void;
    write<T extends I>(data: T): void;
}
