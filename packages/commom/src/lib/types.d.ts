import { asyncPredicateToPassThrough } from './commom';

export type ReturnOK<T> = { type: 'ok'; data: T };

export type ReturnError<E> = { type: 'error'; error: E };

export type Return<ExpectedResult, ErrorExpected = Error> =
  | ReturnOK<ExpectedResult>
  | ReturnError<ErrorExpected>;

export type Async<T> = Promise<T>;

export type AsyncReturn<ExpectedResult, ErrorExpected = Error> = Async<
  Return<ExpectedResult, ErrorExpected>
>;

export type Optional<T> = T | undefined;

export type FileInfo = {
  name: string;
  path: string;
};

export type FileSaved = {
  fileInfo: FileInfo;
  url: string;
};

export type Command<D, T> = {
  data: T;
  timestamp: number;
  type: D;
};

export type AsyncPredicateToPassThrough = typeof asyncPredicateToPassThrough;
