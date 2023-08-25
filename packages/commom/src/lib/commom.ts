import { match, P } from 'ts-pattern';
import { Async, AsyncReturn, Return, ReturnError, ReturnOK } from './types';

export function bind<Input, Output, E = Error>(
  callback: (value: Input) => Return<Output, E>,
) {
  return function bindWithCallbackDefined(twoTrackInput: Return<Input, E>) {
    return match(twoTrackInput)
      .returnType<Return<Output, E>>()
      .with({ type: 'ok', data: P._ }, (value) =>
        callback((value as ReturnOK<Input>).data),
      )
      .with({ type: 'error', error: P._ }, (error) => error as ReturnError<E>)
      .exhaustive();
  };
}

export function map<Input, Output, E = Error>(
  callback: (value: Input) => Output,
) {
  return function mapWithCallbackDefined(value: Return<Input, E>) {
    return match(value)
      .returnType<Return<Output, E>>()
      .with({ type: 'ok', data: P._ }, (value) => ({
        type: 'ok',
        data: callback((value as ReturnOK<Input>).data),
      }))
      .with({ type: 'error', error: P._ }, (error) => error as ReturnError<E>)
      .exhaustive();
  };
}

export function tee<Input, E = Error>(
  callback: (value: Input) => Return<void, E>,
) {
  return function teeWithCallbackDefined(value: Return<Input, E>) {
    return match(value)
      .returnType<Return<Input, E>>()
      .with({ type: 'ok', data: P._ }, (value) => {
        const result = callback((value as ReturnOK<Input>).data);
        if (result.type === 'error') {
          return result as ReturnError<E>;
        }
        return value as ReturnOK<Input>;
      })
      .with({ type: 'error', error: P._ }, (error) => error as ReturnError<E>)
      .exhaustive();
  };
}

export function asyncBind<Input, Output, E = Error>(
  callback: (value: Input) => AsyncReturn<Output, E>,
) {
  return function asyncBindWithCallbackDefined(
    twoTrackInput: Return<Input, E>,
  ) {
    return match(twoTrackInput)
      .returnType<AsyncReturn<Output, E>>()
      .with({ type: 'ok', data: P._ }, async (value) =>
        callback((value as ReturnOK<Input>).data),
      )
      .with(
        { type: 'error', error: P._ },
        async (error) => error as ReturnError<E>,
      )
      .exhaustive();
  };
}

export function asyncMap<Input, Output, E = Error>(
  callback: (value: Input) => Async<Output>,
) {
  return function asyncMapWithCallbackDefined(value: Return<Input, E>) {
    return match(value)
      .returnType<AsyncReturn<Output, E>>()
      .with({ type: 'ok', data: P._ }, async (value) => ({
        type: 'ok',
        data: await callback((value as ReturnOK<Input>).data),
      }))
      .with(
        { type: 'error', error: P._ },
        async (error) => error as ReturnError<E>,
      )
      .exhaustive();
  };
}

export function asyncTee<Input, E = Error>(
  callback: (value: Input) => AsyncReturn<void>,
) {
  return function asyncTeeWithCallbackDefined(value: Return<Input, E>) {
    return match(value)
      .returnType<AsyncReturn<Input, E>>()
      .with({ type: 'ok', data: P._ }, async (value) => {
        const result = await callback((value as ReturnOK<Input>).data);
        if (result.type === 'error') {
          return result as ReturnError<E>;
        }
        return value as ReturnOK<Input>;
      })
      .with(
        { type: 'error', error: P._ },
        async (error) => error as ReturnError<E>,
      )
      .exhaustive();
  };
}

export function predicateToPassThrough(errorMessage: string) {
  function predicateToPassThroughWithErrorMessageDefined<T, E = Error>(
    predicate: (value: T) => boolean,
  ) {
    return (value: T): Return<T, E> =>
      predicate(value)
        ? ({
            type: 'ok',
            data: value,
          } as ReturnOK<T>)
        : ({
            type: 'error',
            error: new Error(errorMessage) as E,
          } as ReturnError<E>);
  }

  return predicateToPassThroughWithErrorMessageDefined;
}

export function asyncPredicateToPassThrough(errorMessage: string) {
  function predicateToPassThroughWithErrorMessageDefined<T, E = Error>(
    predicate: (value: T) => Async<boolean>,
  ) {
    return async (value: T): AsyncReturn<T, E> =>
      (await predicate(value))
        ? ({
            type: 'ok',
            data: value,
          } as ReturnOK<T>)
        : ({
            type: 'error',
            error: new Error(errorMessage) as E,
          } as ReturnError<E>);
  }

  return predicateToPassThroughWithErrorMessageDefined;
}

export function deSync<T, D>(
  fn: (value: T) => D,
): (value: Async<T>) => Async<D> {
  return async (value: Async<T>) => {
    const result = await value;
    return fn(result);
  };
}

export function deSyncAsync<T, D>(
  fn: (value: T) => Async<D>,
): (value: Async<T>) => Async<D> {
  return async (value: Async<T>) => {
    const result = await value;
    return fn(result);
  };
}
