import { SaveToStorage, asyncBind } from '@fvsystem/commom';

export function saveFileToStorage(savetoStorageFunction: SaveToStorage) {
  return asyncBind(savetoStorageFunction);
}
