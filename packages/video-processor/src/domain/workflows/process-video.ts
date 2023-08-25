import { SaveToDatabase } from '@fvsystem/commom';
import { GenerateDifferenteResolutions } from '../effects/generate-different-resolutions';
import { ProcessedVideo } from '../types/basic';
import { saveProcessedFileToDatabase } from '../effects/save-processedFile-database';
import { ProcessVideo } from '../types/workflows';
import { processedVideoFactory } from '../factories/processed-video.factory';
import { flow } from 'fp-ts/function';

export const processVideoWorkflow = (
  generateDifferentResolutions: GenerateDifferenteResolutions,
  saveProcessedVideoToDatabase: SaveToDatabase<ProcessedVideo>,
): ProcessVideo => {
  const saveProcessedFileComplete = saveProcessedFileToDatabase(
    saveProcessedVideoToDatabase,
  );
  return flow(
    processedVideoFactory,
    generateDifferentResolutions,
    saveProcessedFileComplete,
  );
};
