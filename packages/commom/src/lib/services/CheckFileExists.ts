import { Async, FileInfo } from '../types';
import { access } from 'node:fs/promises';

export type CheckFileExists = (file: FileInfo) => Async<boolean>;

export const checkFileExists: CheckFileExists = async (file) => {
  try {
    await access(file.path);
    return true;
  } catch {
    return false;
  }
};
