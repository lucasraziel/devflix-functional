import { SaveToDatabase } from '@fvsystem/commom';
import { UnprocessedVideo } from '../types/basic';
import { GenerateUnprocessedVideo } from '../types/workflows';
import { saveUnprocessedFileToDatabase } from '../effects/save-unprocessedFile-database';
import { unprocessedVideoFactoryMapped } from '../factories/unprocessed-video.factory';
import { flow } from 'fp-ts/function';

export const generateUnprocessedVideoWorkflow = (
  saveUnprocessedVideoToDabatase: SaveToDatabase<UnprocessedVideo>,
): GenerateUnprocessedVideo => {
  const saveUnProcessedVideoComplete = saveUnprocessedFileToDatabase(
    saveUnprocessedVideoToDabatase,
  );
  return flow(unprocessedVideoFactoryMapped, saveUnProcessedVideoComplete);
};
