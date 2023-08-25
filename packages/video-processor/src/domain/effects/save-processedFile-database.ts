import { SaveToDatabase, asyncTee } from '@fvsystem/commom';
import { ProcessedVideo } from '../types/basic';

export function saveProcessedFileToDatabase(
  saveToDatabaseFunction: SaveToDatabase<ProcessedVideo>,
) {
  return asyncTee(saveToDatabaseFunction);
}
