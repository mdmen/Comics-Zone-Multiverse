type PrimitiveKeys = string | number | symbol;

type NonUndefined<T> = T extends undefined ? never : T;
