import { CheckFileExists, SaveToStorage } from '@fvsystem/commom';
import { checkFileExistsValidation } from '../validations/check-file-exists.validation';
import { saveFileToStorage } from '../effects/save-To-Storage';
import { UploadVideo } from '../types/workflows';
import { flow } from 'fp-ts/function';

export const uploadVideoWorkflow = (
  checkFileExists: CheckFileExists,
  saveToStorage: SaveToStorage,
): UploadVideo => {
  const checkFileExistsComplete = checkFileExistsValidation(checkFileExists);
  const saveToStorageComplete = saveFileToStorage(saveToStorage);
  return flow(checkFileExistsComplete, saveToStorageComplete);
};
