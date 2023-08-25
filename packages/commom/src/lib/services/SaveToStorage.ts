import { AsyncReturn, FileInfo, FileSaved } from '../types';

export type SaveToStorage = (file: FileInfo) => AsyncReturn<FileSaved>;
