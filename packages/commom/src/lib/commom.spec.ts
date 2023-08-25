import {
  bind,
  asyncBind,
  map,
  asyncMap,
  tee,
  asyncTee,
  predicateToPassThrough,
  asyncPredicateToPassThrough,
} from './commom';
import { Async, AsyncReturn, Return } from './types';

describe('bind', () => {
  function mock(parameter: number): Return<number> {
    return {
      type: 'ok',
      data: parameter * 2,
    };
  }

  async function asyncBindMock(parameter: number): AsyncReturn<number> {
    return {
      type: 'ok',
      data: parameter * 2,
    };
  }

  it('should bind without error', () => {
    expect(bind(mock)({ type: 'ok', data: 1 })).toEqual({
      type: 'ok',
      data: 2,
    });
  });

  it('should bind with error', () => {
    expect(bind(mock)({ type: 'error', error: new Error('error') })).toEqual({
      type: 'error',
      error: new Error('error'),
    });
  });

  it('should async bind without error', async () => {
    await expect(
      asyncBind(asyncBindMock)({ type: 'ok', data: 1 }),
    ).resolves.toEqual({
      type: 'ok',
      data: 2,
    });
  });

  it('should async bind with error', async () => {
    await expect(
      asyncBind(asyncBindMock)({ type: 'error', error: new Error('error') }),
    ).resolves.toEqual({ type: 'error', error: new Error('error') });
  });
});

describe('map', () => {
  function mock(parameter: number): number {
    return parameter * 2;
  }

  async function asyncMapMock(parameter: number): Async<number> {
    return parameter * 2;
  }

  it('should map without error', () => {
    expect(map(mock)({ type: 'ok', data: 1 })).toEqual({ type: 'ok', data: 2 });
  });

  it('should map with error', () => {
    expect(map(mock)({ type: 'error', error: new Error('error') })).toEqual({
      type: 'error',
      error: new Error('error'),
    });
  });

  it('should async map without error', async () => {
    await expect(
      asyncMap(asyncMapMock)({ type: 'ok', data: 1 }),
    ).resolves.toEqual({
      type: 'ok',
      data: 2,
    });
  });

  it('should async map with error', async () => {
    await expect(
      asyncMap(asyncMapMock)({ type: 'error', error: new Error('error') }),
    ).resolves.toEqual({ type: 'error', error: new Error('error') });
  });
});

describe('tee', () => {
  function mock(_: number): Return<void> {
    return {
      type: 'ok',
      data: undefined,
    };
  }

  async function asyncTeeMock(_: number): AsyncReturn<void> {
    return {
      type: 'ok',
      data: undefined,
    };
  }

  function mockTeeWithError(_: number): Return<void> {
    return {
      type: 'error',
      error: new Error('error'),
    };
  }

  async function mockAsyncTeeWithError(_: number): AsyncReturn<void> {
    return {
      type: 'error',
      error: new Error('error'),
    };
  }

  it('should tee without error', () => {
    expect(tee(mock)({ type: 'ok', data: 1 })).toEqual({ type: 'ok', data: 1 });
  });

  it('should tee with error', () => {
    expect(tee(mock)({ type: 'error', error: new Error('error') })).toEqual({
      type: 'error',
      error: new Error('error'),
    });
  });

  it('should async tee without error', async () => {
    await expect(
      asyncTee(asyncTeeMock)({ type: 'ok', data: 1 }),
    ).resolves.toEqual({
      type: 'ok',
      data: 1,
    });
  });

  it('should async tee with error', async () => {
    await expect(
      asyncTee(asyncTeeMock)({ type: 'error', error: new Error('error') }),
    ).resolves.toEqual({ type: 'error', error: new Error('error') });
  });

  it('should tee with error', () => {
    expect(tee(mockTeeWithError)({ type: 'ok', data: 1 })).toEqual({
      type: 'error',
      error: new Error('error'),
    });
  });

  it('should async tee with error', async () => {
    await expect(
      asyncTee(mockAsyncTeeWithError)({ type: 'ok', data: 1 }),
    ).resolves.toEqual({ type: 'error', error: new Error('error') });
  });
});

describe('predicateToPassthrough', () => {
  function mock(_: number) {
    return true;
  }

  function falseMock(_: number) {
    return false;
  }

  function asyncMock(_: number): Async<boolean> {
    return Promise.resolve(true);
  }

  function asyncFalseMock(_: number): Async<boolean> {
    return Promise.resolve(false);
  }

  it('should return the own number', () => {
    expect(predicateToPassThrough('error')(mock)(1)).toStrictEqual({
      type: 'ok',
      data: 1,
    });
  });

  it('should throw error', () => {
    expect(predicateToPassThrough('error')(falseMock)(1)).toStrictEqual({
      type: 'error',
      error: new Error('error'),
    });
  });

  it('should async return the own number', async () => {
    await expect(
      asyncPredicateToPassThrough('error')(asyncMock)(1),
    ).resolves.toStrictEqual({
      type: 'ok',
      data: 1,
    });
  });

  it('should async throw error', async () => {
    await expect(
      asyncPredicateToPassThrough('error')(asyncFalseMock)(1),
    ).resolves.toStrictEqual({
      type: 'error',
      error: new Error('error'),
    });
  });
});
