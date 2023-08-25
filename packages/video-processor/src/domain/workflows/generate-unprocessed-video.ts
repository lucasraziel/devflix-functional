import { SaveToDatabase } from '@fvsystem/commom';
import { UnprocessedVideo } from '../types/basic';
import { GenerateUnprocessedVideo } from '../types/workflows';
import { saveUnprocessedFileToDatabase } from '../effects/save-unprocessedFile-database';
import { unprocessedVideoFactoryMapped } from '../factories/unprocessed-video.factory';

export const generateUnprocessedVideoWorkflow = (
  saveUnprocessedVideoToDabatase: SaveToDatabase<UnprocessedVideo>,
): GenerateUnprocessedVideo => {
  return async (file) => {
    const saveUnProcessedVideoComplete = saveUnprocessedFileToDatabase(
      saveUnprocessedVideoToDabatase,
    );

    return saveUnProcessedVideoComplete(unprocessedVideoFactoryMapped(file));
  };
};
