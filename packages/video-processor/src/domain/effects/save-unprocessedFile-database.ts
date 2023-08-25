import { SaveToDatabase, asyncTee } from '@fvsystem/commom';
import { UnprocessedVideo } from '../types/basic';

export function saveUnprocessedFileToDatabase(
  saveToDatabaseFunction: SaveToDatabase<UnprocessedVideo>,
) {
  return asyncTee(saveToDatabaseFunction);
}
