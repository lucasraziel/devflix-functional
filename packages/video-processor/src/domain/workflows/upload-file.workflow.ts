import { CheckFileExists, FileInfo, SaveToStorage } from '@fvsystem/commom';
import { checkFileExistsValidation } from '../validations/check-file-exists.validation';
import { saveFileToStorage } from '../effects/save-To-Storage';
import { UploadVideo } from '../types/workflows';

export const uploadVideoWorkflow =
  (
    checkFileExists: CheckFileExists,
    saveToStorage: SaveToStorage,
  ): UploadVideo =>
  async (file: FileInfo) => {
    const checkFileExistsComplete = checkFileExistsValidation(checkFileExists);
    const saveToStorageComplete = saveFileToStorage(saveToStorage);

    return saveToStorageComplete(await checkFileExistsComplete(file));
  };
