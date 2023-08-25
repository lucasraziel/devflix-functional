import { SaveToStorage, asyncBind, deSyncAsync } from '@fvsystem/commom';

export function saveFileToStorage(savetoStorageFunction: SaveToStorage) {
  return deSyncAsync(asyncBind(savetoStorageFunction));
}
