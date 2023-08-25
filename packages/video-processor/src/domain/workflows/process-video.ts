import { SaveToDatabase } from '@fvsystem/commom';
import { GenerateDifferenteResolutions } from '../effects/generate-different-resolutions';
import { ProcessedVideo } from '../types/basic';
import { saveProcessedFileToDatabase } from '../effects/save-processedFile-database';
import { ProcessVideo } from '../types/workflows';
import { processedVideoFactory } from '../factories/processed-video.factory';

export const processVideoWorkflow = (
  generateDifferentResolutions: GenerateDifferenteResolutions,
  saveProcessedVideoToDatabase: SaveToDatabase<ProcessedVideo>,
): ProcessVideo => {
  const saveProcessedFileComplete = saveProcessedFileToDatabase(
    saveProcessedVideoToDatabase,
  );
  return async (unprocessedVideo) =>
    saveProcessedFileComplete(
      await generateDifferentResolutions(
        processedVideoFactory(unprocessedVideo),
      ),
    );
};
