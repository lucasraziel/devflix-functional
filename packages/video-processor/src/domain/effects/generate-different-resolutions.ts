import { AsyncReturn } from '@fvsystem/commom';
import { ProcessedVideo } from '../types/basic';

export type GenerateDifferenteResolutions = (
  processedVideo: ProcessedVideo,
) => AsyncReturn<ProcessedVideo>;
