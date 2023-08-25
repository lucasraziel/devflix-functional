import { AsyncReturn } from '../types';

export type SaveToDatabase<T> = (data: T) => AsyncReturn<undefined>;
