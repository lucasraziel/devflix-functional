import {
  AsyncReturn,
  FileInfo,
  FileSaved,
  ReturnError,
  ReturnOK,
} from '../types';
import { copyFile, unlink } from 'node:fs/promises';
import { resolve } from 'node:path';

export type SaveToStorage = (file: FileInfo) => AsyncReturn<FileSaved>;

export const getSaveToDisk =
  (url: string, destin: string): SaveToStorage =>
  async (file) => {
    try {
      const fullDestin = resolve(destin, file.name);
      await copyFile(file.path, fullDestin);
      await unlink(file.path);
      return {
        type: 'ok',
        data: {
          url,
          fileInfo: {
            name: file.name,
            path: fullDestin,
          },
        },
      } as ReturnOK<FileSaved>;
    } catch (error) {
      return {
        type: 'error',
        error: error as Error,
      } as ReturnError<Error>;
    }
  };
