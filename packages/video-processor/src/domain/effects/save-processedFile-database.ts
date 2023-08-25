import { SaveToDatabase, asyncTee, deSyncAsync } from '@fvsystem/commom';
import { ProcessedVideo } from '../types/basic';

export function saveProcessedFileToDatabase(
  saveToDatabaseFunction: SaveToDatabase<ProcessedVideo>,
) {
  return deSyncAsync(asyncTee(saveToDatabaseFunction));
}
